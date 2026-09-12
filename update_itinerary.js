const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/itinerary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// I want to rewrite ItineraryPage component and MOCK_ITINERARY completely
const newCode = `"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Plus, Share2, Download, Calendar, Users, Wallet, Star, Car, Train, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ALL_PLACES: Record<string, any> = {
  "Hotel Monterey Grasmere": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1622359419139-4444585141f2?auto=format&fit=crop&w=400&q=80", type: "accommodation" },
  "Cross Hotel Osaka": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80", type: "accommodation" },
  "Kyoto Ryokan Kinoe": { location: "Gion, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "accommodation" },
  "Nine Hours Namba": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80", type: "accommodation" },
  "Ritz-Carlton Kyoto": { location: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?auto=format&fit=crop&w=400&q=80", type: "accommodation" },
  "Universal Studios Japan": { location: "Konohana Ward", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["Theme Park"] },
  "Fushimi Inari Taisha": { location: "Fushimi Ward, Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["Culture", "Shrine"] },
  "Osaka Castle": { location: "Chuo Ward, Osaka", image: "https://images.unsplash.com/photo-1583335508892-747fceb4131b?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["History", "Castle"] },
  "Arashiyama Bamboo Grove": { location: "Arashiyama, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["Nature"] },
  "Kuromon Market": { location: "Nipponbashi, Osaka", image: "https://images.unsplash.com/photo-1623880590898-d14efdceab9a?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["Food Market"] },
  "Dotonbori": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1559828551-789a8119bf74?auto=format&fit=crop&w=400&q=80", type: "activity", tags: ["Street Food"] }
};

type ItineraryDay = {
  id: number;
  day: string;
  date: string;
  items: Array<{
    type: string;
    time?: string;
    title?: string;
    location?: string;
    image?: string;
    mode?: string;
    duration?: string;
    tags?: string[];
    note?: string;
    rating?: number;
  }>;
};

export default function ItineraryPage() {
  const [itineraryData, setItineraryData] = useState<ItineraryDay[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Generate dynamic itinerary based on localStorage
    const accChoice = localStorage.getItem('approvedPollAcc') || "Hotel Monterey Grasmere";
    const planChoice = localStorage.getItem('approvedPollPlace') || "Kuromon Market";
    const likedPlaces = JSON.parse(localStorage.getItem('tripLikedPlaces') || '["Universal Studios Japan", "Dotonbori"]');

    // Add planChoice if not in likedPlaces
    if (planChoice && !likedPlaces.includes(planChoice)) {
      likedPlaces.push(planChoice);
    }

    const day1Items: any[] = [];
    const accDetails = ALL_PLACES[accChoice] || ALL_PLACES["Hotel Monterey Grasmere"];
    
    // Day 1: Arrival & Acc
    day1Items.push({
      time: '14:00', 
      title: 'Check-in at ' + accChoice, 
      location: accDetails.location, 
      image: accDetails.image, 
      type: 'accommodation' 
    });
    day1Items.push({ type: 'transit', mode: 'Walk', duration: '15 min' });
    
    let d1Time = 15;
    if (likedPlaces.includes('Dotonbori')) {
       day1Items.push({
         time: '16:00', title: 'Explore Dotonbori', ...ALL_PLACES['Dotonbori']
       });
       day1Items.push({ type: 'transit', mode: 'Walk', duration: '5 min' });
       day1Items.push({ time: '19:30', title: 'Dinner at Kani Doraku', location: 'Dotonbori', image: 'https://images.unsplash.com/photo-1580822184713-f66fbbbd5935?auto=format&fit=crop&w=400&q=80', type: 'food', rating: 4.6 });
       d1Time = 20;
    }

    const day2Items: any[] = [];
    if (likedPlaces.includes('Universal Studios Japan')) {
      day2Items.push({ time: '08:30', title: 'Universal Studios Japan (Early Entry)', ...ALL_PLACES['Universal Studios Japan'], note: 'Express passes booked!' });
      day2Items.push({ type: 'transit', mode: 'Train', duration: '35 min' });
      day2Items.push({ time: '20:00', title: 'Late Dinner at Umeda Sky Building', location: 'Umeda', image: 'https://images.unsplash.com/photo-1622359419139-4444585141f2?auto=format&fit=crop&w=400&q=80', type: 'food' });
    } else {
      // generic Day 2 if USJ not selected
      day2Items.push({ time: '09:00', title: 'Breakfast near ' + accChoice, location: accDetails.location, type: 'food' });
    }

    const day3Items: any[] = [];
    let d3Time = 9;
    ['Fushimi Inari Taisha', 'Osaka Castle', 'Arashiyama Bamboo Grove', 'Kuromon Market'].forEach(p => {
       if (likedPlaces.includes(p)) {
          day3Items.push({
             time: d3Time.toString().padStart(2, '0') + ':00',
             title: p,
             ...ALL_PLACES[p]
          });
          day3Items.push({ type: 'transit', mode: 'Train', duration: '25 min' });
          d3Time += 3;
       }
    });
    // cap day 3
    if (day3Items.length > 0) {
      day3Items.push({ time: d3Time.toString().padStart(2, '0') + ':30', title: 'Dinner & Wrap Up', location: 'City Center', type: 'food', rating: 4.8 });
    }

    const dynamicItinerary = [
      { id: 1, day: 'Day 1: Arrivals & Evening', date: 'Oct 15, Monday', items: day1Items },
      { id: 2, day: 'Day 2: Main Activities', date: 'Oct 16, Tuesday', items: day2Items },
      { id: 3, day: 'Day 3: Exploring the City', date: 'Oct 17, Wednesday', items: day3Items }
    ].filter(d => d.items.length > 0);

    setItineraryData(dynamicItinerary);
  }, []);

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /> Back</Button>
        </div>
        <span className="text-xs text-muted-foreground">Trip itinerary</span>
      </div>
      {/* Hero Header */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl mb-8 group">
        <div 
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <Badge className="bg-[#F26C3D] hover:bg-[#F26C3D] text-white border-none mb-3">AI Generated Report</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">
            Osaka & Kyoto Adventure
          </h1>
          <p className="text-white/80 font-medium md:text-lg">
            A customized trip blending your group's favorite theme park thrills, mouth-watering street food, and rich cultural heritage.
          </p>
        </div>
      </div>

      {/* Trip Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-md transition-all shadow-sm rounded-xl">
          <CardContent className="p-4 flex flex-col items-center text-center gap-1">
            <Calendar className="w-6 h-6 text-[#F26C3D] mb-1" />
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Duration</span>
            <span className="font-bold text-foreground">7 Days</span>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-md transition-all shadow-sm rounded-xl">
          <CardContent className="p-4 flex flex-col items-center text-center gap-1">
            <Users className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Group</span>
            <span className="font-bold text-foreground">3 Members</span>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-md transition-all shadow-sm rounded-xl">
          <CardContent className="p-4 flex flex-col items-center text-center gap-1">
            <Wallet className="w-6 h-6 text-green-500 mb-1" />
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Est. Budget</span>
            <span className="font-bold text-foreground">$1,420 / pax</span>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-md transition-all shadow-sm rounded-xl">
          <CardContent className="p-4 flex flex-col items-center text-center gap-1">
            <MapPin className="w-6 h-6 text-purple-500 mb-1" />
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Destinations</span>
            <span className="font-bold text-foreground">2 Cities</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Detailed Itinerary</h2>
        <Button className="gap-2 bg-[#F26C3D] hover:bg-[#d85e33] text-white rounded-full px-5">
          <Plus className="w-4 h-4" /> Add Activity
        </Button>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {itineraryData.map((day, dayIdx) => (
          <div key={day.id} className="relative z-10">
            {/* Day Header */}
            <div className="flex items-center justify-center mb-8 sticky top-[72px] z-20">
              <div className="bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border shadow-sm text-center">
                <h3 className="text-lg font-bold text-[#F26C3D]">{day.day}</h3>
                <p className="text-xs font-semibold text-muted-foreground">{day.date}</p>
              </div>
            </div>

            <div className="space-y-6">
              {day.items.map((item: any, idx) => (
                <div key={idx} className="relative">
                  {item.type === 'transit' ? (
                    <div className="flex items-center justify-center py-2 opacity-70">
                      <div className="bg-muted px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium border border-border/50">
                        {item.mode === 'Train' ? <Train className="w-3.5 h-3.5 text-blue-500" /> : <Car className="w-3.5 h-3.5 text-green-500" />}
                        {item.mode} • {item.duration}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col md:flex-row gap-6 items-center w-full group cursor-pointer"
                      onClick={() => {
                         if (item.title) {
                            router.push(\`/trips/123/map?location=\${encodeURIComponent(item.title)}\`);
                         }
                      }}
                    >
                      {/* Left Side (Time) for Desktop, Top for Mobile */}
                      <div className="w-full md:w-1/2 flex md:justify-end pr-0 md:pr-8 pl-12 md:pl-0 relative">
                        {/* Timeline Dot */}
                        <div className="absolute left-[20px] md:left-auto md:-right-[35px] top-4 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-background border-4 border-[#F26C3D] z-10 group-hover:scale-125 transition-transform" />
                        
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow w-full max-w-sm ml-auto text-right">
                          <div className="flex items-center gap-2 justify-start md:justify-end text-xl font-bold text-foreground">
                            <Clock className="w-5 h-5 text-[#F26C3D]" /> {item.time}
                          </div>
                          <div className="flex items-center gap-1.5 justify-start md:justify-end text-sm text-muted-foreground mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5" /> {item.location}
                          </div>
                        </div>
                      </div>

                      {/* Right Side (Content) */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-8 relative mt-2 md:mt-0">
                        <Card className="overflow-hidden border-border/60 group-hover:border-[#F26C3D]/50 transition-all group/card rounded-2xl">
                          {item.image && (
                            <div className="relative h-40 w-full overflow-hidden">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              {item.tags && (
                                <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 mb-2">
                                  {item.tags?.map((tag: string, i: number) => (
                                    <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/10 text-[10px] uppercase tracking-wider">{tag}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          <CardContent className="p-4 relative">
                            <h4 className="font-bold text-lg mb-1 group-hover/card:text-[#F26C3D] transition-colors">{item.title}</h4>
                            {item.rating && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium mt-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {item.rating}
                              </div>
                            )}
                            {item.note && (
                              <div className="mt-3 bg-blue-50/50 text-blue-700 p-2 rounded-lg text-xs font-semibold flex justify-between items-center border border-blue-100">
                                {item.note}
                              </div>
                            )}
                            <div className="mt-3 flex justify-end">
                              <Button variant="link" className="p-0 h-auto text-blue-600 text-xs gap-1 group-hover/card:translate-x-1 transition-transform">See on Map <ArrowRight className="w-3 h-3" /></Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`

fs.writeFileSync(path, newCode);
