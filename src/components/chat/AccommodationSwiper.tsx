"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info, X, Heart, ExternalLink, BedDouble, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_ACCOMMODATIONS = [
  {
    id: "acc5",
    name: "Ritz-Carlton Kyoto",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?auto=format&fit=crop&w=800&q=80",
    description: "Experience ultimate luxury on the banks of the Kamogawa river, offering stunning views and world-class service.",
    tags: ["Luxury", "Riverside", "$$$$"],
    priceInfo: "~$800/night",
  },
  {
    id: "acc4",
    name: "Cross Hotel Osaka",
    location: "Dotonbori, Osaka",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    description: "Modern, stylish hotel located right in the heart of Dotonbori. Perfect for nightlife and street food lovers.",
    tags: ["Modern", "Nightlife", "$$"],
    priceInfo: "~$150/night",
  },
  {
    id: "acc3",
    name: "Kyoto Ryokan Kinoe",
    location: "Gion, Kyoto",
    image: "https://images.unsplash.com/photo-1578469645762-4113063f256f?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Japanese inn featuring tatami rooms, kaiseki dinners, and public baths.",
    tags: ["Traditional", "Culture", "$$$"],
    priceInfo: "~$300/night",
  },
  {
    id: "acc2",
    name: "Hotel Monterey Grasmere",
    location: "Namba, Osaka",
    image: "https://images.unsplash.com/photo-1622359419139-4444585141f2?auto=format&fit=crop&w=800&q=80",
    description: "Elegant European-style hotel with panoramic city views from the upper floors.",
    tags: ["Views", "Elegant", "$$"],
    priceInfo: "~$120/night",
  },
  {
    id: "acc1",
    name: "Nine Hours Namba",
    location: "Namba, Osaka",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    description: "Futuristic capsule hotel offering a unique and affordable stay right near Namba station.",
    tags: ["Capsule", "Budget", "$"],
    priceInfo: "~$35/night",
  }
];

export function AccommodationSwiper({ 
  onComplete,
  onSwitchChannel,
  otherSwiperCompleted,
  isSolo
}: { 
  onComplete?: () => void;
  onSwitchChannel?: (channel: string) => void;
  otherSwiperCompleted?: boolean;
  isSolo?: boolean;
}) {
  const [cards, setCards] = useState(MOCK_ACCOMMODATIONS);
  const [liked, setLiked] = useState<string[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("right");
  const [membersFinished, setMembersFinished] = useState(1);

  const activeIndex = cards.length - 1;
  const isFinished = cards.length === 0;

  useEffect(() => {
    if (isFinished && membersFinished < 3) {
      const timer1 = setTimeout(() => setMembersFinished(2), 1500);
      const timer2 = setTimeout(() => setMembersFinished(3), 3000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [isFinished, membersFinished]);

  const handleSwipe = (direction: "left" | "right") => {
    if (isFinished) return;
    
    const currentCard = cards[activeIndex];
    
    if (direction === "right") {
      setLiked([...liked, currentCard.name]);
      setExitDirection("right");
    } else {
      setDisliked([...disliked, currentCard.name]);
      setExitDirection("left");
    }

    setCards((prev) => prev.slice(0, -1));
    setShowDetails(false);
  };

  return (
    <div className="w-full flex flex-col items-center my-6">
      <div className="w-full max-w-[320px] aspect-[3/4] relative perspective-1000">
        
        <AnimatePresence custom={exitDirection}>
          {isFinished ? (
            <motion.div 
              key="finished-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-card rounded-3xl border border-border shadow-md flex flex-col items-center justify-start p-4 text-center overflow-y-auto scrollbar-none"
            >
              {membersFinished === 3 || isSolo ? (
                <>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 text-blue-600 shrink-0 mt-6">
                    <BedDouble className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You're all set!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You've reviewed all hotel recommendations.
                  </p>
                  
                  <div className="bg-muted/50 p-3 rounded-lg border border-border w-full text-sm mb-4">
                    {otherSwiperCompleted 
                      ? `Your accommodation preferences have been saved. Head over to #general to see ${isSolo ? 'my recommendations' : 'the debate'}!`
                      : "Your accommodation preferences have been saved. You still need to complete your planning preferences in #planning."
                    }
                  </div>
                  
                  <Button 
                    className="w-full bg-[#F26C3D] hover:bg-[#d85e33] text-white rounded-xl py-6 font-semibold mt-auto mb-2"
                    onClick={() => {
                      onComplete?.();
                      if (otherSwiperCompleted) {
                        onSwitchChannel?.('general');
                      } else {
                        onSwitchChannel?.('planning');
                      }
                    }}
                  >
                    {otherSwiperCompleted ? "Go to General" : "Go to Planning"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 mt-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You're all done!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Waiting for group members (Jing Yi, Xuan Yu) to finish swiping so I can generate the group itinerary report...
                  </p>
                  
                  <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden">
                    <div className={`bg-blue-500 h-full rounded-full animate-pulse transition-all duration-500 ${membersFinished === 1 ? 'w-1/3' : 'w-2/3'}`} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Loader2 className="w-3 h-3 animate-spin" /> {membersFinished} of 3 members finished
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
                  custom={exitDirection}
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
                  variants={{
                    exit: (direction: "left" | "right") => ({
                      x: direction === "right" ? 200 : -200,
                      opacity: 0,
                      rotate: direction === "right" ? 15 : -15,
                    }),
                  }}
                  exit="exit"
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(e, { offset }) => {
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
                        
                        {card.priceInfo && (
                          <div className="bg-muted/50 p-2 rounded-lg border border-border mb-3 text-xs flex justify-between items-center">
                            <span className="font-semibold text-foreground/80">Est. Price:</span>
                            <span className="font-medium text-[#ff6b3d]">{card.priceInfo}</span>
                          </div>
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
          Swipe right if you like this hotel, left if not.
        </p>
      )}
    </div>
  );
}
