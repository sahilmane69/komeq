"use client";

import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import ReactLenis from "lenis/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

// --- Nav Item text animation component from Skiper58 ---
const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

// --- Skiper58 Menu Component ---
const navigationItems = [
  { name: "Home", href: "/", description: "[0]" },
  { name: "About", href: "/about", description: "[1]" },
  { name: "Specs", href: "/specs", description: "[2]" },
  { name: "Credits", href: "/credits", description: "[3]" },
];

const Skiper58 = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute left-0 right-0 top-[calc(100%+16px)] z-[100] flex flex-col items-center rounded-3xl border border-foreground/10 bg-background/90 p-8 shadow-2xl backdrop-blur-xl"
    >
      <ul className="flex w-full flex-col items-center justify-center gap-6 py-6">
        {navigationItems.map((item, index) => (
          <li
            className="relative flex cursor-pointer flex-col items-center overflow-visible"
            key={index}
          >
            <div className="relative flex items-start" onClick={onClose}>
              <TextRoll
                center
                className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors md:text-6xl"
              >
                {item.name}
              </TextRoll>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// ///////////////////////////////////////////////////////////////////////////
// Theme toggle logic from Skiper26

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";
export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    if (!positionCoords) return;
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return;
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) return;
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }
  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    case "top-center":
      return "top center";
    case "bottom-center":
      return "bottom center";
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return "center";
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "circle" && start == "center") {
    return {
      name: `circle-center`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }

      @keyframes reveal-light {
        from {
           clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }
      `,
    };
  }

  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start}${blur ? "-blur" : ""} 1s;
        transform-origin: ${transformOrigin};
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-${start}${blur ? "-blur" : ""} 1s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-${start}${blur ? "-blur" : ""} {
        from { }
        to {
          mask-size: 2000vmax;
        }
      }
    `,
  };
};

export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(
      "theme-transition-styles",
    ) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "theme-transition-styles";
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
    const animation = createAnimation(variant, start, blur, gifUrl);
    if (animation) updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, blur, gifUrl, updateStyles, isDark, setIsDark]);

  return { isDark, toggleTheme };
};

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({
    variant,
    start,
    blur,
    gifUrl,
  });

  return (
    <button
      type="button"
      className={cn(
        "flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black p-0 transition-all duration-300 active:scale-95 dark:bg-white",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg
        viewBox="0 0 240 240"
        className="size-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill={isDark ? "black" : "white"}
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill={isDark ? "white" : "black"}
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill={isDark ? "black" : "white"}
        />
      </svg>
    </button>
  );
};

// ///////////////////////////////////////////////////////////////////////////
// Menu Icon Component

const MenuIcon = ({
  className,
  toggleAction,
  isOpen,
}: {
  className?: string;
  toggleAction: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      onClick={toggleAction}
      className={cn(
        "group flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground text-background",
        className,
      )}
    >
      <div className="relative grid size-4 cursor-pointer items-center justify-center">
        <motion.div
          animate={{ y: isOpen ? 0 : "-5px", rotate: isOpen ? 45 : 0 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.1 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ y: isOpen ? 0 : "5px", rotate: isOpen ? -45 : 0 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
      </div>
    </div>
  );
};

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative h-full w-full", className)} ref={container}>
      <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
        <div
          className={cn(
            "relative h-[90vh] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className={cn(
                "rounded-4xl absolute h-full w-full object-cover",
                imageClassName,
              )}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Navbar Component ---
const Skiper40 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const yMotionValue = useTransform(scrollYProgress, [0, 0.7], [487, 0]);
  const opacityValue = useTransform(scrollYProgress, [0.65, 0.9], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0.65, 0.9], ["blur(0px)", "blur(12px)"]);
  const transform = useMotionTemplate`rotateX(30deg) translateY(${yMotionValue}px) translateZ(10px)`;

  return (
    <ReactLenis root>
      <div className="relative min-h-[300vh] w-full bg-background font-sans text-foreground">
        {/* Navbar Container */}
        <nav className="fixed left-1/2 top-6 z-50 flex w-[95%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/20 bg-white/10 px-3 py-3 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] saturate-150 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/10 dark:border-white/10 dark:bg-black/10 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] dark:supports-[backdrop-filter]:bg-black/10">
          {/* Left Side: Logo */}
          <div className="flex shrink-0 items-center justify-center pl-2">
            {/* Logo container, size adjusted to look good on modern UIs */}
            <div className="overflow-hidden rounded-xl border border-foreground/10 shadow-sm">
              <img
                src="/image.png"
                alt="Logo"
                className="h-10 w-10 object-cover"
              />
            </div>
            <span className="hidden ml-3 font-semibold text-foreground sm:block">
              KOMEQ
            </span>
          </div>

          {/* Right Side: Theme button and Menu Button */}
          <div className="flex items-center justify-end gap-3">
            <ThemeToggleButton variant="circle" start="center" />

            {/* Component 2: Menu Toggle Button */}
            <MenuIcon toggleAction={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
          </div>

          {/* Dropdown Animated Menu */}
          <AnimatePresence>
            {isMenuOpen && <Skiper58 onClose={() => setIsMenuOpen(false)} />}
          </AnimatePresence>
        </nav>

        {/* Background content to showcase sticky behavior */}
        <div ref={targetRef} className="relative z-0 h-[300vh] w-full">
          <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-foreground">
            <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-foreground after:to-background after:content-['']">
              scroll down to see
            </span>
          </div>
          <div
            className="sticky top-0 mx-auto flex h-screen items-center justify-center bg-transparent py-20"
            style={{
              transformStyle: "preserve-3d",
              perspective: "200px",
            }}
          >
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                transform,
                opacity: opacityValue,
                filter: blurValue
              }}
              className="font-geist w-full max-w-4xl px-4 text-center text-[0.8rem] font-bold leading-tight tracking-tighter text-[#ff5800] md:text-3xl"
            >
              KOMEQ stands right there, sensing every move, every tilt, every
              small mistake, reading angles, reading motion, reading gravity
              like it’s speaking to it, the sensors keep talking, the data keeps
              flowing, and the controller keeps listening…
              <br />
              <br />
              It leans a little, it drifts a little, but before it can fall, it
              knows, before imbalance becomes failure, it reacts, before
              silence, there is correction.
              <br />
              <br />
              The Arduino Nano sits at the center, quiet but alert, taking
              numbers, turning them into decisions, decisions into action,
              action into balance.
              <br />
              <br />
              Gyroscope spins, accelerometer feels, logic calculates, motors
              respond, again and again and again, no pause, no break, no second
              thought.
              <br />
              <br />
              It doesn’t wait to fall. It doesn’t ask for support. It keeps
              itself upright, right there, right now, every moment.
              <br />
              <br />
              This is not randomness. This is not chance. This is feedback
              talking to control, control talking to motion, motion answering
              back in real time.
            </motion.div>
          </div>
        </div>

        {/* Image cards area cleanly following the fade out mechanism */}
        <div className="relative z-10 w-full bg-background">
          <StickyCard002
            cards={[
              { id: 1, image: "/komeqimg/image copy.png" },
              { id: 2, image: "/komeqimg/image copy 2.png" },
              { id: 3, image: "/komeqimg/image copy 3.png" },
              { id: 4, image: "/komeqimg/image copy 4.png" },
              { id: 5, image: "/komeqimg/image copy 5.png" },
              { id: 6, image: "/komeqimg/image copy 6.png" },
              { id: 7, image: "/komeqimg/image.png" },
            ]}
          />
        </div>
      </div>
    </ReactLenis>
  );
};

export { Skiper40 };
