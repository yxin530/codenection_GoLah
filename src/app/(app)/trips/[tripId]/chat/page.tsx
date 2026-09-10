import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Send } from 'lucide-react';

export default function ChatHubPage() {
  return (
    <div className="flex flex-col h-[600px] border border-border rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-sm">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* User Message */}
        <div className="flex gap-4 justify-end">
          <div className="bg-[#F26C3D] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
            <p>Can we swap the Meiji Shrine visit to the afternoon? I want to sleep in.</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        {/* Agent Message */}
        <div className="flex gap-4">
          <Avatar className="h-8 w-8 bg-orange-100 text-[#F26C3D]">
            <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          <div className="space-y-4 max-w-[80%]">
            <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
              <p>Sure thing! I can move the Meiji Shrine visit to 14:00. This will push your shopping at Takeshita Street to 16:00. Does this new proposed schedule work for you?</p>
            </div>
            
            {/* ACTION CARD */}
            <Card className="border-orange-200 bg-orange-50/50 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-[#F26C3D] flex items-center gap-2">
                  <Bot className="w-4 h-4" /> Proposed Itinerary Change
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-sm space-y-2">
                <div className="line-through text-muted-foreground">09:00 - Visit Meiji Shrine</div>
                <div className="font-medium text-foreground">14:00 - Visit Meiji Shrine</div>
                <div className="line-through text-muted-foreground">13:00 - Lunch & Shopping</div>
                <div className="font-medium text-foreground">16:00 - Lunch & Shopping</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="flex-1 bg-[#F26C3D] hover:bg-[#d85e33]">Approve</Button>
                <Button variant="outline" className="flex-1">Reject</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <form className="flex gap-2">
          <Input placeholder="Ask GoLah to plan, change, or split bills..." className="flex-1 rounded-full" />
          <Button type="submit" size="icon" className="rounded-full bg-[#F26C3D] hover:bg-[#d85e33]">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
