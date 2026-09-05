import { BiCoffee } from 'react-icons/bi'

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-[#6B4535]/50 bg-[#140c09]/90 py-8 text-center text-xs text-[#FFF1D6] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4">
        <BiCoffee className="text-[#E39A73] text-base" />
        <p
          className="font-pixel tracking-wider"
          style={{ color: '#FFF1D6' }}
        >
          Crafted with data, insights & warm coffee • © 2026 Abdul Samhoon
        </p>
      </div>
    </footer>
  )
}
