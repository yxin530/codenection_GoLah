import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Send, Mic, Image as ImageIcon, Receipt, Hash } from 'lucide-react';
import { ChatInfoSheet } from '@/components/chat/ChatInfoSheet';
import { ActionCardBillSplit } from '@/components/chat/ActionCardBillSplit';
import { VoiceMessageBubble } from '@/components/chat/VoiceMessageBubble';
import { DestinationComparison } from '@/components/chat/DestinationComparison';

export default function ChatHubPage() {
  return (
    <div className="flex h-[600px] border border-border rounded-xl overflow-hidden shadow-sm">
      
      {/* Discord-style Channels Sidebar */}
      <div className="w-48 bg-card border-r border-border flex flex-col">
        <div className="p-4 font-semibold text-sm border-b border-border/50">
          Channels
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <Button variant="secondary" className="w-full justify-start h-8 text-xs font-medium bg-muted/80">
            <Hash className="w-3 h-3 mr-2 text-muted-foreground" /> general
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-xs font-normal text-muted-foreground">
            <Hash className="w-3 h-3 mr-2 opacity-70" /> planning
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-xs font-normal text-muted-foreground">
            <Hash className="w-3 h-3 mr-2 opacity-70" /> expenses
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 text-xs font-normal text-muted-foreground">
            <Hash className="w-3 h-3 mr-2 opacity-70" /> flights
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-card/30 backdrop-blur-sm relative">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-sm">general</span>
            <div className="ml-4 flex -space-x-2">
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-[10px]">YX</AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-[10px]">JY</AvatarFallback>
              </Avatar>
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-[10px]">XY</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <ChatInfoSheet />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* User Voice Message */}
          <div className="flex gap-4 justify-end">
            <VoiceMessageBubble />
            <Avatar className="h-8 w-8 mt-auto">
              <AvatarFallback>YX</AvatarFallback>
            </Avatar>
          </div>

          {/* Another User Message (Group mode) */}
          <div className="flex gap-4">
            <Avatar className="h-8 w-8 mt-auto">
              <AvatarFallback>XY</AvatarFallback>
            </Avatar>
            <div className="bg-muted text-foreground p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
              <p>I agree, Disneyland sounds fun!</p>
            </div>
          </div>

          {/* User Receipt Image Mock */}
          <div className="flex gap-4 justify-end">
            <div className="bg-[#F26C3D] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%] space-y-2">
              <div className="bg-white/20 h-24 w-32 rounded-md flex items-center justify-center">
                <Receipt className="w-8 h-8 opacity-50" />
              </div>
              <p>Can you help split this Izakaya bill? I paid for it all.</p>
            </div>
            <Avatar className="h-8 w-8 mt-auto">
              <AvatarFallback>JY</AvatarFallback>
            </Avatar>
          </div>

          {/* Agent Message with Bill Split */}
          <div className="flex gap-4">
            <Avatar className="h-8 w-8 bg-orange-100 text-[#F26C3D] mt-auto">
              <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            <div className="space-y-2 max-w-[80%]">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-sm text-sm">
                <p>I've analyzed the receipt. Here is the proposed bill split based on what was ordered:</p>
              </div>
              <ActionCardBillSplit />
            </div>
          </div>

          {/* User Destination Debate Trigger */}
          <div className="flex gap-4 justify-end">
            <div className="bg-[#F26C3D] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
              <p>GoLah, can you help us decide between Osaka and Kyoto? We are torn.</p>
            </div>
            <Avatar className="h-8 w-8 mt-auto">
              <AvatarFallback>YX</AvatarFallback>
            </Avatar>
          </div>

          {/* Agent Destination Comparison */}
          <div className="flex gap-4">
            <Avatar className="h-8 w-8 bg-orange-100 text-[#F26C3D] mt-auto">
              <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            <div className="space-y-2 max-w-[80%]">
              <DestinationComparison />
            </div>
          </div>

        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-border bg-background">
          <form className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" type="button" className="text-muted-foreground shrink-0 rounded-full hover:bg-muted">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Input placeholder="Message #general..." className="flex-1 rounded-full bg-muted/50" />
            <Button variant="ghost" size="icon" type="button" className="text-muted-foreground shrink-0 rounded-full hover:bg-muted">
              <Mic className="w-5 h-5" />
            </Button>
            <Button type="submit" size="icon" className="rounded-full bg-[#F26C3D] hover:bg-[#d85e33] shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
