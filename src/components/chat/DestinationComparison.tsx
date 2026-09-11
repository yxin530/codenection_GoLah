import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DestinationComparison() {
  return (
    <Card className="border-orange-200 bg-orange-50/50 shadow-sm mt-2 w-[350px]">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-[#F26C3D] flex items-center gap-2">
          <Map className="w-4 h-4" /> Destination Debate AI
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 text-sm space-y-4">
        <div className="text-muted-foreground text-xs leading-relaxed">
          I've compared the two options against the group preferences: <br />
          <span className="font-medium text-foreground">Osaka</span> vs <span className="font-medium text-foreground">Kyoto</span>.
        </div>
        
        <div className="space-y-3">
          {/* Osaka */}
          <div className="bg-background p-3 rounded-md border border-border space-y-2">
            <div className="flex justify-between items-center font-semibold">
              <span>🏙️ Osaka</span>
              <span className="text-green-600 text-xs">85% Match</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Great for Food & Dining (Yun Xin's top pick) and Shopping. Cheaper accommodation fits the $1,500 budget better.
            </p>
            <div className="flex gap-2">
               <Avatar className="h-5 w-5">
                 <AvatarFallback className="text-[8px] bg-green-100 text-green-700 border border-green-200">YX</AvatarFallback>
               </Avatar>
               <Avatar className="h-5 w-5">
                 <AvatarFallback className="text-[8px] bg-green-100 text-green-700 border border-green-200">XY</AvatarFallback>
               </Avatar>
            </div>
          </div>

          {/* Kyoto */}
          <div className="bg-background p-3 rounded-md border border-border space-y-2">
            <div className="flex justify-between items-center font-semibold">
              <span>⛩️ Kyoto</span>
              <span className="text-orange-500 text-xs">60% Match</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Excellent for Culture (Jie Ying's preference), but slightly over budget and fewer late-night dining options.
            </p>
            <div className="flex gap-2">
               <Avatar className="h-5 w-5">
                 <AvatarFallback className="text-[8px] bg-green-100 text-green-700 border border-green-200">JY</AvatarFallback>
               </Avatar>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1 bg-[#F26C3D] hover:bg-[#d85e33] h-8 text-xs flex gap-1">
          <ThumbsUp className="w-3 h-3" /> Vote Osaka
        </Button>
        <Button variant="outline" className="flex-1 h-8 text-xs flex gap-1">
          <ThumbsDown className="w-3 h-3" /> View More
        </Button>
      </CardFooter>
    </Card>
  );
}
