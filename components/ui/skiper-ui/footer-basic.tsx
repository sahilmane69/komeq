"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrowdCanvas } from "./crowd-canvas";

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
                    <div className="text-xs md:text-sm tracking-wide text-foreground/50 max-w-2xl lg:max-w-4xl leading-relaxed mt-4 md:mt-0 px-0 md:px-4">
                         <div className="mb-2 md:mb-4">
                              <span className="inline-flex px-1 py-0 text-foreground text-base md:text-lg lg:text-xl font-medium uppercase tracking-widest opacity-80">SEE U AT IPUB</span>
                         </div>
                         is a collaborative project where the website design and front-end structure were created by{" "}
                         <span className="relative group/sahil inline-block cursor-help">
                              <AnimatedLink href="https://sahilmane-one.vercel.app" className="inline-flex! px-1 py-0! text-foreground font-medium text-xs md:text-sm uppercase tracking-wider before:hover:h-full!">Sahil Mane</AnimatedLink>

                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none opacity-0 group-hover/sahil:opacity-100 transition-all duration-300 translate-y-2 group-hover/sahil:translate-y-0 z-50 w-max max-w-[280px] sm:max-w-[350px]">
                                   <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                        <div className="text-[10px] sm:text-xs text-foreground/80 leading-relaxed text-center tracking-wider">
                                             <span className="text-white font-bold block mb-1 uppercase tracking-widest text-xs">Full Stack Developer</span>
                                             <span className="opacity-70">from Pune • ADYPU B.Tech CS</span>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 border-b border-r border-white/10 rotate-45" />
                                   </div>
                              </div>
                         </span>,
                         focusing on a clean, user-friendly interface and smooth user experience. The intelligent model and backend logic were developed by{" "}
                         <span className="relative group/himanshu inline-block cursor-help">
                              <AnimatedLink href="https://instagram.com/midnighttoast097" className="inline-flex! px-1 py-0! text-foreground font-medium text-xs md:text-sm uppercase tracking-wider before:hover:h-full!">Himanshu Kumar Singh</AnimatedLink>

                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none opacity-0 group-hover/himanshu:opacity-100 transition-all duration-300 translate-y-2 group-hover/himanshu:translate-y-0 z-50 w-max max-w-[280px] sm:max-w-[350px]">
                                   <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                        <div className="text-[10px] sm:text-xs text-foreground/80 leading-relaxed text-center tracking-wider">
                                             <span className="text-white font-bold block mb-1 uppercase tracking-widest text-xs">Supporting Developer</span>
                                             <span className="opacity-70">IoT Master</span>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 border-b border-r border-white/10 rotate-45" />
                                   </div>
                              </div>
                         </span>,
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

               {/* Add Crowd Canvas Effect */}
               <div
                    className="absolute -bottom-8 md:-bottom-12 left-0 w-full h-[50vh] pointer-events-none z-0"
                    style={{
                         maskImage: "linear-gradient(to bottom, transparent, black 20%)",
                         WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)"
                    }}
               >
                    <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
               </div>
          </footer>
     );
};
