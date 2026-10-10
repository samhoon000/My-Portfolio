import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Download, Mail } from 'lucide-react'
import { FaGithub as Github, FaLinkedinIn } from 'react-icons/fa'
import { credentials, profile, projects, recognition, skillGroups } from '../data/museum-data'
import { Architecture, RoomScene } from './Architecture'
import { DoorLink, useMuseum } from './MuseumContext'

export function Door({ to, number, title, className = '', note = 'ENTER ROOM' }) {
  return <DoorLink to={to} className={`architectural-door ${className}`} aria-label={`Enter ${title}`}>
    <span className="door-frame"><span className="door-interior"><span className="door-light" /><span className="door-number">{number}</span><span className="door-glyph">✦</span></span></span>
    <span className="door-threshold" />
    <span className="door-plaque"><small>{note}</small><strong>{title}</strong><ArrowUpRight size={15} /></span>
  </DoorLink>
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  return profile.portrait && !failed ? <img src={profile.portrait} alt="Portrait of Abdul Samhoon" onError={() => setFailed(true)} /> : <div className="portrait-silhouette" role="img" aria-label="Portrait placeholder for Abdul Samhoon"><span>AS</span><small>PORTRAIT / TO BE ADDED</small></div>
}

function ExhibitImage({ src, alt }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className="artifact-fallback" role="img" aria-label={`${alt} preview unavailable`}>PROJECT IMAGE UNAVAILABLE</div> : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}

function RoomSign({ number, title, caption }) {
  return <div className="room-sign"><span>GALLERY {number} / {title.toUpperCase()}</span><span>{caption}</span></div>
}

export function EntranceRoom() {
  return <main className="room-scene room-scene--entrance entrance-scene"><Architecture variant="entrance" />
    <div className="entrance-content">
      <div className="entrance-copy"><p className="museum-eyebrow">A DIGITAL MUSEUM OF ANALYTICAL WORK</p><h1>Abdul<br /><em>Samhoon.</em></h1><p className="entrance-headline">Turning data into decisions.</p><p className="entrance-description">Data Analyst Intern at Trinetro Labs. B.E. in Artificial Intelligence & Data Science, class of 2027. Exploring data analyst, business analyst, BI, and product analyst internships.</p><div className="entrance-shortcuts"><Link to="/museum/projects">See the work <ArrowUpRight size={16} /></Link><a href={profile.resume} download>View résumé <Download size={16} /></a><Link to="/museum/contact">Contact me <ArrowUpRight size={16} /></Link></div></div>
      <div className="entrance-door-zone"><div className="entrance-overhead">THE MUSEUM IS OPEN <span>↘</span></div><Door to="/museum" number="00" title="Central Atrium" className="entrance-door" note="ENTER THE MUSEUM" /><div className="entrance-portrait"><Portrait /><span>THE ANALYST / FIG. 00</span></div></div>
    </div>
    <div className="entrance-footer"><span>STEP INSIDE / CHOOSE YOUR PATH</span><span>AN INTERACTIVE PORTFOLIO EXPERIENCE</span></div>
  </main>
}

export function AtriumRoom() {
  const { progress } = useMuseum()
  return <RoomScene variant="atrium" className="atrium-scene">
    <div className="atrium-overhead"><p className="museum-eyebrow">ROOM 00 / CENTRAL ATRIUM</p><h1>Choose a doorway.</h1><p>Walk into a story, a project, or the methods behind the work. Every room is open.</p></div>
    <div className="atrium-doors">
      <Door to="/museum/experience" number="04" title="Career Gallery" className="door-wing door-wing-left" />
      <Door to="/museum/about" number="01" title="About" className="door-back" />
      <Door to="/museum/projects" number="02" title="Projects" className="door-back door-primary" />
      <Door to="/museum/skills" number="03" title="Skills Lab" className="door-back" />
      <Door to="/museum/contact" number="05" title="Contact" className="door-wing door-wing-right" />
    </div>
    <div className="atrium-floor-mark"><span>AS</span><small>THE SAMHOON COLLECTION</small></div>
    <div className="atrium-counter"><span>EXPLORATION RECORD</span><strong>{String(progress.rooms.length).padStart(2, '0')} <small>/ 06 ROOMS</small></strong></div>
  </RoomScene>
}

