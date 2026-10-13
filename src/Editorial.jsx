import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { profile, projects, credentials, recognition, skillGroups } from './data/museum-data'
import { createHeroInk } from './hero-ink'
import { createHeroOrganism } from './hero-organism'
import './editorial.css'
import './profile.css'

const projectPath = slug => `/project/${slug}`

function PageEffects() {
  const location = useLocation()
  useEffect(() => {
    const id = location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target) }
    }), { threshold: 0.06, rootMargin: '0px 0px -24px 0px' })
    const observe = () => document.querySelectorAll('.reveal:not(.in-view)').forEach(item => observer.observe(item))
    observe()
    const timer = setTimeout(observe, 100)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [location.pathname])
  return null
}

function Header() {
  const [menu, setMenu] = useState({ open: false, route: '' })
  const location = useLocation()
  const route = location.pathname + location.hash
  const open = menu.open && menu.route === route
  const links = [{ label: 'Work', href: '/#work' }, { label: 'About', href: '/#about' }, { label: 'Experience', href: '/#experience' }, { label: 'Contact', href: '/#contact' }]
  return <header className="site-header">
    <Link to="/" className="wordmark" aria-label="Abdul Samhoon, home"><span className="wordmark-symbol">A<span>·</span>S</span><span className="wordmark-name">Abdul Samhoon<small>DATA / ANALYSIS / INSIGHT</small></span></Link>
    <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Main navigation">{links.map(link => <Link key={link.href} to={link.href} onClick={() => setMenu({ open: false, route })}>{link.label}</Link>)}<a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a></nav>
    <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setMenu({ open: !open, route })}>{open ? <X size={22} /> : <Menu size={22} />}</button>
  </header>
}

function Label({ index, children, light = false }) { return <div className={`section-label ${light ? 'section-label--light' : ''}`}><span>{index}</span><span>{children}</span><span className="section-label-line" /></div> }

function SignalGraphic() { return <div className="signal-graphic" aria-hidden="true"><div className="signal-graphic-caption">FIELD NOTES / 001<br />TRANSLATING COMPLEXITY</div><svg viewBox="0 0 560 560" role="presentation" focusable="false"><circle className="signal-orbit signal-orbit--one" cx="280" cy="280" r="222" /><circle className="signal-orbit signal-orbit--two" cx="280" cy="280" r="165" /><circle className="signal-orbit signal-orbit--three" cx="280" cy="280" r="106" /><circle className="signal-orbit signal-orbit--four" cx="280" cy="280" r="43" /><line x1="280" y1="28" x2="280" y2="532" /><line x1="28" y1="280" x2="532" y2="280" /><path className="signal-path" d="M56 347 C119 341 153 221 208 242 S284 377 327 294 S396 161 493 205" /><circle className="signal-point" cx="327" cy="294" r="8" /><circle className="signal-point signal-point--small" cx="493" cy="205" r="5" /></svg><div className="signal-graphic-index">01 — 05 / SELECTED WORK</div></div> }

// Slow ambient light and ink-like forms behind the hero grid; nudged very slightly by the cursor, and on desktop
// an ink layer between them that the cursor pushes aside (see hero-ink.js)
function HeroAtmosphere() {
  const ref = useRef(null), inkRef = useRef(null)
  useEffect(() => {
    const el = ref.current, hero = el.parentElement
    const io = new IntersectionObserver(([entry]) => el.classList.toggle('is-offscreen', !entry.isIntersecting))
    io.observe(hero)
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => io.disconnect()
    const ink = innerWidth > 650 ? createHeroInk(inkRef.current, hero) : null
    let tx = 0, ty = 0, x = 0, y = 0, frame = 0
    const step = () => {
      x += (tx - x) * .035; y += (ty - y) * .035
      el.style.setProperty('--mx', x.toFixed(4)); el.style.setProperty('--my', y.toFixed(4))
      frame = Math.abs(tx - x) + Math.abs(ty - y) > .002 ? requestAnimationFrame(step) : 0
    }
    const move = e => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; frame ||= requestAnimationFrame(step) }
    const settle = () => { tx = ty = 0; frame ||= requestAnimationFrame(step) }
    hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', settle)
    return () => { io.disconnect(); ink?.destroy(); cancelAnimationFrame(frame); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', settle) }
  }, [])
  return <div className="hero-atmos" ref={ref} aria-hidden="true"><div className="atmos-light"><span /><span /><span /><span /></div><canvas className="atmos-ink" ref={inkRef} /><div className="atmos-forms"><span /><span /><span /><span /></div></div>
}

