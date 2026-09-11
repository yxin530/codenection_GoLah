import { TripTabs } from './TripTabs';
import { CrisisReportDialog } from '@/components/crisis/CrisisReportDialog';

export default async function TripViewLayout({ children, params }: { children: React.ReactNode, params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip to Tokyo</h1>
          <p className="text-muted-foreground">Oct 15 - Oct 22, 2026</p>
        </div>
        <CrisisReportDialog />
      </div>

      <TripTabs tripId={tripId} />
      
      <div className="flex-1 pb-10">
        {children}
      </div>
    </div>
  );
}
