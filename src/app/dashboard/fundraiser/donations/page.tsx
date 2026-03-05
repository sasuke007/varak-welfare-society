import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default async function FundraiserDonationsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const donations = await prisma.donation.findMany({
    where: { campaign: { createdById: user.id } },
    include: {
      campaign: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const statusColor: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    FAILED: "bg-red-100 text-red-800",
    REFUNDED: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Donations Received
      </h1>

      {donations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <p className="text-muted-foreground">
            No donations received yet. Share your campaigns to start receiving
            donations!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium">Donor</th>
                  <th className="text-left p-4 font-medium">Campaign</th>
                  <th className="text-right p-4 font-medium">Amount</th>
                  <th className="text-center p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-b last:border-0">
                    <td className="p-4">
                      <p className="font-medium">
                        {d.isAnonymous ? "Anonymous" : d.donorName || "Donor"}
                      </p>
                      {d.donorEmail && (
                        <p className="text-xs text-muted-foreground">
                          {d.donorEmail}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <a
                        href={`/campaigns/${d.campaign.slug}`}
                        className="text-varak-primary hover:underline"
                      >
                        {d.campaign.title}
                      </a>
                    </td>
                    <td className="p-4 text-right font-semibold text-varak-primary">
                      {formatCurrency(d.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={statusColor[d.status] || "bg-gray-100"}>
                        {d.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right text-muted-foreground">
                      {timeAgo(d.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
