import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminStats } from "@/server/queries/admin";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency } from "@/lib/utils";
import {
  FolderKanban,
  IndianRupee,
  Users,
  Building2,
  Clock,
  Heart,
  Banknote,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const stats = await getAdminStats();

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Raised"
          value={formatCurrency(stats.totalRaised)}
          icon={IndianRupee}
        />
        <StatCard
          title="Total Campaigns"
          value={stats.totalCampaigns}
          description={`${stats.pendingCampaigns} pending review`}
          icon={FolderKanban}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
        />
        <StatCard
          title="Total Donations"
          value={stats.totalDonations}
          icon={Heart}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="NGOs Registered"
          value={stats.totalNgos}
          icon={Building2}
        />
        <StatCard
          title="Pending Campaigns"
          value={stats.pendingCampaigns}
          icon={Clock}
        />
        <StatCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          icon={Banknote}
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 border border-border/50">
        <h2 className="font-heading text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Review Campaigns", href: "/dashboard/admin/campaigns", count: stats.pendingCampaigns },
            { label: "Manage Users", href: "/dashboard/admin/users", count: stats.totalUsers },
            { label: "Process Withdrawals", href: "/dashboard/admin/withdrawals", count: stats.pendingWithdrawals },
            { label: "NGO Verification", href: "/dashboard/admin/ngos", count: stats.totalNgos },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="p-4 rounded-xl border border-border/50 hover:border-varak-primary/30 hover:shadow-sm transition-all text-center"
            >
              <div className="text-2xl font-heading text-varak-primary">
                {action.count}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {action.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
