"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { processWithdrawal } from "@/server/actions/withdrawal";
import { CheckCircle, XCircle } from "lucide-react";

export function WithdrawalActions({
  withdrawalId,
}: {
  withdrawalId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAction(status: "APPROVED" | "REJECTED") {
    setLoading(true);
    try {
      await processWithdrawal(withdrawalId, status);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2 shrink-0">
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
        onClick={() => handleAction("REJECTED")}
        className="border-red-300 text-red-600 hover:bg-red-50"
      >
        <XCircle className="mr-1 h-3.5 w-3.5" />
        Reject
      </Button>
    </div>
  );
}
