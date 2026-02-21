"use client";

import React from "react";

export const CreditsContext = () => {
     return (
          <div className="relative flex min-h-[60vh] w-full flex-col justify-center bg-background text-foreground z-10 overflow-hidden">
               {/* Content Container */}
               <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-16 px-6 py-24 md:flex-row">

                    {/* Left text section */}
                    <div className="flex-1 text-center md:text-left">
                         <h2 className="font-geist text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
                              Made Possible By <br /> <span className="text-foreground/40">Our Team</span>
                         </h2>
                         <p className="mt-6 max-w-lg text-sm text-foreground/50 md:text-base leading-relaxed">
                              A self-balancing revolution built through relentless engineering, precise mathematics, and creative vision.
                         </p>
                    </div>

                    {/* Right side credits scrolling list */}
                    <div className="flex w-full max-w-sm flex-col items-center gap-8 md:flex-1">
                         <div className="w-full rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm p-1 pointer-events-auto">
                              {/* Using standard div with overflow instead of ScrollArea primitive so we avoid missing dependencies. Prevent lenis from hijacking scrolling here */}
                              <div className="h-[320px] w-full overflow-y-auto overflow-x-hidden rounded-xl no-scrollbar touch-pan-y" data-lenis-prevent="true">
                                   <div className="space-y-1 p-1">
                                        {[
                                             { role: "Core Logic Engine", name: "Sahil Mane" },
                                             { role: "Hardware Architect", name: "Sahil Mane" },
                                             { role: "Embedded Systems", name: "Sahil Mane" },
                                             { role: "PID Control Systems", name: "Sahil Mane" },
                                             { role: "3D Printing & Design", name: "Sahil Mane" },
                                             { role: "Sensor Calibration", name: "Sahil Mane" },
                                             { role: "Battery Management", name: "Sahil Mane" },
                                             { role: "Motor Drivers", name: "Sahil Mane" },
                                             { role: "Quality Assurance", name: "Sahil Mane" },
                                             { role: "UI/UX Design", name: "Sahil Mane" },
                                             { role: "Project Visionary", name: "Sahil Mane" }
                                        ].map((credit, index) => (
                                             <div
                                                  key={index}
                                                  className="flex h-14 w-full items-center gap-3 rounded-lg px-4 text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
                                             >
                                                  <span className="font-mono text-xs opacity-40">
                                                       {(index + 1).toString().padStart(2, "0")}
                                                  </span>
                                                  <span className="text-sm font-medium">{credit.role}</span>
                                                  <div className="h-px flex-1 bg-foreground/10 mx-2"></div>
                                                  <span className="text-xs font-mono opacity-60 text-right">{credit.name}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export { CreditsContext as CrowdCanvas };
