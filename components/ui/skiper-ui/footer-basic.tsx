"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const RealTimeClock = () => {
     const [time, setTime] = useState("");

     useEffect(() => {
          const updateTime = () => {
               const now = new Date();
               const year = now.getFullYear();
               const month = String(now.getMonth() + 1).padStart(2, "0");
               const day = String(now.getDate()).padStart(2, "0");
               const hours = String(now.getHours()).padStart(2, "0");
               const minutes = String(now.getMinutes()).padStart(2, "0");
               setTime(`${year}/${month}/${day} (${hours}:${minutes})`);
          };
          updateTime();
          const interval = setInterval(updateTime, 1000);
          return () => clearInterval(interval);
     }, []);

     return (
          <div className="font-orbitron font-medium text-xs md:text-sm text-foreground/50 tracking-widest tabular-nums">
               {time}
          </div>
     );
};

export const FooterBasic = () => {
     return (
          <footer className="w-full bg-transparent border-t border-foreground/10 py-12 px-8 md:px-16 lg:px-24 z-20 relative min-h-[50vh] flex flex-col justify-between selection:bg-red-500 selection:text-white">

               {/* Faint corner crosshairs inside the padding bounds */}
               <div className="absolute top-12 left-8 md:left-16 lg:left-24 text-foreground/20 text-sm font-light pointer-events-none leading-none">+</div>
               <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 text-foreground/20 text-sm font-light pointer-events-none leading-none">+</div>
               <div className="absolute bottom-12 right-8 md:right-16 lg:right-24 text-foreground/20 text-sm font-light pointer-events-none leading-none">+</div>

               {/* Top Section */}
               <div className="flex w-full justify-end">
                    <RealTimeClock />
               </div>

               {/* Middle Section */}
               <div className="flex w-full items-center justify-between mt-auto mb-20 md:mb-32 relative z-10 px-0">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground/90">
                         See you on the canvas.
                    </h2>

                    {/* The 3 Dots Panel */}
                    <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_2px_rgba(234,179,8,0.3)]" />
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-foreground shadow-[0_0_10px_2px_rgba(255,255,255,0.2)]" />
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-foreground/20" />
                    </div>
               </div>

               {/* Bottom Section */}
               <div className="flex flex-col lg:flex-row w-full items-start lg:items-end justify-between gap-12 lg:gap-0 relative z-10 px-0 pb-2">
                    {/* Brand */}
                    <div className="font-orbitron font-semibold text-lg md:text-xl text-foreground/70 hover:text-foreground transition-colors tracking-widest uppercase flex items-center">
                         KOMEQ<span className="text-red-500 font-bold ml-1 tracking-normal">[R]</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] md:text-[11px] text-foreground/30 font-bold uppercase tracking-[0.2em]">
                         <Link href="#" className="hover:text-foreground transition-colors duration-300">Terms of Service</Link>
                         <Link href="#" className="hover:text-foreground transition-colors duration-300">Privacy Policy</Link>
                         <Link href="https://linkedin.com/in/sahilmane74" target="_blank" className="hover:text-foreground transition-colors duration-300">LinkedIn</Link>
                         <Link href="https://github.com/sahilmane69" target="_blank" className="hover:text-foreground transition-colors duration-300">GitHub</Link>
                         <Link href="https://sahilmane-one.vercel.app" target="_blank" className="hover:text-foreground transition-colors duration-300">Portfolio</Link>
                    </div>
               </div>
          </footer>
     );
};
