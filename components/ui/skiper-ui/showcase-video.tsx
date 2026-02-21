"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
     MediaControlBar,
     MediaController,
     MediaMuteButton,
     MediaPlayButton,
     MediaSeekBackwardButton,
     MediaSeekForwardButton,
     MediaTimeDisplay,
     MediaTimeRange,
     MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
     <MediaController
          style={{
               ...style,
          }}
          {...props}
     />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
     <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
     className,
     ...props
}: VideoPlayerTimeRangeProps) => (
     <MediaTimeRange
          className={cn(
               "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
               className,
          )}
          {...props}
     />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
     typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
     className,
     ...props
}: VideoPlayerTimeDisplayProps) => (
     <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
     typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
     className,
     ...props
}: VideoPlayerVolumeRangeProps) => (
     <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
     className,
     ...props
}: VideoPlayerPlayButtonProps) => (
     <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
     typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
     className,
     ...props
}: VideoPlayerSeekBackwardButtonProps) => (
     <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
     typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
     className,
     ...props
}: VideoPlayerSeekForwardButtonProps) => (
     <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
     className,
     ...props
}: VideoPlayerMuteButtonProps) => (
     <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
     className,
     ...props
}: VideoPlayerContentProps) => (
     <video className={cn("mb-0 mt-0", className)} {...props} />
);

export const ShowcaseVideo = () => {
     const [showVideoPopOver, setShowVideoPopOver] = useState(false);

     const SPRING = {
          mass: 0.1,
     };

     const x = useSpring(0, SPRING);
     const y = useSpring(0, SPRING);
     const opacity = useSpring(0, SPRING);

     const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
          opacity.set(1);
          const bounds = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - bounds.left);
          y.set(e.clientY - bounds.top);
     };

     return (
          <section className="relative flex min-h-[50vh] w-full items-center justify-center bg-transparent py-24 z-10">
               <div className="absolute top-[10%] grid content-start justify-items-center gap-6 text-center z-0">
                    <span className="relative whitespace-nowrap text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:from-foreground after:to-transparent after:content-[''] font-orbitron">
                         Click the video to play
                    </span>
               </div>
               <AnimatePresence>
                    {showVideoPopOver && (
                         <VideoPopOver setShowVideoPopOver={setShowVideoPopOver} />
                    )}
               </AnimatePresence>
               <div
                    onMouseMove={handlePointerMove}
                    onMouseLeave={() => {
                         opacity.set(0);
                    }}
                    onClick={() => setShowVideoPopOver(true)}
                    className="w-full max-w-5xl rounded-2xl overflow-hidden cursor-none relative z-20 shadow-2xl border border-white/10"
               >
                    <motion.div
                         style={{ x, y, opacity }}
                         className="absolute z-30 flex w-fit select-none items-center justify-center gap-2 p-3 font-orbitron font-bold text-sm text-white mix-blend-exclusion pointer-events-none"
                    >
                         <Play className="size-5 fill-white" />
                    </motion.div>
                    <video
                         autoPlay
                         muted
                         playsInline
                         loop
                         className="h-auto w-full object-cover rounded-2xl opacity-80 hover:opacity-100 transition-opacity duration-500"
                    >
                         <source src="/komeqvideo.mp4" />
                    </video>
               </div>
          </section>
     );
};

const VideoPopOver = ({
     setShowVideoPopOver,
}: {
     setShowVideoPopOver: (showVideoPopOver: boolean) => void;
}) => {
     return (
          <div className="fixed left-0 top-0 z-101 flex h-screen w-screen items-center justify-center">
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-background/90 absolute left-0 top-0 h-full w-full backdrop-blur-3xl"
                    onClick={() => setShowVideoPopOver(false)}
               ></motion.div>
               <motion.div
                    initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5% )", opacity: 0 }}
                    animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                    exit={{
                         clipPath: "inset(43.5% 43.5% 33.5% 43.5% )",
                         opacity: 0,
                         transition: {
                              duration: 1,
                              type: "spring",
                              stiffness: 100,
                              damping: 20,
                              opacity: { duration: 0.2, delay: 0.8 },
                         },
                    }}
                    transition={{
                         duration: 1,
                         type: "spring",
                         stiffness: 100,
                         damping: 20,
                    }}
                    className="relative aspect-video w-[90vw] max-w-7xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] border border-white/10"
               >
                    <VideoPlayer style={{ width: "100%", height: "100%" }}>
                         <VideoPlayerContent
                              src="/komeqvideo.mp4"
                              autoPlay
                              slot="media"
                              className="w-full object-cover"
                              style={{ width: "100%", height: "100%" }}
                         />

                         <span
                              onClick={() => setShowVideoPopOver(false)}
                              className="absolute right-4 top-4 z-10 cursor-pointer rounded-full p-2 bg-black/50 hover:bg-black/80 transition-colors backdrop-blur-md"
                         >
                              <Plus className="size-6 rotate-45 text-white" />
                         </span>
                         <VideoPlayerControlBar className="absolute bottom-4 left-1/2 flex w-[95%] max-w-7xl -translate-x-1/2 items-center justify-center px-5 rounded-xl bg-black/50 backdrop-blur-md md:px-10 md:py-2 border border-white/5">
                              <VideoPlayerPlayButton className="h-6 bg-transparent hover:text-red-500 transition-colors" />
                              <VideoPlayerTimeRange className="bg-transparent text-red-500" />
                              <VideoPlayerMuteButton className="size-6 bg-transparent hover:text-red-500 transition-colors" />
                         </VideoPlayerControlBar>
                    </VideoPlayer>
               </motion.div>
          </div>
     );
};