export function AboutRoom() {
  return <RoomScene variant="about" className="about-scene">
    <RoomSign number="01" title="About" caption="THE PERSON BEHIND THE PROCESS" />
    <div className="about-gallery">
      <div className="about-wall-text"><p className="museum-eyebrow">PORTRAIT OF AN ANALYST</p><h1>Curiosity is<br />the first <em>query.</em></h1><p>I study Artificial Intelligence & Data Science and work at the intersection of analysis, reporting, and useful business questions. I care about the moment raw data becomes something a team can understand and act on.</p><div className="about-facts"><div><span>EDUCATION</span><strong>{profile.education}</strong></div><div><span>AT WORK</span><strong>{profile.experience}</strong></div><div><span>FOCUS</span><strong>SQL · Python · Business intelligence</strong></div></div></div>
      <div className="about-portrait-installation"><div className="wall-sconce sconce-left" /><div className="portrait-art"><Portrait /></div><div className="wall-sconce sconce-right" /><div className="portrait-label">ABDUL SAMHOON <span>FIG. 01 / THE ANALYST</span></div></div>
    </div>
    <div className="room-exits"><Door to="/museum/experience" number="04" title="Career Gallery" className="small-door" note="NEXT ROOM" /><Door to="/museum/projects" number="02" title="Project Gallery" className="small-door" note="SEE THE EVIDENCE" /></div>
  </RoomScene>
}

export function ProjectGalleryRoom() {
  const { progress } = useMuseum()
  return <RoomScene variant="gallery" className="gallery-scene">
    <RoomSign number="02" title="Project Gallery" caption="SELECT A DISPLAY TO ENTER ITS EXHIBIT" />
    <div className="gallery-room-header"><div><p className="museum-eyebrow">FIVE ANALYTICAL EXHIBITS</p><h1>Evidence<br /><em>on the walls.</em></h1></div><p>Real dashboards, real questions. Select a framed work to enter its dedicated project room.</p></div>
    <div className="gallery-wall">{projects.map(project => <DoorLink key={project.slug} to={`/museum/projects/${project.slug}`} className={`gallery-artifact gallery-artifact--${project.theme}`} aria-label={`Enter ${project.title} exhibit`}><div className="artifact-frame"><ExhibitImage src={project.images[0]} alt={project.imageAlts[0]} /><span className="artifact-reflection" /></div><div className="artifact-plaque"><span>EXHIBIT {project.number} / {project.category.toUpperCase()}</span><strong>{project.title}</strong><small>{progress.projects.includes(project.slug) ? <><Check size={12} /> VIEWED</> : 'ENTER EXHIBIT ↗'}</small></div></DoorLink>)}</div>
    <div className="gallery-room-floor"><span>THE PROJECT GALLERY</span><Link to="/museum">RETURN TO ATRIUM <ArrowLeft size={15} /></Link></div>
  </RoomScene>
}

export function SkillsRoom() {
  const [selected, setSelected] = useState(skillGroups[0].id)
  const { discoverSkill, progress } = useMuseum()
  const group = skillGroups.find(item => item.id === selected)
  const choose = id => { setSelected(id); discoverSkill(id) }
  const onKeys = event => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')]
    const index = tabs.indexOf(document.activeElement)
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length
    tabs[next]?.focus(); tabs[next]?.click()
  }
  return <RoomScene variant="lab" className="lab-scene">
    <RoomSign number="03" title="Skills Laboratory" caption="SELECT A CONSOLE TO REVEAL PROJECT EVIDENCE" />
    <div className="lab-overhead"><p className="museum-eyebrow">ANALYTICAL METHODS / ACTIVE</p><h1>The data <em>lab.</em></h1><p>Tools become useful when they answer a real question. Select an instrument to see where I used it.</p></div>
    <div className="lab-workstation"><div className="lab-console" role="tablist" aria-label="Lab instruments" onKeyDown={onKeys}>{skillGroups.map(item => <button key={item.id} type="button" role="tab" aria-controls="lab-display" aria-selected={selected === item.id} tabIndex={selected === item.id ? 0 : -1} className={selected === item.id ? 'active' : ''} onClick={() => choose(item.id)}><span className="console-led" /><small>{item.number}</small><strong>{item.title}</strong>{progress.skills.includes(item.id) && <Check size={13} aria-label="Explored" />}</button>)}</div><div className="lab-display" id="lab-display" role="tabpanel"><div className="display-status"><span>INSTRUMENT / {group.number}</span><span>LIVE EXHIBIT</span></div><div className="display-graphic" aria-hidden="true"><i /><i /><i /><i /><span /></div><div className="display-copy"><p className="museum-eyebrow">SELECTED METHOD</p><h2>{group.title}</h2><p>{group.description}</p><div className="display-tools">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="display-evidence"><small>PROJECT EVIDENCE</small>{group.projectSlugs.map(slug => { const project = projects.find(item => item.slug === slug); return <DoorLink key={slug} to={`/museum/projects/${slug}`}>{project.title}<ArrowUpRight size={16} /></DoorLink> })}</div></div></div></div>
    <div className="lab-exit"><Door to="/museum/projects" number="02" title="Projects" className="small-door" note="FOLLOW THE EVIDENCE" /></div>
  </RoomScene>
}

