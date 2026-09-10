'use client';

import { motion } from 'framer-motion';

export function AnimatedLogo({ className }: { className?: string }) {
  // SVG path for the dotted line loop
  const pathLength = 100;
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* "Go" Text */}
      <span className="text-[120px] font-extrabold text-[#F26C3D] leading-none tracking-tighter" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        Go
      </span>

      {/* SVG for Airplane and Dotted Path */}
      <div className="absolute top-0 right-[-80px] w-[140px] h-[140px] pointer-events-none">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
          {/* Dotted Path */}
          <motion.path
            id="flight-path"
            d="M 20 80 C 40 40, 100 20, 120 40 C 140 60, 100 120, 80 100 C 60 80, 80 50, 110 30"
            stroke="#F26C3D"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Airplane */}
          <motion.g
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            style={{ offsetPath: "path('M 20 80 C 40 40, 100 20, 120 40 C 140 60, 100 120, 80 100 C 60 80, 80 50, 110 30')", offsetRotate: "auto" }}
          >
            {/* Simple Airplane SVG icon */}
            <path
              d="M19.643 9.429a1.5 1.5 0 00-1.896-.757L1.872 15.01a1.5 1.5 0 00-.064 2.76l5.05 2.11a1.5 1.5 0 001.378-.146l7.734-5.46a.5.5 0 01.696.726l-4.57 5.25a1.5 1.5 0 00-.317 1.34l1.375 5.51a1.5 1.5 0 002.834.33l7.98-16.48a1.5 1.5 0 00-.28-1.517z"
              fill="#F26C3D"
              transform="scale(0.8) translate(-12, -12)"
            />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
