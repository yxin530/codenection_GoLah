export default function TripViewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col bg-background">
      {children}
    </div>
  );
}
