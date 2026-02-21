"use client";

import React from "react";
import { motion, useSpring } from "framer-motion";

const SPRING = {
     mass: 0.1,
     damping: 10,
     stiffness: 131,
};

export const BotDisplay = () => {
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
               <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">

                    {/* Left text section */}
                    <div className="flex-1 text-center md:text-left z-20">
                         <h2 className="font-geist text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
                              Core<br /> <span className="text-foreground/40">Hardware</span>
                         </h2>
                         <p className="mt-8 max-w-lg text-lg text-foreground/50 md:text-xl leading-relaxed">
                              Dual-axis reaction wheels working in tandem with IMU sensor fusion.
                              The brain behind the physics-defying 0.05ms balance latency.
                         </p>

                         <div className="mt-12 flex flex-col gap-6">
                              <div className="flex items-center gap-4 text-left">
                                   <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground font-mono text-xl font-bold">1</div>
                                   <div>
                                        <h4 className="font-medium text-foreground">Sensors & IMU</h4>
                                        <p className="text-sm text-foreground/50">6-axis gyro tracking orientation</p>
                                   </div>
                              </div>
                              <div className="flex items-center gap-4 text-left">
                                   <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground font-mono text-xl font-bold">2</div>
                                   <div>
                                        <h4 className="font-medium text-foreground">Flywheels</h4>
                                        <p className="text-sm text-foreground/50">High-torque BLDC motors at 15k RPM</p>
                                   </div>
                              </div>
                              <div className="flex items-center gap-4 text-left">
                                   <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground font-mono text-xl font-bold">3</div>
                                   <div>
                                        <h4 className="font-medium text-foreground">Logic Control</h4>
                                        <p className="text-sm text-foreground/50">STM32 Microcontroller w/ PID loops</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Right Hand Side Bot Box Container */}
                    <div className="relative w-full max-w-[500px] flex-1 aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center pointer-events-none md:ml-auto">
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
                              className="relative z-10 w-full h-full border border-white/10 rounded-3xl overflow-hidden cursor-none pointer-events-auto bg-black/40 backdrop-blur-md flex items-center justify-center shadow-2xl"
                         >
                              <img src="/image copy.png" alt="Hardware Bot Prototype" className="w-[85%] h-auto rounded-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] object-contain" />

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
               </div>
          </section>
     );
};
