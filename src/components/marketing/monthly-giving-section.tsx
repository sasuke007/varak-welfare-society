"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, FileText, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const presets = [
  { amount: 500, impact: "Provides medicines for 1 week", daily: "~Rs 17/day" },
  { amount: 1000, impact: "Funds 1 chemo session support", daily: "~Rs 33/day" },
  { amount: 2500, impact: "Covers a diagnostic test", daily: "~Rs 83/day" },
  { amount: 5000, impact: "Supports a month of treatment", daily: "~Rs 167/day" },
];

const trustBadges = [
  { icon: X, text: "Cancel Anytime", actualIcon: "x" },
  { icon: Shield, text: "80G Tax Benefits" },
  { icon: FileText, text: "Monthly Reports" },
];

export function MonthlyGivingSection() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="relative py-20 bg-varak-cream overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="ambient-orb absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-varak-gold/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Emotional copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-semibold text-varak-gold uppercase tracking-[0.2em] mb-3">
              Monthly Giving
            </span>
            <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-5">
              As little as{" "}
              <span className="ribbon-gradient-text">Rs 17/day</span>
              <br />
              can save a life
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Cancer treatment doesn&apos;t stop after one donation. Monthly giving ensures
              continuous support for patients throughout their treatment journey.
              Be the steady hand that holds them through every chemo cycle.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-varak-pink flex-shrink-0" />
              <span>Join <strong className="text-foreground">2,400+</strong> monthly donors already making a difference</span>
            </div>
          </motion.div>

          {/* Right — Amount selector */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-border/40 p-6 md:p-8"
          >
            <h3 className="font-semibold text-lg mb-5">Choose your monthly amount</h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {presets.map((preset, i) => (
                <button
                  key={preset.amount}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "relative p-4 border text-left transition-all duration-200",
                    selected === i
                      ? "border-varak-primary bg-varak-primary/5 shadow-[0_0_0_1px_var(--color-varak-primary)]"
                      : "border-border/60 hover:border-varak-primary/30 bg-white"
                  )}
                >
                  <div className="text-xl font-heading text-foreground mb-0.5">
                    Rs {preset.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{preset.daily}</div>
                  <div className="text-xs text-varak-primary font-medium mt-1.5">{preset.impact}</div>
                  {selected === i && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-varak-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-varak-primary hover:bg-varak-primary-dark text-white rounded-none h-12 text-base shadow-[0_8px_30px_rgba(194,85,58,0.25)]"
            >
              <Link href="/monthly-giving">
                Start Monthly Giving
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-5 pt-5 border-t border-border/40">
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {badge.actualIcon === "x" ? (
                    <X className="h-3.5 w-3.5 text-muted-foreground/60" />
                  ) : (
                    <badge.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
