import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { Building2 } from "lucide-react";

export default async function AdminNgosPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const ngos = await prisma.ngo.findMany({
    include: {
      members: {
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
        },
      },
      _count: { select: { campaigns: true, documents: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
    VERIFIED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        NGO Management
      </h1>

      {ngos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No NGOs registered yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white rounded-none p-5 border border-border/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold">{ngo.name}</h3>
                    <Badge
                      className={
                        statusColor[ngo.verificationStatus] || "bg-gray-100"
                      }
                    >
                      {ngo.verificationStatus}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                    <span>Reg: {ngo.registrationNumber}</span>
                    <span>Type: {ngo.ngoType}</span>
                    {ngo.city && <span>City: {ngo.city}</span>}
                    <span>Campaigns: {ngo._count.campaigns}</span>
                    <span>Docs: {ngo._count.documents}</span>
                    <span>
                      {ngo.has12A ? "12A" : ""}{" "}
                      {ngo.has80G ? "80G" : ""}
                    </span>
                    <span>Created: {timeAgo(ngo.createdAt)}</span>
                  </div>
                  {ngo.members.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Members:{" "}
                      {ngo.members
                        .map(
                          (m) =>
                            `${m.user.firstName} ${m.user.lastName || ""} (${m.associationType})`
                        )
                        .join(", ")}
                    </p>
                  )}
                  {ngo.rejectionReason && (
                    <p className="text-sm text-red-600 mt-1">
                      Rejected: {ngo.rejectionReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
