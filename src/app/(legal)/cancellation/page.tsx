import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cancellation Policy" };

export default function CancellationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="font-heading text-4xl mb-8">Cancellation Policy</h1>
      <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground">
        <p>Last updated: March 2026</p>
        <h2 className="font-heading text-xl text-foreground">Campaign Cancellation</h2>
        <p>Campaign creators may request cancellation at any time. If donations have been received, they will be refunded to donors within 7-10 business days.</p>
        <h2 className="font-heading text-xl text-foreground">Subscription Cancellation</h2>
        <p>Monthly giving subscriptions can be cancelled at any time from your dashboard. No further charges will be made after cancellation.</p>
      </div>
    </div>
  );
}
