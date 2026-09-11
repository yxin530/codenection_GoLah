"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home as HomeIcon, MapPin, MessageCircle, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down (current > last), hide the nav.
      // If we scroll up (current < last), show the nav.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 items-center justify-around rounded-full bg-[#a9dcfb] px-3 py-3 shadow-lg shadow-[#6ebbe4]/40 transition-all duration-300",
        isVisible ? "bottom-4 sm:bottom-6 translate-y-0 opacity-100" : "-bottom-24 translate-y-full opacity-0"
      )}
    >
      <Link href="/map" className="rounded-full p-3 text-[#ff8b69] transition hover:bg-white/30" aria-label="Explore">
        <MapPin className="size-7" />
      </Link>
      <Link href="/" className="rounded-full bg-white/25 p-3 text-[#ff6b3d] transition hover:bg-white/40" aria-label="Home">
        <HomeIcon className="size-7 fill-current" />
      </Link>
      <Link href="/trips/temp-trip-id/chat" className="rounded-full p-3 text-[#ff8b69] transition hover:bg-white/30" aria-label="Trips and chat">
        <MessageCircle className="size-7" />
      </Link>
      <Link href="/onboarding" className="rounded-full p-3 text-[#ff8b69] transition hover:bg-white/30" aria-label="Profile">
        <UserRound className="size-7" />
      </Link>
    </nav>
  );
}
