import { Link } from 'react-router-dom'
import { BiCoffee } from 'react-icons/bi'
import { contactDetails } from '../data/portfolio-data'

export function Footer() {
  return (
    <footer className="cafe-footer relative z-20">
      <div>
        <BiCoffee aria-hidden="true" />
        <p>Thanks for stopping by.</p>
        <span>Abdul Samhoon · Data Analyst · Builder · Problem Solver</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/#home">Back to the door</Link>
        <a href={contactDetails.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </footer>
  )
}
