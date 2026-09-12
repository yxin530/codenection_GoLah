const fs = require('fs');
const path = 'src/components/map/LeafletMap.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /function MapBoundsUpdater\(\{ positions \}: \{ positions: \[number, number\]\[\] \}\) \{\n\s*const map = useMap\(\);\n\s*useEffect\(\(\) => \{\n\s*if \(positions\.length > 0\) \{\n\s*const bounds = L\.latLngBounds\(positions\);\n\s*map\.fitBounds\(bounds, \{ padding: \[50, 50\] \}\);\n\s*\}\n\s*\}, \[positions, map\]\);\n\s*return null;\n\}/s,
  `function MapBoundsUpdater({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  const posString = JSON.stringify(positions);
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [posString, map]);
  return null;
}`
);

fs.writeFileSync(path, content);
