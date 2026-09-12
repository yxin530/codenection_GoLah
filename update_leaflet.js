const fs = require('fs');
const path = 'src/components/map/LeafletMap.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /export default function LeafletMap\(\{ stops = \[\] \}: \{ stops\?: \{ name: string, lat: number, lng: number \}\[\] \}\) \{/,
  `export default function LeafletMap({ stops = [], onMarkerClick }: { stops?: { name: string, lat: number, lng: number }[], onMarkerClick?: (name: string) => void }) {`
);

content = content.replace(
  /<Marker key=\{index\} position=\{\[stop\.lat, stop\.lng\]\}>/,
  `<Marker 
          key={index} 
          position={[stop.lat, stop.lng]}
          eventHandlers={{
            click: () => {
              if (onMarkerClick) onMarkerClick(stop.name);
            }
          }}
        >`
);

fs.writeFileSync(path, content);
