"use client";

import React from "react";
import { motion, useSpring } from "framer-motion";
import { AnimateSvg } from "./komeq-animate-svg";

const SPRING = {
     mass: 0.1,
     damping: 10,
     stiffness: 131,
};

export const KomeqBotDisplay = () => {
     const xSpring = useSpring(0, SPRING);
     const ySpring = useSpring(0, SPRING);
     const opacitySpring = useSpring(0, SPRING);
     const scaleSpring = useSpring(0, SPRING);

     const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          xSpring.set(e.clientX - bounds.left);
          ySpring.set(e.clientY - bounds.top);
     };

     return (
          <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent py-32 z-10 px-6">
               <div className="mb-20 text-center">
                    <h2 className="font-geist text-4xl font-bold tracking-tighter md:text-6xl text-foreground">
                         Core Hardware
                    </h2>
                    <p className="mt-4 text-foreground/50 max-w-xl mx-auto">
                         The brains behind the balance.
                    </p>
               </div>

               <div className="relative w-full max-w-4xl aspect-video md:aspect-21/9 flex items-center justify-center pointer-events-none">
                    {/* Interactive Bot Image Div! */}
                    <div
                         onPointerMove={handlePointerMove}
                         onPointerEnter={() => {
                              opacitySpring.set(1);
                              scaleSpring.set(1);
                         }}
                         onPointerLeave={() => {
                              opacitySpring.set(0);
                              scaleSpring.set(0);
                         }}
                         className="relative z-10 w-full max-w-[600px] aspect-video border border-white/10 rounded-3xl overflow-hidden cursor-none pointer-events-auto bg-black/40 backdrop-blur-md flex items-center justify-center shadow-2xl"
                    >
                         <img src="/image copy.png" alt="Hardware Bot Prototype" className="w-[80%] h-auto rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] object-contain" />

                         {/* The Spring Follow Mouse Cursor Effect */}
                         <motion.div
                              style={{
                                   x: xSpring,
                                   y: ySpring,
                                   opacity: opacitySpring,
                                   scale: scaleSpring,
                              }}
                              className="absolute left-[-20px] top-[-20px] rounded-full size-10 bg-orange-500/80 backdrop-blur-sm shadow-[0_0_20px_rgba(249,115,22,1)] pointer-events-none z-20"
                         ></motion.div>
                    </div>
               </div>
          </section>
     );
};
