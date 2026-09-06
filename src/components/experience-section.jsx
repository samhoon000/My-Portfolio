import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'

export function ExperienceSection() {
  return (
    <section id="experience" className="scene-section notice-scene">
      <div className="scene-marker" aria-hidden="true"><span>02</span> Notice board</div>
      <SectionHeading eyebrow="Experience" title="Today’s order ticket" description="Practical analytics work in a fast-moving product environment." />
      {experiences.map((exp) => (
        <article key={exp.company} className="order-ticket">
          <div className="ticket-top">
            <div>
              <span className="ticket-kicker">Current order · {exp.location}</span>
              <h3>{exp.role}</h3>
              <p>{exp.company}</p>
            </div>
            <time>{exp.period}</time>
          </div>
          <div className="ticket-rule" />
          <ul>
            {exp.description.slice(1).map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="ticket-links">
            <a href={exp.companyUrl} target="_blank" rel="noreferrer"><FaGlobe /> Company</a>
            <a href={exp.linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
          </div>
        </article>
      ))}
    </section>
  )
}
