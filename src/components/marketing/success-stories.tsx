"use client";

import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

const stories = [
  {
    name: "Priya's Family",
    cancer: "Leukemia",
    ribbonColor: "#E87040",
    quote:
      "Thanks to Varak, we raised ₹12 lakhs in just 3 weeks for Priya's bone marrow transplant. She's now cancer-free and back in school.",
    raised: "₹12,00,000",
    donors: 847,
    initials: "PF",
  },
  {
    name: "Rajesh Sharma",
    cancer: "Lung Cancer",
    ribbonColor: "#F5F5F5",
    quote:
      "When I was diagnosed, I thought it was the end. Varak's community helped me raise funds for my treatment. Today, I'm in remission.",
    raised: "₹8,50,000",
    donors: 523,
    initials: "RS",
  },
  {
    name: "Anjali's Parents",
    cancer: "Brain Tumor",
    ribbonColor: "#808080",
    quote:
      "Our daughter needed urgent surgery. Within 2 weeks, 500+ donors helped us reach our goal. We'll forever be grateful.",
    raised: "₹15,00,000",
    donors: 1203,
    initials: "AP",
  },
];

export function SuccessStories() {
  return (
    <section id="success-stories" className="relative py-24 bg-white overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="ambient-orb absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-t from-varak-primary/4 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-semibold text-varak-pink uppercase tracking-[0.2em] mb-3">
            Real Impact
          </span>
          <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-4">
            Stories of{" "}
            <span className="ribbon-gradient-text">Hope & Healing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real people, real stories. See how generosity transforms lives every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-white rounded-none border border-border/40 p-7 hover-lift overflow-hidden"
            >
              {/* Ribbon color accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: story.ribbonColor }}
              />

              <div className="absolute top-6 right-6 opacity-[0.04]">
                <Quote className="h-16 w-16" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-none flex items-center justify-center shadow-sm ring-2 ring-white"
                    style={{ backgroundColor: story.ribbonColor }}
                  >
                    <span className="text-xs font-bold text-white" style={{
                      color: story.ribbonColor === "#F5F5F5" ? "#333" : "white"
                    }}>
                      {story.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{story.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <div
                        className="w-2 h-2 rounded-none"
                        style={{ backgroundColor: story.ribbonColor }}
                      />
                      {story.cancer}
                    </div>
                  </div>
                </div>

                <p className="text-foreground/75 text-[15px] leading-relaxed mb-6">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-5 border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-varak-primary" />
                    <span className="text-sm font-semibold text-varak-primary">
                      {story.raised}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border/60" />
                  <span className="text-xs text-muted-foreground">
                    {story.donors.toLocaleString()} donors
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
