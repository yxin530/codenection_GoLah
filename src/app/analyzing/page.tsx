"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AnalyzingPage() {
  const router = useRouter();

  // In a real implementation, this would poll an API or wait for an AI response
  useEffect(() => {
    const timer = setTimeout(() => {
      // For now, redirect to a new trip or back to home
      router.push("/trips/new");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#a9dcfb] text-[#ff6b3d]">
      <Loader2 className="h-16 w-16 animate-spin text-[#ff6b3d]" />
      <h1 className="mt-8 text-2xl font-bold">Analyzing your plan...</h1>
      <p className="mt-4 text-center text-[#ff6b3d]/80 max-w-md px-4">
        Our AI is crunching the numbers and looking for the best destinations, dates, and budget matches for your trip.
      </p>
    </div>
  );
}
