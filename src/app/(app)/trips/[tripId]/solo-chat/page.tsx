"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image as ImageIcon, Hash, Menu, Lock, ArrowRight, Check, Vote, Compass } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SoloChatInfoSheet } from '@/components/chat/SoloChatInfoSheet';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { VoiceMessageBubble } from '@/components/chat/VoiceMessageBubble';
import { AttractionSwiper } from '@/components/chat/AttractionSwiper';
import { AccommodationSwiper } from '@/components/chat/AccommodationSwiper';
import { BottomNav } from '@/components/layout/BottomNav';

type Channel = "general" | "planning" | "accommodation" | "expenses" | "flights";

let globalInitialStep = 0;
let globalDebateStep = -1;
let globalPlanningCompleted = false;
let globalAccommodationCompleted = false;

export default function ChatHubPage() {
  const [activeChannel, setActiveChannel] = useState<Channel>("general");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [planningCompleted, setPlanningCompleted] = useState(globalPlanningCompleted);
  const [accommodationCompleted, setAccommodationCompleted] = useState(globalAccommodationCompleted);
  const swipingCompleted = planningCompleted && accommodationCompleted;
  const [debateStage, setDebateStage] = useState<'idle' | 'poll' | 'approval' | 'added'>('idle');
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({ 'Kuromon Market': 0, 'Osaka Castle': 0, 'Kyoto Ryokan Kinoe': 0 });
  const [initialMessageStep, setInitialMessageStep] = useState(globalInitialStep);
  const [debateMessageStep, setDebateMessageStep] = useState(globalDebateStep);

  useEffect(() => {
    globalPlanningCompleted = planningCompleted;
    globalAccommodationCompleted = accommodationCompleted;
  }, [planningCompleted, accommodationCompleted]);

  useEffect(() => {
    globalInitialStep = Math.max(globalInitialStep, initialMessageStep);
  }, [initialMessageStep]);

  useEffect(() => {
    globalDebateStep = Math.max(globalDebateStep, debateMessageStep);
  }, [debateMessageStep]);
  const router = useRouter();

  useEffect(() => {
    if (swipingCompleted) {
      setInitialMessageStep(4);
      setDebateMessageStep(0);
    }
  }, [swipingCompleted]);

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
      {swipingCompleted && (
        <Button
          variant="ghost"
          onClick={() => router.push('/trips/trip-123/itinerary')}
          className="w-full justify-start h-8 text-sm font-medium px-2 text-muted-foreground hover:text-foreground"
        >
          <Compass className="w-4 h-4 mr-1.5 opacity-70" /> itinerary
        </Button>
      )}
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
            animateMessage={initialMessageStep === 0}
            onMessageSent={() => setInitialMessageStep(1)}
          />
          {initialMessageStep >= 1 && <MessageBubble
            id="msg2"
            senderName="Yixin"
            avatarInitials="YX"
            isCurrentUser={true}
            timestamp="10:05 AM"
            content="That sounds great! Can we make sure we have time for Universal Studios Japan?"
            animateMessage={initialMessageStep === 1}
            onMessageSent={() => setInitialMessageStep(2)}
          />}
          {initialMessageStep >= 2 && <MessageBubble
            id="msg3"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:06 AM"
            content="Absolutely! I will allocate a full day for Universal Studios Japan in Osaka. It usually takes a whole day to explore. I'll add it to the planning channel."
            animateMessage={initialMessageStep === 2}
            onMessageSent={() => setInitialMessageStep(3)}
          />}


          {swipingCompleted && (
            <>
              <div className="border-t border-border my-6 relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
                  AI Debate & Planning
                </span>
              </div>

              {debateMessageStep >= 0 && <MessageBubble
                id="plan-start"
                senderName="GoLah AI"
                isAgent={true}
                timestamp="10:20 AM"
                content="You have finished swiping on Attractions and Accommodations! Based on your preferences, my sub-agents have differing opinions. Let's hear them out!"
                animateMessage={debateMessageStep === 0}
                onMessageSent={() => setDebateMessageStep(1)}
              />}

              {debateMessageStep >= 1 && <MessageBubble
                id="ai-usj"
                senderName="Universal Studios Agent"
                avatarInitials="USJ"
                isAgent={true}
                timestamp="10:21 AM"
                content="Since you loved Universal Studios and Osaka Castle, let's prioritize USJ for the adrenaline rush. You need a whole day for that!"
                animateMessage={debateMessageStep === 1}
                onMessageSent={() => setDebateMessageStep(2)}
              />}

              {debateMessageStep >= 2 && <MessageBubble
                id="ai-castle"
                senderName="Osaka Castle Agent"
                avatarInitials="OC"
                isAgent={true}
                timestamp="10:21 AM"
                content="But Osaka Castle is so relaxing and historical! We should do that in the morning when it's less crowded and grab matcha nearby."
                animateMessage={debateMessageStep === 2}
                onMessageSent={() => setDebateMessageStep(3)}
              />}

              {debateMessageStep >= 3 && <MessageBubble
                id="ai-namba"
                senderName="Nine Hours Namba Agent"
                avatarInitials="NH"
                isAgent={true}
                timestamp="10:22 AM"
                content="For accommodation, I strongly recommend Nine Hours Namba. Since you plan to spend most of your time exploring, it's only $35/night. You can use the extra budget for an amazing Wagyu dinner!"
                animateMessage={debateMessageStep === 3}
                onMessageSent={() => setDebateMessageStep(4)}
              />}

              {debateMessageStep >= 4 && <MessageBubble
                id="ai-kinoe"
                senderName="Kyoto Ryokan Kinoe Agent"
                avatarInitials="KR"
                isAgent={true}
                timestamp="10:22 AM"
                content="I disagree! The whole point of going to Kyoto is the experience. Kyoto Ryokan Kinoe offers an authentic tatami room and a public bath. It's totally worth the splurge!"
                animateMessage={debateMessageStep === 4}
                onMessageSent={() => setDebateMessageStep(5)}
              />}



              {debateMessageStep >= 5 && debateStage === 'idle' && <div className="flex gap-4 justify-center mt-6 mb-8">
                <Button
                  className="bg-[#F26C3D] hover:bg-[#d85e33] text-white shadow-md relative overflow-hidden"
                  onClick={() => setDebateStage('poll')}
                >
                  Let me choose <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="shadow-sm">
                  Convince me
                </Button>
              </div>}

              {debateStage === 'poll' && (
                <div className="ml-12 max-w-md rounded-2xl border border-[#F26C3D]/30 bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 font-semibold"><Vote className="w-4 h-4 text-[#F26C3D]" /> Decision Poll</div>
                  <p className="text-sm text-muted-foreground mb-4">Vote for the place you want to prioritize in the itinerary.</p>
                  <div className="space-y-2">
                    {Object.entries(pollVotes).map(([place, votes]) => {
                      const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);
                      const isMaxVotes = totalVotes >= 1;
                      return (
                        <Button 
                          key={place} 
                          variant="outline" 
                          className="w-full justify-between h-auto py-2" 
                          onClick={() => setPollVotes(current => ({ ...current, [place]: current[place] + 1 }))}
                          disabled={isMaxVotes}
                        >
                          <span>{place}</span><span className="text-xs text-muted-foreground">{votes} vote{votes === 1 ? '' : 's'}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button className="w-full mt-4 bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => setDebateStage('approval')}>Finish voting</Button>
                </div>
              )}

              {debateStage === 'approval' && (
                <div className="ml-12 max-w-md rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm">
                  <p className="font-semibold">Your choice is {Object.entries(pollVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">Add it to Day 3 of the itinerary?</p>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => { localStorage.setItem('approvedPollPlace', Object.entries(pollVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]); setDebateStage('added'); }}>Approve & add</Button>
                    <Button variant="outline" onClick={() => setDebateStage('poll')}>Back to poll</Button>
                  </div>
                </div>
              )}

              {debateStage === 'added' && (
                <div className="ml-12 max-w-md rounded-2xl border border-green-200 bg-green-50/60 p-4 text-sm text-green-800 flex items-center gap-2"><Check className="w-4 h-4" /> {Object.entries(pollVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]} was added to your itinerary.</div>
              )}
            </>
          )}
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
          <AttractionSwiper 
            isSolo={true}
            otherSwiperCompleted={accommodationCompleted}
            onSwitchChannel={(c) => setActiveChannel(c as any)}
            onComplete={() => setPlanningCompleted(true)} 
          />
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
          <AccommodationSwiper 
            isSolo={true}
            otherSwiperCompleted={planningCompleted}
            onSwitchChannel={(c) => setActiveChannel(c as any)}
            onComplete={() => setAccommodationCompleted(true)} 
          />
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
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full max-w-lg ml-12">
            <div className="flex items-start justify-between border-b pb-3 mb-3"><div><h3 className="font-semibold">Estimated trip spend per pax</h3><p className="text-xs text-muted-foreground mt-1">Mock conversion: USD 1 ≈ MYR 4.70 • JPY 100 ≈ MYR 3.15</p></div><span className="text-xs rounded-full bg-muted px-2 py-1">7 days</span></div>
            <div className="space-y-3 text-sm">
              {[['Flights', 'USD 450', '≈ MYR 2,115'], ['Accommodation · 6 nights', 'JPY 78,000', '≈ MYR 2,457'], ['USJ + attractions', 'JPY 18,000', '≈ MYR 567'], ['Food · JPY 3,500/day', 'JPY 24,500', '≈ MYR 772'], ['Local transport', 'JPY 16,000', '≈ MYR 504']].map(([label, original, converted]) => <div key={label} className="flex justify-between gap-4"><div><p className="font-medium">{label}</p><p className="text-xs text-muted-foreground">{original}</p></div><span className="font-medium text-right">{converted}</span></div>)}
              <div className="border-t pt-3 mt-2 flex justify-between font-bold text-[#ff6b3d]"><span>Estimated total</span><span>≈ MYR 6,415</span></div>
              <p className="text-xs text-muted-foreground">Budget range: MYR 5,800–7,100 depending on hotel, meals, and shopping.</p>
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
          <SoloChatInfoSheet />
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

          <div>{renderChannelContent()}</div>
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
