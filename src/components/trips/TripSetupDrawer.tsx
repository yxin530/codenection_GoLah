"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TripSetupDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tripType: "Solo Travel" | "Group Travel" | null;
}

export function TripSetupDrawer({ isOpen, onClose, tripType }: TripSetupDrawerProps) {
  const router = useRouter();
  const [destinations, setDestinations] = useState<string[]>([]);
  const [destInput, setDestInput] = useState("");
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  
  const [preferences, setPreferences] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleDestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = destInput.trim();
      if (val && !destinations.includes(val)) {
        setDestinations([...destinations, val]);
        setDestInput("");
      }
    }
  };

  const removeDest = (dest: string) => {
    setDestinations(destinations.filter(d => d !== dest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeParam = tripType === "Solo Travel" ? "solo" : "group";
    router.push(`/analyzing?type=${typeParam}&t=${Date.now()}`);
    onClose();
  };

  if (!tripType) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-md overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">{tripType}</DrawerTitle>
            <DrawerDescription>Let's set you up</DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="p-4 pb-0 space-y-6">
            {/* Destinations */}
            <div className="space-y-2">
              <Label htmlFor="destinations">Destinations</Label>
              <Input
                id="destinations"
                placeholder="Type a country and press Enter (e.g. unknown, not sure)"
                value={destInput}
                onChange={(e) => setDestInput(e.target.value)}
                onKeyDown={handleDestKeyDown}
              />
              {destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {destinations.map(dest => (
                    <Badge key={dest} variant="secondary" className="flex items-center gap-1">
                      {dest}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeDest(dest)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger render={<Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    />}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger render={<Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    />}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label>Budget (RM)</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                />
                <span className="text-sm text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences &amp; Interests</Label>
              <Textarea
                id="preferences"
                placeholder="What do you like to do? (e.g. Hiking, Museums, Food)"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Any special requests or constraints?"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            <DrawerFooter className="px-0">
              <Button type="submit" className="w-full bg-[#ff6b3d] hover:bg-[#f45d30] text-white">
                Submit Plan
              </Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
