import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
