import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Coffee,
  FileText,
  Presentation,
  X,
} from 'lucide-react'

function StudyHeading({ number, title, note }) {
  return (
    <div className="study-heading">
      <span>{String(number).padStart(2, '0')}</span>
      <div><h2>{title}</h2>{note && <p>{note}</p>}</div>
    </div>
  )
}

export function CaseStudyLayout({ project }) {
  const reduceMotion = useReducedMotion()
  const [lightbox, setLightbox] = useState(null)
  const closeButton = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${project.title} | Abdul Samhoon`
    return () => { document.title = previousTitle }
  }, [project.title])

  useEffect(() => {
    if (lightbox === null) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowRight') setLightbox((index) => (index + 1) % project.images.length)
      if (event.key === 'ArrowLeft') setLightbox((index) => (index - 1 + project.images.length) % project.images.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [lightbox, project.images.length])

  const reveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' }, transition: { duration: .45 } }

  return (
    <div className="case-study-page">
      <div className="case-study-room" aria-hidden="true"><img src="/cafe_2.png" alt="" className="pixel-crisp" /></div>
      <main className="case-study-shell">
        <Link to="/#projects" className="study-back"><ArrowLeft /> Back to projects</Link>

        <Motion.header className="study-hero" initial={reduceMotion ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .45 }}>
          <div className="study-hero-copy">
            <span className="study-kicker">{project.category}</span>
            <h1>{project.title}</h1>
            <p className="study-summary">{project.summary}</p>
            <div className="study-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            <div className="study-outcome"><Coffee aria-hidden="true" /><div><span>Primary outcome</span><p>{project.outcome}</p></div></div>
          </div>
          <button type="button" className="study-hero-frame" onClick={() => setLightbox(0)} aria-label={`Enlarge ${project.title} dashboard`}>
            <img src={project.images[0]} alt={`${project.title} dashboard overview`} />
            <span>Project display · select to enlarge</span>
          </button>
        </Motion.header>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={1} title="The problem" />
          <div className="study-note-card"><p>{project.problem}</p></div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={2} title="The approach" />
          <div className="study-card-grid">
            {project.approach.map((item) => <article className="study-menu-card" key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </Motion.section>

        <Motion.section className="study-section study-split" {...reveal}>
          <div>
            <StudyHeading number={3} title="Data" />
            <div className="study-data-ticket">
              {project.data.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
              <p>{project.dataNote}</p>
            </div>
          </div>
          <div>
            <StudyHeading number={4} title="Process" />
            <ol className="study-process">
              {project.process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
            </ol>
          </div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={5} title="Analysis" note="The questions explored and methods used." />
          <div className="study-analysis-grid">
            {project.analysis.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={6} title="Key insights" note="The most decision-relevant findings, summarized for quick review." />
          <div className="insight-receipt">
            <div className="receipt-header"><Coffee /><span>Insight summary · {project.shortName}</span></div>
            {project.insights.map((item, index) => (
              <article key={item.title}><span>Insight {String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>
            ))}
            <div className="receipt-total"><span>Takeaway</span><strong>{project.takeaway}</strong></div>
          </div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={7} title="Dashboard & results" note="Interactive outputs presented as focused dashboard views." />
          <div className={`study-gallery ${project.images.length === 1 ? 'single' : ''}`}>
            {project.images.map((image, index) => (
              <button type="button" key={image} onClick={() => setLightbox(index)} aria-label={`Enlarge dashboard view ${index + 1}`}>
                <img src={image} alt={`${project.title} dashboard view ${index + 1}`} loading="lazy" />
                <span>Display {String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={8} title="Technology" />
          <div className="study-chalkboard">
            <span>Today’s tools</span>
            <div>{project.tools.map((tool) => <p key={tool}><Coffee aria-hidden="true" /> {tool}</p>)}</div>
          </div>
        </Motion.section>

        <Motion.section className="study-section" {...reveal}>
          <StudyHeading number={9} title="Outcome" />
          <div className="study-outcome-board">
            <p>{project.outcomeLong}</p>
            <div className="study-docs">
              <Link to={project.reportRoute}><FileText /> <span><strong>Project report</strong><small>Read the full methodology</small></span><ArrowUpRight /></Link>
              <Link to={project.presentationRoute}><Presentation /> <span><strong>Presentation</strong><small>Open the project deck</small></span><ArrowUpRight /></Link>
            </div>
          </div>
        </Motion.section>

        <section className="study-closing pixel-corners">
          <Coffee aria-hidden="true" />
          <p>Thanks for exploring this project.</p>
          <div>
            <a href={project.github} target="_blank" rel="noreferrer" className="button-primary"><FaGithub /> View GitHub</a>
            <Link to="/#projects" className="button-secondary"><ArrowLeft /> Back to projects</Link>
          </div>
        </section>
      </main>

      {lightbox !== null && (
        <div className="study-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image viewer`} onMouseDown={(event) => event.target === event.currentTarget && setLightbox(null)}>
          <div className="study-lightbox-frame">
            <button ref={closeButton} type="button" className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image viewer"><X /></button>
            {project.images.length > 1 && <button type="button" className="lightbox-prev" onClick={() => setLightbox((lightbox - 1 + project.images.length) % project.images.length)} aria-label="Previous dashboard"><ChevronLeft /></button>}
            <img src={project.images[lightbox]} alt={`${project.title} enlarged dashboard view ${lightbox + 1}`} />
            {project.images.length > 1 && <button type="button" className="lightbox-next" onClick={() => setLightbox((lightbox + 1) % project.images.length)} aria-label="Next dashboard"><ChevronRight /></button>}
            <p>{project.shortName} · view {lightbox + 1} of {project.images.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
