import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WithdrawRequestForm } from "./withdraw-form";

export default async function FundraiserWithdrawPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const [campaigns, withdrawals] = await Promise.all([
    prisma.campaign.findMany({
      where: { createdById: user.id, status: "APPROVED" },
      select: {
        id: true,
        title: true,
        amountRaised: true,
        _count: { select: { withdrawals: true } },
      },
    }),
    prisma.withdrawal.findMany({
      where: { requestedById: user.id },
      include: {
        campaign: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">Withdrawals</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-heading text-lg mb-3">Request Withdrawal</h2>
          <WithdrawRequestForm
            campaigns={campaigns.map((c) => ({
              id: c.id,
              title: c.title,
              balance: Number(c.amountRaised),
            }))}
          />
        </div>

        <div>
          <h2 className="font-heading text-lg mb-3">Withdrawal History</h2>
          {withdrawals.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-border/50 text-center">
              <p className="text-muted-foreground text-sm">
                No withdrawal requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawals.map((w) => (
                <div
                  key={w.id}
                  className="bg-white rounded-none p-4 border border-border/50"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-semibold">
                        {formatCurrency(w.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {w.campaign.title}
                      </p>
                    </div>
                    <Badge
                      className={statusColor[w.status] || "bg-gray-100"}
                    >
                      {w.status}
                    </Badge>
                  </div>
                  {w.note && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Note: {w.note}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {timeAgo(w.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
