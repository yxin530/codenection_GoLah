export function WavyBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
      <svg
        className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diagonal-wavy-pattern" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
            <rect width="250" height="250" fill="white" />
            <path
              d="M -50 80 Q 50 80, 125 125 T 300 125 L 300 200 Q 200 200, 125 155 T -50 155 Z"
              fill="#A6D7F9"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonal-wavy-pattern)" />
      </svg>
    </div>
  );
}
