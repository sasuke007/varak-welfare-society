"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { markAllNotificationsRead } from "@/server/actions/notifications";

export function MarkReadButton({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        await markAllNotificationsRead(userId);
        router.refresh();
      }}
    >
      <CheckCheck className="mr-1 h-3.5 w-3.5" />
      Mark all read
    </Button>
  );
}
