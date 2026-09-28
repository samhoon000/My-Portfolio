import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'
import { SectionReveal } from './section-reveal'

export function ExperienceSection() {
  return (
    <section id="experience" className="scene-section notice-scene">
      <div className="scene-marker" aria-hidden="true"><span>03</span> Experience</div>
      <SectionHeading eyebrow="Experience" title="Work in motion." description="Practical analytics work in a fast-moving product environment." />
      <div className="timeline-rail">
      {experiences.map((exp) => (
        <SectionReveal key={exp.company} className="timeline-entry">
        <article className="experience-record">
          <div className="ticket-top">
            <div>
              <span className="ticket-kicker">Current role · {exp.location}</span>
              <h3>{exp.role}</h3>
              <p>{exp.company}</p>
            </div>
            <time>{exp.period}</time>
          </div>
          <ul>
            {exp.description.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="ticket-links">
            <a href={exp.companyUrl} target="_blank" rel="noreferrer"><FaGlobe /> Company ↗</a>
            <a href={exp.linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn ↗</a>
          </div>
        </article>
        </SectionReveal>
      ))}
      </div>
    </section>
  )
}
