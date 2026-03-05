import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  const [
    totalCampaigns,
    pendingCampaigns,
    totalDonations,
    totalRaised,
    totalUsers,
    totalNgos,
    pendingWithdrawals,
  ] = await Promise.all([
    prisma.campaign.count(),
    prisma.campaign.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.donation.count({ where: { status: "COMPLETED" } }),
    prisma.donation.aggregate({
      where: { status: "COMPLETED" },
      _sum: { amount: true },
    }),
    prisma.user.count(),
    prisma.ngo.count(),
    prisma.withdrawal.count({ where: { status: "PENDING" } }),
  ]);

  return {
    totalCampaigns,
    pendingCampaigns,
    totalDonations,
    totalRaised: totalRaised._sum.amount?.toNumber() || 0,
    totalUsers,
    totalNgos,
    pendingWithdrawals,
  };
}

export async function getPendingCampaigns() {
  return prisma.campaign.findMany({
    where: { status: "PENDING_REVIEW" },
    include: {
      createdBy: {
        select: { firstName: true, lastName: true, email: true },
      },
      cancerType: true,
      documents: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getAllUsers(page = 1, pageSize = 20) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      include: {
        _count: { select: { campaigns: true, donations: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  return { users, total, totalPages: Math.ceil(total / pageSize) };
}

export async function getPendingWithdrawals() {
  return prisma.withdrawal.findMany({
    where: { status: "PENDING" },
    include: {
      campaign: { select: { title: true, slug: true } },
      requestedBy: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}
