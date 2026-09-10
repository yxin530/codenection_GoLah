import Link from 'next/link';
import { Compass, Map, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Map className="h-6 w-6 text-primary" />
          <span>GoLah</span>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 p-4">
        <Link href="/trips" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/trips/new" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Compass className="h-5 w-5" />
          Plan Trip
        </Link>
        <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
