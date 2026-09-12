const fs = require('fs');
const path = 'src/components/map/LeafletMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add lastClicked state
content = content.replace(
  /const \[mounted, setMounted\] = useState\(false\);/,
  `const [mounted, setMounted] = useState(false);
  const [lastClicked, setLastClicked] = useState<string>('');`
);

// Replace dblclick logic
content = content.replace(
  /dblclick: \(\) => \{\n\s*if \(onMarkerClick\) onMarkerClick\(stop\.name\);\n\s*\}/,
  `click: () => {
              if (lastClicked === stop.name) {
                if (onMarkerClick) onMarkerClick(stop.name);
              } else {
                setLastClicked(stop.name);
              }
            }`
);

fs.writeFileSync(path, content);
