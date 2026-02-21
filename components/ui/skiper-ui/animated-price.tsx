"use client";

import NumberFlow from "@number-flow/react";
import { animate, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function AnimatedPrice() {
     const [displayValue, setDisplayValue] = useState(0);
     const count = useMotionValue(0);
     const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

     useEffect(() => {
          if (inView) {
               const controls = animate(count, 5.8, {
                    duration: 2,
                    ease: "easeOut",
                    onUpdate: (latest) => setDisplayValue(Number(latest.toFixed(1))),
               });
               return () => controls.stop();
          } else {
               requestAnimationFrame(() => {
                    setDisplayValue(0);
                    count.set(0);
               });
          }
     }, [inView, count]);

     return (
          <div className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-transparent text-foreground z-20">
               <div className="absolute top-[20%] left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-foreground">
                    <span className="relative max-w-[15ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:from-foreground after:to-transparent after:content-['']">
                         unbeatable value
                    </span>
               </div>
               <div ref={ref} className="font-geist text-[20vw] font-bold tracking-tighter md:text-[15vw] flex items-center text-foreground">
                    <NumberFlow
                         value={displayValue}
                         format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
                         prefix="₹"
                         suffix="K"
                    />
               </div>
          </div>
     );
}
