import { contactDetails } from '../data/portfolio-data'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import { BiCoffee } from 'react-icons/bi'

export function ContactSection() {
  return (
    <section id="contact" className="scene-section counter-scene">
      <div className="counter-card pixel-corners">
        <div className="counter-steam" aria-hidden="true"><i /><i /><i /></div>
        <div className="counter-cup" aria-hidden="true"><BiCoffee /></div>
        <p className="counter-kicker">One last stop</p>
        <h2>Let’s have a conversation.</h2>
        <p className="counter-copy">Open to data analyst opportunities, internships, and thoughtful analytics collaborations.</p>
        <div className="counter-actions">
          <a href={`mailto:${contactDetails.email}`} className="button-primary"><FaEnvelope /> Get in touch</a>
          <a href={contactDetails.linkedin} target="_blank" rel="noreferrer" className="button-secondary"><FaLinkedin /> LinkedIn</a>
          <a href={contactDetails.github} target="_blank" rel="noreferrer" className="button-secondary"><FaGithub /> GitHub</a>
        </div>
        <a className="counter-email" href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
      </div>
    </section>
  )
}
