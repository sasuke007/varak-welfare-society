"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "@/server/actions/user";

const ROLES = ["DONOR", "FUNDRAISER", "NGO_ADMIN", "ADMIN", "SUPER_ADMIN"] as const;

export function RoleSelector({
  userId,
  currentRole,
  isCurrentUser,
  canAssignAdmin,
}: {
  userId: string;
  currentRole: string;
  isCurrentUser: boolean;
  canAssignAdmin: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value as (typeof ROLES)[number];
    if (newRole === currentRole) return;

    setLoading(true);
    try {
      await updateUserRole(userId, newRole);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update role");
      e.target.value = currentRole;
    } finally {
      setLoading(false);
    }
  }

  if (isCurrentUser) {
    return (
      <span className="text-xs text-muted-foreground italic">
        {currentRole} (you)
      </span>
    );
  }

  return (
    <select
      defaultValue={currentRole}
      onChange={handleChange}
      disabled={loading}
      className="text-xs rounded-none border border-border p-1.5 bg-white disabled:opacity-50"
    >
      {ROLES.filter(
        (role) =>
          canAssignAdmin || !["ADMIN", "SUPER_ADMIN"].includes(role)
      ).map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}
