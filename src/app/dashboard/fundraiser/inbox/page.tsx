import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
import { Bell, CheckCheck } from "lucide-react";
import { MarkReadButton } from "./mark-read-button";

export default async function FundraiserInboxPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl">Inbox</h1>
          {unread > 0 && (
            <p className="text-sm text-muted-foreground">
              {unread} unread notification{unread > 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unread > 0 && <MarkReadButton userId={user.id} />}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-none p-4 border border-border/50 ${
                !n.read ? "border-l-4 border-l-varak-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {n.message}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
              {n.link && (
                <a
                  href={n.link}
                  className="text-xs text-varak-primary hover:underline mt-1 inline-block"
                >
                  View details
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
