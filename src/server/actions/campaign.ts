"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { campaignCreateSchema } from "@/lib/validations/campaign";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCampaign(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  const rawData = Object.fromEntries(formData.entries());
  const validated = campaignCreateSchema.parse(rawData);

  const baseSlug = slugify(validated.title);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const campaign = await prisma.campaign.create({
    data: {
      slug,
      title: validated.title,
      story: validated.story,
      goalAmount: validated.goalAmount,
      beneficiaryName: validated.beneficiaryName,
      beneficiaryRelation: validated.beneficiaryRelation,
      beneficiaryAge: validated.beneficiaryAge,
      cancerTypeId: validated.cancerTypeId,
      hospitalName: validated.hospitalName,
      hospitalCity: validated.hospitalCity,
      stateId: validated.stateId || null,
      districtId: validated.districtId || null,
      endDate: validated.endDate,
      status: "PENDING_REVIEW",
      createdById: user.id,
    },
  });

  // Update user role to FUNDRAISER if they're currently a DONOR
  await prisma.user.update({
    where: { id: user.id, role: "DONOR" },
    data: { role: "FUNDRAISER" },
  }).catch(() => {
    // Ignore if user already has a higher role
  });

  revalidatePath("/campaigns");
  revalidatePath("/dashboard/fundraiser/campaigns");

  return { success: true, campaignId: campaign.id, slug: campaign.slug };
}

export async function updateCampaignStatus(
  campaignId: string,
  status: "APPROVED" | "REJECTED" | "SUSPENDED",
  reason?: string
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

  await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      status,
      rejectionReason: status === "REJECTED" ? reason : null,
    },
  });

  revalidatePath("/campaigns");
  revalidatePath("/dashboard/admin/campaigns");
}
