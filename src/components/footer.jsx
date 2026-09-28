import { Link } from 'react-router-dom'
import { contactDetails } from '../data/portfolio-data'

export function Footer() {
  return (
    <footer className="site-footer relative z-20">
      <div>
        <p>Abdul Samhoon</p>
        <span>Data Analyst · AI & Data Science</span>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/#home">Top ↑</Link>
        <a href={contactDetails.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </nav>
      <small>React · Vite · Motion · © 2026</small>
    </footer>
  )
}
