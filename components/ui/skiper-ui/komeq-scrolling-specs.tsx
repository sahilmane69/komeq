"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type ProgressiveBlurProps = {
     className?: string;
     position?: "top" | "bottom";
     height?: string;
     blurAmount?: string;
};

const ProgressiveBlur = ({
     className = "",
     position = "top",
     height = "150px",
     blurAmount = "8px",
}: ProgressiveBlurProps) => {
     const isTop = position === "top";

     // We compute the background based on the position and tailwind classes
     return (
          <div
               className={cn(
                    "pointer-events-none sticky z-20 w-full select-none",
                    isTop ? "top-0 bg-linear-to-b from-background to-transparent" : "bottom-0 bg-linear-to-t from-background to-transparent",
                    className
               )}
               style={{
                    height,
                    backdropFilter: `blur(${blurAmount})`,
                    WebkitBackdropFilter: `blur(${blurAmount})`,
                    maskImage: isTop
                         ? `linear-gradient(to bottom, black 20%, transparent)`
                         : `linear-gradient(to top, black 20%, transparent)`,
                    WebkitMaskImage: isTop
                         ? `linear-gradient(to bottom, black 20%, transparent)`
                         : `linear-gradient(to top, black 20%, transparent)`,
               }}
          />
     );
};

export const KomeqScrollingSpecs = () => {
     return (
          <div className="relative w-full bg-background -mt-[15vh] z-20">
               <ProgressiveBlur position="top" height="200px" blurAmount="12px" />

               <div className="relative w-full flex flex-col items-center">
                    <div className="w-full max-w-5xl space-y-12 px-6 py-[15vh] text-justify font-geist text-2xl font-medium leading-[1.8] tracking-tight md:text-3xl lg:text-4xl lg:leading-[1.6] md:px-12 text-foreground">
                         <p>
                              The KOMEQ large-scale self-balancing product is designed and
                              developed using an Arduino microcontroller as the brain of the
                              entire system. The Arduino continuously collects real-time data from
                              an Inertial Measurement Unit (IMU) that combines a gyroscope and
                              accelerometer to accurately detect tilt angle, direction, and
                              angular speed of the structure. This sensor data is processed using
                              mathematical filtering techniques to reduce noise and obtain stable
                              orientation values. Based on this processed data, the system
                              determines whether the product is leaning forward or backward and by
                              how much.
                         </p>

                         <p>
                              To correct any imbalance, a PID (Proportional–Integral–Derivative)
                              control algorithm is implemented in the Arduino. This algorithm
                              calculates the exact motor response required to counteract the tilt
                              by adjusting motor speed and direction in real time. Since the
                              product is large and heavy, high-torque DC motors are used, driven
                              through high-current motor driver modules capable of handling large
                              power demands without overheating. The motors respond instantly to
                              control signals, allowing the system to regain balance smoothly and
                              efficiently.
                         </p>

                         <p>
                              The mechanical structure of the product is carefully designed to
                              support the increased weight and size, using a strong frame to
                              minimize vibrations and unwanted movement. The center of gravity is
                              optimized to improve balancing efficiency, while wheel alignment and
                              motor placement are adjusted for maximum stability. A robust power
                              management system is implemented using high-capacity batteries,
                              voltage regulators, and protection circuits to ensure consistent
                              power delivery to both the control electronics and motors.
                         </p>

                         <p>
                              Extensive sensor calibration and PID tuning are performed to adapt
                              the system to real-world conditions such as uneven surfaces, sudden
                              disturbances, and load variations. Safety considerations such as
                              controlled startup, gradual motor acceleration, and emergency
                              shutdown are also included to protect both the hardware and users.
                              Through the integration of embedded electronics, control systems,
                              mechanical engineering, and software logic, the KOMEQ product
                              achieves stable, reliable, and smooth self-balancing behavior,
                              making it suitable for large-scale practical applications and
                              real-world usage.
                         </p>
                    </div>
               </div>

               <ProgressiveBlur position="bottom" height="200px" blurAmount="12px" />
          </div>
     );
};
