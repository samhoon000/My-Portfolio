import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { ArrowUpRight } from 'lucide-react'

const getThemeClasses = (theme) => {
  if (theme === 'ai') {
    return {
      card: 'border border-gold/30 hover:border-gold/60 shadow-[0_8px_30px_rgba(229,169,60,0.15)] hover:shadow-[0_0_30px_rgba(229,169,60,0.25)]',
      imageRing: 'ring-gold/30',
      text: 'text-ivory',
      link: 'text-ivory hover:text-base focus-visible:ring-gold bg-gold/20 border-gold/40 hover:bg-gold',
      badge: 'bg-gold/15 text-goldSoft border-gold/30'
    }
  }
  if (theme === 'sql') {
    return {
      card: 'border border-terracotta/30 hover:border-terracotta/60 shadow-[0_8px_30px_rgba(185,111,89,0.15)] hover:shadow-[0_0_30px_rgba(185,111,89,0.25)]',
      imageRing: 'ring-terracotta/30',
      text: 'text-ivory',
      link: 'text-ivory hover:text-base focus-visible:ring-terracotta bg-terracotta/20 border-terracotta/40 hover:bg-terracotta',
      badge: 'bg-terracotta/15 text-peach border-terracotta/30'
    }
  }
  return {
    card: 'border border-[#F5E3C8]/15 hover:border-terracotta/40',
    imageRing: '',
    text: 'text-ivory',
    link: 'text-ivory hover:text-base focus-visible:ring-terracotta bg-terracotta/20 border-terracotta/40 hover:bg-terracotta',
    badge: 'bg-[#38241D] text-cream border-[#F5E3C8]/20'
  }
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified upskilling & professional credentials"
        description="Award-winning hackathon participant and certified in Data Science & Machine Learning, with proven experience in building real-world AI solutions."
      />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {certifications.map((certification) => {
          const themeClasses = getThemeClasses(certification.theme);
          return (
            <article 
              key={certification.title} 
              className={`group glass-card flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 ${themeClasses.card}`}
            >
              <div>
                {certification.image && (
                  <div className="mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-[#F5E3C8]/15 relative bg-[#1B120E]">
                    <img 
                      src={certification.image} 
                      alt={certification.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {certification.theme && (
                      <div className={`absolute inset-0 ring-1 ring-inset rounded-xl pointer-events-none ${themeClasses.imageRing}`}></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160E0B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${themeClasses.badge}`}>
                    {certification.provider}
                  </span>
                  {certification.date && (
                    <span className="text-xs font-mono text-warmMuted">{certification.date}</span>
                  )}
                </div>

                <h3 className={`text-lg sm:text-xl font-bold font-display leading-tight ${themeClasses.text} group-hover:text-peach transition-all`}>
                  {certification.title}
                </h3>

                {certification.description && (
                  <p className="mt-3 text-xs sm:text-sm text-cream leading-relaxed font-sans line-clamp-4">
                    {certification.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#F5E3C8]/10">
                {certification.credentialUrl && (
                  <a 
                    href={certification.credentialUrl} 
                    target={certification.credentialUrl.startsWith('http') ? '_blank' : '_self'}
                    rel={certification.credentialUrl.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-sm ${themeClasses.link}`}
                  >
                    <span>{certification.theme ? 'View Credentials' : 'View Credential'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
