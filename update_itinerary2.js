const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/itinerary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure useParams is imported
if (!content.includes('useParams')) {
  content = content.replace(
    /import \{ useRouter \} from 'next\/navigation';/,
    `import { useRouter, useParams } from 'next/navigation';`
  );
}

// Add isSolo logic
content = content.replace(
  /export default function ItineraryPage\(\) \{/,
  `export default function ItineraryPage() {\n  const params = useParams();\n  const isSolo = typeof params?.tripId === 'string' && params.tripId.includes('solo');`
);

// Replace "Group" and "3 Members"
content = content.replace(
  /<span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Group<\/span>\n\s*<span className="font-bold text-foreground">3 Members<\/span>/,
  `<span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Travelers</span>
            <span className="font-bold text-foreground">{isSolo ? '1 Traveler' : '3 Travelers'}</span>`
);

fs.writeFileSync(path, content);
