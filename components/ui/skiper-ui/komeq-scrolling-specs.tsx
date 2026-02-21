import React from "react";

type ProgressiveBlurProps = {
     className?: string;
     backgroundColor?: string;
     position?: "top" | "bottom";
     height?: string;
     blurAmount?: string;
};

const ProgressiveBlur = ({
     className = "",
     backgroundColor = "hsl(var(--background))",
     position = "top",
     height = "300px",
     blurAmount = "8px",
}: ProgressiveBlurProps) => {
     const isTop = position === "top";

     return (
          <div
               className={`pointer-events-none absolute left-0 z-20 w-full select-none ${className}`}
               style={{
                    [isTop ? "top" : "bottom"]: 0,
                    height,
                    background: isTop
                         ? `linear-gradient(to top, transparent, ${backgroundColor})`
                         : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
                    maskImage: isTop
                         ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
                         : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
                    WebkitBackdropFilter: `blur(${blurAmount})`,
                    backdropFilter: `blur(${blurAmount})`,
                    WebkitUserSelect: "none",
                    userSelect: "none",
               }}
          />
     );
};

export const KomeqScrollingSpecs = () => {
     return (
          <div className="relative flex h-[100vh] w-full flex-col items-center justify-center bg-background text-foreground/80 mt-10 -mb-[20vh] z-20">
               <ProgressiveBlur position="top" backgroundColor="hsl(var(--background))" />
               <ProgressiveBlur position="bottom" backgroundColor="hsl(var(--background))" />

               <div className="flex h-full w-full flex-col items-center overflow-y-scroll scrollbar-hide">
                    <div className="w-full max-w-3xl space-y-12 px-6 py-64 text-justify font-geist text-lg leading-relaxed md:text-xl md:px-12 text-[#ff5800]">
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
          </div>
     );
};
