"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does Varak ensure 0% platform fee?",
    answer:
      "Varak is a non-profit initiative. We sustain operations through voluntary tips from donors and corporate partnerships. Every rupee donated goes directly to the campaign beneficiary.",
  },
  {
    question: "How are campaigns verified?",
    answer:
      "Every campaign goes through a 3-tier verification process: (1) Our team reviews documents, (2) Admin verification of medical records, (3) Hospital verification of the patient and treatment plan. Only fully verified campaigns get the 'Verified' badge.",
  },
  {
    question: "How quickly are funds transferred?",
    answer:
      "Once a withdrawal is requested and approved, funds are transferred directly to the hospital or patient's bank account within 24-48 business hours.",
  },
  {
    question: "Can I get tax benefits for my donation?",
    answer:
      "Yes! Donations made through Varak are eligible for tax deduction under Section 80G of the Income Tax Act. You'll receive a donation receipt with all necessary details for claiming the deduction.",
  },
  {
    question: "What cancer types do you support?",
    answer:
      "We support fundraising for 24+ cancer types including Breast Cancer, Blood Cancer, Lung Cancer, Brain Cancer, and many more. Each represented by its unique awareness ribbon color.",
  },
  {
    question: "How do I start a fundraiser?",
    answer:
      "Starting a fundraiser takes just 5 minutes. Click 'Start a Fundraiser', fill in the patient details, upload medical documents, set your goal amount, and share your story. Our team will review and approve your campaign within 24 hours.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 bg-varak-cream overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="ambient-orb absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-varak-warm-wash/8 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-varak-pink uppercase tracking-[0.2em] mb-3">
            Questions?
          </span>
          <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight">
            Frequently Asked{" "}
            <span className="text-gradient-primary">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "rounded-none overflow-hidden transition-all duration-300",
                openIndex === i
                  ? "bg-white border border-varak-primary/10 shadow-[0_4px_20px_rgba(194,85,58,0.06)]"
                  : "bg-white/60 border border-border/40 hover:bg-white hover:border-border/60"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className={cn(
                  "font-medium pr-4 transition-colors",
                  openIndex === i ? "text-varak-primary" : "text-foreground"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  openIndex === i ? "bg-varak-primary/10 rotate-180" : "bg-muted"
                )}>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-colors",
                    openIndex === i ? "text-varak-primary" : "text-muted-foreground"
                  )} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
