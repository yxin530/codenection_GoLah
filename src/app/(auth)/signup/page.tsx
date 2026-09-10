import { AnimatedLogo } from '@/components/ui/animated-logo';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex h-full flex-col">
      {/* Top Section with Logo */}
      <div className="flex flex-col items-center justify-center pt-20 pb-10">
        <AnimatedLogo className="scale-125 mb-4" />
        <h1 className="text-xl font-bold text-[#F26C3D] mt-4">GoLah</h1>
      </div>

      {/* Orange Card Section */}
      <div className="flex-1 rounded-t-[3rem] bg-[#F26C3D] px-8 pt-10 pb-8 flex flex-col items-center text-white">
        <h2 className="text-2xl font-bold mb-8">Welcome!</h2>
        
        <form className="w-full max-w-sm space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-[#F26C3D]" />
            </div>
            <Input 
              type="text" 
              placeholder="username" 
              className="h-14 rounded-full border-none bg-white pl-12 text-[#F26C3D] placeholder:text-[#F26C3D]/60 focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#F26C3D]" />
            </div>
            <Input 
              type="email" 
              placeholder="email" 
              className="h-14 rounded-full border-none bg-white pl-12 text-[#F26C3D] placeholder:text-[#F26C3D]/60 focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#F26C3D]" />
            </div>
            <Input 
              type="password" 
              placeholder="password" 
              className="h-14 rounded-full border-none bg-white pl-12 text-[#F26C3D] placeholder:text-[#F26C3D]/60 focus-visible:ring-2 focus-visible:ring-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-2 pl-2">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded border-white accent-white" />
            <label htmlFor="terms" className="text-xs font-medium">
              I agree to the terms & conditions
            </label>
          </div>

          <div className="pt-6">
            <Link 
              href="/trips" 
              className="flex h-14 w-full items-center justify-center rounded-full border-2 border-white text-lg font-bold text-white transition-colors hover:bg-white hover:text-[#F26C3D]"
            >
              Sign Up
            </Link>
          </div>
        </form>

        <div className="mt-8 flex w-full max-w-sm items-center gap-4">
          <div className="h-px flex-1 bg-white/50" />
          <span className="text-sm font-medium text-white/80">or</span>
          <div className="h-px flex-1 bg-white/50" />
        </div>

        {/* Social Login Icons Mock */}
        <div className="mt-8 flex gap-6">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#F26C3D] hover:scale-105 transition-transform">
            <span className="font-bold text-xl">G</span>
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#F26C3D] hover:scale-105 transition-transform">
            <span className="font-bold text-xl">f</span>
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#F26C3D] hover:scale-105 transition-transform">
            <span className="font-bold text-xl text-center leading-none mt-[-4px]"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
