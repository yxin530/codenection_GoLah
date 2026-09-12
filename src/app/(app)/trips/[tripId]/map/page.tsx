"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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


const ALL_PLACES: Record<string, any> = {
  "Hotel Monterey Grasmere": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1622359419139-4444585141f2?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Elegant European-style hotel with panoramic city views from the upper floors." },
  "Cross Hotel Osaka": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Modern, stylish hotel located right in the heart of Dotonbori." },
  "Kyoto Ryokan Kinoe": { location: "Gion, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Traditional Japanese inn featuring tatami rooms." },
  "Nine Hours Namba": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Futuristic capsule hotel offering a unique and affordable stay." },
  "Ritz-Carlton Kyoto": { location: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Experience ultimate luxury on the banks of the Kamogawa river." },
  "Universal Studios Japan": { location: "Konohana Ward", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A major theme park offering thrilling rides based on popular movies.", tags: ["Theme Park"] },
  "Fushimi Inari Taisha": { location: "Fushimi Ward, Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "Famous for its thousands of vermilion torii gates.", tags: ["Culture", "Shrine"] },
  "Osaka Castle": { location: "Chuo Ward, Osaka", image: "https://images.unsplash.com/photo-1583335508892-747fceb4131b?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A famous Japanese castle that played a major role in the unification of Japan.", tags: ["History", "Castle"] },
  "Arashiyama Bamboo Grove": { location: "Arashiyama, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A mesmerizing path winding through towering bamboo stalks.", tags: ["Nature"] },
  "Kuromon Market": { location: "Nipponbashi, Osaka", image: "https://images.unsplash.com/photo-1623880590898-d14efdceab9a?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A lively covered market known for its fresh seafood and street food.", tags: ["Food Market"] },
  "Dotonbori": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1559828551-789a8119bf74?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "One of the principal tourist and nightlife areas in Osaka.", tags: ["Street Food"] }
};

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
  const [activePlace, setActivePlace] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationQuery = searchParams.get('location');
  const dayQuery = searchParams.get('day');
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [hasPlanning, setHasPlanning] = useState(false);

  useEffect(() => {
    if (dayQuery !== null) {
      const dayIdx = parseInt(dayQuery, 10);
      if (!isNaN(dayIdx)) setSelectedDay(dayIdx);
    }
  }, [dayQuery]);

  useEffect(() => {
    // Check if user has done any planning
    const accChoice = localStorage.getItem('approvedPollAcc');
    const likedPlaces = localStorage.getItem('tripLikedPlaces');
    if (accChoice || likedPlaces) {
      setHasPlanning(true);
    }

    if (locationQuery && ALL_PLACES[locationQuery]) {
      setPlaceDetails({ name: locationQuery, ...ALL_PLACES[locationQuery] });
      setActivePlace(true);
    } else {
      setActivePlace(false);
      setPlaceDetails(null);
    }
  }, [locationQuery]);

  const activeRoute = hasPlanning ? (selectedDay !== null ? DAY_ROUTES[selectedDay] : { stops: DAY_ROUTES.flatMap(d => d.stops) }) : { stops: [] };

  return (
    <div className="relative w-full min-h-[calc(100vh-120px)] pb-24 flex bg-background rounded-xl overflow-hidden border shadow-sm">
      
      {/* MAP AREA (Left/Main Side) */}
      <div className="flex-1 relative overflow-hidden bg-blue-50">
        
        {/* Interactive Leaflet Map */}
        <div className="absolute inset-0 z-0">
          <MapWithNoSSR 
            stops={activeRoute.stops} 
            showRoute={selectedDay !== null}
            onMarkerClick={(name) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('location', name);
              router.push('?' + params.toString());
            }}
          />
        </div>

        {/* --- Floating UI on Map --- */}
        
        {/* Search & Categories (Top Left) */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[400px] z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-background shrink-0" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 flex items-center bg-background rounded-full shadow-lg p-1.5 px-3 border">
            <Menu className="w-5 h-5 text-muted-foreground mr-2 cursor-pointer" />
            <Input 
              placeholder="Search..." 
              className="border-0 shadow-none focus-visible:ring-0 h-9 bg-transparent"
            />
            <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
              <Search className="w-4 h-4 text-muted-foreground" />
            </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat, idx) => (
              <Button key={idx} variant="secondary" size="sm" className="rounded-full bg-background/90 backdrop-blur-sm shadow-sm whitespace-nowrap text-xs h-8">
                <cat.icon className="w-3.5 h-3.5 mr-1.5 text-[#F26C3D]" />
                {cat.name}
              </Button>
            ))}
          </div>

          {hasPlanning && <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mt-2">
            {DAY_ROUTES.map((route, index) => (
              <Button
                key={route.day}
                type="button"
                size="sm"
                variant={selectedDay === index ? "default" : "secondary"}
                onClick={() => {
                  setSelectedDay(selectedDay === index ? null : index);
                  if (activePlace) router.back();
                }}
                className={selectedDay === index ? "rounded-full bg-[#F26C3D] text-white hover:bg-[#d85e33]" : "rounded-full bg-background/90"}
              >
                {route.day} · {route.date}
              </Button>
            ))}
          </div>}
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
              <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md hover:bg-white transition-colors" onClick={() => router.back()}>
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
              <div className="w-2/3 h-full relative border-r-2 border-white">
                <img src={placeDetails?.image || "https://images.unsplash.com/photo-1559828551-789a8119bf74"} className="w-full h-full object-cover" />
              </div>
              <div className="w-1/3 h-full flex flex-col">
                <div className="h-1/2 relative border-b-2 border-white">
                   <img src="https://images.unsplash.com/photo-1580822184713-f66fbbbd5935?auto=format&fit=crop&w=400" className="w-full h-full object-cover" />
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
              <h1 className="text-3xl font-bold mb-2">{placeDetails?.name || 'Senso-ji Temple'}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-lg font-medium">
                  4.8 <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-muted-foreground text-sm underline cursor-pointer">(14,231 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {placeDetails?.tags?.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
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
                    {placeDetails?.desc || "A popular destination."}
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{placeDetails?.location || "Tokyo, Japan"}</span>
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

