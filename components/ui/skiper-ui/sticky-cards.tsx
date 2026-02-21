"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface CardData {
     id: number | string;
     image: string;
     alt?: string;
}

interface StickyCard002Props {
     cards: CardData[];
     className?: string;
     containerClassName?: string;
     imageClassName?: string;
}

const StickyCard002 = ({
     cards,
     className,
     containerClassName,
     imageClassName,
}: StickyCard002Props) => {
     const container = useRef(null);
     const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

     useGSAP(
          () => {
               gsap.registerPlugin(ScrollTrigger);

               const imageElements = imageRefs.current;
               const totalCards = imageElements.length;

               if (!imageElements[0]) return;

               gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

               for (let i = 1; i < totalCards; i++) {
                    if (!imageElements[i]) continue;
                    gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
               }

               const scrollTimeline = gsap.timeline({
                    scrollTrigger: {
                         trigger: ".sticky-cards",
                         start: "center center",
                         end: `+=${window.innerHeight * (totalCards - 1)}`,
                         pin: true,
                         scrub: 0.5,
                         pinSpacing: true,
                    },
               });

               for (let i = 0; i < totalCards - 1; i++) {
                    const currentImage = imageElements[i];
                    const nextImage = imageElements[i + 1];
                    const position = i;
                    if (!currentImage || !nextImage) continue;

                    scrollTimeline.to(
                         currentImage,
                         {
                              scale: 0.7,
                              rotation: 5,
                              duration: 1,
                              ease: "none",
                         },
                         position,
                    );

                    scrollTimeline.to(
                         nextImage,
                         {
                              y: "0%",
                              duration: 1,
                              ease: "none",
                         },
                         position,
                    );
               }

               const resizeObserver = new ResizeObserver(() => {
                    ScrollTrigger.refresh();
               });

               if (container.current) {
                    resizeObserver.observe(container.current);
               }

               return () => {
                    resizeObserver.disconnect();
                    scrollTimeline.kill();
                    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
               };
          },
          { scope: container },
     );

     return (
          <div className={cn("relative h-full w-full", className)} ref={container}>
               <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
                    <div
                         className={cn(
                              "relative w-[90vw] max-w-5xl aspect-4/3 md:aspect-video overflow-hidden rounded-3xl shadow-2xl",
                              containerClassName,
                         )}
                    >
                         {cards.map((card, i) => (
                              <img
                                   key={card.id}
                                   src={card.image}
                                   alt={card.alt || ""}
                                   className={cn(
                                        "absolute top-0 left-0 h-full w-full object-cover rounded-3xl",
                                        imageClassName,
                                   )}
                                   ref={(el) => {
                                        imageRefs.current[i] = el;
                                   }}
                              />
                         ))}
                    </div>
               </div>
          </div>
     );
};

export const StickyCards = () => {
     return (
          <div className="relative z-10 w-full -mt-[20vh]">
               <div className="pointer-events-none h-[10vh] w-full bg-linear-to-b from-transparent to-background" />

               <div className="bg-transparent pb-0 pt-0">
                    <StickyCard002
                         cards={[
                              { id: 1, image: "/komeqimg/image copy.png" },
                              { id: 2, image: "/komeqimg/image copy 2.png" },
                              { id: 3, image: "/komeqimg/image copy 3.png" },
                              { id: 4, image: "/komeqimg/image copy 4.png" },
                              { id: 5, image: "/komeqimg/image copy 5.png" },
                              { id: 6, image: "/komeqimg/image copy 6.png" },
                              { id: 7, image: "/komeqimg/image.png" },
                         ]}
                    />
               </div>
          </div>
     );
};
