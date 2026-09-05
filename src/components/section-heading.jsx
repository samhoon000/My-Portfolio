export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-terracotta/40 bg-terracotta/15 px-3 py-1 text-[11px] font-mono font-semibold tracking-wider text-peach shadow-[0_0_12px_rgba(185,111,89,0.2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
          <span className="uppercase font-pixel tracking-widest">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ivory drop-shadow-[0_2px_12px_rgba(15,9,7,0.7)]">
        {title}
      </h2>
      {description && (
        <p className="readable-text mt-3 text-sm sm:text-base text-cream/90 leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  )
}