// The living data organism between the headline and the portrait (see hero-organism.js): one canvas behind the
// hero grid, one above it, both under the hero content
function HeroOrganism() {
  const backRef = useRef(null), frontRef = useRef(null)
  useEffect(() => {
    const organism = createHeroOrganism(backRef.current, frontRef.current, backRef.current.parentElement)
    return () => organism?.destroy()
  }, [])
  return <><canvas className="hero-organism" ref={backRef} aria-hidden="true" /><canvas className="hero-organism hero-organism--front" ref={frontRef} aria-hidden="true" /></>
}

function Hero() { return <section className="hero" id="top"><HeroAtmosphere /><HeroOrganism /><div className="hero-grid" aria-hidden="true" /><div className="hero-inner"><div className="hero-kicker"><span className="status-dot" /> AVAILABLE FOR DATA & ANALYTICS OPPORTUNITIES <span>— 2026</span></div><div className="hero-main"><div className="hero-copy"><p className="hero-overline">ABDUL SAMHOON / ANALYTICAL PORTFOLIO</p><h1>Making<br />data <em>mean</em><br />more<span className="hero-period">.</span></h1><div className="hero-bottom-row"><p>I turn complex information into clear questions, useful dashboards, and decisions people can act on.</p><Link className="circle-link" to="/#work" aria-label="Explore selected work"><ArrowDown size={27} /></Link></div></div><div className="hero-visual"><SignalGraphic /><figure className="hero-profile"><div className="hero-photo-frame"><img src="/AbdulSamhoon.jpg" alt="Abdul Samhoon outdoors" fetchPriority="high" /></div><figcaption className="hero-profile-caption"><div><span>THE ANALYST / FIG. 01</span><strong>Abdul Samhoon</strong></div><div className="hero-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Abdul Samhoon on GitHub (opens in a new tab)" title="View Abdul Samhoon on GitHub"><FaGithub aria-hidden="true" /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Abdul Samhoon on LinkedIn (opens in a new tab)" title="View Abdul Samhoon on LinkedIn"><FaLinkedinIn aria-hidden="true" /></a></div></figcaption></figure></div></div><div className="hero-footer"><span>DATA ANALYST / AI & DATA SCIENCE STUDENT</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span><span>PORTFOLIO, VOL. 01</span></div></div></section> }

function ProjectCard({ project, index }) { return <article className={`project-card project-card--${project.theme} reveal`}><Link className="project-visual" to={projectPath(project.slug)} aria-label={`Read ${project.title} case study`}><span className="project-visual-grid" aria-hidden="true" /><img src={project.images[0]} alt={project.imageAlts[0]} loading="lazy" /><span className="project-visual-index">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span className="project-visual-arrow"><ArrowUpRight size={23} /></span></Link><div className="project-meta"><span>{project.category}</span><span>{project.tools.slice(0, 3).join(' / ')}</span></div><div className="project-card-title"><h3><Link to={projectPath(project.slug)}>{project.title}</Link></h3><Link className="project-text-link" to={projectPath(project.slug)} aria-label={`Open ${project.title}`}><ArrowUpRight size={25} /></Link></div><p>{project.teaser}</p></article> }

function Work() { return <section className="work-section section-pad" id="work"><div className="section-inner"><Label index="01">SELECTED WORK</Label><div className="work-intro reveal"><div><p className="eyebrow">A CURATED SELECTION / FIVE CASE STUDIES</p><h2>The evidence<br />is in the <em>work.</em></h2></div><p>Each project starts with a question. The result is a clearer way to see what the data is saying.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div><div className="work-outro"><span>THERE IS MORE BEHIND EVERY IMAGE.</span><a href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={18} /></a></div></div></section> }

const steps = [{ n: '01', title: 'Prepare', text: 'Clean, validate, and structure the data so that the analysis has a trustworthy starting point.', tags: 'PYTHON / PANDAS / SQL' }, { n: '02', title: 'Investigate', text: 'Explore patterns, compare segments, and challenge assumptions with the right analytical methods.', tags: 'EDA / DUCKDB / STATISTICS' }, { n: '03', title: 'Communicate', text: 'Make the findings legible through dashboards, reports, and a clear account of what the evidence supports.', tags: 'POWER BI / DAX / EXCEL' }]
function Method() { return <section className="method-section section-pad" id="method"><div className="section-inner"><Label index="02" light>THE PRACTICE</Label><div className="method-head reveal"><p className="eyebrow">THE THINKING BEHIND THE OUTPUT</p><h2>From raw records<br />to a <em>reason to act.</em></h2></div><div className="method-grid"><div className="method-intro reveal"><span className="asterisk">✳</span><p>Tools matter when they help answer a real question. My work moves from preparation and investigation to clear, accountable communication.</p></div>{steps.map(item => <div className="method-step reveal" key={item.n}><span className="step-number">{item.n} /</span><h3>{item.title}</h3><p>{item.text}</p><small>{item.tags}</small></div>)}</div></div></section> }

function About() { return <section className="about-section section-pad" id="about"><div className="section-inner"><Label index="03">ABOUT / CAPABILITIES</Label><div className="about-layout"><div className="about-sticky reveal"><p className="eyebrow">THE PERSON BEHIND THE PROCESS</p><h2>Curiosity<br />is the first <em>query.</em></h2><figure className="about-portrait"><div className="about-photo-frame"><img src="/AbdulSamhoon.jpg" alt="Abdul Samhoon seated outdoors" loading="lazy" /></div><figcaption>ABDUL SAMHOON <span>PORTRAIT / 2026</span></figcaption></figure></div><div className="about-content reveal"><p className="about-lead">I’m Abdul Samhoon, an AI & Data Science student and emerging data analyst interested in the point where information becomes understanding.</p><p>I study Artificial Intelligence & Data Science and work at the intersection of analysis, reporting, and useful business questions. I’m currently a Data Analyst Intern at Trinetro Labs, building practical experience with SQL databases, semantic modeling, and business intelligence workflows.</p><div className="about-facts"><div><span>EDUCATION</span><strong>B.E. in Artificial Intelligence & Data Science</strong><small>Expected 2027</small></div><div><span>CURRENT ROLE</span><strong>Data Analyst Intern</strong><small>Trinetro Labs · Remote · Since Aug 2026</small></div></div><h3>What I work with</h3><div className="skill-list">{skillGroups.map(group => <div key={group.id}><span>{group.number}</span><strong>{group.title}</strong><small>{group.tools.join(' · ')}</small></div>)}</div></div></div></div></section> }

function Experience() { return <section className="experience-section section-pad" id="experience"><div className="section-inner"><Label index="04">EXPERIENCE / RECOGNITION</Label><div className="experience-heading reveal"><p className="eyebrow">A PRACTICE IN PROGRESS</p><h2>Learning in public.<br /><em>Applying in practice.</em></h2></div><div className="experience-layout"><div className="experience-feature reveal"><span className="feature-index">01 / CURRENT ROLE</span><h3>Data Analyst Intern<span>↗</span></h3><p className="feature-org">Trinetro Labs <span>REMOTE / AUG 2026—PRESENT</span></p><p>Working with SQL databases, semantic modeling, and AI-powered business intelligence workflows in a startup environment.</p></div><div className="experience-side"><div className="recognition-block reveal"><span className="feature-index">02 / RECOGNITION</span>{recognition.map(item => <a href={item.image} target="_blank" rel="noreferrer" key={item.title}><strong>{item.title}</strong><small>{item.detail}</small><ArrowUpRight size={18} /></a>)}</div><div className="credential-block reveal"><span className="feature-index">03 / CREDENTIALS</span>{credentials.map(item => <a href={item.href} target="_blank" rel="noreferrer" key={item.title}><strong>{item.title}</strong><small>{item.issuer}</small><ArrowUpRight size={18} /></a>)}</div></div></div></div></section> }

function Contact() { return <section className="contact-section" id="contact"><div className="section-inner"><Label index="05" light>CONTACT / NEXT STEPS</Label><div className="contact-layout reveal"><div><p className="eyebrow">A GOOD QUESTION IS A GOOD START</p><h2>Let’s find<br /><em>what’s next.</em></h2><p>I’m exploring opportunities in data analysis, business analysis, BI, and product analytics. If my work sparks a question, I’d love to hear it.</p></div><a className="contact-orb" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}><ArrowUpRight size={62} /></a></div><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={26} /></a><footer className="footer"><span>© {new Date().getFullYear()} ABDUL SAMHOON</span><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={profile.resume} target="_blank" rel="noreferrer">RÉSUMÉ ↗</a></div><a href="#top">BACK TO TOP ↑</a></footer></div></section> }

