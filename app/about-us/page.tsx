// app/about-us/page.tsx

import { AboutHero } from "@/app/components/AboutHero";
import { AboutIntro } from "@/app/components/AboutIntro";
import { CoreTeam } from "@/app/components/CoreTeam";
import { RevolutionSection } from "@/app/components/RevolutionSection";
import { AdvisorsSlider } from "../components/AdvisorSlider";
import { ValuesPromiseTabs } from "../components/ValuesPromiseTab";

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
