"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Clock,
  BadgeCheck,
  CreditCard,
  Users,
  FileText,
  Share2,
  IndianRupee,
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: FileText,
    color: "#C2553A",
    title: "Create",
    description: "Share your story and medical details in 5 minutes",
  },
  {
    num: 2,
    icon: Share2,
    color: "#D4A843",
    title: "Share",
    description: "Spread across WhatsApp, social media & your network",
  },
  {
    num: 3,
    icon: IndianRupee,
    color: "#2E9E9E",
    title: "Receive",
    description: "Funds transferred to hospital within 24-48 hours",
  },
];

const reasons = [
  {
    icon: CreditCard,
    title: "0% Platform Fee",
    description:
      "Every rupee goes directly to the patient. We sustain through voluntary tips and partnerships.",
    ribbon: "#C2553A",
  },
  {
    icon: Shield,
    title: "Verified Campaigns",
    description:
      "3-tier verification: team review, admin audit, and hospital confirmation.",
    ribbon: "#E8618C",
  },
  {
    icon: Clock,
    title: "Quick Disbursals",
    description:
      "Funds transferred to hospitals within 24-48 hours of approval.",
    ribbon: "#D4A843",
  },
  {
    icon: BadgeCheck,
    title: "Tax Benefits",
    description:
      "All donations qualify for deduction under Section 80G.",
    ribbon: "#2E9E9E",
  },
  {
    icon: Heart,
    title: "Cancer Focused",
    description:
      "Specialized in 24+ cancer types across 750+ districts in India.",
    ribbon: "#E87040",
  },
  {
    icon: Users,
    title: "5.5M+ Community",
    description:
      "Join donors, fundraisers, and NGOs united against cancer.",
    ribbon: "#6B8DB2",
  },
];

export function WhySection() {
  return (
    <section className="relative py-24 bg-varak-cream overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Ambient orbs */}
      <div className="ambient-orb absolute -top-20 right-0 w-[400px] h-[400px] bg-gradient-to-br from-varak-warm-wash/10 to-transparent" />
      <div className="ambient-orb absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-varak-pink/6 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* How It Works Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="inline-block text-xs font-semibold text-varak-orange uppercase tracking-[0.2em] mb-3">
            How It Works
          </span>
          <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-4">
            Three Simple{" "}
            <span className="text-gradient-primary">Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 relative">
          {/* Dashed connecting line on desktop */}
          <div className="hidden md:block absolute top-[3.25rem] left-[16.67%] right-[16.67%] border-t-2 border-dashed border-border/40 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative bg-white border border-border/40 p-6 hover-lift text-center z-10"
            >
              {/* Step number badge */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-4"
                style={{ backgroundColor: step.color }}
              >
                {step.num}
              </div>
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-4 shadow-sm"
                style={{ backgroundColor: step.color }}
              >
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div className="section-divider mb-16" />

        {/* Why Choose Varak Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-block text-xs font-semibold text-varak-pink uppercase tracking-[0.2em] mb-3">
            Why Choose Varak
          </span>
          <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-4">
            Built on Trust,{" "}
            <span className="text-gradient-primary">Driven by Compassion</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every feature designed for maximum impact — complete transparency for
            donors, zero barriers for patients.
          </p>
        </motion.div>

        {/* Cards with ribbon accent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-none border border-border/40 bg-white p-7 hover-lift overflow-hidden"
            >
              {/* Ribbon accent bar on left */}
              <div
                className="absolute top-0 left-0 w-[3px] h-full rounded-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: reason.ribbon }}
              />

              <div className="relative z-10">
                <div
                  className="w-11 h-11 rounded-none flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: reason.ribbon }}
                >
                  <reason.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
