import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/museum-data'
import { RoomScene } from './Architecture'
import { DoorLink } from './MuseumContext'

const titles = ['The problem', 'The data', 'The investigation', 'The insights', 'The implications', 'The evidence']
const fields = ['problem', 'data', 'investigation', 'insights', 'implication']

export function CaseRoom() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  const [chapter, setChapter] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => { setChapter(0); setImageFailed(false) }, [slug])
  useEffect(() => { setImageFailed(false) }, [chapter])
  useEffect(() => {
    if (!project) return
    document.title = `${project.title} | Abdul Samhoon`
    return () => { document.title = 'Abdul Samhoon | Virtual Data Museum' }
  }, [project])
  if (!project) return <RoomScene variant="case" className="case-scene"><div className="case-not-found"><h1>Exhibit not found.</h1><Link to="/museum/projects">Return to gallery <ArrowLeft size={17} /></Link></div></RoomScene>
  const next = projects[(projects.findIndex(item => item.slug === slug) + 1) % projects.length]
  const imageIndex = chapter === 3 && project.images[1] ? 1 : 0
  const onChapterKeys = event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextChapter = event.key === 'Home' ? 0 : event.key === 'End' ? 5 : (chapter + (event.key === 'ArrowRight' ? 1 : -1) + 6) % 6
    setChapter(nextChapter)
    event.currentTarget.querySelectorAll('button')[nextChapter]?.focus()
  }
  return <RoomScene variant="case" className={`case-scene case-scene--${project.theme}`}>
    <div className="case-room-sign"><Link to="/museum/projects"><ArrowLeft size={15} /> PROJECT GALLERY</Link><span>EXHIBIT {project.number} / {project.category.toUpperCase()}</span></div>
    <div className="case-room-heading"><div><p className="museum-eyebrow">DEDICATED PROJECT ROOM</p><h1>{project.title}</h1></div><p>{project.teaser}</p></div>
    <div className="case-room-installation">
      <div className="case-artifact"><div className="case-screen">{imageFailed ? <div className="artifact-fallback">PROJECT IMAGE UNAVAILABLE</div> : <img src={project.images[imageIndex]} alt={project.imageAlts[imageIndex]} onError={() => setImageFailed(true)} />}</div><div className="case-artifact-caption"><span>FIG. {String(imageIndex + 1).padStart(2, '0')} / AUTHENTIC PROJECT ARTIFACT</span><span>{project.tools.slice(0, 3).join(' · ')}</span></div></div>
      <div className="case-story-console"><div className="case-chapter-rail" role="tablist" aria-label="Case study chapters" onKeyDown={onChapterKeys}>{titles.map((title, index) => <button key={title} type="button" role="tab" aria-selected={chapter === index} aria-controls="case-story" tabIndex={chapter === index ? 0 : -1} className={chapter === index ? 'active' : ''} onClick={() => { setChapter(index); setImageFailed(false) }}><span>{String(index + 1).padStart(2, '0')}</span>{title}</button>)}</div>
        <div className="case-story-content" id="case-story" role="tabpanel"><span className="case-story-count">CHAPTER {String(chapter + 1).padStart(2, '0')} / 06</span><h2>{titles[chapter]}</h2>{chapter < 5 ? <p>{project[fields[chapter]]}</p> : <><p>Inspect the genuine artifact and available source material for this exhibit.</p><div className="case-evidence">{project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><FaGithub /> Source repository <ArrowUpRight size={16} /></a>}{project.documents.map(doc => <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer"><Download size={16} /> {doc.label} <ArrowUpRight size={16} /></a>)}{project.evidenceNote && <p className="evidence-note">{project.evidenceNote}</p>}</div></>}{chapter === 2 && <div className="case-methods">{project.tools.map((tool, index) => <span key={tool}>{String(index + 1).padStart(2, '0')} / {tool}</span>)}</div>}{chapter === 4 && <Link className="case-context-link" to="/museum/contact">Discuss this work <ArrowUpRight size={16} /></Link>}<div className="case-chapter-controls"><button type="button" onClick={() => setChapter(value => Math.max(0, value - 1))} disabled={chapter === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => setChapter(value => Math.min(5, value + 1))} disabled={chapter === 5}>Next chapter <ArrowRight size={16} /></button></div></div>
      </div>
    </div>
    <div className="case-room-exit"><DoorLink to={`/museum/projects/${next.slug}`}>NEXT EXHIBIT / {next.title} <ArrowUpRight size={15} /></DoorLink><Link to="/museum/projects">RETURN TO GALLERY <ArrowLeft size={15} /></Link></div>
  </RoomScene>
}
