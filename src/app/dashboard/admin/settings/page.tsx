import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";

export default async function AdminSettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const [menuItems, cancerTypes, states] = await Promise.all([
    prisma.menuItem.count(),
    prisma.cancerType.count(),
    prisma.state.count(),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">Settings</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-none p-5 border border-border/50">
          <h3 className="font-semibold mb-3">Platform Data</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Menu Items</span>
              <span className="font-medium">{menuItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cancer Types</span>
              <span className="font-medium">{cancerTypes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">States/UTs</span>
              <span className="font-medium">{states}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-none p-5 border border-border/50">
          <h3 className="font-semibold mb-3">Payment Gateway</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Razorpay</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Key ID</span>
              <span className="font-medium text-xs">
                {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
                  ? `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.slice(0, 8)}...`
                  : "Not configured"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-none p-5 border border-border/50">
          <h3 className="font-semibold mb-3">Authentication</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span className="font-medium">Clerk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">Connected</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-none p-5 border border-border/50">
          <h3 className="font-semibold mb-3">Database</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span className="font-medium">Neon PostgreSQL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ORM</span>
              <span className="font-medium">Prisma 7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
