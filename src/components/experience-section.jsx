import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'

export function ExperienceSection() {
  return (
    <section id="experience" className="py-14 sm:py-20 relative">
      <SectionHeading
        eyebrow="Experience"
        title="Professional Experience"
        description="Gaining hands-on industry experience and collaborating in real-world startup environments."
      />
      <div className="grid gap-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 sm:p-7 border border-[#F5E3C8]/15 shadow-[0_12px_36px_rgba(15,9,7,0.65)] hover:border-terracotta/40 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-terracotta shadow-[0_0_8px_#B96F59] animate-pulse" />
                  <h3 className="text-xl font-bold font-display text-ivory">{exp.role}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                  <span className="font-semibold text-peach">{exp.company}</span>
                  <span className="text-warmMuted/50">•</span>
                  <span className="text-cream">{exp.location}</span>
                  <span className="text-warmMuted/50">•</span>
                  <span className="text-warmMuted font-mono text-xs">{exp.period}</span>
                </div>
                
                {/* Company Links */}
                <div className="flex items-center gap-3 mt-3.5">
                  {exp.companyUrl && (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Company Website"
                      aria-label="Company Website"
                      className="flex items-center gap-1.5 rounded-md border border-[#F5E3C8]/15 bg-[#38241D]/60 px-2.5 py-1 text-xs text-cream hover:text-ivory hover:border-terracotta/50 hover:bg-terracotta/20 transition-all duration-300"
                    >
                      <FaGlobe className="w-3.5 h-3.5 text-terracotta" />
                      <span>Website</span>
                    </a>
                  )}
                  {exp.linkedinUrl && (
                    <a
                      href={exp.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                      className="flex items-center gap-1.5 rounded-md border border-[#F5E3C8]/15 bg-[#38241D]/60 px-2.5 py-1 text-xs text-cream hover:text-ivory hover:border-terracotta/50 hover:bg-terracotta/20 transition-all duration-300"
                    >
                      <FaLinkedin className="w-3.5 h-3.5 text-peach" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {exp.description.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta shadow-[0_0_6px_#B96F59]" />
                  <p className="readable-text text-sm text-cream leading-relaxed font-sans">{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
