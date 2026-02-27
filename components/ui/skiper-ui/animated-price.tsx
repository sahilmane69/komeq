"use client";

import NumberFlow from "@number-flow/react";
import { animate, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function AnimatedPrice() {
     const [displayValueInvested, setDisplayValueInvested] = useState(0);
     const [displayValueReal, setDisplayValueReal] = useState(0);
     const countInvested = useMotionValue(0);
     const countReal = useMotionValue(0);
     const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

     useEffect(() => {
          if (inView) {
               const controlsInvested = animate(countInvested, 5.8, {
                    duration: 2,
                    ease: "easeOut",
                    onUpdate: (latest) => setDisplayValueInvested(Number(latest.toFixed(1))),
               });
               const controlsReal = animate(countReal, 3.5, {
                    duration: 2,
                    ease: "easeOut",
                    onUpdate: (latest) => setDisplayValueReal(Number(latest.toFixed(1))),
               });
               return () => {
                    controlsInvested.stop();
                    controlsReal.stop();
               };
          } else {
               requestAnimationFrame(() => {
                    setDisplayValueInvested(0);
                    countInvested.set(0);
                    setDisplayValueReal(0);
                    countReal.set(0);
               });
          }
     }, [inView, countInvested, countReal]);

     return (
          <div className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-transparent text-foreground z-20">
               <div className="absolute top-[20%] left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-foreground">
                    <span className="relative max-w-[20ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:from-foreground after:to-transparent after:content-['']">
                         Investment vs Return
                    </span>
               </div>
               <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 w-full pt-10">

                    {/* Real Value */}
                    <div className="flex flex-col items-center">
                         <div className="font-geist text-[15vw] font-bold tracking-tighter md:text-[8vw] flex items-center text-black dark:text-white transition-colors">
                              <NumberFlow
                                   value={displayValueReal}
                                   format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                                   prefix="₹"
                                   suffix="K"
                              />
                         </div>
                         <span className="text-sm md:text-base font-medium tracking-widest uppercase text-black/50 dark:text-white/50 mt-2 transition-colors">
                              Real Value
                         </span>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-24 bg-black/10 dark:bg-white/10 relative transition-colors">
                         <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-linear-to-b from-transparent via-[#ff3333]/50 to-transparent blur-[2px]" />
                    </div>

                    {/* Value Invested */}
                    <div className="flex flex-col items-center">
                         <div className="font-geist text-[15vw] font-bold tracking-tighter md:text-[8vw] flex items-center text-[#ff3333]">
                              <NumberFlow
                                   value={displayValueInvested}
                                   format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                                   prefix="₹"
                                   suffix="K"
                              />
                         </div>
                         <span className="text-sm md:text-base font-medium tracking-widest uppercase text-[#ff3333]/70 mt-2">
                              Value Invested
                         </span>
                    </div>

               </div>
          </div>
     );
}
