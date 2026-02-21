import { Skiper40 } from "@/components/ui/skiper-ui/skiper40";
import { KomeqHeroText } from "@/components/ui/skiper-ui/komeq-hero-text";
import { KomeqStickyCards } from "@/components/ui/skiper-ui/komeq-sticky-cards";
import { KomeqScrollingSpecs } from "@/components/ui/skiper-ui/komeq-scrolling-specs";
import { KomeqAnimatedPrice } from "@/components/ui/skiper-ui/komeq-animated-price";
import { KomeqCrowdCanvas } from "@/components/ui/skiper-ui/komeq-crowd-canvas";
import { KomeqFooterBasic } from "@/components/ui/skiper-ui/komeq-footer-basic";
import { KomeqScrollLine } from "@/components/ui/skiper-ui/komeq-scroll-line";
import { KomeqBackground } from "@/components/ui/skiper-ui/komeq-background";
import { KomeqBotDisplay } from "@/components/ui/skiper-ui/komeq-bot-display";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative min-h-[300vh] w-full bg-transparent font-sans text-foreground overflow-hidden">
        <KomeqBackground />
        <KomeqScrollLine />
        <Skiper40 />
        <KomeqHeroText />
        <KomeqStickyCards />
        <KomeqBotDisplay />
        <KomeqScrollingSpecs />
        <KomeqAnimatedPrice />
        <KomeqCrowdCanvas />
        <KomeqFooterBasic />
      </div>
    </ReactLenis>
  );
}
