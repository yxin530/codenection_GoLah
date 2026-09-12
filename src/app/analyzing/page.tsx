"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const tripType = searchParams.get('type') || 'group';

  // In a real implementation, this would poll an API or wait for an AI response
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tripType === 'solo') {
        router.push("/trips/temp-trip-id/solo-chat");
      } else {
        router.push("/trips/temp-trip-id/chat");
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [router, tripType]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-[#333]">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden">
        <video 
          src="/assets/AI-animation.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-[1.2] rounded-full"
        />
      </div>
      <h1 className="mt-8 text-2xl font-bold tracking-tight text-[#ff6b3d]">Analyzing your plan...</h1>
      <p className="mt-4 text-center text-muted-foreground max-w-md px-4 font-medium">
        Our AI is crunching the numbers and looking for the best destinations, dates, and budget matches for your trip.
      </p>
    </div>
  );
}
