const fs = require('fs');

// Fix solo-chat/page.tsx
const soloPath = 'src/app/(app)/trips/[tripId]/solo-chat/page.tsx';
let soloContent = fs.readFileSync(soloPath, 'utf8');
soloContent = soloContent.replace(
  /router\.push\('\/trips\/trip-123\/itinerary'\)/g,
  `router.push('/trips/solo-trip-123/itinerary')`
);
fs.writeFileSync(soloPath, soloContent);

// Fix chat/page.tsx
const groupPath = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let groupContent = fs.readFileSync(groupPath, 'utf8');
groupContent = groupContent.replace(
  /router\.push\('\/trips\/trip-123\/itinerary'\)/g,
  `router.push('/trips/group-trip-123/itinerary')`
);
fs.writeFileSync(groupPath, groupContent);

