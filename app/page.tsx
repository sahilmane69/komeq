import { Skiper40 } from "@/components/ui/skiper-ui/skiper40";
import { HeroText } from "@/components/ui/skiper-ui/hero-text";
import { Skiper31 } from "@/components/ui/skiper-ui/skiper31-client";
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

        <HeroText />
        <Skiper31 />

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
