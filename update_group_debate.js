const fs = require('fs');
const path = 'src/app/(app)/trips/[tripId]/chat/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add getInitials
content = content.replace(
  /export default function ChatHubPage\(\) \{/,
  `const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();\n\nexport default function ChatHubPage() {`
);

// Add topPlaces state
content = content.replace(
  /const \[pollPlanVotes, setPollPlanVotes\] = useState<Record<string, number>>\(\{ 'Kuromon Market': 1, 'Osaka Castle': 1 \}\);/,
  `const [pollPlanVotes, setPollPlanVotes] = useState<Record<string, number>>({ 'Kuromon Market': 1, 'Osaka Castle': 1 });
  const [topPlaces, setTopPlaces] = useState<string[]>(['Universal Studios Japan', 'Osaka Castle']);
  const [topAccs, setTopAccs] = useState<string[]>(['Nine Hours Namba', 'Kyoto Ryokan Kinoe']);`
);

// Update useEffect for swipingCompleted
content = content.replace(
  /useEffect\(\(\) => \{\n\s*if \(swipingCompleted\) \{\n\s*setInitialMessageStep\(4\);\n\s*setDebateMessageStep\(0\);\n\s*\}\n\s*\}, \[swipingCompleted\]\);/,
  `useEffect(() => {
    if (swipingCompleted) {
      const likedPlaces = JSON.parse(localStorage.getItem('tripLikedPlaces') || '[]');
      const newTopPlaces = likedPlaces.length >= 2 ? likedPlaces.slice(0, 2) : 
                          (likedPlaces.length === 1 ? [likedPlaces[0], 'Osaka Castle'] : ['Universal Studios Japan', 'Osaka Castle']);
      setTopPlaces(newTopPlaces);
      
      const likedAccs = JSON.parse(localStorage.getItem('tripLikedAccs') || '[]');
      const newTopAccs = likedAccs.length >= 2 ? likedAccs.slice(0, 2) : 
                        (likedAccs.length === 1 ? [likedAccs[0], 'Kyoto Ryokan Kinoe'] : ['Nine Hours Namba', 'Kyoto Ryokan Kinoe']);
      setTopAccs(newTopAccs);

      const accObj: Record<string, number> = {};
      newTopAccs.forEach((a: string, i: number) => accObj[a] = i === 0 ? 1 : (i === 1 ? 1 : 0));
      setPollAccVotes(accObj);

      const pObj: Record<string, number> = {};
      newTopPlaces.forEach((p: string, i: number) => pObj[p] = i === 0 ? 1 : (i === 1 ? 1 : 0));
      setPollPlanVotes(pObj);

      setInitialMessageStep(4);
      setDebateMessageStep(0);
    }
  }, [swipingCompleted]);`
);

// Replace hardcoded agents
content = content.replace(
  /senderName="Universal Studios Agent"/,
  `senderName={\`\${topPlaces[0]} Agent\`}`
);
content = content.replace(
  /avatarInitials="USJ"/,
  `avatarInitials={getInitials(topPlaces[0])}`
);
content = content.replace(
  /content="Since you loved Universal Studios and Osaka Castle, let's prioritize USJ for the adrenaline rush\. You need a whole day for that!"/,
  `content={\`Based on everyone's choices, let's prioritize \${topPlaces[0]}! It's highly rated and matches the group's vibe perfectly.\`}`
);

content = content.replace(
  /senderName="Osaka Castle Agent"/,
  `senderName={\`\${topPlaces[1]} Agent\`}`
);
content = content.replace(
  /avatarInitials="OC"/,
  `avatarInitials={getInitials(topPlaces[1])}`
);
content = content.replace(
  /content="But Osaka Castle is so relaxing and historical! We should do that in the morning when it's less crowded and grab matcha nearby\."/,
  `content={\`But \${topPlaces[1]} is such a classic experience! We should do that in the morning when it's less crowded.\`}`
);

content = content.replace(
  /senderName="Nine Hours Namba Agent"/,
  `senderName={\`\${topAccs[0]} Agent\`}`
);
content = content.replace(
  /avatarInitials="NH"/,
  `avatarInitials={getInitials(topAccs[0])}`
);
content = content.replace(
  /content="For accommodation, I strongly recommend Nine Hours Namba\. Since you plan to spend most of your time exploring, it's only \$35\/night\. You can use the extra budget for an amazing Wagyu dinner!"/,
  `content={\`For accommodation, I strongly recommend \${topAccs[0]}. It's highly preferred by the group and located in a great area!\`}`
);

content = content.replace(
  /senderName="Kyoto Ryokan Kinoe Agent"/,
  `senderName={\`\${topAccs[1]} Agent\`}`
);
content = content.replace(
  /avatarInitials="KR"/,
  `avatarInitials={getInitials(topAccs[1])}`
);
content = content.replace(
  /content="I disagree! The whole point of going to Kyoto is the experience\. Kyoto Ryokan Kinoe offers an authentic tatami room and a public bath\. It's totally worth the splurge!"/,
  `content={\`I disagree! \${topAccs[1]} offers a much more unique experience. It's totally worth it for the memories!\`}`
);

fs.writeFileSync(path, content);