export function ExperienceRoom() {
  const [expanded, setExpanded] = useState('internship')
  return <RoomScene variant="career" className="career-scene">
    <RoomSign number="04" title="Career Gallery" caption="A JOURNEY IN PROGRESS" />
    <div className="career-header"><p className="museum-eyebrow">THE PATH SO FAR</p><h1>Built by learning.<br /><em>Sharpened by doing.</em></h1></div>
    <div className="career-installation"><div className="career-track"><span className="track-glow" /><button className={expanded === 'education' ? 'active' : ''} onClick={() => setExpanded('education')}><span>2027</span><strong>Education</strong></button><button className={expanded === 'internship' ? 'active' : ''} onClick={() => setExpanded('internship')}><span>2026—</span><strong>Internship</strong></button><button className={expanded === 'recognition' ? 'active' : ''} onClick={() => setExpanded('recognition')}><span>2025—</span><strong>Recognition</strong></button></div><div className="career-display">{expanded === 'education' && <><small>MILESTONE 01 / EDUCATION</small><h2>B.E. in Artificial Intelligence & Data Science</h2><p>Expected graduation in 2027. The course of study supports work in programming, data systems, analytical methods, and applied machine learning.</p></>}{expanded === 'internship' && <><small>MILESTONE 02 / EXPERIENCE</small><h2>Data Analyst Intern<br /><em>Trinetro Labs</em></h2><p>Since August 2026, working remotely with SQL databases, semantic modeling, and AI-powered business intelligence workflows in a startup environment.</p></>}{expanded === 'recognition' && <><small>MILESTONE 03 / RECOGNITION</small><h2>Outside the classroom.</h2><div className="career-awards">{recognition.map(item => <a href={item.image} target="_blank" rel="noreferrer" key={item.title}><strong>{item.title}</strong><span>{item.detail}</span><ArrowUpRight size={16} /></a>)}</div></>}</div></div>
    <div className="career-credentials"><span>VERIFIED CREDENTIALS</span>{credentials.map(item => <a key={item.title} href={item.href} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={14} /></a>)}</div>
    <div className="career-exit"><Door to="/museum/about" number="01" title="About" className="small-door" note="MEET THE ANALYST" /></div>
  </RoomScene>
}

export function ContactRoom() {
  return <RoomScene variant="contact" className="contact-scene">
    <RoomSign number="05" title="Contact Chamber" caption="THE CONVERSATION STARTS HERE" />
    <div className="contact-dais"><div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div><p className="museum-eyebrow">THE FINAL ROOM</p><h1>Let’s make the<br /><em>next insight count.</em></h1><p>I’m looking for internships in data analysis, business analysis, BI, and product analytics. If my work sparks a question, I’d love to talk.</p><a className="contact-primary" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={25} /></a><div className="contact-actions"><a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn <ArrowUpRight size={15} /></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={15} /></a><a href={profile.resume} download><Download size={17} /> Résumé <ArrowUpRight size={15} /></a><a href={`mailto:${profile.email}`}><Mail size={17} /> Email <ArrowUpRight size={15} /></a></div></div>
    <div className="contact-return"><Door to="/museum" number="00" title="Central Atrium" className="small-door" note="CONTINUE EXPLORING" /></div>
  </RoomScene>
}
