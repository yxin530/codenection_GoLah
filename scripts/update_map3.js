const fs = require('fs');

// 1. Update LeafletMap.tsx for double click
let leafletContent = fs.readFileSync('src/components/map/LeafletMap.tsx', 'utf8');
leafletContent = leafletContent.replace(
  /click: \(\) => \{/,
  `dblclick: () => {`
);
fs.writeFileSync('src/components/map/LeafletMap.tsx', leafletContent);

// 2. Update map/page.tsx for Back button and day query
let mapContent = fs.readFileSync('src/app/(app)/trips/[tripId]/map/page.tsx', 'utf8');

// Add day query logic
mapContent = mapContent.replace(
  /const locationQuery = searchParams\.get\('location'\);/,
  `const locationQuery = searchParams.get('location');
  const dayQuery = searchParams.get('day');`
);

mapContent = mapContent.replace(
  /useEffect\(\(\) => \{\n    \/\/ Check if user has done any planning/,
  `useEffect(() => {
    if (dayQuery !== null) {
      const dayIdx = parseInt(dayQuery, 10);
      if (!isNaN(dayIdx)) setSelectedDay(dayIdx);
    }
  }, [dayQuery]);

  useEffect(() => {
    // Check if user has done any planning`
);

// Add Back button to map header
mapContent = mapContent.replace(
  /<div className="absolute top-4 left-4 right-4 md:right-auto md:w-\[400px\] z-10 flex flex-col gap-3">\n\s*<div className="flex items-center bg-background rounded-full shadow-lg p-1\.5 px-3 border">/,
  `<div className="absolute top-4 left-4 right-4 md:right-auto md:w-[400px] z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-background shrink-0" onClick={() => router.back()}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 flex items-center bg-background rounded-full shadow-lg p-1.5 px-3 border">`
);

// Close the new flex wrapper around the search input
mapContent = mapContent.replace(
  /<\/Button>\n\s*<\/div>\n\n\s*<div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">/,
  `</Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">`
);

fs.writeFileSync('src/app/(app)/trips/[tripId]/map/page.tsx', mapContent);

// 3. Update itinerary/page.tsx for View Route button
let itineraryContent = fs.readFileSync('src/app/(app)/trips/[tripId]/itinerary/page.tsx', 'utf8');

itineraryContent = itineraryContent.replace(
  /<div className="bg-background\/80 backdrop-blur-md px-6 py-2 rounded-full border border-border shadow-sm text-center">\n\s*<h3 className="text-lg font-bold text-\[#F26C3D\]">\{day\.day\}<\/h3>\n\s*<p className="text-xs font-semibold text-muted-foreground">\{day\.date\}<\/p>\n\s*<\/div>/,
  `<div className="bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border shadow-sm text-center flex items-center gap-4">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-[#F26C3D]">{day.day}</h3>
                  <p className="text-xs font-semibold text-muted-foreground">{day.date}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full h-8 text-xs gap-1 border-[#F26C3D]/30 hover:bg-[#F26C3D]/10 text-[#F26C3D]" onClick={(e) => { e.stopPropagation(); router.push('/trips/123/map?day=' + dayIdx); }}>
                  <MapPin className="w-3 h-3" /> View Route
                </Button>
              </div>`
);

fs.writeFileSync('src/app/(app)/trips/[tripId]/itinerary/page.tsx', itineraryContent);

