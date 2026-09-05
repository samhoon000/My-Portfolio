import { BiCoffee } from 'react-icons/bi'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base text-textPrimary">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-panelSoft border border-accent/30 text-accentSoft shadow-2xl mb-4 animate-bounce">
        <BiCoffee className="text-3xl" />
      </div>
      <p className="font-pixel text-sm uppercase tracking-[0.3em] text-accentSoft">
        Entering Pixel Café...
      </p>
    </div>
  )
}
