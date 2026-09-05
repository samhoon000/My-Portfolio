export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#160E0B] transition-opacity duration-500">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta animate-ping" />
          <p className="font-display text-lg sm:text-xl tracking-[0.25em] font-bold text-ivory uppercase">
            Abdul Samhoon
          </p>
        </div>
        <p className="font-pixel text-xs tracking-widest text-peach/90">
          Entering Pixel-Art Café...
        </p>
      </div>
    </div>
  )
}
