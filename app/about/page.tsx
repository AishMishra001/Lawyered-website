// app/about/page.tsx

import { AboutHero } from "@/app/components/AboutHero";
import { AboutIntro } from "@/app/components/AboutIntro";
import { CoreTeam } from "@/app/components/CoreTeam";
import { RevolutionSection } from "@/app/components/RevolutionSection";
import { AdvisorsSlider } from "../components/AdvisorSlider";
import { ValuesPromiseTabs } from "../components/ValuesPromiseTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Lawyered – Legal-Tech for Mobility",
  description:
    "Learn about Lawyered's mission, team, and legal-tech platforms enabling seamless mobility across India.",
  alternates: { canonical: "/about" },
};

export default function AboutUsPage() {
  return (
    <div className="">
      <AboutHero />
      <AboutIntro />
      <ValuesPromiseTabs />
      <RevolutionSection />
      <CoreTeam />
      <AdvisorsSlider />
    </div>
  );
}
