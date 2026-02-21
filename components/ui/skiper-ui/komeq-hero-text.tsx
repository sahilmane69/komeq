"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const KomeqHeroText = () => {
     const targetRef = useRef<HTMLDivElement | null>(null);
     const { scrollYProgress } = useScroll({
          target: targetRef,
          offset: ["start start", "end start"]
     });

     const yMotionValue = useTransform(scrollYProgress, [0, 0.7], [487, 0]);
     const opacityValue = useTransform(scrollYProgress, [0.65, 0.9], [1, 0]);
     const blurValue = useTransform(scrollYProgress, [0.65, 0.9], ["blur(0px)", "blur(12px)"]);
     const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;

     return (
          <div ref={targetRef} className="relative z-0 h-[300vh] w-full">
               <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-foreground">
                    <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-foreground after:to-background after:content-['']">
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
                         className="font-geist w-full max-w-4xl px-4 text-center text-[0.8rem] font-bold leading-tight tracking-tighter text-[#ff5800] md:text-3xl"
                    >
                         KOMEQ stands right there, sensing every move, every tilt, every
                         small mistake, reading angles, reading motion, reading gravity
                         like it’s speaking to it, the sensors keep talking, the data keeps
                         flowing, and the controller keeps listening…
                         <br />
                         <br />
                         It leans a little, it drifts a little, but before it can fall, it
                         knows, before imbalance becomes failure, it reacts, before
                         silence, there is correction.
                         <br />
                         <br />
                         The Arduino Nano sits at the center, quiet but alert, taking
                         numbers, turning them into decisions, decisions into action,
                         action into balance.
                         <br />
                         <br />
                         Gyroscope spins, accelerometer feels, logic calculates, motors
                         respond, again and again and again, no pause, no break, no second
                         thought.
                         <br />
                         <br />
                         It doesn’t wait to fall. It doesn’t ask for support. It keeps
                         itself upright, right there, right now, every moment.
                         <br />
                         <br />
                         This is not randomness. This is not chance. This is feedback
                         talking to control, control talking to motion, motion answering
                         back in real time.
                    </motion.div>
               </div>
          </div>
     );
};
