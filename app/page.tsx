import { Hero } from "@/app/components/Hero";
import { Platforms } from "./components/Platforms";
import { Culture } from "./components/Culture";
import { Stats } from "./components/Stats";
import { VisionMission } from "./components/VisionMission";
import { TrustedPartners } from "./components/TrustedPartners";
import { News } from "./components/News";
import { SupportedBy } from "./components/SupportedBy";
import RewardBot from "./reward-Bot/page";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-dark">
      <Hero />
      <Platforms />
      <VisionMission />
      <Culture />
      <Stats />
      <TrustedPartners/>
      <News/>
      <SupportedBy/>
      <RewardBot />
    </main>
  );
}
