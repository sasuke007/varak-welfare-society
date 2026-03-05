"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Full-width ribbon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9A3F2E] via-[#C2553A] to-[#D47A6A]" />

      {/* Grain texture */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Ambient color orbs from ribbon colors */}
      <div className="ambient-orb absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-[#E8618C]/20 to-transparent" />
      <div className="ambient-orb absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#D4A843]/15 to-transparent" />
      <div className="ambient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-[#2E9E9E]/10 to-transparent" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 1px 1px, #fff 0.5px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Ribbon icon */}
          <div className="mb-8">
            <svg viewBox="0 0 60 80" className="w-12 h-16 mx-auto" fill="none">
              <path
                d="M30 38 C22 26 12 22 15 12 C16.5 7 22 9 30 18 C38 9 43.5 7 45 12 C48 22 38 26 30 38Z"
                fill="white"
                opacity="0.3"
              />
              <path
                d="M30 38 C27 46 22 62 20 72 M30 38 C33 46 38 62 40 72"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.2"
              />
            </svg>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl text-white mb-5 tracking-tight">
            Your Contribution{" "}
            <span className="italic text-varak-warm-wash">Can Save a Life</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Every donation, no matter how small, brings hope to a cancer
            patient fighting for their life. Every ribbon color represents a battle —
            stand with them today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-varak-primary hover:bg-white/90 text-base px-8 h-13 rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            >
              <Link href="/campaigns">
                <Heart className="mr-2 h-4 w-4" />
                Donate Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-base px-8 h-13 rounded-none"
            >
              <Link href="/start-fundraiser">
                Start a Fundraiser
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Ribbon colors strip */}
          <div className="flex justify-center gap-1.5 mt-10">
            {["#E8618C", "#6B4C8A", "#D4A843", "#2E9E9E", "#E87040", "#6B8DB2", "#808080", "#8B0000", "#48BB78"].map(
              (color) => (
                <div
                  key={color}
                  className="w-3 h-3 rounded-none opacity-40"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
