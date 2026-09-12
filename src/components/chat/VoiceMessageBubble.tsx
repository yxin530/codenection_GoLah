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
    <div className={cn("flex gap-3 w-full group transition-colors p-2 -mx-2", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <Avatar className={cn("h-8 w-8 shrink-0 mt-auto", isAgent && "bg-orange-100 text-[#F26C3D]")}>
          {avatarUrl && <AvatarImage src={avatarUrl} alt={senderName} />}
          <AvatarFallback>
            {isAgent ? <Bot className="h-5 w-5" /> : (avatarInitials || senderName.slice(0, 2).toUpperCase())}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex flex-col max-w-[80%]", isCurrentUser ? "items-end" : "items-start")}>
        <div className="flex items-baseline gap-2 mb-1 px-1">
          <span className={cn(
            "text-[13px] font-medium",
            isAgent ? "text-[#F26C3D]" : (isCurrentUser ? "text-foreground" : "text-blue-500")
          )}>
            {senderName}
          </span>
          <span className="text-[11px] text-muted-foreground/70 font-medium">
            {timestamp}
          </span>
        </div>
        
        <div className="flex flex-col gap-2 w-full max-w-[320px]">
          {isRecording ? (
            <div className="flex items-center gap-2 h-12 bg-muted/30 rounded-2xl px-4 border border-border/50 text-muted-foreground italic text-sm font-medium">
              <Mic className="w-4 h-4 animate-pulse text-red-500" />
              Recording audio...
            </div>
          ) : (
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-2xl shadow-sm",
              isCurrentUser ? "bg-[#F26C3D] text-white rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"
            )}>
              <button 
                onClick={togglePlay}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors shadow-sm",
                  isCurrentUser ? "bg-white text-[#F26C3D] hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
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
                      isCurrentUser ? "bg-white/50" : "bg-foreground/40"
                    } ${isPlaying && (i / 15) * 100 < progress ? (isCurrentUser ? "bg-white" : "bg-primary") : ""}`}
                    style={{ 
                      height: isPlaying ? `${20 + ((i * 37) % 80)}%` : `${20 + (i % 4) * 20}%` 
                    }}
                  />
                ))}
              </div>
              
              <div className={cn("text-xs font-medium shrink-0 tabular-nums", isCurrentUser ? "text-white/80" : "text-muted-foreground")}>
                {duration}
              </div>
            </div>
          )}

          {transcription && !isRecording && (
            <div className={cn("text-sm p-3 rounded-xl italic shadow-sm border", isCurrentUser ? "bg-[#F26C3D]/10 border-[#F26C3D]/20 text-foreground" : "bg-muted/40 border-border/50 text-foreground/90")}>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 not-italic block mb-1">Transcript</span>
              "{transcription}"
            </div>
          )}
        </div>
      </div>

      {isCurrentUser && (
        <Avatar className="h-8 w-8 shrink-0 mt-auto">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={senderName} />}
          <AvatarFallback>
            {avatarInitials || senderName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
