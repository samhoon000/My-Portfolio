import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MuseumProvider } from './museum/MuseumContext'
import { MuseumNav } from './museum/MuseumNav'
import { AboutRoom, AtriumRoom, ContactRoom, EntranceRoom, ExperienceRoom, ProjectGalleryRoom, SkillsRoom } from './museum/Rooms'
import { CaseRoom } from './museum/CaseRoom'
import './museum/rooms.css'
import './museum/responsive.css'

function LegacyCase() {
  const { slug } = useParams()
  return <Navigate to={`/museum/projects/${slug}`} replace />
}

function LegacyDocument({ href }) {
  useEffect(() => { window.location.replace(href) }, [href])
  return <main className="legacy-document"><p>Opening document…</p><a href={href}>Open it here</a></main>
}

function LegacyHashRedirect() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const targets = { orientation: '/museum', about: '/museum/about', projects: '/museum/projects', skills: '/museum/skills', experience: '/museum/experience', achievements: '/museum/experience', certifications: '/museum/experience', contact: '/museum/contact' }
    if (pathname === '/' && targets[hash.slice(1)]) navigate(targets[hash.slice(1)], { replace: true })
  }, [pathname, hash, navigate])
  return null
}

function App() {
  return <MuseumProvider>
    <a className="skip-link" href="#museum-main">Skip to room content</a>
    <LegacyHashRedirect />
    <MuseumNav />
    <div id="museum-main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<EntranceRoom />} />
        <Route path="/museum" element={<AtriumRoom />} />
        <Route path="/museum/about" element={<AboutRoom />} />
        <Route path="/museum/projects" element={<ProjectGalleryRoom />} />
        <Route path="/museum/projects/:slug" element={<CaseRoom />} />
        <Route path="/museum/skills" element={<SkillsRoom />} />
        <Route path="/museum/experience" element={<ExperienceRoom />} />
        <Route path="/museum/contact" element={<ContactRoom />} />
        <Route path="/project/:slug" element={<LegacyCase />} />
        <Route path="/project/food-health/report" element={<LegacyDocument href="/food-health-report.pdf" />} />
        <Route path="/project/food-health/presentation" element={<LegacyDocument href="/food-health-presentation.pdf" />} />
        <Route path="/project/instacart/report" element={<LegacyDocument href="/instacart-report.pdf" />} />
        <Route path="/project/instacart/presentation" element={<LegacyDocument href="/instacart-presentation.pdf" />} />
        <Route path="/projects/instacart/report" element={<LegacyDocument href="/instacart-report.pdf" />} />
        <Route path="/projects/instacart/presentation" element={<LegacyDocument href="/instacart-presentation.pdf" />} />
        <Route path="*" element={<Navigate to="/museum" replace />} />
      </Routes>
    </div>
  </MuseumProvider>
}

export default App
