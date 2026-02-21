import React from "react";
import Link from "next/link";

export const KomeqFooterBasic = () => {
     return (
          <footer className="w-full bg-transparent border-t border-white/5 py-12 z-20 relative">
               <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:justify-between">
                    <p className="flex items-center justify-center gap-2 text-sm text-foreground/50">
                         © 2026 <img src="/image.png" alt="Komeq Logo" className="h-5 w-5 object-cover rounded-md mx-1" /> KOMEQ Self Balancing Product.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                         Built with precision by{" "}
                         <Link
                              href="https://sahilmane-one.vercel.app"
                              target="_blank"
                              className="font-medium text-foreground hover:underline"
                         >
                              Sahil Mane
                         </Link>
                    </div>
               </div>
          </footer>
     );
};
