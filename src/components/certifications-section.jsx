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
  if (theme === 'sql') {
    return {
      card: 'border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:border-blue-500/50 bg-gradient-to-b from-panelSoft to-blue-900/5',
      imageRing: 'ring-blue-500/20',
      text: 'text-blue-400',
      link: 'text-blue-400 hover:text-blue-300 focus-visible:ring-blue-400'
    }
  }
  return {
    card: 'border border-white/10 hover:border-white/20 shadow-lg',
    imageRing: '',
    text: 'text-textPrimary',
    link: 'text-accent hover:text-accentSoft focus-visible:ring-accent'
  }
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Verified upskilling and professional learning"
          description="Award-winning hackathon participant and certified in Data Science & Machine Learning, with proven experience in building real-world AI solutions"
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-12 max-w-5xl mx-auto">
          {certifications.map((certification) => {
            const themeClasses = getThemeClasses(certification.theme);
            return (
              <article 
                key={certification.title} 
                className={`group glass-card flex flex-col rounded-2xl bg-panelSoft/50 backdrop-blur-sm p-6 transition-all duration-500 hover:-translate-y-2 ${themeClasses.card}`}
              >
                {certification.image && (
                  <div className="mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-white/5 relative bg-black/20">
                    <img 
                      src={certification.image} 
                      alt={certification.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {certification.theme && (
                      <div className={`absolute inset-0 ring-1 ring-inset rounded-xl pointer-events-none ${themeClasses.imageRing}`}></div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                
                <div className="flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold leading-tight ${themeClasses.text} group-hover:brightness-110 transition-all`}>
                      {certification.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <p className="text-sm font-medium text-white/90">{certification.provider}</p>
                      {certification.date && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <p className="text-xs uppercase tracking-widest text-white/50">{certification.date}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {certification.description && (
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-4">
                      {certification.description}
                    </p>
                  )}

                  <div className="mt-auto pt-6">
                    {certification.credentialUrl && (
                      <a 
                        href={certification.credentialUrl} 
                        target={certification.credentialUrl.startsWith('http') ? '_blank' : '_self'}
                        rel={certification.credentialUrl.startsWith('http') ? 'noopener noreferrer' : ''}
                        className={`inline-flex items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-panelSoft transition-all group/btn ${themeClasses.link}`}
                      >
                        <span>{certification.theme ? 'View Credentials' : 'View Credential'}</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
