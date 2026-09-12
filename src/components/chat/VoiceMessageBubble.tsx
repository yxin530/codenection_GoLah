import { Play, Pause, Mic } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface VoiceMessageBubbleProps {
  id?: string;
  senderName?: string;
  avatarInitials?: string;
  isCurrentUser?: boolean;
  timestamp?: string;
  transcription?: string;
  duration?: string;
}

export function VoiceMessageBubble({
  id = "voice-1",
  senderName = "Yixin",
  avatarInitials = "YX",
  isCurrentUser = true,
  timestamp = "10:14 AM",
  transcription = "Hey guys, I think we should go to Disneyland on Wednesday instead, what do you think?",
  duration = "0:08",
}: VoiceMessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`flex gap-3 w-full ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="w-8 h-8 shrink-0 mt-auto">
        <AvatarFallback className={`text-xs font-semibold ${isCurrentUser ? "bg-[#ff6b3d]/10 text-[#ff6b3d]" : "bg-secondary"}`}>
          {avatarInitials || senderName.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[80%] ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className="flex items-baseline gap-2 mb-1 px-1">
          <span className="text-sm font-semibold">{senderName}</span>
          <span className="text-[10px] text-muted-foreground">{timestamp}</span>
        </div>
        
        <div className="space-y-1.5 w-full">
          <div className={`p-3 rounded-2xl flex flex-col gap-3 shadow-sm ${
            isCurrentUser 
              ? "bg-[#ff6b3d] text-white rounded-br-sm" 
              : "bg-muted text-foreground rounded-bl-sm"
          }`}>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-9 h-9 flex items-center justify-center rounded-full shrink-0 transition-colors ${
                  isCurrentUser ? "bg-white text-[#ff6b3d] hover:bg-orange-50" : "bg-[#F26C3D] text-white hover:bg-[#d85e33]"
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
              </button>
              
              {/* Fake Waveform */}
              <div className="flex items-center gap-1 h-6 flex-1">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isCurrentUser ? "bg-white/70" : "bg-foreground/40"
                    }`}
                    style={{ 
                      height: isPlaying ? `${20 + ((i * 37) % 80)}%` : `${20 + (i % 4) * 20}%` 
                    }}
                  />
                ))}
              </div>
              
              <span className={`text-xs font-medium ml-1 ${isCurrentUser ? "text-white/90" : "text-muted-foreground"}`}>{duration}</span>
            </div>
          </div>
          
          <div className="px-1 text-xs text-muted-foreground flex items-start gap-1.5 mt-1">
            <Mic className="w-3.5 h-3.5 mt-0.5 opacity-60 shrink-0 text-[#ff6b3d]" />
            <div className="bg-muted/30 p-2.5 rounded-xl rounded-tr-sm border border-border/50 shadow-sm relative">
              <span className="absolute -top-2 left-3 bg-background px-1 text-[9px] font-bold tracking-wider text-muted-foreground uppercase">Transcript</span>
              <p className="leading-relaxed text-[13px] text-foreground/90">"{transcription}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
