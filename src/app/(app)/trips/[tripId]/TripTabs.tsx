'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, FileText, Banknote, MessageSquare } from 'lucide-react';

export function TripTabs({ tripId }: { tripId: string }) {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Itinerary', href: `/trips/${tripId}/itinerary`, icon: Compass },
    { name: 'Travel Files', href: `/trips/${tripId}/files`, icon: FileText },
    { name: 'Currency', href: `/trips/${tripId}/currency`, icon: Banknote },
    { name: 'AI Chat Hub', href: `/trips/${tripId}/chat`, icon: MessageSquare },
  ];

  return (
    <div className="border-b border-border flex overflow-x-auto scrollbar-hide">
      <div className="flex space-x-8 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link 
              key={tab.href}
              href={tab.href} 
              className={`pb-4 text-sm font-medium border-b-2 whitespace-nowrap flex items-center gap-2 transition-colors ${
                isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
