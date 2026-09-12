const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/itinerary/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove the garbage at the top
content = content.replace(/const isSolo = typeof params\?\.tripId === 'string'.*\n\s*console\.log.*\n\n/, '');

// Make sure "use client"; is at the very top
if (!content.startsWith('"use client";')) {
  content = '"use client";\n' + content;
}

fs.writeFileSync(path, content);
