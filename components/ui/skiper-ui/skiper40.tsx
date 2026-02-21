"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";

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
  { name: "Home", href: "#", description: "[0]" },
  { name: "About", href: "#about", description: "[1]" },
  { name: "Price", href: "#price", description: "[2]" },
  { name: "Specs", href: "#specs", description: "[3]" },
  { name: "Credits", href: "#credits", description: "[4]" },
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
              <a href={item.href}>
                <TextRoll
                  center
                  className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors md:text-6xl"
                >
                  {item.name}
                </TextRoll>
              </a>
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



// --- Main Navbar Component ---
const Skiper40 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
          <span className="hidden ml-3 font-semibold text-foreground sm:flex sm:items-center">
            <span className="text-red-500 font-bold pr-1">[R]</span>KOMEQ
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
    </>
  );
};

export { Skiper40 };
