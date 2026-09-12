import { BottomNav } from "@/components/layout/BottomNav";

export default function ChatEmptyState() {
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-20">
        <img 
          src="/assets/chat-emptystate.png" 
          alt="No Trips Yet" 
          className="w-64 h-64 object-contain mb-6 opacity-90"
        />
        <h1 className="text-2xl font-bold mb-2">No Active Chats</h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          You haven't planned any trips yet! Head over to the Trips tab to start a new adventure.
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
