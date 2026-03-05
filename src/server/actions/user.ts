"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const VALID_ROLES = ["DONOR", "FUNDRAISER", "NGO_ADMIN", "ADMIN", "SUPER_ADMIN"] as const;
type UserRole = (typeof VALID_ROLES)[number];

export async function updateUserRole(targetUserId: string, newRole: UserRole) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const currentUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, role: true },
  });

  if (!currentUser) throw new Error("User not found");

  // Only SUPER_ADMIN can assign ADMIN/SUPER_ADMIN roles
  // ADMIN can assign DONOR/FUNDRAISER/NGO_ADMIN roles
  if (newRole === "SUPER_ADMIN" && currentUser.role !== "SUPER_ADMIN") {
    throw new Error("Only SUPER_ADMIN can assign SUPER_ADMIN role");
  }

  if (
    (newRole === "ADMIN" || newRole === "SUPER_ADMIN") &&
    !["ADMIN", "SUPER_ADMIN"].includes(currentUser.role)
  ) {
    throw new Error("Unauthorized - Admin only");
  }

  if (!["ADMIN", "SUPER_ADMIN"].includes(currentUser.role)) {
    throw new Error("Unauthorized - Admin only");
  }

  // Prevent demoting yourself
  if (targetUserId === currentUser.id && newRole !== currentUser.role) {
    throw new Error("Cannot change your own role");
  }

  if (!VALID_ROLES.includes(newRole)) {
    throw new Error("Invalid role");
  }

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole },
  });

  revalidatePath("/dashboard/admin/users");
}
