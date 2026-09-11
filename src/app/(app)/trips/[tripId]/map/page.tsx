import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Plus } from "lucide-react";
import Image from "next/image";

export default function SmartMapPage() {
  return (
    <div className="flex h-[600px] border border-border rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm relative">
      
      {/* Map Mock Area */}
      <div className="flex-1 bg-blue-50/50 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Fake Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/139.769,35.680,12/800x600?access_token=YOUR_MAPBOX_ACCESS_TOKEN')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        {/* Fake Map Markers */}
        <div className="absolute top-[30%] left-[40%] bg-white p-1 rounded-full shadow-md z-10 hover:scale-110 transition-transform cursor-pointer">
          <div className="bg-[#F26C3D] w-6 h-6 flex items-center justify-center rounded-full text-white">
            <MapPin className="w-3 h-3" />
          </div>
        </div>
        <div className="absolute top-[50%] left-[60%] bg-white p-1 rounded-full shadow-md z-10 hover:scale-110 transition-transform cursor-pointer">
          <div className="bg-[#F26C3D] w-6 h-6 flex items-center justify-center rounded-full text-white">
            <MapPin className="w-3 h-3" />
          </div>
        </div>

        <div className="z-20 text-muted-foreground bg-white/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
          Interactive map visualization goes here
        </div>
      </div>

      {/* Side Panel: Location Details & Reviews */}
      <div className="w-80 border-l border-border bg-background p-4 flex flex-col h-full z-10">
        <div className="flex-1 overflow-y-auto space-y-6">
          
          <div>
            <div className="w-full h-32 bg-muted rounded-md mb-3 flex items-center justify-center text-muted-foreground relative overflow-hidden">
               <div className="absolute inset-0 bg-orange-100"></div>
               <span className="relative z-10">Place Image Mock</span>
            </div>
            <h2 className="text-xl font-semibold">Senso-ji Temple</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span className="flex items-center text-yellow-500"><Star className="w-3 h-3 fill-current mr-1"/> 4.8</span>
              <span>(12k+ reviews)</span>
            </div>
            <p className="text-sm mt-3 text-foreground/80 leading-relaxed">
              Tokyo's oldest Buddhist temple. Highly recommended by the AI based on Jie Ying's interest in Culture.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-sm">Community Comments</h3>
            
            <div className="bg-muted p-3 rounded-md text-sm space-y-1">
              <div className="font-semibold text-xs flex justify-between">
                <span>@travel_junkie</span>
                <span className="text-muted-foreground">1w ago</span>
              </div>
              <p className="text-foreground/80">Go early! Around 7am is best to avoid the massive crowds.</p>
            </div>

            <div className="bg-muted p-3 rounded-md text-sm space-y-1">
              <div className="font-semibold text-xs flex justify-between">
                <span>@tokyo_eats</span>
                <span className="text-muted-foreground">2w ago</span>
              </div>
              <p className="text-foreground/80">Try the melon pan near the entrance, it's amazing.</p>
            </div>
          </div>
          
        </div>

        <div className="pt-4 border-t border-border space-y-2 mt-auto">
          <Button variant="outline" className="w-full text-xs h-9 justify-start">
            Check Live Availability / Tickets
          </Button>
          <Button className="w-full bg-[#F26C3D] hover:bg-[#d85e33] flex items-center gap-2 h-9 text-xs">
            <Plus className="w-4 h-4" /> Add to Trip Itinerary
          </Button>
        </div>
      </div>

    </div>
  );
}
