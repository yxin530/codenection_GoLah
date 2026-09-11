export function WavyBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#A6D7F9] pointer-events-none">
      <img
        src="/assets/wavy-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
