import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { ArrowUpRight } from 'lucide-react'

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & Learning"
        description="Verified industry certifications in SQL database engineering, data science, and supervised machine learning."
      />

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {certifications.map((cert) => (
          <article
            key={cert.title}
            className="cafe-card pixel-corners group flex flex-col rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5"
          >
            {cert.image && (
              <div className="mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-stroke/60 bg-panel relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex flex-col flex-1">
              <h3 className="font-pixel text-xl font-bold leading-snug text-[#FFF1D6] group-hover:text-[#F0B08A] transition-colors">
                {cert.title}
              </h3>
              
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#E39A73]">
                {cert.provider}
              </p>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#FFF1D6] font-sans">
                {cert.description}
              </p>

              {cert.credentialUrl && (
                <div className="mt-auto pt-5">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-pixel font-bold text-[#E39A73] transition-colors hover:text-[#FFF1D6]"
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
