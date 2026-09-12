const fs = require('fs');

// Fix chat page
const chatPath = 'src/app/(app)/chat/page.tsx';
let chatContent = fs.readFileSync(chatPath, 'utf8');
if (!chatContent.includes('<BottomNav />')) {
  chatContent = chatContent.replace(
    /<\/div>\n    <\/div>/,
    `</div>\n      <BottomNav />\n    </div>`
  );
  fs.writeFileSync(chatPath, chatContent);
}

// Fix map page
const mapPath = 'src/app/map/page.tsx';
let mapContent = fs.readFileSync(mapPath, 'utf8');
if (!mapContent.includes('<Input')) {
  mapContent = `"use client";

import dynamic from "next/dynamic";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Mic, LocateFixed, Utensils, Bed, Coffee, ShoppingBag, Camera } from "lucide-react";
import { useRouter } from "next/navigation";

const MapWithNoSSR = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-blue-50 flex items-center justify-center text-muted-foreground font-medium">Loading interactive map...</div>
});

const CATEGORIES = [
  { name: "Restaurant", icon: Utensils },
  { name: "Hotel", icon: Bed },
  { name: "Cafe", icon: Coffee },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Attraction", icon: Camera },
];

export default function MapPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="flex-1 relative overflow-hidden bg-blue-50 pb-20">
        
        {/* Interactive Leaflet Map */}
        <div className="absolute inset-0 z-0 pb-16">
          <MapWithNoSSR stops={[]} showRoute={false} />
        </div>

        {/* --- Floating UI on Map --- */}
        
        {/* Search & Categories (Top Left) */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[400px] z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-background rounded-full shadow-lg p-1.5 px-3 border">
              <Menu className="w-5 h-5 text-muted-foreground mr-2 cursor-pointer" />
              <Input 
                placeholder="Search..." 
                className="border-0 shadow-none focus-visible:ring-0 h-9 bg-transparent"
              />
              <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <Button size="icon" className="rounded-full shadow-lg shrink-0 h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORIES.map(cat => (
              <Button key={cat.name} variant="secondary" size="sm" className="rounded-full bg-background/90 backdrop-blur shadow-sm border whitespace-nowrap snap-start hover:bg-muted/80 h-9 px-4">
                <cat.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons (Right Side) */}
        <div className="absolute right-4 top-24 flex flex-col gap-3 z-10">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-background border h-11 w-11">
            <LocateFixed className="w-5 h-5 text-primary" />
          </Button>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
`;
  fs.writeFileSync(mapPath, mapContent);
}

