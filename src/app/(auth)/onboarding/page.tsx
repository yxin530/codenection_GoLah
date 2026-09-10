import { AnimatedLogo } from '@/components/ui/animated-logo';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center h-full pt-32 pb-16">
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatedLogo className="scale-150 mb-4" />
        <h1 className="text-2xl font-bold text-[#F26C3D] mt-8">GoLah</h1>
      </div>
      
      <div className="w-full px-8 pb-8">
        <Link 
          href="/signup" 
          className="flex w-full items-center justify-center rounded-full bg-[#F26C3D] py-4 text-lg font-bold text-white shadow-lg hover:bg-[#d85e33] transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
