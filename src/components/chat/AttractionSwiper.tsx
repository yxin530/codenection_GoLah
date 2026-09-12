"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info, X, Heart, ExternalLink, Users, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MOCK_ATTRACTIONS = [
  {
    id: "attr5",
    name: "Arashiyama Bamboo Grove",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=800&q=80",
    description: "A mesmerizing path winding through towering bamboo stalks. It's one of Kyoto's most photographed sights. Best visited early morning to avoid the crowds.",
    tags: ["Nature", "Photography", "Free"],
    ticketInfo: "Free Entry (Open 24/7)",
    link: "https://kyoto.travel/en/shrine_temple/130.html"
  },
  {
    id: "attr4",
    name: "Osaka Castle",
    location: "Osaka, Japan",
    image: "https://images.unsplash.com/photo-1583335508892-747fceb4131b?auto=format&fit=crop&w=800&q=80",
    description: "A famous Japanese castle that played a major role in the unification of Japan. The surrounding park is stunning, especially during cherry blossom season.",
    tags: ["History", "Culture", "Castle"],
    ticketInfo: "¥600 for Castle Tower",
    link: "https://www.osakacastle.net/english/"
  },
  {
    id: "attr3",
    name: "Dotonbori",
    location: "Osaka, Japan",
    image: "https://images.unsplash.com/photo-1559828551-789a8119bf74?auto=format&fit=crop&w=800&q=80",
    description: "One of the principal tourist and nightlife areas in Osaka, running along the Dotonbori canal. Known for the Glico Man sign and incredible street food like Takoyaki and Okonomiyaki.",
    tags: ["Food", "Nightlife", "Shopping"],
    ticketInfo: "Free to explore (Food prices vary)",
  },
  {
    id: "attr2",
    name: "Universal Studios Japan",
    location: "Osaka, Japan",
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
    description: "A major theme park offering thrilling rides based on popular movies. Must-visit areas include Super Nintendo World and The Wizarding World of Harry Potter. Express passes are highly recommended!",
    tags: ["Theme Park", "Entertainment", "$$$"],
    ticketInfo: "1-Day Studio Pass: ~¥8,600",
    link: "https://www.usj.co.jp/web/en/us"
  },
  {
    id: "attr1",
    name: "Fushimi Inari Taisha",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description: "Famous for its thousands of vermilion torii gates, which straddle a network of trails behind its main buildings. The hike to the top of the mountain takes about 2-3 hours.",
    tags: ["Culture", "Shrine", "Free"],
    ticketInfo: "Free Entry (Open 24/7)",
    link: "http://inari.jp/en/"
  }
];

