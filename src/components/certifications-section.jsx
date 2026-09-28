import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { ArrowUpRight } from 'lucide-react'
import { SectionReveal } from './section-reveal'

export function CertificationsSection() {
  return (
    <section id="certifications" className="scene-section certificate-scene">
      <div className="scene-marker" aria-hidden="true"><span>07</span> Credentials</div>
      <SectionHeading eyebrow="Credentials" title="A growing technical archive." description="Coursework that underpins my analytics and machine learning practice." />
      <div className="certificate-shelf">
        {certifications.map((cert, index) => (
          <SectionReveal key={cert.title} delay={index * .07}>
          <article className="certificate-card">
            <div className="certificate-preview"><img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" /></div>
            <div>
              <span>Certificate / 0{index + 1} — {cert.provider}</span>
              <h3>{cert.title}</h3>
              <p>{cert.description.split('. ').slice(0, 1).join('. ') + '.'}</p>
              <a href={cert.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight /></a>
            </div>
          </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
