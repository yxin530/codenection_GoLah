import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Users, Plus } from 'lucide-react';
import Link from 'next/link';

const MOCK_TRIPS = [
  {
    id: 't1',
    destination: 'Tokyo, Japan',
    dates: 'Oct 15 - Oct 22, 2026',
    members: 1,
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 't2',
    destination: 'Bali, Indonesia',
    dates: 'Dec 1 - Dec 10, 2026',
    members: 4,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function TripsDashboard() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Trips</h1>
          <p className="text-muted-foreground">Manage your upcoming and past adventures.</p>
        </div>
        <Link href="/trips/new" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          New Trip
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_TRIPS.map(trip => (
          <Link href={`/trips/${trip.id}/itinerary`} key={trip.id}>
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={trip.image} alt={trip.destination} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-start gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{trip.destination}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{trip.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{trip.members} {trip.members === 1 ? 'Traveller' : 'Travellers'}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
