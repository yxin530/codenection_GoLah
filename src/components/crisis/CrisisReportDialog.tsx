'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plane, Umbrella, Clock } from "lucide-react";
import { useState } from "react";

export function CrisisReportDialog() {
  const [reported, setReported] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white gap-2 h-9">
          <AlertTriangle className="w-4 h-4" /> Report Crisis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" /> Travel Crisis
          </DialogTitle>
          <DialogDescription>
            Are you experiencing an issue during your trip? Let GoLah's Crisis Agent assist you.
          </DialogDescription>
        </DialogHeader>

        {!reported ? (
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setReported(true)}>
              <Plane className="w-6 h-6 text-orange-500" />
              Flight Delayed
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setReported(true)}>
              <Plane className="w-6 h-6 text-red-500 transform rotate-45" />
              Flight Cancelled
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setReported(true)}>
              <Umbrella className="w-6 h-6 text-blue-500" />
              Bad Weather
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setReported(true)}>
              <Clock className="w-6 h-6 text-yellow-500" />
              Plan Change
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-lg">Crisis Reported</h3>
            <p className="text-sm text-muted-foreground">
              The Crisis Agent has been notified and is analyzing alternative plans. Check the AI Chat Hub for proposed itinerary updates!
            </p>
            <Button className="w-full bg-[#F26C3D] hover:bg-[#d85e33]" onClick={() => setReported(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
