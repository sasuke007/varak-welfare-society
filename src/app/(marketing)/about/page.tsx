import type { Metadata } from "next";
import { Heart, Target, Eye, Users, Shield, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Varak Cancer Welfare Society - India's trusted cancer crowdfunding platform dedicated to helping patients get life-saving treatment.",
};

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every decision we make is driven by our commitment to helping cancer patients access life-saving treatment.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Complete transparency in fund usage, campaign verification, and organizational operations.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a community of donors, fundraisers, and organizations united against cancer.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards in verification, fund management, and donor experience.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-varak-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-varak-gold uppercase tracking-wider">
            About Us
          </span>
          <h1 className="font-heading text-4xl md:text-5xl mt-3 mb-6">
            Fighting Cancer, One Fundraiser at a Time
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Varak Cancer Welfare Society is India&apos;s dedicated cancer
            crowdfunding platform, connecting generous donors with patients who
            need life-saving treatment.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl border border-border/50 bg-varak-primary/5">
              <Target className="h-10 w-10 text-varak-primary mb-4" />
              <h2 className="font-heading text-2xl mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To ensure no cancer patient in India is denied treatment due to
                lack of funds. We bridge the gap between those who need help and
                those who want to help, with 0% platform fee.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-border/50 bg-varak-gold/5">
              <Eye className="h-10 w-10 text-varak-gold mb-4" />
              <h2 className="font-heading text-2xl mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every cancer patient has access to the best
                possible treatment, supported by a compassionate community that
                believes every life is worth fighting for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-varak-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-2xl border border-border/50"
              >
                <value.icon className="h-8 w-8 text-varak-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-varak-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5.5M+", label: "Users" },
              { value: "₹100Cr+", label: "Funds Raised" },
              { value: "10,000+", label: "Campaigns" },
              { value: "750+", label: "Districts Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-heading text-varak-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
