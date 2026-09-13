"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetDemoMode } from "@/lib/demoMode";
import {
  Play, ChevronDown, ChevronUp, RotateCcw,
  MessageSquare, Map, Hotel, CalendarDays, Globe,
} from "lucide-react";

const SHORTCUTS = [
  { label: "Chat", icon: MessageSquare, href: "/trips/group-trip/chat", color: "text-blue-300 bg-blue-500/15 hover:bg-blue-500/30" },
  { label: "Plan", icon: Map, href: "/trips/group-trip/chat?ch=planning", color: "text-purple-300 bg-purple-500/15 hover:bg-purple-500/30" },
  { label: "Stays", icon: Hotel, href: "/trips/group-trip/chat?ch=accommodation", color: "text-pink-300 bg-pink-500/15 hover:bg-pink-500/30" },
  { label: "Trip", icon: CalendarDays, href: "/trips/group-trip/itinerary", color: "text-orange-300 bg-orange-500/15 hover:bg-orange-500/30" },
  { label: "Community", icon: Globe, href: "/community", color: "text-green-300 bg-green-500/15 hover:bg-green-500/30" },
];

export function DemoBanner() {
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();

  const handleReset = () => {
    resetDemoMode();
    window.location.href = "/";
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-full bg-[#1a1a2e]/90 backdrop-blur-md border border-white/10 text-white px-4 py-2.5 text-xs font-bold shadow-xl hover:bg-[#24243e] transition-all duration-200"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F26C3D]">
          <Play className="h-2.5 w-2.5 fill-white text-white ml-0.5" />
        </span>
        Demo
        <ChevronUp className="h-3.5 w-3.5 text-white/40" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 w-72">
      <div className="rounded-2xl bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F26C3D]">
              <Play className="h-3 w-3 fill-white text-white ml-0.5" />
            </span>
            <span className="text-xs font-extrabold text-white tracking-wide uppercase">Demo Mode</span>
            <span className="text-[9px] font-bold text-white/30 bg-white/5 px-1.5 py-0.5 rounded-md">Osaka &amp; Kyoto</span>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="ml-2 shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/70"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Nav */}
        <div className="p-3 space-y-2">
          <p className="text-[9px] font-bold text-white/25 uppercase tracking-widest px-1">Jump to feature</p>
          <div className="grid grid-cols-5 gap-1.5">
            {SHORTCUTS.map((s) => (
              <button
                key={s.label}
                onClick={() => router.push(s.href)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150 ${s.color}`}
              >
                <s.icon className="h-3.5 w-3.5" />
                <span className="text-[8px] font-bold leading-none">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="px-3 pb-3">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.09] text-white/40 hover:text-white/70 py-2 text-[11px] font-bold transition-all duration-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
}
