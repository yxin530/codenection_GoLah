import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info, UserPlus, Users, Settings, Camera } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SoloChatInfoSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" />}>
        <Info className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md p-0 flex flex-col">
        {/* Cover Photo Area */}
        <div className="relative h-40 w-full bg-muted/50 overflow-hidden">
          {/* Default pattern or placeholder image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b3d]/20 to-[#a9dcfb]/40" />
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-2 right-2 rounded-full h-8 px-3 text-xs bg-background/80 backdrop-blur shadow-sm hover:bg-background"
          >
            <Camera className="w-3 h-3 mr-1.5" />
            Change Cover
          </Button>
        </div>

        <div className="p-6 pt-4 flex-1">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl font-bold">Chat Info</SheetTitle>
            <SheetDescription>
              Manage your trip preferences.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 space-y-8">
            {/* Members Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground/80 uppercase tracking-wide">
                  <Users className="w-4 h-4" /> Trip Member
                </h3>
              </div>
              <div className="space-y-4 bg-muted/30 p-3 rounded-xl border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-background shadow-sm">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">YX</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">Yun Xin (You)</div>
                  </div>
                  <div className="text-[10px] font-semibold tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">Traveler</div>
                </div>
              </div>
            </div>

            {/* Traveler Preferences Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground/80 uppercase tracking-wide">
                  <Settings className="w-4 h-4" /> Traveler Preferences
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-[#F26C3D] hover:text-[#d85e33] hover:bg-orange-50">
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border/50 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Overall Budget</span>
                  <span className="font-semibold">$1,500 / pax</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Activity Style</span>
                  <span className="font-semibold">Balanced</span>
                </div>
                <div className="space-y-2 pt-1">
                  <span className="text-muted-foreground block">Top Interests</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100/50 text-[#F26C3D] border border-orange-200 text-xs px-2.5 py-1 rounded-md font-medium">Food & Dining</span>
                    <span className="bg-orange-100/50 text-[#F26C3D] border border-orange-200 text-xs px-2.5 py-1 rounded-md font-medium">Culture</span>
                    <span className="bg-orange-100/50 text-[#F26C3D] border border-orange-200 text-xs px-2.5 py-1 rounded-md font-medium">Shopping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
