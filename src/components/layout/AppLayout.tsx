import { TopBar } from './TopBar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
