import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info, UserPlus, Users, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatInfoSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Info className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Group Chat Info</SheetTitle>
          <SheetDescription>
            Manage trip members and group preferences.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          {/* Members Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" /> Trip Members
              </h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-[#F26C3D]">
                <UserPlus className="w-3 h-3 mr-1" /> Invite
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>YX</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">Yun Xin (You)</div>
                </div>
                <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">Organizer</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JY</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">Jie Ying</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>XY</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">Xuan Yu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Preferences Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" /> Group Preferences
              </h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-[#F26C3D]">
                Edit
              </Button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Overall Budget:</span>
                <span className="font-medium">$1,500 / pax</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Activity Style:</span>
                <span className="font-medium">Balanced</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Top Interests:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md">Food & Dining</span>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md">Culture</span>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-md">Shopping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
