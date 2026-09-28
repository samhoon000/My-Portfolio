import { contactDetails } from '../data/portfolio-data'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import { SectionReveal } from './section-reveal'

export function ContactSection() {
  return (
    <section id="contact" className="scene-section counter-scene">
      <div className="scene-marker" aria-hidden="true"><span>08</span> Contact</div>
      <SectionReveal className="counter-card">
        <p className="counter-kicker">Start a conversation</p>
        <h2>Let’s make data<br />mean something.</h2>
        <p className="counter-copy">Open to data analyst opportunities, internships, and thoughtful analytics collaborations.</p>
        <div className="counter-actions">
          <a href={`mailto:${contactDetails.email}`} className="button-primary"><FaEnvelope /> Send a message</a>
          <a href={contactDetails.linkedin} target="_blank" rel="noreferrer" className="button-secondary"><FaLinkedin /> LinkedIn ↗</a>
          <a href={contactDetails.github} target="_blank" rel="noreferrer" className="button-secondary"><FaGithub /> GitHub ↗</a>
        </div>
        <a className="counter-email" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
      </SectionReveal>
    </section>
  )
}
