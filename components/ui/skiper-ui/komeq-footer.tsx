"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
     char: string;
     index: number;
     centerIndex: number;
     scrollYProgress: MotionValue<number>;
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
               className={cn("inline-block text-[#ff5800]", isSpace && "w-3 md:w-6")}
               style={{ x, rotateX }}
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
          [distanceFromCenter * 150, 0],
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
               className={cn("inline-block h-20 w-20 md:h-32 md:w-32 object-contain mx-4", isSpace && "w-4")}
               style={{ x, scale, y, transformOrigin: "center" }}
          />
     );
};

const Bracket = ({ className }: { className?: string }) => {
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

export const KomeqFooter = () => {
     const section1Ref = useRef<HTMLDivElement | null>(null);
     const section2Ref = useRef<HTMLDivElement | null>(null);
     const { scrollYProgress: sp1 } = useScroll({ target: section1Ref });
     const { scrollYProgress: sp2 } = useScroll({ target: section2Ref });

     const closingText = "engine of balance";
     const closingChars = closingText.split("");
     const closingCenterIndex = Math.floor(closingChars.length / 2);

     const techLogos = [
          "/image.png",
          "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg",
     ];
     const iconCenterIndex = (techLogos.length - 1) / 2;

     return (
          <div className="relative w-full bg-background pb-32">
               <div ref={section1Ref} className="relative box-border flex h-[200vh] items-center justify-center gap-[2vw] overflow-hidden bg-background p-[2vw]">
                    <div className="font-geist flex w-full justify-center whitespace-nowrap text-center text-5xl font-black uppercase tracking-tighter text-[#ff5800] md:text-7xl lg:text-9xl" style={{ perspective: "500px" }}>
                         {closingChars.map((char, index) => (
                              <CharacterV1 key={index} char={char} index={index} centerIndex={closingCenterIndex} scrollYProgress={sp1} />
                         ))}
                    </div>
               </div>

               <div ref={section2Ref} className="pointer-events-none relative -mt-[100vh] box-border flex h-[200vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-transparent p-[2vw]">
                    <p className="font-geist flex items-center justify-center gap-3 text-base font-medium tracking-tight text-foreground md:text-2xl">
                         <Bracket className="h-8 text-foreground md:h-12" />
                         <span className="font-geist font-medium uppercase tracking-wider text-muted-foreground/80">powered by arduino nano & komeq</span>
                         <Bracket className="h-8 scale-x-[-1] text-foreground md:h-12" />
                    </p>
                    <div className="font-geist mt-8 flex w-full justify-center text-center md:mt-12">
                         {techLogos.map((char, index) => (
                              <CharacterV2 key={index} char={char} index={index} centerIndex={iconCenterIndex} scrollYProgress={sp2} />
                         ))}
                    </div>
               </div>
          </div>
     );
};
