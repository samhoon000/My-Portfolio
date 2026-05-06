import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'

const getThemeClasses = (theme) => {
  if (theme === 'gold-prominent') {
    return {
      card: 'border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:border-amber-400 bg-gradient-to-b from-panelSoft to-amber-900/10',
      imageRing: 'ring-amber-400/30',
      text: 'text-amber-400',
      link: 'text-amber-400 hover:text-amber-300 focus-visible:ring-amber-400'
    }
  }
  if (theme === 'gold') {
    return {
      card: 'border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:border-amber-500/50',
      imageRing: 'ring-amber-500/20',
      text: 'text-amber-400',
      link: 'text-amber-400 hover:text-amber-300 focus-visible:ring-amber-400'
    }
  }
  if (theme === 'ai') {
    return {
      card: 'border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:border-purple-500/50',
      imageRing: 'ring-purple-500/20',
      text: 'text-purple-400',
      link: 'text-purple-400 hover:text-purple-300 focus-visible:ring-purple-400'
    }
  }
  return {
    card: '',
    imageRing: '',
    text: 'text-textPrimary',
    link: 'text-accent hover:text-accentSoft focus-visible:ring-accent'
  }
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified upskilling and professional learning"
        description="Award-winning hackathon participant and certified in Machine Learning, with proven experience in building real-world AI solutions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {certifications.map((certification) => {
          const themeClasses = getThemeClasses(certification.theme);
          return (
          <article 
            key={certification.title} 
            className={`glass-card rounded-xl bg-panelSoft p-5 transition-all duration-300 hover:-translate-y-1 ${themeClasses.card}`}
          >
            {certification.image && (
              <div className="mb-4 overflow-hidden rounded-lg border border-white/5 relative group">
                <img src={certification.image} alt={certification.title} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                {certification.theme && (
                  <div className={`absolute inset-0 ring-1 ring-inset rounded-lg pointer-events-none ${themeClasses.imageRing}`}></div>
                )}
              </div>
            )}
            <h3 className={`font-semibold ${themeClasses.text}`}>{certification.title}</h3>
            <p className="readable-text mt-2 text-sm text-white">{certification.provider}</p>
            {certification.date && (
              <p className="readable-text mt-1 text-xs uppercase tracking-wider text-white/70">{certification.date}</p>
            )}
            {certification.description && (
              <p className="mt-3 text-sm text-white/80 leading-relaxed">{certification.description}</p>
            )}
            {certification.credentialUrl && (
              <a 
                href={certification.credentialUrl} 
                target={certification.credentialUrl.startsWith('http') ? '_blank' : '_self'}
                rel={certification.credentialUrl.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`mt-4 inline-block text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft transition-colors ${themeClasses.link}`}
              >
                {certification.theme ? 'View Credentials →' : 'View Credential'}
              </a>
            )}
          </article>
        )})}
      </div>
    </section>
  )
}
