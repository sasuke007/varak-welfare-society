"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CancerType } from "@/types";

const ribbonColorMap: Record<string, string> = {
  "Breast": "#E8618C",
  "Blood": "#E53E3E",
  "Lung": "#F5F5F5",
  "Brain": "#808080",
  "Bone": "#D4A843",
  "Liver": "#48BB78",
  "Stomach": "#9F7AEA",
  "Skin": "#1A202C",
  "Kidney": "#E87040",
  "Prostate": "#6B8DB2",
  "Ovarian": "#2E9E9E",
  "Pancreatic": "#6B4C8A",
  "Cervical": "#2E9E9E",
  "Colorectal": "#2B4C7E",
  "Thyroid": "#6B4C8A",
  "Bladder": "#D4A843",
  "Leukemia": "#E87040",
  "Lymphoma": "#90EE90",
  "Esophageal": "#9DB4D0",
  "Childhood": "#D4A843",
  "Uterine": "#FFDAB9",
  "Oral": "#8B0000",
  "Myeloma": "#8B0000",
  "Testicular": "#6B4C8A",
};

function getRibbonColor(name: string): string {
  for (const [key, color] of Object.entries(ribbonColorMap)) {
    if (name.includes(key)) return color;
  }
  return "#DAB5AA";
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export function CausesSection({
  cancerTypes,
}: {
  cancerTypes: Pick<CancerType, "id" | "name" | "slug" | "description">[];
}) {
  const featured = cancerTypes.slice(0, 6);
  const remaining = cancerTypes.slice(6);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-semibold text-varak-pink uppercase tracking-[0.2em] mb-3">
              Cancer Awareness Ribbons
            </span>
            <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight">
              Every Color Represents{" "}
              <span className="ribbon-gradient-text">Someone&apos;s Fight</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Each ribbon color tells a story of courage. We support fundraising for all 24+ cancer types across India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/cancer-types"
              className="group inline-flex items-center gap-2 text-sm font-medium text-varak-primary hover:gap-3 transition-all duration-300"
            >
              View all types
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured cancer types — larger cards with descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {featured.map((type, i) => {
            const ribbonColor = getRibbonColor(type.name);
            const light = isLightColor(ribbonColor);
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/campaigns?cancerType=${type.slug}`}
                  className="group relative block p-6 border border-border/60 bg-white hover:shadow-[0_8px_30px_rgba(194,85,58,0.08)] transition-all duration-400 overflow-hidden hover-lift"
                >
                  {/* Left ribbon accent */}
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: ribbonColor }}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ring-2 ring-white"
                      style={{ backgroundColor: ribbonColor }}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                        <path
                          d="M12 15C9 10 6 8 7 4C7.5 2 9 3 12 6C15 3 16.5 2 17 4C18 8 15 10 12 15Z"
                          fill={light ? "#333" : "white"}
                          opacity="0.9"
                        />
                        <path
                          d="M12 15C11 17 9.5 21 9 23M12 15C13 17 14.5 21 15 23"
                          stroke={light ? "#333" : "white"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-varak-primary transition-colors mb-1">
                        {type.name}
                      </h3>
                      {type.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {type.description}
                        </p>
                      )}
                      <span className="inline-block mt-2 text-[11px] font-medium text-varak-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View campaigns &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Remaining types — compact horizontal scroll pills */}
        {remaining.length > 0 && (
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              {remaining.map((type) => {
                const ribbonColor = getRibbonColor(type.name);
                return (
                  <Link
                    key={type.id}
                    href={`/campaigns?cancerType=${type.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-border/40 hover:border-varak-primary/30 transition-colors flex-shrink-0 group"
                  >
                    <div
                      className="w-3 h-3 flex-shrink-0"
                      style={{ backgroundColor: ribbonColor }}
                    />
                    <span className="text-xs font-medium text-foreground/70 group-hover:text-varak-primary transition-colors whitespace-nowrap">
                      {type.name.replace(" Cancer", "").replace(" (Leukemia)", "")}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
