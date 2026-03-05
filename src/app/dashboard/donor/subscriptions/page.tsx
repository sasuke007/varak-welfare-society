import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default async function DonorSubscriptionsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: user.id },
    include: {
      plan: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statusColor: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    PAUSED: "bg-yellow-100 text-yellow-800",
    CANCELLED: "bg-red-100 text-red-800",
    EXPIRED: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        My Subscriptions
      </h1>

      {subscriptions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">
            No active subscriptions.
          </p>
          <a
            href="/monthly-giving"
            className="text-varak-primary hover:underline font-medium"
          >
            Become a monthly donor
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-none p-5 border border-border/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{sub.plan.name}</h3>
                  <p className="text-2xl font-heading text-varak-primary mt-1">
                    {formatCurrency(sub.plan.amount)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{sub.plan.interval.toLowerCase()}
                    </span>
                  </p>
                  {sub.plan.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {sub.plan.description}
                    </p>
                  )}
                  {sub.nextBillingDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Next billing:{" "}
                      {new Date(sub.nextBillingDate).toLocaleDateString("en-IN")}
                    </p>
                  )}
                </div>
                <Badge
                  className={statusColor[sub.status] || "bg-gray-100"}
                >
                  {sub.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
