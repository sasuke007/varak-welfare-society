import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency } from "@/lib/utils";
import { FolderKanban, Heart, IndianRupee, TrendingUp } from "lucide-react";

export default async function FundraiserDashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const [campaigns, donationStats, recentDonations] = await Promise.all([
    prisma.campaign.findMany({
      where: { createdById: user.id },
      select: { id: true, title: true, status: true, amountRaised: true, donorCount: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.donation.aggregate({
      where: { campaign: { createdById: user.id }, status: "COMPLETED" },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.donation.findMany({
      where: { campaign: { createdById: user.id }, status: "COMPLETED" },
      include: {
        campaign: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const totalRaised = donationStats._sum.amount?.toNumber() || 0;
  const activeCampaigns = campaigns.filter((c) => c.status === "APPROVED").length;

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Fundraiser Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Raised"
          value={formatCurrency(totalRaised)}
          icon={IndianRupee}
        />
        <StatCard
          title="Active Campaigns"
          value={activeCampaigns}
          description={`${campaigns.length} total`}
          icon={FolderKanban}
        />
        <StatCard
          title="Total Donations"
          value={donationStats._count}
          icon={Heart}
        />
        <StatCard
          title="Avg. Donation"
          value={
            donationStats._count > 0
              ? formatCurrency(totalRaised / donationStats._count)
              : "₹0"
          }
          icon={TrendingUp}
        />
      </div>

      {/* Recent donations */}
      <div className="bg-white rounded-2xl p-6 border border-border/50">
        <h2 className="font-heading text-xl mb-4">Recent Donations</h2>
        {recentDonations.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No donations yet. Share your campaigns to start receiving donations!
          </p>
        ) : (
          <div className="space-y-3">
            {recentDonations.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium">
                    {d.isAnonymous ? "Anonymous" : d.donorName || "Donor"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.campaign.title}
                  </p>
                </div>
                <span className="font-semibold text-varak-primary">
                  {formatCurrency(d.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
