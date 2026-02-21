"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateSvgProps {
     width?: string | number;
     height?: string | number;
     viewBox?: string;
     className?: string;
     path: string;
     strokeColor?: string;
     strokeWidth?: number;
     strokeLinecap?: "butt" | "round" | "square" | "inherit";
     animationDuration?: number;
     animationDelay?: number;
}

export const AnimateSvg: React.FC<AnimateSvgProps> = ({
     width = "100%",
     height = "100%",
     viewBox = "0 0 100 100",
     className = "",
     path,
     strokeColor = "currentColor",
     strokeWidth = 2,
     strokeLinecap = "round",
     animationDuration = 1.5,
     animationDelay = 0,
}) => {
     const ref = useRef(null);
     const isInView = useInView(ref, { once: true, margin: "-100px" });

     return (
          <svg
               ref={ref}
               width={width}
               height={height}
               viewBox={viewBox}
               className={className}
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
          >
               <motion.path
                    d={path}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap={strokeLinecap}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                         isInView
                              ? { pathLength: 1, opacity: 1 }
                              : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                         duration: animationDuration,
                         delay: animationDelay,
                         ease: "easeInOut",
                    }}
                    fill="transparent"
               />
               {/* Target Arrowhead - small dot/arrow */}
               <motion.circle
                    cx="100%"
                    cy="100%"
                    r={0}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: animationDelay + animationDuration * 0.8 }}
               />
          </svg>
     );
};
