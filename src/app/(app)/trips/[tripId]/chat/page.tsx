import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Image as ImageIcon, Hash, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChatInfoSheet } from '@/components/chat/ChatInfoSheet';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { BottomNav } from '@/components/layout/BottomNav';

export default function ChatHubPage() {
  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      
      {/* Discord-style Channels Sidebar */}
      <div className="w-48 bg-card border-r border-border flex flex-col hidden sm:flex">
        <div className="p-4 font-semibold text-sm border-b border-border/50 uppercase text-muted-foreground tracking-wider">
          Channels
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5 mt-2">
          <Button variant="secondary" className="w-full justify-start h-8 text-sm font-medium bg-muted/80 px-2">
            <Hash className="w-4 h-4 mr-1.5 text-muted-foreground" /> general
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
            <Hash className="w-4 h-4 mr-1.5 opacity-70" /> planning
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
            <Hash className="w-4 h-4 mr-1.5 opacity-70" /> expenses
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
            <Hash className="w-4 h-4 mr-1.5 opacity-70" /> flights
          </Button>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative pb-20">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shadow-sm z-10 sticky top-0 bg-background/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="sm:hidden -ml-2 h-8 w-8 text-muted-foreground" />}>
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="p-4 border-b border-border/50 text-left">
                  <SheetTitle className="uppercase text-muted-foreground tracking-wider text-sm">Channels</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5 mt-2">
                  <Button variant="secondary" className="w-full justify-start h-8 text-sm font-medium bg-muted/80 px-2">
                    <Hash className="w-4 h-4 mr-1.5 text-muted-foreground" /> general
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
                    <Hash className="w-4 h-4 mr-1.5 opacity-70" /> planning
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
                    <Hash className="w-4 h-4 mr-1.5 opacity-70" /> expenses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm font-medium text-muted-foreground px-2 hover:text-foreground">
                    <Hash className="w-4 h-4 mr-1.5 opacity-70" /> flights
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Hash className="w-5 h-5 text-muted-foreground hidden sm:block" />
            <span className="font-bold text-base">general</span>
          </div>
          <ChatInfoSheet />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="mt-4 mb-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Hash className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to #general!</h1>
            <p className="text-muted-foreground">This is the start of the #general channel for your trip.</p>
          </div>

          <div className="border-t border-border my-6 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-background px-2 text-xs font-semibold text-muted-foreground">
              Today
            </span>
          </div>

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

          <MessageBubble
            id="msg4"
            senderName="Jing Yi"
            avatarInitials="JY"
            timestamp="10:12 AM"
            content="Yay USJ! Let's get the express passes if possible so we don't have to queue for hours."
          />
        </div>
        
        {/* Input */}
        <div className="p-4 pt-0 sticky bottom-0 bg-background pb-8 z-10 border-t border-border mt-2">
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
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
