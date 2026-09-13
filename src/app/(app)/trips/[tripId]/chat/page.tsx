"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image as ImageIcon, Hash, Menu, Lock, ArrowRight, Check, Vote, Compass , CheckCircle2, XCircle, Loader2, QrCode} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChatInfoSheet } from '@/components/chat/ChatInfoSheet';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { VoiceMessageBubble } from '@/components/chat/VoiceMessageBubble';
import { AttractionSwiper } from '@/components/chat/AttractionSwiper';
import { AccommodationSwiper } from '@/components/chat/AccommodationSwiper';
import { BoardingPass } from '@/components/chat/BoardingPass';
import { BottomNav } from '@/components/layout/BottomNav';

type Channel = "general" | "planning" | "accommodation" | "expenses" | "manage";

let globalInitialStep = 0;
let globalDebateStep = -1;
let globalPlanningCompleted = false;
let globalAccommodationCompleted = false;

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

export default function ChatHubPage() {
  const [mounted, setMounted] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Channel>("general");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [planningCompleted, setPlanningCompleted] = useState(globalPlanningCompleted);
  const [accommodationCompleted, setAccommodationCompleted] = useState(globalAccommodationCompleted);
  const swipingCompleted = planningCompleted && accommodationCompleted;
  const [debateStage, setDebateStage] = useState<'idle' | 'poll_acc' | 'approval_acc' | 'poll_plan' | 'approval_plan' | 'added'>('idle');
  const [pollAccVotes, setPollAccVotes] = useState<Record<string, number>>({ 'Kyoto Ryokan Kinoe': 1, 'Nine Hours Namba': 1, 'Hotel Monterey Grasmere': 0 });
  const [pollPlanVotes, setPollPlanVotes] = useState<Record<string, number>>({ 'Kuromon Market': 1, 'Osaka Castle': 1 });
  const [topPlaces, setTopPlaces] = useState<string[]>(['Universal Studios Japan', 'Osaka Castle']);
  const [topAccs, setTopAccs] = useState<string[]>(['Nine Hours Namba', 'Kyoto Ryokan Kinoe']);
  const [initialMessageStep, setInitialMessageStep] = useState(globalInitialStep);
  const [debateMessageStep, setDebateMessageStep] = useState(globalDebateStep);
  const [selectedManageFlight, setSelectedManageFlight] = useState('Malaysia Airlines');
  const [selectedManageHotel, setSelectedManageHotel] = useState('The Celestine Kyoto Gion');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [activePass, setActivePass] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setInitialMessageStep(9);
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
          onClick={() => router.push('/trips/group-trip-123/itinerary')}
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
      {swipingCompleted && bookingComplete && <Button 
        variant={activeChannel === "expenses" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("expenses")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "expenses" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "expenses" ? "text-muted-foreground" : "opacity-70"}`} /> expenses
      </Button>}
      <Button 
        variant={activeChannel === "manage" ? "secondary" : "ghost"} 
        onClick={() => handleChannelSelect("manage")}
        className={`w-full justify-start h-8 text-sm font-medium px-2 ${activeChannel === "manage" ? "bg-muted/80 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Hash className={`w-4 h-4 mr-1.5 ${activeChannel === "manage" ? "text-muted-foreground" : "opacity-70"}`} /> manage
      </Button>
    </>
  );

  const renderChannelContent = () => {
    if (activeChannel === "general") {
      return (
        <>
          <MessageBubble
            id="group-msg1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:00 AM"
            content="Hello everyone! I've finished analyzing the group's travel preferences. Based on everyone's inputs, I recommend adding Kyoto and Osaka to your itinerary for a good mix of culture and food. Shall we start drafting the daily plan?"
            animateMessage={initialMessageStep === 0}
            onMessageSent={() => setInitialMessageStep(1)}
          />
          {initialMessageStep >= 1 && <MessageBubble
            id="group-msg2"
            senderName="Yun Xin"
            avatarInitials="YX"
            isCurrentUser={true}
            timestamp="10:05 AM"
            content="That sounds great! Can we make sure we have time for Universal Studios Japan?"
            animateMessage={initialMessageStep === 1}
            onMessageSent={() => setInitialMessageStep(2)}
          />}
          {initialMessageStep >= 2 && <MessageBubble
            id="group-msg3"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:06 AM"
            content="Absolutely! I will allocate a full day for Universal Studios Japan in Osaka. It usually takes a whole day to explore. I'll add it to the planning channel."
            animateMessage={initialMessageStep === 2}
            onMessageSent={() => setInitialMessageStep(3)}
          />}
          {initialMessageStep >= 3 && <VoiceMessageBubble
            id="group-msg4"
            senderName="Jie Ying"
            avatarInitials="JY"
            isCurrentUser={false}
            timestamp="10:14 AM"
            transcription="Hey guys, I think we should go to Disneyland on Wednesday instead, what do you think?"
            duration="0:08"
            animateMessage={initialMessageStep === 3}
            onMessageSent={() => setInitialMessageStep(4)}
          />}
          {initialMessageStep >= 4 && <MessageBubble
            id="group-msg5"
            senderName="Xuan Yu"
            avatarInitials="XY"
            isCurrentUser={false}
            timestamp="10:15 AM"
            content="Disneyland sounds amazing! I'm in for that."
            animateMessage={initialMessageStep === 4}
            onMessageSent={() => setInitialMessageStep(5)}
          />}
          {initialMessageStep >= 5 && <MessageBubble
            id="group-msg6"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:16 AM"
            content="Great! I've noted that down. I'll make sure to find the best route from our accommodation to Tokyo Disneyland."
            animateMessage={initialMessageStep === 5}
            onMessageSent={() => setInitialMessageStep(6)}
          />}
          {initialMessageStep >= 6 && <MessageBubble
            id="group-msg7"
            senderName="Yun Xin"
            avatarInitials="YX"
            isCurrentUser={true}
            timestamp="10:18 AM"
            content="Should we buy the tickets in advance or at the gate?"
            animateMessage={initialMessageStep === 6}
            onMessageSent={() => setInitialMessageStep(7)}
          />}
          {initialMessageStep >= 7 && <MessageBubble
            id="group-msg8"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:19 AM"
            content="I highly recommend buying in advance to avoid long queues! Once everyone completes the planning phase, I'll provide the booking links."
            animateMessage={initialMessageStep === 7}
            onMessageSent={() => setInitialMessageStep(8)}
          />}

          {swipingCompleted && (
            <>
              <div className="border-t border-border my-6 relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
                  AI Debate & Planning
                </span>
              </div>

              {debateMessageStep >= 0 && <MessageBubble
                id="group-plan-start"
                senderName="GoLah AI"
                isAgent={true}
                timestamp="10:20 AM"
                content="Everyone has finished swiping on Attractions and Accommodations! Based on the group's preferences, my sub-agents have differing opinions. Let's hear them out!"
                animateMessage={debateMessageStep === 0}
                onMessageSent={() => setDebateMessageStep(1)}
              />}

              {debateMessageStep >= 1 && <MessageBubble
                id="group-ai-usj"
                senderName={`${topPlaces[0]} Agent`}
                avatarInitials={getInitials(topPlaces[0])}
                isAgent={true}
                timestamp="10:21 AM"
                content="Since everyone loved Universal Studios and Osaka Castle, let's prioritize USJ for the adrenaline rush. We need a whole day for that!"
                animateMessage={debateMessageStep === 1}
                onMessageSent={() => setDebateMessageStep(2)}
              />}

              {debateMessageStep >= 2 && <MessageBubble
                id="group-ai-castle"
                senderName={`${topPlaces[1]} Agent`}
                avatarInitials={getInitials(topPlaces[1])}
                isAgent={true}
                timestamp="10:21 AM"
                content={`But ${topPlaces[1]} is such a classic experience! We should do that in the morning when it's less crowded.`}
                animateMessage={debateMessageStep === 2}
                onMessageSent={() => setDebateMessageStep(3)}
              />}

              {debateMessageStep >= 3 && <MessageBubble
                id="group-ai-namba"
                senderName={`${topAccs[0]} Agent`}
                avatarInitials={getInitials(topAccs[0])}
                isAgent={true}
                timestamp="10:22 AM"
                content="For accommodation, I strongly recommend Nine Hours Namba. Since you guys plan to spend most of your time exploring, it's only $35/night. We can use the extra budget for an amazing Wagyu dinner!"
                animateMessage={debateMessageStep === 3}
                onMessageSent={() => setDebateMessageStep(4)}
              />}

              {debateMessageStep >= 4 && <MessageBubble
                id="group-ai-kinoe"
                senderName={`${topAccs[1]} Agent`}
                avatarInitials={getInitials(topAccs[1])}
                isAgent={true}
                timestamp="10:22 AM"
                content={`I disagree! ${topAccs[1]} offers a much more unique experience. It's totally worth it for the memories!`}
                animateMessage={debateMessageStep === 4}
                onMessageSent={() => setDebateMessageStep(5)}
              />}

              {debateMessageStep >= 5 && <MessageBubble
                id="group-usr-jy2"
                senderName="Jie Ying"
                avatarInitials="JY"
                isCurrentUser={false}
                timestamp="10:23 AM"
                content="I agree with the Ryokan agent, we should definitely splurge on accommodation for at least one night!"
                animateMessage={debateMessageStep === 5}
                onMessageSent={() => setDebateMessageStep(6)}
              />}

              {debateMessageStep >= 6 && debateStage === 'idle' && <div className="flex gap-4 justify-center mt-6 mb-8">
                <Button
                  className="bg-[#F26C3D] hover:bg-[#d85e33] text-white shadow-md relative overflow-hidden"
                  onClick={() => setDebateStage('poll_acc')}
                >
                  Let us choose <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="shadow-sm">
                  Convince us
                </Button>
              </div>}

              {debateStage === 'poll_acc' && (
                <div className="ml-12 max-w-md rounded-2xl border border-[#F26C3D]/30 bg-card p-5 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-2 font-semibold"><Vote className="w-4 h-4 text-[#F26C3D]" /> Accommodation Poll</div>
                  <p className="text-sm text-muted-foreground mb-4">Vote for the accommodation you want us to prioritize.</p>
                  <div className="space-y-2">
                    {Object.entries(pollAccVotes).map(([place, votes]) => {
                      const totalVotes = Object.values(pollAccVotes).reduce((a, b) => a + b, 0);
                      const isMaxVotes = totalVotes >= 3;
                      return (
                        <Button 
                          key={place} 
                          variant="outline" 
                          className="w-full justify-between h-auto py-2" 
                          onClick={() => setPollAccVotes(current => ({ ...current, [place]: current[place] + 1 }))}
                          disabled={isMaxVotes}
                        >
                          <span>{place}</span><span className="text-xs text-muted-foreground">{votes} vote{votes === 1 ? '' : 's'}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button className="w-full mt-4 bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => setDebateStage('approval_acc')}>Finish voting</Button>
                </div>
              )}

              {debateStage === 'approval_acc' && (
                <div className="ml-12 max-w-md rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm mb-4">
                  <p className="font-semibold text-black">The accommodation winner is {Object.entries(pollAccVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">It received the most votes. Use this as your group's accommodation?</p>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => { localStorage.setItem('approvedPollAcc', Object.entries(pollAccVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]); setDebateStage('poll_plan'); }}>Approve</Button>
                    <Button variant="outline" className="text-black" onClick={() => setDebateStage('poll_acc')}>Back to poll</Button>
                  </div>
                </div>
              )}

              {debateStage === 'poll_plan' && (
                <div className="ml-12 max-w-md rounded-2xl border border-[#F26C3D]/30 bg-card p-5 shadow-sm mb-4">
                  <div className="flex items-center gap-2 mb-2 font-semibold"><Vote className="w-4 h-4 text-[#F26C3D]" /> Attraction Poll</div>
                  <p className="text-sm text-muted-foreground mb-4">Vote for the attraction you want us to add to the itinerary.</p>
                  <div className="space-y-2">
                    {Object.entries(pollPlanVotes).map(([place, votes]) => {
                      const totalVotes = Object.values(pollPlanVotes).reduce((a, b) => a + b, 0);
                      const isMaxVotes = totalVotes >= 3;
                      return (
                        <Button 
                          key={place} 
                          variant="outline" 
                          className="w-full justify-between h-auto py-2" 
                          onClick={() => setPollPlanVotes(current => ({ ...current, [place]: current[place] + 1 }))}
                          disabled={isMaxVotes}
                        >
                          <span>{place}</span><span className="text-xs text-muted-foreground">{votes} vote{votes === 1 ? '' : 's'}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <Button className="w-full mt-4 bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => setDebateStage('approval_plan')}>Finish voting</Button>
                </div>
              )}

              {debateStage === 'approval_plan' && (
                <div className="ml-12 max-w-md rounded-2xl border border-amber-200 bg-amber-50/60 p-5 shadow-sm mb-4">
                  <p className="font-semibold text-black">The attraction winner is {Object.entries(pollPlanVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
                  <p className="text-sm text-muted-foreground mt-1">It received the most votes. Add it to your itinerary?</p>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-[#F26C3D] hover:bg-[#d85e33] text-white" onClick={() => { localStorage.setItem('approvedPollPlace', Object.entries(pollPlanVotes).reduce((a, b) => a[1] > b[1] ? a : b)[0]); setDebateStage('added'); }}>Approve & add</Button>
                    <Button variant="outline" className="text-black" onClick={() => setDebateStage('poll_plan')}>Back to poll</Button>
                  </div>
                </div>
              )}

              {debateStage === 'added' && (
                <div className="ml-12 max-w-md rounded-2xl border border-green-200 bg-green-50/60 p-4 text-sm text-green-800 flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4" /> Voting Complete!
                  </div>
                  <p className="text-green-700">The itinerary has been updated with your group's choices!</p>
                </div>
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
            id="group-plan1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:20 AM"
            content="I've gathered some top attractions in Kyoto and Osaka based on the group's interests! Let's play a quick game. Swipe right if you'd like to visit, or swipe left to pass. I'll use everyone's votes to build the perfect itinerary."
          />
          <AttractionSwiper 
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
            id="group-acc1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:25 AM"
            content="I've analyzed the best areas to stay in Osaka and Kyoto based on the group's itinerary. Here are some highly recommended hotels and ryokans! Swipe right to shortlist, or swipe left to pass."
          />
          <AccommodationSwiper 
            otherSwiperCompleted={planningCompleted}
            onSwitchChannel={(c) => setActiveChannel(c as any)}
            onComplete={() => setAccommodationCompleted(true)} 
          />
        </>
      );
    }

    if (activeChannel === "expenses") {
      const budgetChoice = mounted ? localStorage.getItem('golahTripBudget') : null;
      const budgetMYR = budgetChoice?.includes('Under') ? 1500 : budgetChoice?.includes('1,500') ? 2500 : budgetChoice?.includes('2,500') ? 4000 : 4500;
      const flightCostUSD = Math.round(Math.min(450, budgetMYR * 0.1));
      const flightCostMYR = flightCostUSD * 4.70;
      
      const accChoice = mounted ? localStorage.getItem('approvedPollAcc') : null;
      let accCostJPY = 78000;
      if (accChoice === 'Nine Hours Namba') accCostJPY = 31500;
      else if (accChoice === 'Hotel Monterey Grasmere') accCostJPY = 108000;
      else if (accChoice === 'Kyoto Ryokan Kinoe') accCostJPY = 270000;
      else if (accChoice === 'Cross Hotel Osaka') accCostJPY = 135000;
      else if (accChoice === 'Ritz-Carlton Kyoto') accCostJPY = 720000;
      const accCostMYR = accCostJPY * 0.0315;

      const likedPlaces = mounted ? JSON.parse(localStorage.getItem('tripLikedPlaces') || '[]') : [];
      let attrCostJPY = 0;
      if (likedPlaces.includes('Universal Studios Japan')) attrCostJPY += 8600;
      if (likedPlaces.includes('Osaka Castle')) attrCostJPY += 600;
      const attrCostMYR = attrCostJPY * 0.0315;

      const foodCostJPY = 24500;
      const foodCostMYR = foodCostJPY * 0.0315;

      const transportCostJPY = 16000;
      const transportCostMYR = transportCostJPY * 0.0315;

      const totalMYR = budgetMYR;

      return (
        <>
          <MessageBubble
            id="group-exp1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:30 AM"
            content="Here is a dynamic budget breakdown based on the group's chosen itinerary:"
          />
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full max-w-lg ml-12">
            <div className="flex items-start justify-between border-b pb-3 mb-3"><div><h3 className="font-semibold">Estimated trip spend per pax</h3><p className="text-xs text-muted-foreground mt-1">Mock conversion: USD 1 ≈ MYR 4.70 • JPY 100 ≈ MYR 3.15</p></div><span className="text-xs rounded-full bg-muted px-2 py-1">7 days</span></div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><div><p className="font-medium">Flights</p><p className="text-xs text-muted-foreground">USD {flightCostUSD}</p></div><span className="font-medium text-right">≈ MYR {flightCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Accommodation ({accChoice || 'Standard'})</p><p className="text-xs text-muted-foreground">JPY {accCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {accCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Attractions ({likedPlaces.length} selected)</p><p className="text-xs text-muted-foreground">JPY {attrCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {attrCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Food</p><p className="text-xs text-muted-foreground">JPY {foodCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {foodCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="flex justify-between gap-4"><div><p className="font-medium">Local transport</p><p className="text-xs text-muted-foreground">JPY {transportCostJPY.toLocaleString()}</p></div><span className="font-medium text-right">≈ MYR {transportCostMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              
              <div className="border-t pt-3 mt-2 flex justify-between font-bold text-[#ff6b3d]"><span>Estimated total</span><span>≈ MYR {totalMYR.toLocaleString('en-US', {maximumFractionDigits:0})}</span></div>
              <p className="text-xs text-muted-foreground">Budget range: MYR {(totalMYR * 0.9).toLocaleString('en-US', {maximumFractionDigits:0})}–{(totalMYR * 1.1).toLocaleString('en-US', {maximumFractionDigits:0})} depending on actual meals and shopping.</p>
            </div>
          </div>
        </>
      );
    }

    if (activeChannel === "manage") {
      return (
        <>
          <MessageBubble
            id="group-manage1"
            senderName="GoLah AI"
            isAgent={true}
            timestamp="10:45 AM"
            content="Your trip wallet is ready. Choose a flight first, then open any booking to view its QR pass."
          />
          {!bookingComplete && (
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
                <p className="mt-4 mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Choose your airline</p><div className="space-y-2">{['Malaysia Airlines · RM 1,289', 'AirAsia X · RM 899'].map((option) => <Button key={option} variant={selectedManageFlight === option.split(' · ')[0] ? 'default' : 'outline'} onClick={() => setSelectedManageFlight(option.split(' · ')[0])} className="w-full justify-between"><span>{option}</span>{selectedManageFlight === option.split(' · ')[0] && <Check className="h-4 w-4" />}</Button>)}</div>
                <p className="mt-4 mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Choose your accommodation</p><div className="space-y-2">{['The Celestine Kyoto Gion · RM 2,140', 'Hotel Gracery Kyoto · RM 1,780'].map((option) => <Button key={option} variant={selectedManageHotel === option.split(' · ')[0] ? 'default' : 'outline'} onClick={() => setSelectedManageHotel(option.split(' · ')[0])} className="w-full justify-between"><span>{option}</span>{selectedManageHotel === option.split(' · ')[0] && <Check className="h-4 w-4" />}</Button>)}</div><Button onClick={() => { localStorage.setItem('golahBookingComplete', 'true'); setBookingComplete(true); }} className="mt-3 w-full bg-[#ff6b3d] text-white hover:bg-[#f45d30]">Confirm booking</Button>
              </div>
            </div>
          )}
          {bookingComplete && (
            <div className="ml-12 mt-4 max-w-lg">
              <div className="rounded-2xl border border-green-200 bg-green-50/60 p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-green-700" />
                  <p className="text-sm font-bold text-green-700">Booking confirmed!</p>
                </div>
                <p className="text-xs text-green-600">Your flight and passes are ready.</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {['Flight boarding pass', 'Hotel reservation pass', 'Attraction QR pass', 'Trip support pass'].map((label) => (
                  <button key={label} onClick={() => setActivePass(label)} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left text-sm font-semibold hover:border-[#ff6b3d]">
                    <QrCode className="h-5 w-5 text-[#ff6b3d]" />{label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {activePass === 'Flight boarding pass' && (
            <BoardingPass airline={selectedManageFlight} hotel={selectedManageHotel} onClose={() => setActivePass(null)} />
          )}
          {activePass && activePass !== 'Flight boarding pass' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
              <div className="w-full max-w-sm rounded-2xl bg-background p-6 text-center shadow-xl">
                <button onClick={() => setActivePass(null)} className="float-right text-muted-foreground">×</button>
                <QrCode className="mx-auto mt-3 h-44 w-44" />
                <h3 className="mt-4 text-lg font-bold">{activePass}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Mocked pass · Yun Xin · Kyoto trip · 12–17 Oct 2025</p>
                <Button onClick={() => setActivePass(null)} className="mt-5 w-full bg-[#ff6b3d] text-white">Close pass</Button>
              </div>
            </div>
          )}
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
          <div className="absolute inset-x-0 top-full z-10 flex gap-1 border-b border-border bg-background px-4 py-2"><span className="text-[10px] font-bold text-[#ff6b3d]">Discussion</span><div className="mt-1 h-1 flex-1 rounded-full bg-[#ff6b3d]" /><span className={`text-[10px] font-bold ${activeChannel === "manage" ? "text-[#ff6b3d]" : "text-[#899397]"}`}>Finalizing</span><div className="mt-1 h-1 flex-1 rounded-full bg-[#ff6b3d]" /><span className={`text-[10px] font-bold ${activeChannel === "manage" ? "text-[#ff6b3d]" : "text-[#899397]"}`}>Booking</span><div className={`mt-1 h-1 flex-1 rounded-full ${activeChannel === "manage" ? "bg-[#ff6b3d]" : "bg-[#ebe6e1]"}`} /><span className={`text-[10px] font-bold ${activeChannel === "manage" ? "text-[#ff6b3d]" : "text-[#899397]"}`}>Manage</span></div>
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
