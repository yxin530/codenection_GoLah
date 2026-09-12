const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/map/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add useRouter
content = content.replace(
  /import \{ useSearchParams \} from "next\/navigation";/,
  `import { useSearchParams, useRouter } from "next/navigation";`
);

// Update state and hooks
content = content.replace(
  /const \[selectedDay, setSelectedDay\] = useState\(0\);/,
  `const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const router = useRouter();`
);

// Update activeRoute logic to combine all stops if no day is selected
content = content.replace(
  /const activeRoute = hasPlanning \? DAY_ROUTES\[selectedDay\] : \{ stops: \[\] \};/,
  `const activeRoute = hasPlanning ? (selectedDay !== null ? DAY_ROUTES[selectedDay] : { stops: DAY_ROUTES.flatMap(d => d.stops) }) : { stops: [] };`
);

// Update MapWithNoSSR call
content = content.replace(
  /<MapWithNoSSR stops=\{activeRoute\.stops\} \/>/,
  `<MapWithNoSSR 
            stops={activeRoute.stops} 
            showRoute={selectedDay !== null}
            onMarkerClick={(name) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('location', name);
              router.push('?' + params.toString());
            }}
          />`
);

// Update the back button in the details pane
content = content.replace(
  /onClick=\{\(\) => setActivePlace\(false\)\}/g,
  `onClick={() => router.back()}`
);

// Also need to update the day buttons to handle deselection if clicked again
content = content.replace(
  /onClick=\{\(\) => \{\s*setSelectedDay\(index\);\s*setActivePlace\(false\);\s*\}\}/,
  `onClick={() => {
                  setSelectedDay(selectedDay === index ? null : index);
                  if (activePlace) router.back();
                }}`
);

fs.writeFileSync(path, content);
