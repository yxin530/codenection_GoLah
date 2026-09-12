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
        <div className={cn(
          "text-[15px] leading-relaxed break-words px-4 py-2 shadow-sm min-h-[40px] flex items-center",
          isCurrentUser 
            ? "bg-[#F26C3D] text-white rounded-2xl rounded-tr-sm" 
            : "bg-muted text-foreground rounded-2xl rounded-tl-sm"
        )}>
          {isTyping ? (
            <div className="flex gap-1.5 items-center h-6 px-1">
              <div className="w-1.5 h-1.5 bg-current opacity-40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-current opacity-40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-current opacity-40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            content
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
