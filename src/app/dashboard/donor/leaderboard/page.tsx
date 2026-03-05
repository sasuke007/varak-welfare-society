import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Trophy } from "lucide-react";

export default async function DonorLeaderboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const topDonors = await prisma.donation.groupBy({
    by: ["donorId"],
    where: { status: "COMPLETED", donorId: { not: null } },
    _sum: { amount: true },
    _count: true,
    orderBy: { _sum: { amount: "desc" } },
    take: 25,
  });

  const donorIds = topDonors
    .map((d) => d.donorId)
    .filter((id): id is string => id !== null);

  const donors = await prisma.user.findMany({
    where: { id: { in: donorIds } },
    select: { id: true, firstName: true, lastName: true, avatarUrl: true },
  });

  const donorMap = new Map(donors.map((d) => [d.id, d]));

  const medalColors = ["text-yellow-500", "text-gray-400", "text-amber-700"];

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-2">
        Donor Leaderboard
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Top donors making a difference in the fight against cancer.
      </p>

      {topDonors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No donations yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-center p-4 font-medium w-16">#</th>
                  <th className="text-left p-4 font-medium">Donor</th>
                  <th className="text-right p-4 font-medium">Donations</th>
                  <th className="text-right p-4 font-medium">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {topDonors.map((entry, index) => {
                  const donor = entry.donorId
                    ? donorMap.get(entry.donorId)
                    : null;
                  const isCurrentUser = entry.donorId === user.id;
                  return (
                    <tr
                      key={entry.donorId || index}
                      className={`border-b last:border-0 ${
                        isCurrentUser ? "bg-varak-primary/5" : ""
                      }`}
                    >
                      <td className="p-4 text-center">
                        {index < 3 ? (
                          <Trophy
                            className={`h-5 w-5 mx-auto ${medalColors[index]}`}
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            {index + 1}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-varak-primary/10 flex items-center justify-center text-xs font-medium text-varak-primary">
                            {donor
                              ? `${donor.firstName[0]}${(donor.lastName || "")[0] || ""}`
                              : "?"}
                          </div>
                          <span className={isCurrentUser ? "font-semibold" : ""}>
                            {donor
                              ? `${donor.firstName} ${donor.lastName || ""}`
                              : "Anonymous"}
                            {isCurrentUser && (
                              <span className="text-xs text-varak-primary ml-1">
                                (You)
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        {entry._count}
                      </td>
                      <td className="p-4 text-right font-semibold text-varak-primary">
                        {formatCurrency(entry._sum.amount || 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
