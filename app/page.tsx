import { Skiper40 } from "@/components/ui/skiper-ui/skiper40";
import { HeroText } from "@/components/ui/skiper-ui/hero-text";
import dynamic from "next/dynamic";

const Skiper31 = dynamic(() => import("@/components/ui/skiper-ui/skiper31").then(mod => mod.Skiper31), { ssr: false });
import { StickyCards } from "@/components/ui/skiper-ui/sticky-cards";
import { ScrollingSpecs } from "@/components/ui/skiper-ui/scrolling-specs";
import { AnimatedPrice } from "@/components/ui/skiper-ui/animated-price";
import { CreditsContext } from "@/components/ui/skiper-ui/credits-section";
import { FooterBasic } from "@/components/ui/skiper-ui/footer-basic";
import { BotDisplay } from "@/components/ui/skiper-ui/bot-display";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative min-h-[300vh] w-full bg-background font-sans text-foreground overflow-hidden">
        <Skiper40 />
        <Skiper31 />
        <HeroText />

        <div id="about">
          <StickyCards />
          <ScrollingSpecs />
        </div>

        <div id="price">
          <AnimatedPrice />
        </div>

        <div id="specs">

          <BotDisplay />
        </div>

        <div id="credits">
          <CreditsContext />
        </div>

        <FooterBasic />
      </div>
    </ReactLenis>
  );
}
