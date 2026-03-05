"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const badges = [
  { icon: Shield, text: "100% Confidential" },
  { icon: Clock, text: "Response within 2 hours" },
  { icon: HeartHandshake, text: "No obligation, ever" },
];

export function ExpertContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-semibold text-varak-gold uppercase tracking-[0.2em] mb-3">
              Not Ready Yet?
            </span>
            <h2 className="font-heading text-3xl md:text-[2.75rem] leading-tight tracking-tight mb-4">
              Talk to a{" "}
              <span className="text-gradient-primary">
                Fundraising Expert
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our team has helped 10,000+ families navigate medical fundraising.
              Whether you&apos;re unsure where to start, worried about the
              process, or just want someone to talk to &mdash; we&apos;re here.
            </p>
            <div className="flex flex-col gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-none bg-varak-primary/8 flex items-center justify-center flex-shrink-0">
                    <badge.icon className="h-4 w-4 text-varak-primary" />
                  </div>
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-varak-cream border border-border/40 p-6 md:p-8"
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-varak-teal mx-auto mb-4" />
                <h3 className="font-heading text-xl mb-2">
                  We&apos;ll be in touch soon!
                </h3>
                <p className="text-muted-foreground text-sm">
                  A fundraising expert will call you within 2 hours during
                  business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="expert-name" className="text-sm font-medium mb-1.5 block">
                    Your Name
                  </Label>
                  <Input
                    id="expert-name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-none h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="expert-phone" className="text-sm font-medium mb-1.5 block">
                    Phone Number
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-input bg-muted text-muted-foreground text-sm rounded-none">
                      +91
                    </span>
                    <Input
                      id="expert-phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="rounded-none rounded-l-none h-11"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="expert-desc" className="text-sm font-medium mb-1.5 block">
                    Brief Description
                  </Label>
                  <Textarea
                    id="expert-desc"
                    placeholder="Tell us briefly about the patient's situation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="rounded-none resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-varak-primary hover:bg-varak-primary-dark text-white text-base h-12 rounded-none shadow-[0_8px_30px_rgba(194,85,58,0.25)]"
                >
                  Get Free Guidance
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
