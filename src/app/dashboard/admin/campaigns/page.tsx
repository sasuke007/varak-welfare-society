import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { CampaignActions } from "./campaign-actions";

export default async function AdminCampaignsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const campaigns = await prisma.campaign.findMany({
    include: {
      createdBy: {
        select: { firstName: true, lastName: true, email: true },
      },
      cancerType: true,
      state: true,
      documents: true,
    },
    orderBy: [
      { status: "asc" },
      { createdAt: "asc" },
    ],
  });

  const pending = campaigns.filter((c) => c.status === "PENDING_REVIEW");
  const approved = campaigns.filter((c) => c.status === "APPROVED");
  const rejected = campaigns.filter((c) => c.status === "REJECTED");
  const other = campaigns.filter(
    (c) => !["PENDING_REVIEW", "APPROVED", "REJECTED"].includes(c.status)
  );

  const statusColor: Record<string, string> = {
    PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    DRAFT: "bg-gray-100 text-gray-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    SUSPENDED: "bg-orange-100 text-orange-800",
  };

  function renderCampaignRow(campaign: (typeof campaigns)[0]) {
    return (
      <div
        key={campaign.id}
        className="bg-white rounded-none p-5 border border-border/50"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-base truncate">
                {campaign.title}
              </h3>
              <Badge className={statusColor[campaign.status] || "bg-gray-100"}>
                {campaign.status.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              by {campaign.createdBy.firstName} {campaign.createdBy.lastName} (
              {campaign.createdBy.email})
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {campaign.cancerType && (
                <span>Cancer: {campaign.cancerType.name}</span>
              )}
              <span>Goal: {formatCurrency(campaign.goalAmount)}</span>
              <span>Raised: {formatCurrency(campaign.amountRaised)}</span>
              {campaign.state && <span>State: {campaign.state.name}</span>}
              <span>Docs: {campaign.documents.length}</span>
              <span>Created: {timeAgo(campaign.createdAt)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {campaign.story}
            </p>
            {campaign.rejectionReason && (
              <p className="text-sm text-red-600 mt-1">
                Rejection reason: {campaign.rejectionReason}
              </p>
            )}
          </div>

          <CampaignActions
            campaignId={campaign.id}
            status={campaign.status}
            slug={campaign.slug}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Manage Campaigns
      </h1>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            Pending Review ({pending.length})
          </h2>
          <div className="space-y-3">{pending.map(renderCampaignRow)}</div>
        </div>
      )}

      {approved.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Approved ({approved.length})
          </h2>
          <div className="space-y-3">{approved.map(renderCampaignRow)}</div>
        </div>
      )}

      {rejected.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Rejected ({rejected.length})
          </h2>
          <div className="space-y-3">{rejected.map(renderCampaignRow)}</div>
        </div>
      )}

      {other.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            Other ({other.length})
          </h2>
          <div className="space-y-3">{other.map(renderCampaignRow)}</div>
        </div>
      )}

      {campaigns.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <p className="text-muted-foreground">No campaigns found.</p>
        </div>
      )}
    </div>
  );
}
