const fs = require('fs');
const path = 'src/components/layout/BottomNav.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const savedChat = localStorage\.getItem\("lastActiveChat"\);\n\s*if \(savedChat\) setActiveChatUrl\(savedChat\);/,
  `// Force empty state for review purposes if they haven't explicitly visited a chat in this session
      // const savedChat = localStorage.getItem("lastActiveChat");
      // if (savedChat) setActiveChatUrl(savedChat);`
);

content = content.replace(
  /const savedMap = localStorage\.getItem\("lastActiveMap"\);\n\s*if \(savedMap\) setActiveMapUrl\(savedMap\);/,
  `// Force empty state for review purposes
      // const savedMap = localStorage.getItem("lastActiveMap");
      // if (savedMap) setActiveMapUrl(savedMap);`
);

fs.writeFileSync(path, content);
