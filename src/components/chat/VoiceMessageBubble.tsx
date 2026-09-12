import { Play, Pause, Mic, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface VoiceMessageBubbleProps {
  id?: string;
  senderName?: string;
  avatarInitials?: string;
  avatarUrl?: string;
  isAgent?: boolean;
  timestamp?: string;
  transcription?: string;
  duration?: string;
  isCurrentUser?: boolean;
  animateMessage?: boolean;
  onMessageSent?: () => void;
}

const animatedMessages = new Set<string>();

export function VoiceMessageBubble({
  id = "voice-1",
  senderName = "Yixin",
  avatarInitials = "YX",
  avatarUrl,
  isAgent = false,
  timestamp = "10:14 AM",
  transcription = "Hey guys, I think we should go to Disneyland on Wednesday instead, what do you think?",
  duration = "0:08",
  isCurrentUser = true,
  animateMessage = false,
  onMessageSent,
}: VoiceMessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const shouldAnimate = animateMessage && !animatedMessages.has(id);
  const [isRecording, setIsRecording] = useState(shouldAnimate);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) {
      setIsRecording(false);
      return;
    }
    animatedMessages.add(id);
    setIsRecording(true);
    const delay = isCurrentUser ? 900 : 1300;
    const timer = setTimeout(() => {
      setIsRecording(false);
      onMessageSent?.();
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldAnimate, isCurrentUser, onMessageSent, id]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={cn("flex gap-4 w-full group hover:bg-muted/30 p-2 -mx-2 rounded-lg transition-colors")}>
      <Avatar className={cn("h-10 w-10 shrink-0", isAgent && "bg-orange-100 text-[#F26C3D]")}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={senderName} />}
        <AvatarFallback>
          {isAgent ? <Bot className="h-6 w-6" /> : (avatarInitials || senderName.slice(0, 2).toUpperCase())}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "font-semibold text-[15px]",
            isAgent && "text-[#F26C3D]",
            !isAgent && !isCurrentUser && "text-blue-500"
          )}>
            {senderName}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {timestamp}
          </span>
        </div>
        
        <div className="mt-1 flex flex-col gap-2 max-w-[320px]">
          {isRecording ? (
            <div className="flex items-center gap-2 h-12 bg-muted/30 rounded-2xl px-4 border border-border/50 text-muted-foreground italic text-sm font-medium">
              <Mic className="w-4 h-4 animate-pulse text-red-500" />
              Recording audio...
            </div>
          ) : (
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-2xl border shadow-sm",
              isCurrentUser ? "bg-[#F26C3D]/10 border-[#F26C3D]/20" : "bg-card border-border/50"
            )}>
              <button 
                onClick={togglePlay}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors shadow-sm",
                  isCurrentUser ? "bg-[#F26C3D] text-white hover:bg-[#d85e33]" : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
              </button>
              
              <div className="flex-1 flex items-center gap-1">
                {/* Audio Waveform Mock */}
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isCurrentUser ? "bg-foreground/60" : "bg-foreground/40"
                    } ${isPlaying && (i / 15) * 100 < progress ? (isCurrentUser ? "bg-[#F26C3D]" : "bg-primary") : ""}`}
                    style={{ 
                      height: isPlaying ? `${20 + ((i * 37) % 80)}%` : `${20 + (i % 4) * 20}%` 
                    }}
                  />
                ))}
              </div>
              
              <div className="text-xs font-medium text-muted-foreground shrink-0 tabular-nums">
                {duration}
              </div>
            </div>
          )}

          {transcription && !isRecording && (
            <div className="text-sm bg-muted/40 p-3 rounded-xl border border-border/50 text-foreground/90 italic">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 not-italic block mb-1">Transcript</span>
              "{transcription}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
