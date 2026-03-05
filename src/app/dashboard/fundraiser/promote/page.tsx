import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Copy, Share2, Facebook, MessageCircle } from "lucide-react";

export default async function FundraiserPromotePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true },
  });
  if (!user) redirect("/sign-in");

  const campaigns = await prisma.campaign.findMany({
    where: { createdById: user.id, status: "APPROVED" },
    select: { id: true, title: true, slug: true, viewCount: true, donorCount: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl mb-2">
        Promote Your Campaigns
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Share your campaigns to reach more donors.
      </p>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border/50 text-center">
          <p className="text-muted-foreground">
            No approved campaigns to promote yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const url = `${process.env.NEXT_PUBLIC_APP_URL || "https://varakwelfare.org"}/campaigns/${campaign.slug}`;
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-none p-5 border border-border/50"
              >
                <h3 className="font-semibold mb-1">{campaign.title}</h3>
                <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                  <span>{campaign.viewCount} views</span>
                  <span>{campaign.donorCount} donors</span>
                </div>

                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-none mb-3">
                  <code className="text-xs flex-1 truncate">{url}</code>
                  <button
                    className="text-xs text-varak-primary hover:underline flex items-center gap-1 shrink-0"
                    title="Copy link"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Support this cause: ${url}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-none bg-green-600 text-white text-xs hover:bg-green-700"
                  >
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-none bg-blue-600 text-white text-xs hover:bg-blue-700"
                  >
                    <Facebook className="h-3 w-3" />
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Support: ${campaign.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-none bg-black text-white text-xs hover:bg-gray-800"
                  >
                    <Share2 className="h-3 w-3" />
                    X / Twitter
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
