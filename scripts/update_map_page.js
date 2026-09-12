const fs = require('fs');
const path = 'src/app/map/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = `"use client";

import dynamic from "next/dynamic";
import { BottomNav } from "@/components/layout/BottomNav";

const MapWithNoSSR = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-blue-50 flex items-center justify-center text-muted-foreground font-medium">Loading interactive map...</div>
});

export default function MapPage() {
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="flex-1 relative overflow-hidden bg-blue-50 pb-20">
        <div className="absolute inset-0 z-0 pb-16">
          <MapWithNoSSR stops={[]} showRoute={false} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
`;

fs.writeFileSync(path, content);
