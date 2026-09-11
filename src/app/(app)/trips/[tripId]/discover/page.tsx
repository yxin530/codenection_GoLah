import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, Sparkles, MapPin } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[600px] bg-card/30 backdrop-blur-sm shadow-sm border border-border rounded-xl p-6">
      
      <div className="mb-6 text-center space-y-2">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F26C3D]" /> AI Destination Discovery
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Swipe right to vote yes, left for no. GoLah will use your group's votes to finalize the itinerary!
        </p>
      </div>

      <div className="relative w-full max-w-sm h-[400px]">
        {/* Card Mockup */}
        <Card className="absolute inset-0 overflow-hidden shadow-lg border-2 border-border rounded-3xl flex flex-col z-10 rotate-1 origin-bottom transition-transform cursor-grab">
          <div className="flex-1 bg-muted relative">
            <div className="absolute inset-0 bg-orange-100 flex items-center justify-center text-orange-400">
               Image of Shibuya Crossing
            </div>
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 text-white">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                Shibuya Crossing
              </h3>
              <p className="text-sm opacity-90 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> Shibuya, Tokyo
              </p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-2 py-1 rounded-md text-xs backdrop-blur-md">Shopping</span>
                <span className="bg-white/20 px-2 py-1 rounded-md text-xs backdrop-blur-md">City Life</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Background Card Mockup */}
        <Card className="absolute inset-0 overflow-hidden shadow-sm border-2 border-border rounded-3xl flex flex-col -z-0 -rotate-3 scale-95 opacity-50">
           <div className="flex-1 bg-muted"></div>
        </Card>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 bg-white shadow-sm">
          <X className="w-6 h-6" />
        </Button>
        <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-2 border-green-200 text-green-500 hover:bg-green-50 hover:text-green-600 bg-white shadow-sm">
          <Heart className="w-6 h-6" />
        </Button>
      </div>
      
    </div>
  );
}
