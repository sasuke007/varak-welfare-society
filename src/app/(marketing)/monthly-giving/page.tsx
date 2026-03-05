import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Monthly Giving",
  description: "Become a monthly donor and provide sustained support to cancer patients. Small monthly donations create lasting impact.",
};

const plans = [
  { amount: 500, impact: "Covers medication costs for one patient weekly" },
  { amount: 1000, impact: "Funds a chemotherapy session for one patient" },
  { amount: 2500, impact: "Supports a family's hospital stay and meals" },
  { amount: 5000, impact: "Covers diagnostic tests and follow-up care" },
];

export default function MonthlyGivingPage() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-b from-varak-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-10 w-10 text-varak-gold mx-auto mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl mb-6">
            Monthly Giving Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Small, consistent donations create the biggest impact. Join our
            monthly giving program and become a sustained source of hope for
            cancer patients.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-center mb-10">
            Choose Your Monthly Contribution
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.amount}
                className="p-6 rounded-2xl border border-border/50 hover:border-varak-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl font-heading text-varak-primary mb-2">
                  ₹{plan.amount.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  per month
                </div>
                <p className="text-sm text-foreground/70 mb-6">
                  {plan.impact}
                </p>
                <Button
                  asChild
                  className="w-full bg-varak-primary hover:bg-varak-primary-dark text-white"
                >
                  <Link href="/sign-up">
                    <Heart className="mr-2 h-4 w-4" />
                    Subscribe
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-varak-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border/50">
            <Award className="h-8 w-8 text-varak-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Benefits of Monthly Giving
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Tax deduction under 80G for every monthly donation</li>
                <li>Monthly impact reports showing how your donation helped</li>
                <li>Exclusive donor leaderboard recognition</li>
                <li>Cancel or pause anytime, no commitments</li>
                <li>Be part of a community of dedicated supporters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
