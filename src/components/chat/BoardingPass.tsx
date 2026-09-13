"use client";

import { QrCode, Plane, User, Calendar, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoardingPassProps {
  airline: string;
  hotel?: string;
  onClose: () => void;
}

const airlineCodes: Record<string, string> = {
  "Malaysia Airlines": "MH",
  "AirAsia X": "D7",
};

export function BoardingPass({ airline, hotel, onClose }: BoardingPassProps) {
  const flightCode = airlineCodes[airline] || "MH";
  const bookingRef = `${flightCode}${Math.floor(100000 + Math.random() * 900000)}`;
  const seat = `${["A", "B", "C", "D", "E", "F"][Math.floor(Math.random() * 6)]}${Math.floor(10 + Math.random() * 25)}`;
  const gate = ["A1", "A3", "B5", "B7", "C2", "C9"][Math.floor(Math.random() * 6)];
  const boardingTime = "07:00";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-background shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff6b3d] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-lg">{airline}</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title */}
        <div className="px-6 py-3 border-b border-border">
          <h3 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Boarding Pass
          </h3>
        </div>

        {/* Flight Route */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold">KUL</p>
              <p className="text-xs text-muted-foreground mt-1">Kuala Lumpur</p>
            </div>
            <div className="flex flex-col items-center flex-1 px-4">
              <Plane className="h-5 w-5 text-[#ff6b3d] rotate-90" />
              <div className="w-full border-t border-dashed border-border my-2"></div>
              <p className="text-xs text-muted-foreground">6h 30m</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">KIX</p>
              <p className="text-xs text-muted-foreground mt-1">Osaka</p>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="px-6 py-4 border-t border-b border-border grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Departure
            </p>
            <p className="font-semibold text-lg">08:00</p>
            <p className="text-xs text-muted-foreground">12 Oct 2025</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Arrival
            </p>
            <p className="font-semibold text-lg">15:30</p>
            <p className="text-xs text-muted-foreground">12 Oct 2025</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Flight</p>
            <p className="font-semibold">{bookingRef}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Gate
            </p>
            <p className="font-semibold">{gate}</p>
          </div>
        </div>

        {/* Passenger & Seat Info */}
        <div className="px-6 py-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" /> Passenger
            </p>
            <p className="font-semibold">YIXIN / ANG</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Seat</p>
            <p className="font-semibold text-lg">{seat}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Boarding
            </p>
            <p className="font-semibold">{boardingTime}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Class</p>
            <p className="font-semibold">Economy</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="px-6 py-4 border-t border-border flex flex-col items-center">
          <QrCode className="h-24 w-24 text-foreground" />
          <p className="text-xs text-muted-foreground mt-2">{bookingRef}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            Terminal: KUL T2 &rarr; KIX T1 &middot; Direct Flight
          </p>
        </div>

        {/* Hotel Section (group trip only) */}
        {hotel && (
          <>
            <div className="border-t-2 border-dashed border-border mx-6 my-0"></div>
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Plane className="h-4 w-4 text-[#ff6b3d]" />
                <span className="font-bold text-sm uppercase tracking-wider">Hotel Reservation</span>
              </div>
              <p className="font-semibold">{hotel}</p>
              <p className="text-sm text-muted-foreground mt-1">12–17 Oct 2025 &middot; 5 nights</p>
              <div className="mt-3 rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Confirmation Ref</p>
                <p className="font-mono font-semibold">HTL-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
              </div>
            </div>
          </>
        )}

        {/* Close Button */}
        <div className="px-6 pb-6">
          <Button onClick={onClose} className="w-full bg-[#ff6b3d] text-white hover:bg-[#f45d30]">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
