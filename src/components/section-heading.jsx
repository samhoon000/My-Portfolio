export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-textPrimary sm:text-4xl">
        {title}
      </h2>
      <p className="readable-text mt-4 text-sm sm:text-base">{description}</p>
    </div>
  )
}
