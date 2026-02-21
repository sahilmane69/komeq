"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

type CharacterProps = {
     char: string;
     index: number;
     centerIndex: number;
     scrollYProgress: any;
};

const CharacterV1 = ({
     char,
     index,
     centerIndex,
     scrollYProgress,
}: CharacterProps) => {
     const isSpace = char === " ";

     const distanceFromCenter = index - centerIndex;

     const x = useTransform(
          scrollYProgress,
          [0, 0.5],
          [distanceFromCenter * 50, 0],
     );
     const rotateX = useTransform(
          scrollYProgress,
          [0, 0.5],
          [distanceFromCenter * 50, 0],
     );

     return (
          <motion.span
               className={cn("inline-block text-orange-500", isSpace && "w-4")}
               style={{
                    x,
                    rotateX,
               }}
          >
               {char}
          </motion.span>
     );
};
const CharacterV2 = ({
     char,
     index,
     centerIndex,
     scrollYProgress,
}: CharacterProps) => {
     const isSpace = char === " ";
     const distanceFromCenter = index - centerIndex;

     const x = useTransform(
          scrollYProgress,
          [0, 0.5],
          [distanceFromCenter * 50, 0],
     );
     const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

     const y = useTransform(
          scrollYProgress,
          [0, 0.5],
          [Math.abs(distanceFromCenter) * 50, 0],
     );

     return (
          <motion.img
               src={char}
               className={cn("inline-block h-12 md:h-20 w-auto object-contain mx-2 md:mx-4", isSpace && "w-4")}
               style={{
                    x,
                    scale,
                    y,
                    transformOrigin: "center",
               }}
          />
     );
};


export const Skiper31 = () => {
     const targetRef = useRef<HTMLDivElement | null>(null);
     const targetRef2 = useRef<HTMLDivElement | null>(null);
     const { scrollYProgress } = useScroll({
          target: targetRef,
     });
     const { scrollYProgress: scrollYProgress2 } = useScroll({
          target: targetRef2,
     });

     const text = "powered by komeq & arduino";
     const characters = text.split("");
     const centerIndex = Math.floor(characters.length / 2);

     const techLogos = [
          "/image.png",
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg",
          "/image.png",
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg",
          "/image.png",
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg",
          "/image.png",
     ];
     const iconCenterIndex = Math.floor(techLogos.length / 2);

     return (
          <main className="w-full bg-background relative z-10 pointer-events-none">

               <div
                    ref={targetRef}
                    className="relative box-border flex h-screen items-center justify-center gap-[2vw] overflow-hidden bg-background p-[2vw]"
               >
                    <div
                         className="font-geist w-full max-w-4xl text-center text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground"
                         style={{
                              perspective: "500px",
                         }}
                    >
                         {characters.map((char, index) => (
                              <CharacterV1
                                   key={index}
                                   char={char}
                                   index={index}
                                   centerIndex={centerIndex}
                                   scrollYProgress={scrollYProgress}
                              />
                         ))}
                    </div>
               </div>

               <div
                    ref={targetRef2}
                    className="relative box-border flex h-[50vh] flex-col items-center justify-center gap-12 overflow-hidden bg-background px-[2vw] mb-32"
               >
                    <p className="font-geist flex items-center justify-center gap-3 text-xl md:text-2xl font-medium tracking-tight text-foreground/50">
                         <Bracket className="h-8 md:h-12 text-foreground/30" />
                         <span className="font-geist font-medium text-foreground">
                              Integrate with your fav tech stack
                         </span>
                         <Bracket className="h-8 md:h-12 scale-x-[-1] text-foreground/30" />
                    </p>
                    <div className="font-geist w-full max-w-4xl flex items-center justify-center text-center text-6xl font-bold uppercase tracking-tighter text-foreground mt-8">
                         {techLogos.map((char, index) => (
                              <CharacterV2
                                   key={index}
                                   char={char}
                                   index={index}
                                   centerIndex={iconCenterIndex}
                                   scrollYProgress={scrollYProgress2}
                              />
                         ))}
                    </div>
               </div>
          </main>
     );
};

const Bracket = ({ className }: { className: string }) => {
     return (
          <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 27 78"
               className={className}
          >
               <path
                    fill="currentColor"
                    d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
               ></path>
          </svg>
     );
};
