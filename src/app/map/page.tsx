"use client";

import { MapPin } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";

export default function MapPage() {
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-20">
        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <MapPin className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Map Screen</h1>
        <p className="text-muted-foreground max-w-md">
          The map feature is currently under construction. Check back soon to view your itinerary locations and explore nearby attractions!
        </p>
      </div>
      
      <BottomNav />
    </div>
  );
}
