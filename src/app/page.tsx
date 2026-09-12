"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home as HomeIcon, MapPin, MessageCircle, Search, UserRound, UsersRound, Video } from "lucide-react";
import { useState } from "react";
import { TripSetupDrawer } from "@/components/trips/TripSetupDrawer";
import { BottomNav } from "@/components/layout/BottomNav";

const flights = [
  { title: "Kuala Lumpur to Bangkok", meta: "From RM 219 · 2h 15m", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80" },
  { title: "Kuala Lumpur to Bali", meta: "From RM 289 · 3h 05m", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80" },
];
const malaysia = [
  { title: "A slow weekend in Langkawi", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80" },
  { title: "Food trails through Penang", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80" },
];
const travelPosts = [
  { title: "Sunrise, street food and a little bit of Seoul", type: "Photo post", image: "https://images.unsplash.com/photo-1538485399081-7c897d5bfbf6?auto=format&fit=crop&w=900&q=80" },
  { title: "My three-day Kyoto itinerary", type: "Reel", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80" },
  { title: "Where should I go for my next solo trip?", type: "Text post", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80" },
  { title: "A quiet morning in the Cameron Highlands", type: "Photo post", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#ff6b3d] sm:text-2xl">{children}</h2><button className="flex items-center gap-1 text-sm font-semibold text-[#ff6b3d] transition hover:opacity-70">See all <ChevronRight className="size-4" /></button></div>;
}

function ImageCard({ title, meta, image, video = false }: { title: string; meta?: string; image: string; video?: boolean }) {
  return <article className="group relative aspect-[0.88] overflow-hidden rounded-2xl bg-[#d2d2d2] shadow-sm"><Image src={image} alt="" fill sizes="(max-width: 640px) 45vw, 280px" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />{video && <span className="absolute right-3 top-3 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm"><Video className="size-4" /></span>}<div className="absolute inset-x-3 bottom-3 text-white"><p className="line-clamp-2 text-sm font-bold leading-tight">{title}</p>{meta && <p className="mt-1 text-xs font-medium text-white/80">{meta}</p>}</div></article>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tripType, setTripType] = useState<"Solo Travel" | "Group Travel" | null>(null);

  const openDrawer = (type: "Solo Travel" | "Group Travel") => {
    setTripType(type);
    setDrawerOpen(true);
  };
  return <main className="min-h-screen bg-[#a9dcfb] text-[#ff6b3d]"><div className="mx-auto min-h-screen max-w-[1180px] bg-white shadow-[0_0_40px_rgba(20,100,150,0.12)] sm:px-8 lg:px-12">
    <header className="px-5 pb-7 pt-6 sm:px-0 sm:pt-10"><div className="flex items-start justify-between"><Link href="/" aria-label="GoLah home"><img src="/assets/logo.png" alt="GoLah" className="h-10 w-auto drop-shadow-sm" /></Link><Link href="/onboarding" className="rounded-full bg-[#fff2ed] px-4 py-2 text-xs font-bold text-[#ff6b3d] transition hover:bg-[#ffe2d7]">Plan a trip</Link></div><div className="relative mt-8"><Search className="pointer-events-none absolute left-5 top-1/2 size-6 -translate-y-1/2 text-[#a9dcfb]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where are you going?" aria-label="Search destinations" className="h-14 w-full rounded-full border-2 border-[#a9dcfb] bg-white pl-14 pr-5 text-base font-semibold text-[#333] outline-none placeholder:text-[#a9dcfb] focus:border-[#ff6b3d] sm:text-lg" /></div>{query && <p className="mt-2 pl-5 text-sm font-semibold text-[#9a9a9a]">Showing ideas for “{query}”</p>}</header>
    <div className="space-y-8 px-5 pb-32 sm:px-0 sm:pb-36 lg:space-y-10"><section><h1 className="mb-4 text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">Customise your trip with AI</h1><div className="grid grid-cols-2 overflow-hidden rounded-[24px] bg-[#ff6b3d] text-white"><button onClick={() => openDrawer("Solo Travel")} className="flex min-h-28 w-full items-center gap-3 px-5 transition hover:bg-[#f45d30] sm:justify-center sm:gap-5"><UserRound className="size-10 text-[#a9dcfb]" strokeWidth={1.7} /><span className="text-base font-bold sm:text-lg">Solo Trip</span></button><button onClick={() => openDrawer("Group Travel")} className="flex min-h-28 w-full items-center gap-3 border-l border-white/80 px-5 transition hover:bg-[#f45d30] sm:justify-center sm:gap-5"><UsersRound className="size-10 text-[#a9dcfb]" strokeWidth={1.7} /><span className="text-base font-bold sm:text-lg">Group Trip</span></button></div></section>
      <section><SectionHeading>Recommended cheapest flights</SectionHeading><div className="grid grid-cols-2 gap-4 sm:gap-6">{flights.map((flight) => <ImageCard key={flight.title} {...flight} />)}</div></section>
      <section><SectionHeading>Explore Malaysia</SectionHeading><div className="grid grid-cols-2 gap-4 sm:gap-6">{malaysia.map((place) => <ImageCard key={place.title} {...place} />)}</div></section>
      <section><SectionHeading>Travel For You</SectionHeading><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">{travelPosts.map((post) => <ImageCard key={post.title} {...post} video={post.type === "Reel"} />)}</div></section>
    </div>
    <BottomNav />
    <TripSetupDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} tripType={tripType} />
  </div></main>;
}
