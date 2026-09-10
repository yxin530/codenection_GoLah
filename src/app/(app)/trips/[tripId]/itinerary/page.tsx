import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Plus } from 'lucide-react';

const MOCK_ITINERARY = [
  { id: 1, day: 'Day 1', date: 'Oct 15', items: [
    { time: '14:00', title: 'Check-in at Hotel', location: 'Shibuya Excel Hotel Tokyu' },
    { time: '16:00', title: 'Explore Shibuya Crossing', location: 'Shibuya' },
    { time: '19:00', title: 'Dinner at Sushi Zanmai', location: 'Shibuya' }
  ]},
  { id: 2, day: 'Day 2', date: 'Oct 16', items: [
    { time: '09:00', title: 'Visit Meiji Shrine', location: 'Harajuku' },
    { time: '13:00', title: 'Lunch & Shopping at Takeshita Street', location: 'Harajuku' }
  ]}
];

export default function ItineraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Itinerary</h2>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Activity
        </Button>
      </div>

      <div className="space-y-8">
        {MOCK_ITINERARY.map(day => (
          <div key={day.id} className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-border pb-2">
              {day.day} <span className="text-muted-foreground text-sm font-normal ml-2">{day.date}</span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {day.items.map((item, idx) => (
                <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-md transition-all">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Clock className="w-4 h-4" /> {item.time}
                    </div>
                    <p className="font-semibold text-lg leading-tight">{item.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-2">
                      <MapPin className="w-4 h-4" /> {item.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