function Home() { useEffect(() => { document.title = 'Abdul Samhoon — Data, made to mean more.' }, []); return <main id="main"><Hero /><Work /><Method /><About /><Experience /><Contact /></main> }

function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  useEffect(() => { document.title = project ? `${project.title} — Abdul Samhoon` : 'Project not found — Abdul Samhoon' }, [project])
  if (!project) return <main id="main" className="not-found"><h1>Project not found.</h1><Link to="/#work">Return to selected work <ArrowLeft size={18} /></Link></main>
  const next = projects[(projects.findIndex(item => item.slug === slug) + 1) % projects.length]
  const chapters = [{ n: '01', title: 'The question', body: project.problem }, { n: '02', title: 'The material', body: project.data }, { n: '03', title: 'The approach', body: project.investigation }, { n: '04', title: 'What emerged', body: project.insights }, { n: '05', title: 'Why it matters', body: project.implication }]
  return <main id="main" className={`case-page case-page--${project.theme}`}><div className="case-hero"><div className="section-inner"><div className="case-hero-top"><Link to="/#work"><ArrowLeft size={17} /> SELECTED WORK</Link><span>CASE STUDY / {project.number} OF 0{projects.length}</span></div><div className="case-hero-grid"><div><p className="eyebrow">{project.category.toUpperCase()}</p><h1>{project.title}</h1><p className="case-teaser">{project.teaser}</p></div><div className="case-hero-mark" aria-hidden="true"><span>{project.number}</span><small>ANALYSIS / ARTIFACT / IMPACT</small></div></div><div className="case-tool-row">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div></div><section className="case-body section-pad"><div className="section-inner"><Label index="A">THE STORY</Label><div className="case-story">{chapters.map(chapter => <div className="case-chapter reveal" key={chapter.n}><span>{chapter.n} /</span><h2>{chapter.title}</h2><p>{chapter.body}</p></div>)}</div>{project.evidenceNote && <p className="evidence-note">{project.evidenceNote}</p>}</div></section><section className="case-gallery section-pad"><div className="section-inner"><Label index="B">THE ARTIFACTS</Label><div className="case-images">{project.images.map((src, index) => <figure className="reveal" key={src}><div><img src={src} alt={project.imageAlts[index]} loading="lazy" /></div><figcaption>FIG. {String(index + 1).padStart(2, '0')} / {project.imageAlts[index]}</figcaption></figure>)}</div><div className="case-links">{project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Source repository <ArrowUpRight size={21} /></a>}{project.documents.map(doc => <a href={doc.href} target="_blank" rel="noreferrer" key={doc.href}>{doc.label} <ArrowUpRight size={21} /></a>)}</div></div></section><section className="case-next"><div className="section-inner"><span>NEXT CASE STUDY / {next.number}</span><Link to={projectPath(next.slug)}>{next.title}<ArrowRight size={40} /></Link><Link className="case-back" to="/#work">ALL WORK <ArrowUpRight size={17} /></Link></div></section></main>
}

