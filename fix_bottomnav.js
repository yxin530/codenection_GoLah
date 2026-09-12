const fs = require('fs');
const path = 'src/components/layout/BottomNav.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const \[activeChatUrl, setActiveChatUrl\] = useState\("\/trips\/group-trip\/chat"\);/,
  `const [activeChatUrl, setActiveChatUrl] = useState("/chat");`
);
content = content.replace(
  /const \[activeMapUrl, setActiveMapUrl\] = useState\("\/trips\/group-trip\/map"\);/,
  `const [activeMapUrl, setActiveMapUrl] = useState("/map");`
);

fs.writeFileSync(path, content);
