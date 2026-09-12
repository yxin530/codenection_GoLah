"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image as ImageIcon, Hash, Menu, Lock } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChatInfoSheet } from '@/components/chat/ChatInfoSheet';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { VoiceMessageBubble } from '@/components/chat/VoiceMessageBubble';
import { AttractionSwiper } from '@/components/chat/AttractionSwiper';
import { AccommodationSwiper } from '@/components/chat/AccommodationSwiper';
import { BottomNav } from '@/components/layout/BottomNav';

type Channel = "general" | "planning" | "accommodation" | "expenses" | "flights";

export default function ChatHubPage() {
  const [activeChannel, setActiveChannel] = useState<Channel>("general");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const handleChannelSelect = (channel: Channel) => {
    setActiveChannel(channel);
    setIsMobileSheetOpen(false); // Close mobile sheet when a channel is selected
  };

  const renderSidebarButtons = () => (
    <>
      <Button 
        variant={activeChannel === "general" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("general")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "general" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "general" ? "text-muted-foreground" : "opacity-70"}`} /> general
      </Button>
      <Button 
        variant={activeChannel === "planning" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("planning")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "planning" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "planning" ? "text-muted-foreground" : "opacity-70"}`} /> planning
      </Button>
      <Button 
        variant={activeChannel === "accommodation" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("accommodation")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "accommodation" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "accommodation" ? "text-muted-foreground" : "opacity-70"}`} /> accommodation
      </Button>
      <Button 
        variant={activeChannel === "expenses" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("expenses")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "expenses" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "expenses" ? "text-muted-foreground" : "opacity-70"}`} /> expenses
      </Button>
      <Button 
        variant={activeChannel === "flights" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("flights")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "flights" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "flights" ? "text-muted-foreground" : "opacity-70"}`} /> flights
      </Button>
    </>
  );

  const renderChannelContent = () => {
    if (activeChannel === "general") {
      return (
        <>
          <MessageBubble
            id="msg1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:00 AM"
            content="Hello! I've finished analyzing your travel preferences. Based on your inputs, I recommend adding Kyoto and Osaka to your itinerary for a good mix of culture and food. Shall we start drafting the daily plan?"
          />
          <MessageBubble
            id="msg2"
            senderName="Yixin"
            avatarInitials="YX"
            isCurrentUser={true}
            timestamp="10:05 AM"
            content="That sounds great! Can we make sure we have time for Universal Studios Japan?"
          />
          <MessageBubble
            id="msg3"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:06 AM"
            content="Absolutely! I will allocate a full day for Universal Studios Japan in Osaka. It usually takes a whole day to explore. I'll add it to the planning channel."
          />
          <VoiceMessageBubble 
            id="msg4"
            senderName="Jing Yi"
            avatarInitials="JY"
            isCurrentUser={false}
            timestamp="10:14 AM"
            transcription="Hey guys, I think we should go to Disneyland on Wednesday instead, what do you think?"
            duration="0:08"
          />
          
          <div className="border-t border-border my-6 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
              AI Debate & Planning
            </span>
          </div>

          <MessageBubble
            id="plan-start"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:20 AM"
            content="Everyone has finished swiping on Attractions and Accommodations! Based on the group's preferences, my sub-agents have differing opinions. Let's hear them out!"
          />

          <MessageBubble
            id="ai-usj"
            senderName="Universal Studios Agent"
            avatarInitials="USJ"
            isAgent={true}
            timestamp="10:21 AM"
            content="Since everyone loved Universal Studios and Osaka Castle, let's prioritize USJ for the adrenaline rush. We need a whole day for that!"
          />

          <MessageBubble
            id="ai-castle"
            senderName="Osaka Castle Agent"
            avatarInitials="OC"
            isAgent={true}
            timestamp="10:21 AM"
            content="But Osaka Castle is so relaxing and historical! We should do that in the morning when it's less crowded and grab matcha nearby."
          />

          <MessageBubble
            id="ai-namba"
            senderName="Nine Hours Namba Agent"
            avatarInitials="NH"
            isAgent={true}
            timestamp="10:22 AM"
            content="For accommodation, I strongly recommend Nine Hours Namba. Since you guys plan to spend most of your time exploring, it's only $35/night. We can use the extra budget for an amazing Wagyu dinner!"
          />

          <MessageBubble
            id="ai-kinoe"
            senderName="Kyoto Ryokan Kinoe Agent"
            avatarInitials="KR"
            isAgent={true}
            timestamp="10:22 AM"
            content="I disagree! The whole point of going to Kyoto is the experience. Kyoto Ryokan Kinoe offers an authentic tatami room and a public bath. It's totally worth the splurge!"
          />

          <MessageBubble
            id="usr-jy2"
            senderName="Jing Yi"
            avatarInitials="JY"
            isCurrentUser={false}
            timestamp="10:23 AM"
            content="I agree with the Ryokan agent, we should definitely splurge on accommodation for at least one night!"
          />

          <div className="flex gap-4 justify-center mt-6 mb-8">
            <Button 
              className="bg-[#F26C3D] hover:bg-[#d85e33] text-white shadow-md relative overflow-hidden"
              onClick={() => window.location.href = `/trips/trip-123/itinerary`}
            >
              Let us choose
            </Button>
            <Button variant="outline" className="shadow-sm">
              Convince us
            </Button>
          </div>
        </>
      );
    }
    
    if (activeChannel === "planning") {
      return (
        <>
          <MessageBubble
            id="plan1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:20 AM"
            content="I've gathered some top attractions in Kyoto and Osaka based on your interests! Let's play a quick game. Swipe right if you'd like to visit, or swipe left to pass. I'll use your votes to build the perfect itinerary."
          />
          <AttractionSwiper onComplete={() => setActiveChannel("general")} />
        </>
      );
    }

    if (activeChannel === "accommodation") {
      return (
        <>
          <MessageBubble
            id="acc1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:25 AM"
            content="I've analyzed the best areas to stay in Osaka and Kyoto based on your itinerary. Here are some highly recommended hotels and ryokans! Swipe right to shortlist, or swipe left to pass."
          />
          <AccommodationSwiper onComplete={() => setActiveChannel("general")} />
        </>
      );
    }

    if (activeChannel === "expenses") {
      return (
        <>
          <MessageBubble
            id="exp1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:30 AM"
            content="Here is a preliminary budget breakdown for your trip to Japan:"
          />
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full max-w-sm ml-12">
            <h3 className="font-semibold mb-3 border-b pb-2">Estimated Budget per Pax</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Flights</span><span className="font-medium">$450</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Accommodation</span><span className="font-medium">$500</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Activities (USJ)</span><span className="font-medium">$120</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Food & Transport</span><span className="font-medium">$350</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-[#ff6b3d]"><span>Total</span><span>$1,420</span></div>
            </div>
          </div>
        </>
      );
    }

    if (activeChannel === "flights") {
      return (
        <>
          <MessageBubble
            id="flt1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:45 AM"
            content="I found some great flight options from KUL to KIX for your dates. The cheapest option is AirAsia X."
          />
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full max-w-sm ml-12">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">KUL ✈️ KIX</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Best Value</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-lg">08:00</p>
                  <p className="text-muted-foreground text-xs">KUL (T2)</p>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 px-4 text-xs text-muted-foreground">
                  <span className="border-b border-dashed w-full text-center pb-1 mb-1">6h 30m</span>
                  <span>Direct</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">15:30</p>
                  <p className="text-muted-foreground text-xs">KIX (T1)</p>
                </div>
              </div>
              <Button className="w-full mt-2 bg-[#ff6b3d] hover:bg-[#f45d30] text-white">Select Flight - $450</Button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      
      {/* Discord-style Channels Sidebar */}
      <div className="w-48 bg-card border-r border-border flex flex-col hidden sm:flex shrink-0">
        <div className="p-4 font-semibold text-sm border-b border-border/50 uppercase text-muted-foreground tracking-wider">
          Channels
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5 mt-2">
          {renderSidebarButtons()}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative pb-20 overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shadow-sm z-10 sticky top-0 bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon" className="sm:hidden -ml-2 h-8 w-8 text-muted-foreground">
                    <Menu className="w-5 h-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-4 border-b border-border/50 text-left">
                  <SheetTitle className="uppercase text-muted-foreground tracking-wider text-sm">Channels</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5 mt-2">
                  {renderSidebarButtons()}
                </div>
              </SheetContent>
            </Sheet>
            <Hash className="w-5 h-5 text-muted-foreground hidden sm:block" />
            <span className="font-bold text-base">{activeChannel}</span>
          </div>
          <ChatInfoSheet />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="mt-4 mb-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Hash className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to #{activeChannel}!</h1>
            <p className="text-muted-foreground">This is the start of the #{activeChannel} channel for your trip.</p>
          </div>

          <div className="border-t border-border my-6 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
              Today
            </span>
          </div>

          {renderChannelContent()}
        </div>
        
        {/* Input */}
        <div className="p-4 pt-0 sticky bottom-0 bg-background pb-8 z-10 border-t border-border mt-2">
          {activeChannel === "general" ? (
            <form className="flex gap-2 items-center bg-muted/50 p-2 pl-4 rounded-xl border border-border focus-within:ring-1 focus-within:ring-[#F26C3D] focus-within:border-[#F26C3D] transition-all mt-4">
              <Button variant="ghost" size="icon" type="button" className="text-muted-foreground shrink-0 rounded-full hover:bg-muted h-8 w-8">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Input 
                placeholder="Message #general..." 
                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 px-2 h-10" 
              />
              <Button variant="ghost" size="icon" type="button" className="text-muted-foreground shrink-0 rounded-full hover:bg-muted h-8 w-8">
                <Mic className="w-5 h-5" />
              </Button>
              <Button type="submit" size="icon" className="rounded-full bg-[#F26C3D] hover:bg-[#d85e33] shrink-0 h-8 w-8 ml-1">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div className="flex gap-2 items-center bg-muted/30 p-2 pl-4 rounded-xl border border-border mt-4 h-14 justify-center text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Only the AI assistant can post in this channel</span>
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
