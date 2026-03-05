import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency } from "@/lib/utils";
import { Eye, Users, Heart, TrendingUp } from "lucide-react";

export default async function AdminMarketingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const [viewStats, donorStats, campaignStats, topCampaigns] =
    await Promise.all([
      prisma.campaign.aggregate({
        where: { status: "APPROVED" },
        _sum: { viewCount: true },
      }),
      prisma.user.count({ where: { role: "DONOR" } }),
      prisma.campaign.count({ where: { status: "APPROVED" } }),
      prisma.campaign.findMany({
        where: { status: "APPROVED" },
        select: {
          id: true,
          title: true,
          slug: true,
          viewCount: true,
          donorCount: true,
          amountRaised: true,
        },
        orderBy: { viewCount: "desc" },
        take: 10,
      }),
    ]);

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Marketing Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Page Views"
          value={viewStats._sum.viewCount || 0}
          icon={Eye}
        />
        <StatCard
          title="Registered Donors"
          value={donorStats}
          icon={Users}
        />
        <StatCard
          title="Active Campaigns"
          value={campaignStats}
          icon={Heart}
        />
        <StatCard
          title="Avg Views/Campaign"
          value={
            campaignStats > 0
              ? Math.round((viewStats._sum.viewCount || 0) / campaignStats)
              : 0
          }
          icon={TrendingUp}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border/50">
        <h2 className="font-heading text-lg mb-4">
          Top Campaigns by Views
        </h2>
        {topCampaigns.length === 0 ? (
          <p className="text-muted-foreground text-sm">No campaigns yet.</p>
        ) : (
          <div className="space-y-3">
            {topCampaigns.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-none bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    #{i + 1}
                  </span>
                  <div>
                    <a
                      href={`/campaigns/${c.slug}`}
                      className="text-sm font-medium text-varak-primary hover:underline"
                    >
                      {c.title}
                    </a>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{c.viewCount} views</span>
                      <span>{c.donorCount} donors</span>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-sm text-varak-primary">
                  {formatCurrency(c.amountRaised)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
