export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading mb-8 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div className={`mb-3 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="section-heading-line" />
        <p className="font-pixel text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
        {align === 'center' && <span className="section-heading-line" />}
      </div>
      <h2 className="font-pixel text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-creamMuted">
          {description}
        </p>
      )}
    </div>
  )
}
