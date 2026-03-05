"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCampaignStatus } from "@/server/actions/campaign";
import { CheckCircle, XCircle, Ban, ExternalLink } from "lucide-react";

export function CampaignActions({
  campaignId,
  status,
  slug,
}: {
  campaignId: string;
  status: string;
  slug: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");

  async function handleAction(
    newStatus: "APPROVED" | "REJECTED" | "SUSPENDED",
    rejectionReason?: string
  ) {
    setLoading(true);
    try {
      await updateCampaignStatus(campaignId, newStatus, rejectionReason);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    } finally {
      setLoading(false);
      setShowReject(false);
      setReason("");
    }
  }

  return (
    <div className="flex flex-col gap-2 md:items-end shrink-0">
      <a
        href={`/campaigns/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-varak-primary hover:underline flex items-center gap-1"
      >
        <ExternalLink className="h-3 w-3" />
        View Campaign
      </a>

      {status === "PENDING_REVIEW" && (
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={loading}
            onClick={() => handleAction("APPROVED")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => setShowReject(!showReject)}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Reject
          </Button>
        </div>
      )}

      {status === "APPROVED" && (
        <Button
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => handleAction("SUSPENDED")}
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <Ban className="mr-1 h-3.5 w-3.5" />
          Suspend
        </Button>
      )}

      {status === "REJECTED" && (
        <Button
          size="sm"
          disabled={loading}
          onClick={() => handleAction("APPROVED")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Approve
        </Button>
      )}

      {status === "SUSPENDED" && (
        <Button
          size="sm"
          disabled={loading}
          onClick={() => handleAction("APPROVED")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="mr-1 h-3.5 w-3.5" />
          Reactivate
        </Button>
      )}

      {showReject && (
        <div className="flex gap-2 mt-1">
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for rejection"
            className="text-sm"
          />
          <Button
            size="sm"
            disabled={loading || !reason}
            onClick={() => handleAction("REJECTED", reason)}
            className="bg-red-600 hover:bg-red-700 text-white shrink-0"
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
}
