import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true, firstName: true, lastName: true, avatarUrl: true },
  });

  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-varak-cream">
      <DashboardSidebar
        role={user.role}
        userName={`${user.firstName} ${user.lastName || ""}`}
        avatarUrl={user.avatarUrl}
      />
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
