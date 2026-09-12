import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

export interface MessageBubbleProps {
  id: string;
  senderName: string;
  avatarInitials?: string;
  avatarUrl?: string;
  isAgent?: boolean;
  timestamp: string;
  content: string | React.ReactNode;
  isCurrentUser?: boolean;
  animateMessage?: boolean;
  onMessageSent?: () => void;
}

const animatedMessages = new Set<string>();

export function MessageBubble({
  id,
  senderName,
  avatarInitials,
  avatarUrl,
  isAgent,
  timestamp,
  content,
  isCurrentUser,
  animateMessage = false,
  onMessageSent,
}: MessageBubbleProps) {
  const shouldAnimate = animateMessage && !animatedMessages.has(id);
  const [isTyping, setIsTyping] = useState(shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setIsTyping(false);
      return;
    }
    animatedMessages.add(id);
    setIsTyping(true);
    const delay = isCurrentUser ? 750 : 1250;
    const timer = setTimeout(() => {
      setIsTyping(false);
      onMessageSent?.();
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldAnimate, isCurrentUser, onMessageSent, id]);

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
        <div className="text-[15px] leading-relaxed text-foreground/90 mt-0.5 break-words min-h-[24px]">
          {isTyping ? (
            <div className="flex gap-1.5 items-center h-6 px-1">
              <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
