import { certifications } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { ArrowUpRight } from 'lucide-react'

export function CertificationsSection() {
  return (
    <section id="certifications" className="scene-section certificate-scene">
      <div className="scene-marker" aria-hidden="true"><span>06</span> Learning shelf</div>
      <SectionHeading eyebrow="Credentials" title="The certificate shelf" description="Verified study in the foundations behind my analytics work." />
      <div className="certificate-shelf">
        {certifications.map((cert) => (
          <article key={cert.title} className="certificate-card">
            <div className="certificate-preview"><img src={cert.image} alt="" loading="lazy" /></div>
            <div>
              <span>{cert.provider}</span>
              <h3>{cert.title}</h3>
              <p>{cert.description.split('. ').slice(0, 1).join('. ') + '.'}</p>
              <a href={cert.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
