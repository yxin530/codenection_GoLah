const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/map/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// I need to add useSearchParams
content = content.replace(
  /import \{ useState \} from "react";/,
  `import { useState, useEffect } from "react";\nimport { useSearchParams } from "next/navigation";`
);

// We need to define ALL_PLACES in map/page.tsx for dynamic lookup
const allPlacesStr = `
const ALL_PLACES: Record<string, any> = {
  "Hotel Monterey Grasmere": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1622359419139-4444585141f2?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Elegant European-style hotel with panoramic city views from the upper floors." },
  "Cross Hotel Osaka": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Modern, stylish hotel located right in the heart of Dotonbori." },
  "Kyoto Ryokan Kinoe": { location: "Gion, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Traditional Japanese inn featuring tatami rooms." },
  "Nine Hours Namba": { location: "Namba, Osaka", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Futuristic capsule hotel offering a unique and affordable stay." },
  "Ritz-Carlton Kyoto": { location: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?auto=format&fit=crop&w=400&q=80", type: "accommodation", desc: "Experience ultimate luxury on the banks of the Kamogawa river." },
  "Universal Studios Japan": { location: "Konohana Ward", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A major theme park offering thrilling rides based on popular movies.", tags: ["Theme Park"] },
  "Fushimi Inari Taisha": { location: "Fushimi Ward, Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "Famous for its thousands of vermilion torii gates.", tags: ["Culture", "Shrine"] },
  "Osaka Castle": { location: "Chuo Ward, Osaka", image: "https://images.unsplash.com/photo-1583335508892-747fceb4131b?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A famous Japanese castle that played a major role in the unification of Japan.", tags: ["History", "Castle"] },
  "Arashiyama Bamboo Grove": { location: "Arashiyama, Kyoto", image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A mesmerizing path winding through towering bamboo stalks.", tags: ["Nature"] },
  "Kuromon Market": { location: "Nipponbashi, Osaka", image: "https://images.unsplash.com/photo-1623880590898-d14efdceab9a?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "A lively covered market known for its fresh seafood and street food.", tags: ["Food Market"] },
  "Dotonbori": { location: "Dotonbori, Osaka", image: "https://images.unsplash.com/photo-1559828551-789a8119bf74?auto=format&fit=crop&w=400&q=80", type: "activity", desc: "One of the principal tourist and nightlife areas in Osaka.", tags: ["Street Food"] }
};
`;

content = content.replace(
  /const CATEGORIES = \[/,
  allPlacesStr + "\nconst CATEGORIES = ["
);

// Update SmartMapPage body
const pageBodyRegex = /export default function SmartMapPage\(\) \{[\s\S]*?(?=return \()/;
const newPageBody = `export default function SmartMapPage() {
  const [activePlace, setActivePlace] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const searchParams = useSearchParams();
  const locationQuery = searchParams.get('location');
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [hasPlanning, setHasPlanning] = useState(false);

  useEffect(() => {
    // Check if user has done any planning
    const accChoice = localStorage.getItem('approvedPollAcc');
    const likedPlaces = localStorage.getItem('tripLikedPlaces');
    if (accChoice || likedPlaces) {
      setHasPlanning(true);
    }

    if (locationQuery && ALL_PLACES[locationQuery]) {
      setPlaceDetails({ name: locationQuery, ...ALL_PLACES[locationQuery] });
      setActivePlace(true);
    } else {
      setActivePlace(false);
      setPlaceDetails(null);
    }
  }, [locationQuery]);

  const activeRoute = hasPlanning ? DAY_ROUTES[selectedDay] : { stops: [] };

  `;

content = content.replace(pageBodyRegex, newPageBody);

// In the Map return, we need to show placeDetails dynamically
content = content.replace(
  /<div className="w-2\/3 h-full bg-gradient-to-br from-orange-200 to-red-300 relative border-r-2 border-white">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Place Details \*\/\}/s,
  `<div className="w-2/3 h-full relative border-r-2 border-white">
                <img src={placeDetails?.image || "https://images.unsplash.com/photo-1559828551-789a8119bf74"} className="w-full h-full object-cover" />
              </div>
              <div className="w-1/3 h-full flex flex-col">
                <div className="h-1/2 relative border-b-2 border-white">
                   <img src="https://images.unsplash.com/photo-1580822184713-f66fbbbd5935?auto=format&fit=crop&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="h-1/2 bg-gradient-to-br from-green-200 to-emerald-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-sm cursor-pointer hover:bg-black/50 transition-colors">
                    +42 Photos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Place Details */}`
);

content = content.replace(
  /<h1 className="text-3xl font-bold mb-2">Senso-ji Temple<\/h1>/,
  `<h1 className="text-3xl font-bold mb-2">{placeDetails?.name || 'Senso-ji Temple'}</h1>`
);

content = content.replace(
  /<div className="flex flex-wrap gap-2 mb-6">[\s\S]*?<\/div>/,
  `<div className="flex flex-wrap gap-2 mb-6">
                {placeDetails?.tags?.map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">Open Now</Badge>
              </div>`
);

content = content.replace(
  /<p className="text-sm text-foreground\/80 leading-relaxed">[\s\S]*?<\/p>/,
  `<p className="text-sm text-foreground/80 leading-relaxed">
                    {placeDetails?.desc || "A popular destination."}
                  </p>`
);

content = content.replace(
  /<span>2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan<\/span>/,
  `<span>{placeDetails?.location || "Tokyo, Japan"}</span>`
);

// We need to only show Day Routes UI if hasPlanning is true
content = content.replace(
  /<div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mt-2">/,
  `{hasPlanning && <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mt-2">`
);

content = content.replace(
  /\{route\.day\} · \{route\.date\}\n              <\/Button>\n            \)\)\}\n          <\/div>/,
  `{route.day} · {route.date}
              </Button>
            ))}
          </div>}`
);

// One thing: `isNavigating` is hardcoded to false now in my rewrite, so we should hide navigation unless clicking a route, which is fine since the user said "default map screen shouldn't have any route". We'll just leave `isNavigating` false by default.

fs.writeFileSync(path, content);
