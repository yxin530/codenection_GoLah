const fs = require('fs');
const path = 'src/components/map/LeafletMap.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /export default function LeafletMap\(\{ stops = \[\], onMarkerClick \}: \{ stops\?: \{ name: string, lat: number, lng: number \}\[\], onMarkerClick\?: \(name: string\) => void \}\) \{/,
  `export default function LeafletMap({ stops = [], onMarkerClick, showRoute = true }: { stops?: { name: string, lat: number, lng: number }[], onMarkerClick?: (name: string) => void, showRoute?: boolean }) {`
);

content = content.replace(
  /\{positions\.length > 1 && \(/,
  `{showRoute && positions.length > 1 && (`
);

fs.writeFileSync(path, content);
