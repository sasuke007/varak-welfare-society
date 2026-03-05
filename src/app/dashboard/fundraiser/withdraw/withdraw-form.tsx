"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { requestWithdrawal } from "@/server/actions/withdrawal";

export function WithdrawRequestForm({
  campaigns,
}: {
  campaigns: { id: string; title: string; balance: number }[];
}) {
  const router = useRouter();
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountName, setAccountName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selected = campaigns.find((c) => c.id === campaignId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!campaignId || !amount || !bankAccount || !ifsc || !accountName) {
      setError("Please fill in all required fields");
      return;
    }

    const numAmount = parseInt(amount);
    if (numAmount < 500) {
      setError("Minimum withdrawal is ₹500");
      return;
    }

    setLoading(true);
    try {
      await requestWithdrawal({
        campaignId,
        amount: numAmount,
        bankAccountNumber: bankAccount,
        bankIfsc: ifsc,
        bankAccountName: accountName,
        note: note || undefined,
      });
      setSuccess("Withdrawal request submitted! It will be processed within 3-5 business days.");
      setCampaignId("");
      setAmount("");
      setBankAccount("");
      setIfsc("");
      setAccountName("");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-none p-5 border border-border/50 space-y-4"
    >
      <div>
        <Label>Campaign *</Label>
        <select
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="w-full mt-1 rounded-none border border-border p-2 text-sm"
        >
          <option value="">Select campaign</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({formatCurrency(c.balance)} raised)
            </option>
          ))}
        </select>
        {selected && (
          <p className="text-xs text-muted-foreground mt-1">
            Available balance: {formatCurrency(selected.balance)}
          </p>
        )}
      </div>

      <div>
        <Label>Amount (₹) *</Label>
        <Input
          type="number"
          min={500}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Min ₹500"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Bank Account Number *</Label>
        <Input
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          placeholder="Account number"
          className="mt-1"
        />
      </div>

      <div>
        <Label>IFSC Code *</Label>
        <Input
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value.toUpperCase())}
          placeholder="e.g., SBIN0001234"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Account Holder Name *</Label>
        <Input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Name as on bank account"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Note (optional)</Label>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Any additional info"
          className="mt-1"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-varak-primary hover:bg-varak-primary-dark text-white"
      >
        {loading ? "Submitting..." : "Request Withdrawal"}
      </Button>
    </form>
  );
}
