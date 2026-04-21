import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified upskilling and professional learning"
        description="Editable placeholders for certifications to highlight your continuous growth in analytics."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {certifications.map((certification) => (
          <article key={certification.title} className="glass-card rounded-xl bg-panelSoft p-5">
            <h3 className="font-semibold text-textPrimary">{certification.title}</h3>
            <p className="readable-text mt-2 text-sm text-white">{certification.provider}</p>
            <p className="readable-text mt-1 text-xs uppercase tracking-wider text-white">{certification.date}</p>
            <a href={certification.credentialUrl} className="mt-4 inline-block text-sm text-accent hover:text-accentSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft">
              View Credential
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
