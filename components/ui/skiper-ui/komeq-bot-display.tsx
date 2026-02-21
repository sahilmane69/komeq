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
                    {/* SVG Arrows connecting to the bot */}
                    {/* Top Left Arrow */}
                    <div className="absolute top-10 left-0 hidden md:flex flex-col items-end opacity-70">
                         <span className="font-mono text-sm tracking-widest text-[#E16F23] mb-2 drop-shadow-sm font-semibold uppercase">PID Control Loop</span>
                         <AnimateSvg
                              width="150"
                              height="60"
                              viewBox="0 0 150 60"
                              path="M0 10 Q 75 10 100 60"
                              className="rotate-0 text-[#E16F23]/80"
                              strokeWidth={3}
                              animationDuration={2}
                         />
                    </div>

                    {/* Top Right Arrow */}
                    <div className="absolute top-0 right-10 hidden md:flex flex-col items-start opacity-70">
                         <span className="font-mono text-sm tracking-widest text-[#C22938] mb-2 drop-shadow-sm font-semibold uppercase">Microcontroller</span>
                         <AnimateSvg
                              width="150"
                              height="60"
                              viewBox="0 0 150 60"
                              path="M150 10 Q 75 10 50 60"
                              className="rotate-0 text-[#C22938]/80"
                              strokeWidth={3}
                              animationDuration={2.2}
                              animationDelay={0.4}
                         />
                    </div>

                    {/* Bottom Center Arrow (the one user provided code for) */}
                    <div className="absolute -bottom-16 md:-bottom-24 w-full flex flex-col items-center opacity-70">
                         <AnimateSvg
                              width="436"
                              height="92"
                              viewBox="0 0 436 92"
                              path="M3 11.6683C27.5507 31.3629 46.9422 39.6998 78.4385 38.3C106.882 37.0359 137.821 23.5277 164.275 13.6843C197.028 1.49724 261.319 -8.02763 280.351 30.7667C295.128 60.8895 272.979 96.9103 238.122 87.1069C224.684 83.3275 217.74 65.3879 223.692 52.9421C230.121 39.4995 249.34 33.0192 262.632 29.9179C298.328 21.5889 322.109 55.0269 354.41 60.8997C384.588 66.3865 406.997 52.8685 429.849 34.5864C431.806 33.0205 430.804 43.4396 430.804 46.0455C430.804 55.5985 432.714 51.3586 432.714 44.1356C432.714 39.4902 435.161 29.6135 428.894 32.2521C424.373 34.1558 414.869 34.5865 409.795 34.5865"
                              className="mx-auto text-white dark:text-white"
                              strokeWidth={3}
                              animationDuration={2.5}
                              animationDelay={1}
                         />
                         <span className="font-mono text-sm tracking-widest mt-2 opacity-50 font-semibold uppercase text-center block max-w-xs">Dual Motor & Wheel Base</span>
                    </div>

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
                         {/* Replace /image.png with your actual bot photo -> e.g. /images/bot.jpg */}
                         <img src="/image.png" alt="Hardware Bot Prototype" className="w-[80%] h-auto rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] object-contain" />

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
