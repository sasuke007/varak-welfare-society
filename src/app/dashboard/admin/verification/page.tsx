import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { FileText, Shield } from "lucide-react";

export default async function AdminVerificationPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/dashboard/fundraiser");
  }

  const [unverifiedDocs, pendingKyc] = await Promise.all([
    prisma.campaignDocument.findMany({
      where: { verified: false },
      include: {
        campaign: { select: { title: true, slug: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.user.findMany({
      where: { kycStatus: "PENDING" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        aadharNumber: true,
        panNumber: true,
        createdAt: true,
        documents: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-6">
        Document Verification
      </h1>

      {/* Campaign Documents */}
      <div className="mb-8">
        <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Unverified Campaign Documents ({unverifiedDocs.length})
        </h2>
        {unverifiedDocs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-border/50 text-center">
            <p className="text-muted-foreground text-sm">
              All campaign documents are verified.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unverifiedDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-none p-4 border border-border/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">
                      {doc.fileName || doc.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Campaign:{" "}
                      <a
                        href={`/campaigns/${doc.campaign.slug}`}
                        className="text-varak-primary hover:underline"
                      >
                        {doc.campaign.title}
                      </a>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Type: {doc.type} &middot; {timeAgo(doc.createdAt)}
                    </p>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-varak-primary hover:underline shrink-0"
                  >
                    View Document
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* KYC Verification */}
      <div>
        <h2 className="font-heading text-lg mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Pending KYC Verification ({pendingKyc.length})
        </h2>
        {pendingKyc.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-border/50 text-center">
            <p className="text-muted-foreground text-sm">
              No pending KYC requests.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingKyc.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-none p-4 border border-border/50"
              >
                <p className="font-medium text-sm">
                  {u.firstName} {u.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  {u.aadharNumber && (
                    <span>
                      Aadhar: ****{u.aadharNumber.slice(-4)}
                    </span>
                  )}
                  {u.panNumber && <span>PAN: {u.panNumber}</span>}
                  <span>Docs: {u.documents.length}</span>
                  <span>Submitted: {timeAgo(u.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
