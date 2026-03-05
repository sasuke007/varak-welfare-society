import { Hero } from "@/components/marketing/hero";
import { CausesSection } from "@/components/marketing/causes-section";
import { WhySection } from "@/components/marketing/why-section";
import { SuccessStories } from "@/components/marketing/success-stories";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { getCancerTypes } from "@/server/queries/campaigns";

export default async function HomePage() {
  const cancerTypes = await getCancerTypes();

  return (
    <>
      <Hero />
      <CausesSection cancerTypes={cancerTypes} />
      <WhySection />
      <SuccessStories />
      <FAQSection />
      <CTASection />
    </>
  );
}
