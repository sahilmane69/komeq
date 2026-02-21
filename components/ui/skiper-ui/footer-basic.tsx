"use client";

import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HoverLink = ({ href, children, target }: { href: string; children: string; target?: string }) => {
     const { contextSafe } = useGSAP();

     const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
          gsap.to(e.currentTarget, {
               fontWeight: 800,
               duration: 0.3,
               ease: "power2.out",
          });
     });

     const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
          gsap.to(e.currentTarget, {
               fontWeight: 400,
               duration: 0.3,
               ease: "power2.out",
          });
     });

     return (
          <div className="relative flex flex-col items-center justify-center">
               {/* Invisible bold placeholder to prevent layout shifting when weight changes */}
               <span className="font-orbitron font-extrabold invisible pointer-events-none select-none h-0">
                    {children}
               </span>
               <Link
                    href={href}
                    target={target}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="font-orbitron text-foreground/70 hover:text-foreground transition-colors inline-block"
                    style={{ fontWeight: 400 }}
               >
                    {children}
               </Link>
          </div>
     );
};


export const FooterBasic = () => {
     return (
          <footer className="w-full bg-background relative overflow-hidden text-foreground pb-8 pt-20">
               {/* Subtle ambient gradient backgrounds like datawizz */}
               <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
               <div className="absolute bottom-[-100px] right-1/4 w-[500px] h-[300px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
               <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

               <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 flex flex-col min-h-[50vh] justify-between">

                    {/* Top Row: Contact & Links */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0 mt-8">
                         <div className="flex flex-col gap-1">
                              <span className="text-foreground/50 text-base">Contact Sahil at:</span>
                              <Link href="mailto:sahilmane.official@gmail.com" className="text-xl md:text-2xl font-medium font-orbitron hover:text-red-500 transition-colors flex items-center gap-2 group">
                                   sahilmane.official@gmail.com
                                   <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 19L19 5M19 5H8M19 5V16" /></svg>
                              </Link>
                         </div>

                         <div className="flex flex-wrap items-center gap-8 md:gap-10 text-xl md:text-2xl">
                              <HoverLink href="#about">How It Works</HoverLink>
                              <HoverLink href="#specs">Features</HoverLink>
                              <HoverLink href="#price">Benefits</HoverLink>
                              <HoverLink href="#credits">Team</HoverLink>
                         </div>
                    </div>

                    {/* Center Massive Logo */}
                    <div className="w-full flex justify-center items-center py-24 lg:py-36">
                         <div className="flex items-center gap-4 md:gap-8 hover:scale-[1.02] transition-transform duration-500 group">
                              <img src="/image.png" alt="Logo" className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-[20%] md:rounded-[25%] shadow-xl group-hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all duration-500" />
                              <h1 className="font-orbitron font-extrabold text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[13rem] leading-none tracking-tighter lowercase flex items-start">
                                   komeq
                                   <span className="text-red-500 text-[1.5rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] font-bold leading-none mt-2 sm:mt-4 md:mt-6 lg:mt-8 ml-1">[R]</span>
                              </h1>
                         </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 text-base text-foreground/50 border-t border-foreground/10 pt-8 pb-4">
                         <p className="font-geist">
                              © 2026 KOMEQ<span className="text-red-500 font-bold px-0.5">[R]</span> Self Balancing Product. All rights reserved. Built by <Link href="https://sahilmane-one.vercel.app" target="_blank" className="text-foreground hover:underline">Sahil Mane</Link>.
                         </p>
                         <div className="flex items-center gap-8 font-geist text-lg">
                              <HoverLink href="https://linkedin.com/in/sahilmane74" target="_blank">LinkedIn</HoverLink>
                              <HoverLink href="https://github.com/sahilmane69" target="_blank">GitHub</HoverLink>
                         </div>
                    </div>
               </div>
          </footer>
     );
};
