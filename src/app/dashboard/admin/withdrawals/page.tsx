import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WithdrawalActions } from "./withdrawal-actions";

export default async function AdminWithdrawalsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const withdrawals = await prisma.withdrawal.findMany({
    include: {
      campaign: { select: { title: true, slug: true } },
      requestedBy: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
  });

  const pending = withdrawals.filter((w) => w.status === "PENDING");
  const processing = withdrawals.filter(
    (w) => w.status === "APPROVED" || w.status === "PROCESSING"
  );
  const completed = withdrawals.filter(
    (w) => w.status === "COMPLETED" || w.status === "REJECTED"
  );

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  function renderWithdrawal(w: (typeof withdrawals)[0]) {
    return (
      <div
        key={w.id}
        className="bg-white rounded-none p-5 border border-border/50"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-heading text-lg text-varak-primary">
                {formatCurrency(w.amount)}
              </span>
              <Badge className={statusColor[w.status] || "bg-gray-100"}>
                {w.status}
              </Badge>
            </div>
            <p className="text-sm">
              <a
                href={`/campaigns/${w.campaign.slug}`}
                className="text-varak-primary hover:underline"
              >
                {w.campaign.title}
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Requested by: {w.requestedBy.firstName}{" "}
              {w.requestedBy.lastName} ({w.requestedBy.email})
            </p>
            <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground mt-1">
              {w.bankAccountNumber && (
                <span>A/C: ****{w.bankAccountNumber.slice(-4)}</span>
              )}
              {w.bankIfsc && <span>IFSC: {w.bankIfsc}</span>}
              {w.bankAccountName && <span>Name: {w.bankAccountName}</span>}
              <span>{timeAgo(w.createdAt)}</span>
            </div>
            {w.note && (
              <p className="text-xs text-muted-foreground mt-1">
                Note: {w.note}
              </p>
            )}
          </div>

          {w.status === "PENDING" && <WithdrawalActions withdrawalId={w.id} />}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Manage Withdrawals
      </h1>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            Pending ({pending.length})
          </h2>
          <div className="space-y-3">{pending.map(renderWithdrawal)}</div>
        </div>
      )}

      {processing.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            In Progress ({processing.length})
          </h2>
          <div className="space-y-3">{processing.map(renderWithdrawal)}</div>
        </div>
      )}

      {completed.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Completed / Rejected ({completed.length})
          </h2>
          <div className="space-y-3">{completed.map(renderWithdrawal)}</div>
        </div>
      )}

      {withdrawals.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <p className="text-muted-foreground">No withdrawal requests.</p>
        </div>
      )}
    </div>
  );
}
