"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function requestWithdrawal(data: {
  campaignId: string;
  amount: number;
  bankAccountNumber: string;
  bankIfsc: string;
  bankAccountName: string;
  note?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  const campaign = await prisma.campaign.findUnique({
    where: { id: data.campaignId },
    select: { id: true, createdById: true, amountRaised: true },
  });

  if (!campaign || campaign.createdById !== user.id) {
    throw new Error("Campaign not found or unauthorized");
  }

  if (data.amount < 500) {
    throw new Error("Minimum withdrawal is ₹500");
  }

  await prisma.withdrawal.create({
    data: {
      amount: data.amount,
      bankAccountNumber: data.bankAccountNumber,
      bankIfsc: data.bankIfsc,
      bankAccountName: data.bankAccountName,
      note: data.note,
      campaignId: data.campaignId,
      requestedById: user.id,
    },
  });

  revalidatePath("/dashboard/fundraiser/withdraw");
  revalidatePath("/dashboard/admin/withdrawals");
}

export async function processWithdrawal(
  withdrawalId: string,
  status: "APPROVED" | "REJECTED" | "COMPLETED",
  note?: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    throw new Error("Unauthorized - Admin only");
  }

  await prisma.withdrawal.update({
    where: { id: withdrawalId },
    data: {
      status,
      note,
      processedAt: ["COMPLETED", "REJECTED"].includes(status)
        ? new Date()
        : undefined,
    },
  });

  revalidatePath("/dashboard/admin/withdrawals");
  revalidatePath("/dashboard/fundraiser/withdraw");
}
