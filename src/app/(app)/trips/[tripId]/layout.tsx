import { TripTabs } from './TripTabs';

export default function TripViewLayout({ children, params }: { children: React.ReactNode, params: { tripId: string } }) {
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trip to Tokyo</h1>
        <p className="text-muted-foreground">Oct 15 - Oct 22, 2026</p>
      </div>

      <TripTabs tripId={params.tripId} />
      
      <div className="flex-1 pb-10">
        {children}
      </div>
    </div>
  );
}
