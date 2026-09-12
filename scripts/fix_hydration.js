const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Check if mounted state exists
if (!content.includes('const [mounted, setMounted] = useState(false);')) {
  content = content.replace(
    /const \[isSubmittingRejection, setIsSubmittingRejection\] = useState\(false\);/,
    `const [isSubmittingRejection, setIsSubmittingRejection] = useState(false);\n  const [mounted, setMounted] = useState(false);\n  useEffect(() => setMounted(true), []);`
  );
}

// Fix the localstorage reads in the final review
content = content.replace(
  /\{typeof window !== 'undefined' \? localStorage\.getItem\('approvedPollAcc'\) \|\| 'Nine Hours Namba' : 'Nine Hours Namba'\}/g,
  `{mounted && localStorage.getItem('approvedPollAcc') ? localStorage.getItem('approvedPollAcc') : 'Nine Hours Namba'}`
);

content = content.replace(
  /\{typeof window !== 'undefined' \? JSON\.parse\(localStorage\.getItem\('tripLikedPlaces'\) \|\| '\["Universal Studios Japan"\]'\)\[0\] : 'Universal Studios Japan'\}/g,
  `{mounted && JSON.parse(localStorage.getItem('tripLikedPlaces') || '["Universal Studios Japan"]')[0] ? JSON.parse(localStorage.getItem('tripLikedPlaces') || '["Universal Studios Japan"]')[0] : 'Universal Studios Japan'}`
);

// Also fix the expenses tab if it had hydration errors
content = content.replace(
  /const accChoice = typeof window !== 'undefined' \? localStorage\.getItem\('approvedPollAcc'\) : null;/g,
  `const accChoice = mounted ? localStorage.getItem('approvedPollAcc') : null;`
);

content = content.replace(
  /const likedPlaces = typeof window !== 'undefined' \? JSON\.parse\(localStorage\.getItem\('tripLikedPlaces'\) \|\| '\[\]'\) : \[\];/g,
  `const likedPlaces = mounted ? JSON.parse(localStorage.getItem('tripLikedPlaces') || '[]') : [];`
);

fs.writeFileSync(path, content);
