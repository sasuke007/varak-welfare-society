import type { Metadata } from "next";
import { FAQSection } from "@/components/marketing/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Varak Cancer Welfare Society, fundraising, donations, and tax benefits.",
};

export default function FAQPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-b from-varak-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about fundraising and donating on Varak.
          </p>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
