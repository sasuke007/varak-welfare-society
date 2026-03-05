"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function FundingCalculator() {
  const [treatmentCost, setTreatmentCost] = useState(500000); // 5L default

  const insurance = Math.round(treatmentCost * 0.3);
  const savings = Math.round(treatmentCost * 0.2);
  const gap = treatmentCost - insurance - savings;

  const insurancePct = 30;
  const savingsPct = 20;
  const gapPct = 50;

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="ambient-orb absolute -top-20 right-0 w-[400px] h-[400px] bg-gradient-to-br from-varak-teal/6 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-semibold text-varak-teal uppercase tracking-[0.2em] mb-3">
              The Funding Gap
            </span>
            <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-4">
              How Crowdfunding{" "}
              <span className="text-gradient-primary">Fills the Gap</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Insurance and savings rarely cover the full cost of cancer
              treatment. Crowdfunding bridges the gap between what you have and
              what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-varak-primary hover:bg-varak-primary-dark text-white text-base px-8 h-12 rounded-none shadow-[0_8px_30px_rgba(194,85,58,0.25)]"
              >
                <Link href="/start-fundraiser">
                  Start a Fundraiser
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:bg-foreground/5 text-base px-8 h-12 rounded-none"
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Our Team
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right — Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-varak-cream border border-border/40 p-6 md:p-8"
          >
            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-sm font-semibold text-foreground">
                  Treatment Cost
                </label>
                <span className="font-heading text-2xl text-foreground tracking-tight">
                  {formatCurrency(treatmentCost)}
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={2500000}
                step={50000}
                value={treatmentCost}
                onChange={(e) => setTreatmentCost(Number(e.target.value))}
                className="funding-range w-full h-2 appearance-none cursor-pointer bg-border/50 outline-none"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                <span>&#8377;1L</span>
                <span>&#8377;25L</span>
              </div>
            </div>

            {/* Stacked bar */}
            <div className="mb-6">
              <div className="h-10 flex overflow-hidden">
                <motion.div
                  className="h-full flex items-center justify-center text-white text-[11px] font-semibold"
                  style={{ backgroundColor: "#2E9E9E" }}
                  animate={{ width: `${insurancePct}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Insurance
                </motion.div>
                <motion.div
                  className="h-full flex items-center justify-center text-white text-[11px] font-semibold"
                  style={{ backgroundColor: "#D4A843" }}
                  animate={{ width: `${savingsPct}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Savings
                </motion.div>
                <motion.div
                  className="h-full flex items-center justify-center text-white text-[11px] font-semibold"
                  style={{ backgroundColor: "#C2553A" }}
                  animate={{ width: `${gapPct}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Gap
                </motion.div>
              </div>
              {/* Legend */}
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: "#2E9E9E" }} />
                  Insurance (~30%)
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: "#D4A843" }} />
                  Savings (~20%)
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: "#C2553A" }} />
                  Gap (~50%)
                </div>
              </div>
            </div>

            {/* Gap amount */}
            <div className="border border-varak-primary/20 bg-varak-primary/5 p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">
                This is what crowdfunding covers
              </p>
              <p className="font-heading text-2xl md:text-3xl text-varak-primary tracking-tight">
                {formatCurrency(gap)}
              </p>
            </div>

            {/* Stats line */}
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Average Varak campaign raises this in{" "}
              <strong className="text-foreground">18 days</strong> with{" "}
              <strong className="text-foreground">200+ donors</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
