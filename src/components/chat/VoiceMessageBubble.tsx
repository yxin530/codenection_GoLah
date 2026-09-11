import { Play, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoiceMessageBubble() {
  return (
    <div className="space-y-1 max-w-[80%]">
      <div className="bg-[#F26C3D] text-white p-3 rounded-2xl rounded-tr-sm flex items-center gap-3">
        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white text-[#F26C3D] hover:bg-orange-50 shrink-0">
          <Play className="h-4 w-4 fill-current ml-0.5" />
        </Button>
        
        {/* Fake Waveform */}
        <div className="flex items-center gap-1 flex-1 h-6">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-white/70 rounded-full" 
              style={{ height: `${Math.max(20, Math.random() * 100)}%` }} 
            />
          ))}
        </div>
        <span className="text-xs text-white/80 font-medium">0:08</span>
      </div>
      
      <div className="px-1 text-xs text-muted-foreground flex items-start gap-1.5">
        <Mic className="w-3 h-3 mt-0.5 opacity-50 shrink-0" />
        <p className="italic">"Hey guys, I think we should go to Disneyland on Wednesday instead, what do you think?"</p>
      </div>
    </div>
  );
}
