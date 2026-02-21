"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const HeroText = () => {
     const targetRef = useRef<HTMLDivElement | null>(null);
     const { scrollYProgress } = useScroll({
          target: targetRef,
          offset: ["start start", "end start"],
     });

     const yMotionValue = useTransform(scrollYProgress, [0, 1], [150, -50]);
     const opacityValue = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
     const blurValue = useTransform(scrollYProgress, [0, 0.7, 1], ["blur(0px)", "blur(0px)", "blur(12px)"]);
     const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;

     return (
          <div ref={targetRef} className="relative z-0 h-[120vh] w-full bg-background text-foreground">
               <div className="absolute left-1/2 top-[10%] z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-foreground">
                    <span className="relative max-w-[15ch] text-sm md:text-base uppercase leading-tight opacity-60 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:from-foreground after:to-transparent after:content-['']">
                         scroll down to see
                    </span>
               </div>
               <div
                    className="sticky top-0 mx-auto flex h-screen items-center justify-center bg-transparent py-20"
                    style={{
                         transformStyle: "preserve-3d",
                         perspective: "200px",
                    }}
               >
                    <motion.div
                         style={{
                              transformStyle: "preserve-3d",
                              transform,
                              opacity: opacityValue,
                              filter: blurValue
                         }}
                         className="font-geist relative w-full max-w-4xl px-4 text-center text-xl sm:text-2xl font-semibold leading-relaxed sm:leading-snug tracking-tight text-foreground/90 md:text-4xl lg:text-5xl"
                    >
                         KOMEQ continuously senses every move, reading angles, motion, and gravity in real- time.
                         < br />
                         <br />
                         Powered by an Arduino Nano, it transforms data into immediate action. Gyroscopes spin, accelerometers feel, and logic calculates.
                         <br />
                         <br />
                         Before imbalance becomes failure, it reacts. This is feedback talking to control, answering back at the speed of thought.

                         <div className="pointer-events-none absolute bottom-[-10%] left-0 h-[60vh] w-full bg-linear-to-b from-transparent to-background" />
                    </motion.div>
               </div>
          </div >
     );
};
