const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/itinerary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// I'll add a console log for params
content = content.replace(
  /const isSolo = typeof params\?\.tripId === 'string' && \(params\.tripId\.includes\('solo'\) || params\.tripId === 't1'\);/,
  `const isSolo = typeof params?.tripId === 'string' && (params.tripId.includes('solo') || params.tripId === 't1' || params.tripId === 'solo-trip' || params.tripId === 'trip-123');\n  console.log("params.tripId is:", params?.tripId);`
);

fs.writeFileSync(path, content);
