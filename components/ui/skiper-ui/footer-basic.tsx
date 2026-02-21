"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const AnimatedLink = ({
     children,
     href,
     className,
}: {
     children: React.ReactNode;
     href: string;
     className?: string;
}) => {
     return (
          <Link
               href={href}
               target="_blank"
               className={cn(
                    "group relative flex items-center",
                    className,
                    "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
                    "before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "before:origin-center md:before:bottom-0",
                    "before:z-1 px-4 py-1 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]",
               )}
          >
               {children}
               <svg
                    className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100 motion-reduce:transition-none"
                    fill="none"
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
               >
                    <path
                         d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                         stroke="currentColor"
                         strokeWidth="1.25"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                    ></path>
               </svg>
          </Link>
     );
};

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
               const seconds = String(now.getSeconds()).padStart(2, "0");
               setTime(`${year}/${month}/${day} (${hours}:${minutes}:${seconds})`);
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
                    <div className="text-sm md:text-base tracking-wide text-foreground/70 max-w-2xl leading-relaxed mt-4 md:mt-0 px-0 md:px-4">
                         <AnimatedLink href="#" className="inline-flex! px-1 py-0! font-orbitron text-purple-400 text-lg md:text-xl lg:text-2xl underline decoration-purple-400 underline-offset-4 tracking-widest before:hover:h-full!">Institute of Physics, Bhubaneswar</AnimatedLink> <br className="hidden md:block" /> is a collaborative project where the website design and front-end structure were created by{" "}
                         <AnimatedLink href="https://sahilmane-one.vercel.app" className="inline-flex! px-1 py-0! font-orbitron text-foreground text-xs md:text-sm uppercase tracking-widest before:hover:h-full!">Sahil Mane</AnimatedLink>,
                         focusing on a clean, user-friendly interface and smooth user experience. The intelligent model and backend logic were developed by{" "}
                         <AnimatedLink href="https://instagram.com/midnighttoast097" className="inline-flex! px-1 py-0! font-orbitron text-foreground text-xs md:text-sm uppercase tracking-widest before:hover:h-full!">Himanshu Kumar Singh</AnimatedLink>,
                         enabling accurate processing and functionality. Together, the project combines thoughtful design with a robust model to deliver a practical and effective solution.
                    </div>

                    {/* The 3 Dots Panel */}
                    <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.4)]" />
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-black shadow-[0_0_10px_2px_rgba(0,0,0,0.5)] border border-white/20" />
                         <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]" />
                    </div>
               </div>

               {/* Bottom Section */}
               <div className="flex flex-col lg:flex-row w-full items-start lg:items-end justify-between gap-12 lg:gap-0 relative z-10 px-0 pb-2">
                    {/* Brand */}
                    <div className="font-orbitron font-semibold text-lg md:text-xl text-foreground/70 hover:text-foreground transition-colors tracking-widest uppercase flex items-center">
                         KOMEQ<span className="text-red-500 font-bold ml-1 tracking-normal">[R]</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-6 text-foreground/50">
                         <Link href="https://github.com/sahilmane69" target="_blank" className="hover:text-foreground transition-colors duration-300">
                              <Github className="size-5 md:size-6" />
                         </Link>
                         <Link href="https://linkedin.com/in/sahilmane74" target="_blank" className="hover:text-foreground transition-colors duration-300">
                              <Linkedin className="size-5 md:size-6" />
                         </Link>
                    </div>
               </div>
          </footer>
     );
};