function LegacyDocument({ href }) { useEffect(() => { window.location.replace(href) }, [href]); return <main id="main" className="not-found"><p>Opening document…</p><a href={href}>Open it here <Download size={18} /></a></main> }
function LegacyRoute({ section }) { return <Navigate to={`/#${section}`} replace /> }

export default function Editorial() { return <><PageEffects /><a className="skip-link" href="#main">Skip to content</a><Header /><Routes><Route path="/" element={<Home />} /><Route path="/project/:slug" element={<CaseStudy />} /><Route path="/museum/projects/:slug" element={<CaseStudy />} /><Route path="/museum" element={<Navigate to="/" replace />} /><Route path="/museum/projects" element={<LegacyRoute section="work" />} /><Route path="/museum/about" element={<LegacyRoute section="about" />} /><Route path="/museum/skills" element={<LegacyRoute section="method" />} /><Route path="/museum/experience" element={<LegacyRoute section="experience" />} /><Route path="/museum/contact" element={<LegacyRoute section="contact" />} /><Route path="/project/food-health/report" element={<LegacyDocument href="/food-health-report.pdf" />} /><Route path="/project/food-health/presentation" element={<LegacyDocument href="/food-health-presentation.pdf" />} /><Route path="/project/instacart/report" element={<LegacyDocument href="/instacart-report.pdf" />} /><Route path="/project/instacart/presentation" element={<LegacyDocument href="/instacart-presentation.pdf" />} /><Route path="/projects/instacart/report" element={<LegacyDocument href="/instacart-report.pdf" />} /><Route path="/projects/instacart/presentation" element={<LegacyDocument href="/instacart-presentation.pdf" />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></> }
