"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function VisitorCounter() {
     const [count, setCount] = useState<number | null>(null);

     useEffect(() => {
          let mounted = true;

          // Increment visitor count when component mounts (once per session/load)
          const initCounter = async () => {
               try {
                    const res = await fetch('/api/visitors', { method: 'POST' });
                    const data = await res.json();
                    if (mounted && data.count) setCount(data.count);
               } catch (err) {
                    console.error("Failed to update visitor count", err);
               }
          };

          initCounter();

          // Poll every 10s for live updates without refreshing
          const interval = setInterval(async () => {
               try {
                    const res = await fetch('/api/visitors');
                    const data = await res.json();
                    if (mounted && data.count) setCount(data.count);
               } catch (err) { }
          }, 10000);

          return () => {
               mounted = false;
               clearInterval(interval);
          };
     }, []);

     if (count === null) return null;

     return (
          <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-black/60 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 hover:border-red-500/50 transition-colors shadow-lg shadow-black/50 group">
               <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
               </div>
               <Users className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
               <span className="text-sm font-mono font-medium text-gray-200">
                    {count.toLocaleString()}
               </span>
          </div>
     );
}
