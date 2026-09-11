import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MapPin } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Discover travel ideas and status updates from others.</p>
        </div>
        <Button className="bg-[#F26C3D] hover:bg-[#d85e33]">
          Create Post
        </Button>
      </div>

      <div className="grid gap-6 max-w-2xl">
        
        {/* Mock Post 1 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">Alex Lee</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Just finished a 5-day hike in the Swiss Alps. The weather was perfect! If you're planning a trip there, definitely add Oeschinensee to your itinerary.</p>
            <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center text-muted-foreground relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-50/50"></div>
               <span className="relative z-10">Image Mock: Swiss Alps</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#F26C3D] font-medium bg-orange-50 w-fit px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" /> Kandersteg, Switzerland
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-4 flex gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="w-4 h-4" /> 245
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" /> 18
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 ml-auto">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </CardFooter>
        </Card>

        {/* Mock Post 2 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <Avatar>
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">Sarah Kim</span>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Currently in Kyoto. It's beautiful but so crowded right now. I'm torn between staying in the city or taking a day trip to Nara tomorrow. GoLah AI suggested Nara because I like animals... any thoughts?</p>
            <div className="flex items-center gap-2 text-sm text-[#F26C3D] font-medium bg-orange-50 w-fit px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" /> Kyoto, Japan
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-4 flex gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="w-4 h-4" /> 112
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" /> 45
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 ml-auto">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
