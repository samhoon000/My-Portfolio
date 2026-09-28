export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'is-centered' : ''}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && (
        <p className="section-description">{description}</p>
      )}
    </div>
  )
}
