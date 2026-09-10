import { WavyBackground } from '@/components/ui/wavy-background';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <WavyBackground />
      <div className="w-full h-full min-h-screen relative bg-transparent flex flex-col">
        {children}
      </div>
    </div>
  );
}
