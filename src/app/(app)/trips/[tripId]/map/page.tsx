"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Search, 
  MapPin, 
  Menu,
  Navigation,
  Star,
  Clock,
  Car,
  Train,
  Footprints,
  MoreVertical,
  Utensils,
  Bed,
  Coffee,
  ShoppingBag,
  Camera,
  ChevronLeft,
  Image as ImageIcon,
  PlaySquare
} from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Dynamically import Leaflet map to avoid SSR issues
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

const DAY_ROUTES = [
  {
    day: "Day 1",
    date: "Oct 15",
    stops: [
      { name: "Hotel Monterey Grasmere", lat: 34.6672, lng: 135.4947 },
      { name: "Dotonbori", lat: 34.6687, lng: 135.5013 },
      { name: "Kani Doraku", lat: 34.6690, lng: 135.5015 },
    ]
  },
  {
    day: "Day 2",
    date: "Oct 16",
    stops: [
      { name: "Universal Studios Japan", lat: 34.6654, lng: 135.4323 },
      { name: "Umeda Sky Building", lat: 34.7053, lng: 135.4896 },
    ]
  },
  {
    day: "Day 3",
    date: "Oct 17",
    stops: [
      { name: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727 },
      { name: "Nishiki Market", lat: 35.0050, lng: 135.7649 },
    ]
  }
];

export default function SmartMapPage() {
  const [activePlace, setActivePlace] = useState(true);
  const [isNavigating, setIsNavigating] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  const activeRoute = DAY_ROUTES[selectedDay];

  return (
    <div className="relative w-full min-h-[calc(100vh-120px)] pb-24 flex bg-background rounded-xl overflow-hidden border shadow-sm">
      
      {/* MAP AREA (Left/Main Side) */}
      <div className="flex-1 relative overflow-hidden bg-blue-50">
        
        {/* Interactive Leaflet Map */}
        <div className="absolute inset-0 z-0">
          <MapWithNoSSR stops={activeRoute.stops} />
        </div>

        {/* --- Floating UI on Map --- */}
        
        {/* Search & Categories (Top Left) */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[400px] z-10 flex flex-col gap-3">
          <div className="flex items-center bg-background rounded-full shadow-lg p-1.5 px-3 border">
            <Menu className="w-5 h-5 text-muted-foreground mr-2 cursor-pointer" />
            <Input 
              placeholder="Search..." 
              className="border-0 shadow-none focus-visible:ring-0 h-9 bg-transparent"
            />
            <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
              <Search className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat, idx) => (
              <Button key={idx} variant="secondary" size="sm" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm whitespace-nowrap text-xs h-8">
                <cat.icon className="w-3.5 h-3.5 mr-1.5 text-[#F26C3D]" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mt-2">
            {DAY_ROUTES.map((route, index) => (
              <Button
                key={route.day}
                type="button"
                size="sm"
                variant={selectedDay === index ? "default" : "secondary"}
                onClick={() => {
                  setSelectedDay(index);
                  setActivePlace(false);
                }}
                className={selectedDay === index ? "rounded-full bg-[#F26C3D] text-white hover:bg-[#d85e33]" : "rounded-full bg-background/90"}
              >
                {route.day} · {route.date}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation Overlay (Bottom Center/Left) */}
        {isNavigating && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 z-10 bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl border p-4 w-[90%] md:w-[350px]">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-green-600">18 min</h3>
                <p className="text-muted-foreground text-sm font-medium">1.2 km • via Nakamise Shopping Street</p>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                <Navigation className="w-5 h-5 text-blue-500 fill-current" />
              </Button>
            </div>
            <div className="flex gap-2 mb-4">
              <Button variant="secondary" size="sm" className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
                <Footprints className="w-4 h-4 mr-2" /> Walk
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
                <Train className="w-4 h-4 mr-2" /> Transit
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
                <Car className="w-4 h-4 mr-2" /> Drive
              </Button>
            </div>
            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Start Navigation
            </Button>
          </div>
        )}

      </div>

      {/* SIDE PANEL (Right Side) */}
      {activePlace && (
        <div className="w-full md:w-[400px] h-full bg-background border-l shadow-2xl flex flex-col z-20 absolute right-0 top-0 bottom-0 md:relative">
          
          {/* Header Image Gallery Mock */}
          <div className="relative h-48 w-full bg-muted flex-shrink-0">
            <div className="absolute top-4 left-4 z-10">
              <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md hover:bg-white transition-colors" onClick={() => setActivePlace(false)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md bg-white/80 backdrop-blur-md text-black">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Fake Image Grid */}
            <div className="w-full h-full flex">
              <div className="w-2/3 h-full bg-gradient-to-br from-orange-200 to-red-300 relative border-r-2 border-white">
                <div className="absolute inset-0 flex items-center justify-center text-black/20 font-bold text-xl">Main Photo</div>
              </div>
              <div className="w-1/3 h-full flex flex-col">
                <div className="h-1/2 bg-gradient-to-br from-blue-200 to-cyan-200 border-b-2 border-white relative">
                   <div className="absolute inset-0 flex items-center justify-center text-black/20 font-bold text-sm">Photo 2</div>
                </div>
                <div className="h-1/2 bg-gradient-to-br from-green-200 to-emerald-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-sm cursor-pointer hover:bg-black/50 transition-colors">
                    +42 Photos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Place Details */}
          <ScrollArea className="flex-1">
            <div className="p-5">
              <h1 className="text-3xl font-bold mb-2">Senso-ji Temple</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-lg font-medium">
                  4.8 <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-muted-foreground text-sm underline cursor-pointer">(14,231 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="text-xs">Historic Site</Badge>
                <Badge variant="secondary" className="text-xs">Culture</Badge>
                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">Open Now</Badge>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full border-b rounded-none h-auto p-0 bg-transparent justify-start gap-6">
                  <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F26C3D] data-[state=active]:bg-transparent px-0 py-2">Overview</TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F26C3D] data-[state=active]:bg-transparent px-0 py-2">Reviews</TabsTrigger>
                  <TabsTrigger value="media" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F26C3D] data-[state=active]:bg-transparent px-0 py-2">Photos & Videos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Tokyo&apos;s oldest and most significant Buddhist temple. Originally founded in 628, it features the iconic Kaminarimon (Thunder Gate) and a vibrant shopping street leading to the main hall.
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span>2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-green-600 font-medium">Open 24 hours</span>
                        <div className="text-muted-foreground mt-0.5">Temple grounds are always open, main hall 6:00 AM - 5:00 PM</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-5">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="space-y-2 border-b pb-4 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500"></div>
                        <div>
                          <p className="font-semibold text-sm">Sarah Jenkins</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-auto">2 weeks ago</span>
                      </div>
                      <p className="text-sm text-foreground/80">
                        Absolutely stunning temple. The entrance gate with the massive lantern is breathtaking. Try to visit early in the morning before the crowds arrive!
                      </p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="media" className="mt-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-32 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="h-32 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <PlaySquare className="w-8 h-8 text-muted-foreground/30" />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">0:15</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="h-32 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="h-32 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group">
                      <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-pointer"></div>
                    </div>
                  </div>
                </TabsContent>

              </Tabs>
            </div>
          </ScrollArea>
        </div>
      )}
      <BottomNav />
    </div>
  );
}

