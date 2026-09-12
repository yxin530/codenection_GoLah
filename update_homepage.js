const fs = require('fs');
const path = 'src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the travelPosts array with the new one including avatar, author, likes
content = content.replace(
  /const travelPosts = \[[\s\S]*?\];/,
  `const travelPosts = [
  { title: "Sunrise, street food and a little bit of Seoul", type: "Photo post", image: "https://images.unsplash.com/photo-1538485399081-7c897d5bfbf6?auto=format&fit=crop&w=900&q=80", authorName: "ami.moment", authorAvatar: "https://i.pravatar.cc/100?img=5", likes: "24.2K" },
  { title: "My three-day Kyoto itinerary", type: "Reel", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80", authorName: "SENKO", authorAvatar: "https://i.pravatar.cc/100?img=9", likes: "364" },
  { title: "Where should I go for my next solo trip?", type: "Text post", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80", authorName: "wanderlust_jx", authorAvatar: "https://i.pravatar.cc/100?img=12", likes: "1.2K" },
  { title: "A quiet morning in the Cameron Highlands", type: "Photo post", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80", authorName: "chloe_travels", authorAvatar: "https://i.pravatar.cc/100?img=20", likes: "8,402" },
];`
);

// Add the Heart import if not there
if (!content.includes('Heart')) {
  content = content.replace(/import { ([^}]+) } from "lucide-react";/, 'import { $1, Heart } from "lucide-react";');
}

// Add TravelCard component before ImageCard
const travelCardStr = `
function TravelCard({ title, image, video = false, authorName, authorAvatar, likes }: { title: string; image: string; video?: boolean; authorName: string; authorAvatar: string; likes: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1e1e20] shadow-sm mb-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image src={image} alt={title} fill sizes="(max-width: 640px) 45vw, 280px" className="object-cover transition duration-500 group-hover:scale-105" />
        {video && (
          <span className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm">
            <Video className="size-4" fill="currentColor" />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-3 text-white">
        <p className="line-clamp-2 text-sm font-semibold leading-tight">{title}</p>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="relative size-5 overflow-hidden rounded-full">
              <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
            </div>
            <span className="text-xs font-medium text-white/80">{authorName}</span>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <Heart className="size-3.5" />
            <span className="text-xs font-medium">{likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
`;

content = content.replace(
  /function ImageCard/,
  travelCardStr + '\nfunction ImageCard'
);

// Update the Travel For You section to use TravelCard and masonry style columns
content = content.replace(
  /<section><SectionHeading>Travel For You<\/SectionHeading><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">\{travelPosts\.map\(\(post\) => <ImageCard key=\{post\.title\} \{\.\.\.post\} video=\{post\.type === "Reel"\} \/>\)\}<\/div><\/section>/,
  `<section>
        <SectionHeading>Travel For You</SectionHeading>
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 space-y-4">
          {travelPosts.map((post) => (
            <TravelCard 
              key={post.title} 
              {...post as any} 
              video={post.type === "Reel"} 
            />
          ))}
        </div>
      </section>`
);

fs.writeFileSync(path, content);