export function AttractionSwiper({ onComplete }: { onComplete?: () => void }) {
  const [cards, setCards] = useState(MOCK_ATTRACTIONS);
  const [liked, setLiked] = useState<string[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [exitX, setExitX] = useState(0);

  const [allMembersFinished, setAllMembersFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const activeIndex = cards.length - 1;
  const isFinished = cards.length === 0;

  useEffect(() => {
    if (isFinished && !allMembersFinished) {
      const timer = setTimeout(() => {
        setAllMembersFinished(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFinished, allMembersFinished]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
        router.push('/trips/temp-trip-id/itinerary');
    }, 2000);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (isFinished) return;
    
    const currentCard = cards[activeIndex];
    
    if (direction === "right") {
      const newLiked = [...liked, currentCard.name];
      setLiked(newLiked);
      setExitX(200);
      localStorage.setItem('tripLikedPlaces', JSON.stringify(newLiked));
    } else {
      const newDisliked = [...disliked, currentCard.name];
      setDisliked(newDisliked);
      setExitX(-200);
      localStorage.setItem('tripDislikedPlaces', JSON.stringify(newDisliked));
    }

    setCards((prev) => prev.slice(0, -1));
    setShowDetails(false);
  };

  return (
    <div className="w-full flex flex-col items-center my-6">
      <div className="w-full max-w-[320px] aspect-[3/4] relative perspective-1000">
        
        <AnimatePresence>
          {isFinished ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-card rounded-3xl border border-border shadow-md flex flex-col items-center justify-center p-6 text-center"
            >
              {isGenerating ? (
                <>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-[#F26C3D]">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Generating...</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our AI is crafting the perfect itinerary based on everyone's preferences...
                  </p>
                  <Loader2 className="w-8 h-8 animate-spin text-[#F26C3D]" />
                </>
              ) : allMembersFinished ? (
                <div className="absolute inset-0 bg-card rounded-3xl border border-border shadow-md flex flex-col items-center justify-start p-4 text-center overflow-y-auto scrollbar-none">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 text-green-600 shrink-0 mt-6">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Everyone's Ready!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    All group members have finished swiping. The AI agents are now discussing the best plan for you.
                  </p>
                  
                  <div className="bg-muted/50 p-3 rounded-lg border border-border w-full text-sm mb-6">
                    Head over to the <strong>#general</strong> channel to see the agents' debate and discuss with your group!
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full mt-auto mb-2"
                  >
                    <Button 
                      className="w-full bg-[#F26C3D] hover:bg-[#d85e33] text-white shadow-md relative overflow-hidden"
                      onClick={() => onComplete?.()}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{
                        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                        backgroundSize: '200% 100%',
                      }} />
                      <span className="relative flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Go to #general
                      </span>
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You're all done!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Waiting for group members (Jing Yi, Xuan Yu) to finish swiping so I can generate the group itinerary report...
                  </p>
                  
                  <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-blue-500 w-1/3 h-full rounded-full animate-pulse" />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Loader2 className="w-3 h-3 animate-spin" /> 1 of 3 members finished
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            cards.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 bg-card rounded-3xl shadow-xl overflow-hidden border border-border flex flex-col"
                  style={{ zIndex: index }}
                  initial={{ 
                    scale: 0.95, 
                    y: 10,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: isActive ? 1 : 0.95 - (activeIndex - index) * 0.05, 
                    y: isActive ? 0 : (activeIndex - index) * 10,
                    opacity: 1
                  }}
                  exit={{ 
                    x: exitX,
                    opacity: 0, 
                    rotate: exitX > 0 ? 15 : -15 
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x;
                    if (swipe > 80) {
                      handleSwipe("right");
                    } else if (swipe < -80) {
                      handleSwipe("left");
                    }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="relative flex-1">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
                    
                    {isActive && (
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{card.name}</h2>
                            <div className="flex items-center gap-1 text-sm font-medium opacity-90 drop-shadow-md mt-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {card.location}
                            </div>
                          </div>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className={`rounded-full w-8 h-8 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 shrink-0 transition-colors ${showDetails ? "bg-white/50" : ""}`}
                            onClick={() => setShowDetails(!showDetails)}
                          >
                            <Info className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {card.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Expandable Details Section */}
                  <AnimatePresence>
                    {isActive && showDetails && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-card px-4 py-3 text-sm border-t border-border overflow-y-auto max-h-48"
                      >
                        <p className="text-muted-foreground leading-relaxed mb-3">{card.description}</p>
                        
                        {card.ticketInfo && (
                          <div className="bg-muted/50 p-2 rounded-lg border border-border mb-3 text-xs flex justify-between items-center">
                            <span className="font-semibold text-foreground/80">Tickets:</span>
                            <span className="font-medium text-[#ff6b3d]">{card.ticketInfo}</span>
                          </div>
                        )}
                        
                        {card.link && (
                          <a 
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-1.5 w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Official Website
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  {isActive && (
                    <div className="h-20 bg-background flex items-center justify-center gap-6 shrink-0 border-t border-border">
                      <button 
                        onClick={() => handleSwipe("left")}
                        className="w-12 h-12 rounded-full bg-background border-2 border-red-500 text-red-500 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
                      >
                        <X className="w-6 h-6" strokeWidth={2.5} />
                      </button>
                      
                      <button 
                        onClick={() => handleSwipe("right")}
                        className="w-12 h-12 rounded-full bg-background border-2 border-green-500 text-green-500 flex items-center justify-center shadow-sm hover:bg-green-50 transition-colors"
                      >
                        <Heart className="w-6 h-6" strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
      {!isFinished && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Swipe right if you're interested, left if not.
        </p>
      )}
    </div>
  );
}
