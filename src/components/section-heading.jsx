export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-none bg-[#E39A73]" />
        <p className="font-pixel text-xs font-semibold uppercase tracking-[0.25em] text-[#E39A73] drop-shadow-[0_1px_3px_rgba(20,12,9,0.9)]">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-pixel text-2xl font-bold tracking-tight text-[#FFF1D6] sm:text-3xl lg:text-4xl drop-shadow-[0_2px_4px_rgba(20,12,9,0.95)]">
        {title}
      </h2>
      {description && (
        <p
          className="mt-2.5 text-sm sm:text-base leading-relaxed font-sans drop-shadow-[0_1px_4px_rgba(20,12,9,0.9)]"
          style={{ color: '#FFF1D6' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
