"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
     src: string;
     rows?: number;
     cols?: number;
}

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const config = {
               src,
               rows,
               cols,
          };

          // UTILS
          const randomRange = (min: number, max: number) =>
               min + Math.random() * (max - min);
          const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
          const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
          const removeItemFromArray = (array: any[], item: any) =>
               removeFromArray(array, array.indexOf(item));
          const removeRandomFromArray = (array: any[]) =>
               removeFromArray(array, randomIndex(array));
          const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

          // TWEEN FACTORIES
          const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
               const direction = Math.random() > 0.5 ? 1 : -1;
               const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
               const startY = stage.height - peep.height + offsetY;
               let startX: number;
               let endX: number;

               if (direction === 1) {
                    startX = -peep.width;
                    endX = stage.width;
                    peep.scaleX = 1;
               } else {
                    startX = stage.width + peep.width;
                    endX = 0;
                    peep.scaleX = -1;
               }

               peep.x = startX;
               peep.y = startY;
               peep.anchorY = startY;

               return {
                    startX,
                    startY,
                    endX,
               };
          };

          const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
               const { startX, startY, endX } = props;
               const xDuration = 10;
               const yDuration = 0.25;

               const tl = gsap.timeline();
               tl.timeScale(randomRange(0.5, 1.5));
               tl.to(
                    peep,
                    {
                         duration: xDuration,
                         x: endX,
                         ease: "none",
                    },
                    0,
               );
               tl.to(
                    peep,
                    {
                         duration: yDuration,
                         repeat: xDuration / yDuration,
                         yoyo: true,
                         y: startY - 10,
                    },
                    0,
               );

               return tl;
          };

          const walks = [normalWalk];

          // TYPES
          type Peep = {
               image: HTMLImageElement;
               rect: number[];
               width: number;
               height: number;
               drawArgs: any[];
               x: number;
               y: number;
               anchorY: number;
               scaleX: number;
               walk: any;
               setRect: (rect: number[]) => void;
               render: (ctx: CanvasRenderingContext2D) => void;
          };

          // FACTORY FUNCTIONS
          const createPeep = ({
               image,
               rect,
          }: {
               image: HTMLImageElement;
               rect: number[];
          }): Peep => {
               const peep: Peep = {
                    image,
                    rect: [],
                    width: 0,
                    height: 0,
                    drawArgs: [],
                    x: 0,
                    y: 0,
                    anchorY: 0,
                    scaleX: 1,
                    walk: null,
                    setRect: (rect: number[]) => {
                         peep.rect = rect;
                         peep.width = rect[2];
                         peep.height = rect[3];
                         peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
                    },
                    render: (ctx: CanvasRenderingContext2D) => {
                         ctx.save();
                         ctx.translate(peep.x, peep.y);
                         ctx.scale(peep.scaleX, 1);
                         ctx.drawImage(
                              peep.image,
                              peep.rect[0],
                              peep.rect[1],
                              peep.rect[2],
                              peep.rect[3],
                              0,
                              0,
                              peep.width,
                              peep.height,
                         );
                         ctx.restore();
                    },
               };

               peep.setRect(rect);
               return peep;
          };

          // MAIN
          const img = document.createElement("img");
          const stage = {
               width: 0,
               height: 0,
          };

          const allPeeps: Peep[] = [];
          const availablePeeps: Peep[] = [];
          const crowd: Peep[] = [];

          const createPeeps = () => {
               const { rows, cols } = config;
               const { naturalWidth: width, naturalHeight: height } = img;
               const total = rows * cols;
               const rectWidth = width / rows;
               const rectHeight = height / cols;

               for (let i = 0; i < total; i++) {
                    allPeeps.push(
                         createPeep({
                              image: img,
                              rect: [
                                   (i % rows) * rectWidth,
                                   ((i / rows) | 0) * rectHeight,
                                   rectWidth,
                                   rectHeight,
                              ],
                         }),
                    );
               }
          };

          const initCrowd = () => {
               while (availablePeeps.length) {
                    addPeepToCrowd().walk.progress(Math.random());
               }
          };

          const addPeepToCrowd = () => {
               const peep = removeRandomFromArray(availablePeeps);
               const walk = getRandomFromArray(walks)({
                    peep,
                    props: resetPeep({
                         peep,
                         stage,
                    }),
               }).eventCallback("onComplete", () => {
                    removePeepFromCrowd(peep);
                    addPeepToCrowd();
               });

               peep.walk = walk;

               crowd.push(peep);
               crowd.sort((a, b) => a.anchorY - b.anchorY);

               return peep;
          };

          const removePeepFromCrowd = (peep: Peep) => {
               removeItemFromArray(crowd, peep);
               availablePeeps.push(peep);
          };

          const render = () => {
               if (!canvas) return;
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.save();
               ctx.scale(devicePixelRatio, devicePixelRatio);

               crowd.forEach((peep) => {
                    peep.render(ctx);
               });

               ctx.restore();
          };

          const resize = () => {
               if (!canvas) return;
               stage.width = canvas.clientWidth;
               stage.height = canvas.clientHeight;
               canvas.width = stage.width * devicePixelRatio;
               canvas.height = stage.height * devicePixelRatio;

               crowd.forEach((peep) => {
                    if (peep.walk) peep.walk.kill();
               });

               crowd.length = 0;
               availablePeeps.length = 0;
               availablePeeps.push(...allPeeps);

               initCrowd();
          };

          const init = () => {
               createPeeps();
               resize();
               gsap.ticker.add(render);
          };

          img.onload = init;
          img.src = config.src;

          const handleResize = () => resize();
          window.addEventListener("resize", handleResize);

          return () => {
               window.removeEventListener("resize", handleResize);
               gsap.ticker.remove(render);
               crowd.forEach((peep) => {
                    if (peep.walk) peep.walk.kill();
               });
          };
     }, [src, rows, cols]);

     return (
          <canvas ref={canvasRef} className="absolute inset-x-0 bottom-0 max-h-[60vh] h-full w-full pointer-events-none opacity-20" />
     );
};

export const KomeqCrowdCanvas = () => {
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

               {/* Crowd element that fills the bottom of the section */}
               <div className="absolute bottom-0 h-full w-full pointer-events-none opacity-50 mask-image:linear-gradient(to_bottom,transparent,black)">
                    <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
               </div>
          </div>
     );
};

export { CrowdCanvas };
