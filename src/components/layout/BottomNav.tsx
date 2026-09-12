"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, MapPin, MessageCircle, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeChatUrl, setActiveChatUrl] = useState("/chat");
  const [activeMapUrl, setActiveMapUrl] = useState("/map");
  const pathname = usePathname();

  useEffect(() => {
    // Save last active trip urls
    if (pathname?.includes("/chat") || pathname?.includes("/solo-chat")) {
      localStorage.setItem("lastActiveChat", pathname);
      setActiveChatUrl(pathname);
    } else {
      // Force empty state for review purposes if they haven't explicitly visited a chat in this session
      // const savedChat = localStorage.getItem("lastActiveChat");
      // if (savedChat) setActiveChatUrl(savedChat);
    }
    
    if (pathname?.includes("/map")) {
      localStorage.setItem("lastActiveMap", pathname);
      setActiveMapUrl(pathname);
    } else {
      // Force empty state for review purposes
      // const savedMap = localStorage.getItem("lastActiveMap");
      // if (savedMap) setActiveMapUrl(savedMap);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 items-center justify-around rounded-full bg-[#a9dcfb] px-3 py-3 shadow-lg shadow-[#6ebbe4]/40 transition-all duration-300",
        isVisible ? "bottom-4 sm:bottom-6 translate-y-0 opacity-100" : "-bottom-24 translate-y-full opacity-0"
      )}
    >
      <Link href={activeMapUrl} className={cn("rounded-full p-3 transition", pathname?.includes("/map") ? "bg-white/25 text-[#ff6b3d]" : "text-[#ff8b69] hover:bg-white/30")} aria-label="Explore">
        <MapPin className={cn("size-7", pathname?.includes("/map") && "fill-current")} />
      </Link>
      <Link href="/" className={cn("rounded-full p-3 transition", pathname === "/" ? "bg-white/25 text-[#ff6b3d]" : "text-[#ff8b69] hover:bg-white/30")} aria-label="Home">
        <HomeIcon className={cn("size-7", pathname === "/" && "fill-current")} />
      </Link>
      <Link href={activeChatUrl} className={cn("rounded-full p-3 transition", pathname?.includes("/chat") || pathname?.includes("/solo-chat") ? "bg-white/25 text-[#ff6b3d]" : "text-[#ff8b69] hover:bg-white/30")} aria-label="Trips and chat">
        <MessageCircle className={cn("size-7", (pathname?.includes("/chat") || pathname?.includes("/solo-chat")) && "fill-current")} />
      </Link>
      <Link href="/onboarding" className={cn("rounded-full p-3 transition", pathname?.includes("/onboarding") ? "bg-white/25 text-[#ff6b3d]" : "text-[#ff8b69] hover:bg-white/30")} aria-label="Profile">
        <UserRound className={cn("size-7", pathname?.includes("/onboarding") && "fill-current")} />
      </Link>
    </nav>
  );
}
