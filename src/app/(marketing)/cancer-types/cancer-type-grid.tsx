"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  AlertTriangle,
  TrendingUp,
  Clock,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CancerType } from "@/types";

type CancerDetail = {
  ribbonColor: string;
  ribbonName: string;
  prevalence: string;
  survivalRate: string;
  treatmentCost: string;
  indiaFact: string;
  symptoms: string[];
  emotionalNote: string;
};

function RibbonIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 40 56" width={size} height={size * 1.4} fill="none">
      <path
        d="M20 28 C14 20 8 17 10 10 C11 6 15 7.5 20 14 C25 7.5 29 6 30 10 C32 17 26 20 20 28Z"
        fill={color}
      />
      <path
        d="M20 28 C18 34 14 44 13 51 M20 28 C22 34 26 44 27 51"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export function CancerTypeGrid({
  cancerTypes,
  cancerDetails,
}: {
  cancerTypes: Pick<CancerType, "id" | "name" | "slug" | "description">[];
  cancerDetails: Record<string, CancerDetail>;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedType = cancerTypes.find((t) => t.name === selected);
  const selectedDetail = selected ? cancerDetails[selected] : null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {cancerTypes.map((type, i) => {
          const detail = cancerDetails[type.name];
          const ribbonColor = detail?.ribbonColor || "#DAB5AA";

          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(type.name)}
              className="group relative p-5 rounded-none border border-border/40 bg-white hover:shadow-[0_8px_30px_rgba(194,85,58,0.08)] transition-all duration-300 text-center overflow-hidden cursor-pointer hover-lift text-left"
            >
              {/* Ribbon accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: ribbonColor }}
              />

              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-none flex items-center justify-center mb-3 ring-2 ring-white shadow-sm"
                  style={{ backgroundColor: ribbonColor }}
                >
                  <RibbonIcon
                    color={isLightColor(ribbonColor) ? "#333" : "white"}
                    size={14}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground/75 group-hover:text-varak-primary transition-colors duration-300 leading-tight">
                  {type.name.replace(" Cancer", "").replace(" (Leukemia)", "")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && selectedType && selectedDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-2xl sm:max-h-[85vh] bg-white rounded-none shadow-2xl overflow-y-auto"
            >
              {/* Ribbon color header */}
              <div
                className="h-2 rounded-none"
                style={{ backgroundColor: selectedDetail.ribbonColor }}
              />

              <div className="p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-none bg-muted/80 hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-none flex items-center justify-center shadow-md"
                    style={{ backgroundColor: selectedDetail.ribbonColor }}
                  >
                    <RibbonIcon
                      color={isLightColor(selectedDetail.ribbonColor) ? "#333" : "white"}
                      size={20}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl tracking-tight">
                      {selectedType.name}
                    </h3>
                    <span
                      className="text-sm font-medium"
                      style={{ color: selectedDetail.ribbonColor }}
                    >
                      {selectedDetail.ribbonName}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedType.description}
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="rounded-none bg-varak-cream p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      Prevalence
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedDetail.prevalence}
                    </p>
                  </div>
                  <div className="rounded-none bg-varak-cream p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Heart className="h-3 w-3" />
                      Survival Rate
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedDetail.survivalRate}
                    </p>
                  </div>
                  <div className="rounded-none bg-varak-cream p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      Treatment Cost
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedDetail.treatmentCost}
                    </p>
                  </div>
                </div>

                {/* India Fact */}
                <div
                  className="rounded-none p-4 mb-6 border-l-4"
                  style={{
                    borderColor: selectedDetail.ribbonColor,
                    backgroundColor: `${selectedDetail.ribbonColor}08`,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-1">
                    <AlertTriangle className="h-3 w-3" />
                    India Fact
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {selectedDetail.indiaFact}
                  </p>
                </div>

                {/* Symptoms */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3">Warning Signs</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDetail.symptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-none flex-shrink-0"
                          style={{ backgroundColor: selectedDetail.ribbonColor }}
                        />
                        {symptom}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotional note */}
                <blockquote className="rounded-none bg-varak-cream p-5 mb-6 italic text-foreground/70 text-sm leading-relaxed border-l-3 border-varak-primary/30">
                  &ldquo;{selectedDetail.emotionalNote}&rdquo;
                </blockquote>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button
                    asChild
                    className="flex-1 bg-varak-primary hover:bg-varak-primary-dark text-white rounded-none shadow-md"
                  >
                    <Link href={`/campaigns?cancerType=${selectedType.slug}`}>
                      <Heart className="mr-2 h-4 w-4" />
                      Help {selectedType.name.replace(" Cancer", "").replace(" (Leukemia)", "")} Patients
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-varak-primary/15 text-varak-primary rounded-none"
                  >
                    <Link href="/start-fundraiser">
                      <ArrowRight className="mr-1 h-4 w-4" />
                      Fundraise
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
