import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  Share2,
  Heart,
  ArrowRight,
  Banknote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how to start a fundraiser or donate on Varak Cancer Welfare Society. Simple 5-step process with 0% platform fee.",
};

const fundraiserSteps = [
  {
    icon: FileText,
    title: "Create Campaign",
    description: "Fill in patient details, cancer type, hospital info, and your fundraising goal. Upload medical documents.",
  },
  {
    icon: CheckCircle,
    title: "Get Verified",
    description: "Our team reviews your documents within 24 hours. 3-tier verification ensures trust for donors.",
  },
  {
    icon: Share2,
    title: "Share & Promote",
    description: "Share your campaign on WhatsApp, Facebook, Instagram. Use our built-in sharing tools for maximum reach.",
  },
  {
    icon: Heart,
    title: "Receive Donations",
    description: "Donors contribute via UPI, cards, net banking. Track donations in real-time on your dashboard.",
  },
  {
    icon: Banknote,
    title: "Withdraw Funds",
    description: "Request withdrawal anytime. Funds are transferred to the hospital or patient account within 24-48 hours.",
  },
];

const donorSteps = [
  {
    step: "1",
    title: "Browse Campaigns",
    description: "Find campaigns by cancer type, location, or urgency.",
  },
  {
    step: "2",
    title: "Choose Amount",
    description: "Pick a preset amount or enter custom. Add optional tip.",
  },
  {
    step: "3",
    title: "Pay Securely",
    description: "Pay via UPI, card, or net banking. 100% secure with Razorpay.",
  },
  {
    step: "4",
    title: "Get Receipt",
    description: "Receive 80G tax receipt via email for tax benefits.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-varak-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-varak-gold uppercase tracking-wider">
            How It Works
          </span>
          <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-6">
            Simple, Transparent, Impactful
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re starting a fundraiser or donating, the process
            is simple and transparent.
          </p>
        </div>
      </section>

      {/* Fundraiser Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-center mb-12">
            For Fundraisers
          </h2>
          <div className="space-y-8">
            {fundraiserSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-varak-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-varak-primary" />
                </div>
                <div>
                  <div className="text-xs text-varak-gold font-semibold mb-1">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-varak-primary hover:bg-varak-primary-dark text-white"
            >
              <Link href="/start-fundraiser">
                Start a Fundraiser
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Donor Steps */}
      <section className="py-16 bg-varak-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-center mb-12">
            For Donors
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donorSteps.map((step) => (
              <div
                key={step.title}
                className="bg-white p-6 rounded-2xl border border-border/50 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-varak-primary text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-varak-primary hover:bg-varak-primary-dark text-white"
            >
              <Link href="/campaigns">
                <Heart className="mr-2 h-4 w-4" />
                Browse Campaigns
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
