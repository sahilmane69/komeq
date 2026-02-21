import React from "react";
import Link from "next/link";

export const FooterBasic = () => {
     return (
          <footer className="w-full bg-background border-t border-white/5 py-12 z-20 relative">
               <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:justify-between">
                    <p className="flex items-center justify-center gap-2 text-sm text-foreground/50">
                         © 2026 <img src="/image.png" alt=" Logo" className="h-5 w-5 object-cover rounded-md mx-1" /> KOMEQ Self Balancing Product.
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-foreground/50">
                         <div className="flex items-center gap-3">
                              <Link href="https://github.com/sahilmane69" target="_blank" className="font-medium text-foreground hover:text-foreground/80 transition-colors">GitHub</Link>
                              <span className="opacity-40">•</span>
                              <Link href="https://linkedin.com/in/sahilmane74" target="_blank" className="font-medium text-foreground hover:text-foreground/80 transition-colors">LinkedIn</Link>
                         </div>
                         <span className="hidden md:inline-block opacity-40">|</span>
                         <span className="flex items-center gap-1">
                              Built with precision by{" "}
                              <Link
                                   href="https://sahilmane-one.vercel.app"
                                   target="_blank"
                                   className="font-medium text-foreground hover:underline"
                              >
                                   Sahil Mane
                              </Link>
                         </span>
                    </div>
               </div>
          </footer>
     );
};
