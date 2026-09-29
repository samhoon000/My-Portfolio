import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaTimes, FaGithub } from 'react-icons/fa'

const projectPresentation = [
  {
    category: 'DATA ANALYTICS · POWER BI',
    role: 'Data Analyst / Developer',
    focus: 'Nutrition Analytics · Risk Analysis · BI',
  },
  {
    category: 'CUSTOMER ANALYTICS · POWER BI',
    role: 'Data Analyst / Developer',
    focus: 'Customer Segmentation · Basket Analysis · BI',
  },
  {
    category: 'MARKET INTELLIGENCE · POWER BI',
    role: 'Data Analyst / Developer',
    focus: 'Food Prices · Volatility · Market Analytics',
  },
  {
    category: 'FINANCIAL ANALYTICS · POWER BI',
    role: 'Data Analyst / Developer',
    focus: 'Stock Trends · Volatility · Trading Analysis',
  },
]

function ProjectActions({ project, index, onPreview }) {
  const route = index === 0
    ? '/project/food-health'
    : index === 1 ? '/project/instacart' : null

  return (
    <div className="project-actions">
      {route ? (
        <Link to={route} className="project-cta" data-cursor="OPEN">
          <span>Explore case study</span><i aria-hidden="true">↗</i>
        </Link>
      ) : (
        <button type="button" className="project-cta" onClick={() => onPreview(project)} data-cursor="VIEW">
          <span>View dashboard</span><i aria-hidden="true">↗</i>
        </button>
      )}
      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-github">
        <FaGithub aria-hidden="true" /> GitHub ↗
      </a>
    </div>
  )
}

function ProjectVisual({ project, index, total, reduceMotion, interactive = false, frameRef, onPointerMove, onPointerLeave }) {
  return (
    <div className={`project-visual-stage ${interactive ? 'is-interactive' : ''}`}>
      <AnimatePresence mode="wait">
        <Motion.img
          key={`ambient-${project.images[0]}`}
          className="project-ambient-image"
          src={project.images[0]}
          alt=""
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div
        ref={frameRef}
        className="project-visual-frame"
        onPointerMove={interactive ? onPointerMove : undefined}
        onPointerLeave={interactive ? onPointerLeave : undefined}
      >
        <div className="project-screen">
          <AnimatePresence mode="wait">
            <Motion.img
              key={project.images[0]}
              src={project.images[0]}
              alt={`${project.title} dashboard`}
              loading={index === 0 ? 'eager' : 'lazy'}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.965, y: -14 }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          <span className="project-screen-label">LIVE DASHBOARD</span>
        </div>
      </div>
      <div className="project-visual-index" aria-label={`Project ${index + 1} of ${total}`}>
        <strong>{String(index + 1).padStart(2, '0')}</strong>
        <span>/ {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeProject, setActiveProject] = useState(0)
  const closeButtonRef = useRef(null)
  const storyRefs = useRef([])
  const visualColumnRef = useRef(null)
  const visualStickyRef = useRef(null)
  const visualFrameRef = useRef(null)
  const tiltFrameRef = useRef(null)
  const scrollFrameRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setSelectedProject(null)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])

  useEffect(() => {
    if (!selectedProject) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [selectedProject])

  useEffect(() => {
    const updateVisualPosition = () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current)
      scrollFrameRef.current = requestAnimationFrame(() => {
        const column = visualColumnRef.current
        const visual = visualStickyRef.current
        if (!column || !visual) return

        const focalPoint = window.innerHeight * 0.52
        const closestStory = storyRefs.current.reduce(
          (closest, story, index) => {
            if (!story) return closest
            const bounds = story.getBoundingClientRect()
            const distance = Math.abs(bounds.top + bounds.height / 2 - focalPoint)
            return distance < closest.distance ? { index, distance } : closest
          },
          { index: 0, distance: Number.POSITIVE_INFINITY },
        )
        setActiveProject(closestStory.index)

        if (window.matchMedia('(max-width: 900px)').matches) {
          visual.style.transform = 'none'
          return
        }

        const columnTop = column.getBoundingClientRect().top + window.scrollY
        const topOffset = Math.max(112, window.innerHeight * 0.12)
        const maximumTravel = Math.max(0, column.offsetHeight - visual.offsetHeight)
        const travel = Math.min(Math.max(window.scrollY + topOffset - columnTop, 0), maximumTravel)
        visual.style.transform = `translate3d(0, ${travel}px, 0)`
      })
    }

    updateVisualPosition()
    window.addEventListener('scroll', updateVisualPosition, { passive: true })
    window.addEventListener('resize', updateVisualPosition)
    return () => {
      window.removeEventListener('scroll', updateVisualPosition)
      window.removeEventListener('resize', updateVisualPosition)
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current)
    }
  }, [])

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) return

    const frame = visualFrameRef.current
    if (!frame) return

    const bounds = frame.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    if (tiltFrameRef.current) cancelAnimationFrame(tiltFrameRef.current)
    tiltFrameRef.current = requestAnimationFrame(() => {
      frame.style.setProperty('--project-rotate-x', `${(0.5 - y) * 6}deg`)
      frame.style.setProperty('--project-rotate-y', `${(x - 0.5) * 8}deg`)
      frame.style.setProperty('--project-light-x', `${x * 100}%`)
      frame.style.setProperty('--project-light-y', `${y * 100}%`)
    })
  }

  const handlePointerLeave = () => {
    const frame = visualFrameRef.current
    if (!frame) return
    frame.style.setProperty('--project-rotate-x', '0deg')
    frame.style.setProperty('--project-rotate-y', '0deg')
    frame.style.setProperty('--project-light-x', '50%')
    frame.style.setProperty('--project-light-y', '0%')
  }

  const active = projects[activeProject]

  return (
    <section id="projects" className="scene-section gallery-scene">
      <SectionHeading eyebrow="SELECTED WORK" title="Data, made decisive." description="End-to-end analytics projects, framed around the decision each one helped make." />

      <div className="project-showcase">
        <div ref={visualColumnRef} className="project-visual-column">
          <div ref={visualStickyRef} className="project-visual-sticky">
            <ProjectVisual
              project={active}
              index={activeProject}
              total={projects.length}
              reduceMotion={reduceMotion}
              interactive
              frameRef={visualFrameRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            />
            <div className="project-indicators" aria-hidden="true">
              {projects.map((project, index) => (
                <span key={project.title} className={index === activeProject ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        </div>

        <div className="project-stories">
          {projects.map((project, index) => {
            const presentation = projectPresentation[index]
            return (
              <Motion.article
                key={project.title}
                ref={(node) => { storyRefs.current[index] = node }}
                data-project-index={index}
                className={`project-story ${index === activeProject ? 'is-active' : ''}`}
                initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px -15%' }}
                transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-mobile-visual">
                  <ProjectVisual project={project} index={index} total={projects.length} reduceMotion={reduceMotion} />
                </div>
                <p className="project-number">PROJECT / {String(index + 1).padStart(2, '0')}</p>
                <h3>{project.title}</h3>
                <p className="project-category">{presentation.category}</p>
                <p className="project-summary">{project.result}</p>
                <dl className="project-metadata">
                  <div><dt>ROLE</dt><dd>{presentation.role}</dd></div>
                  <div><dt>TOOLS</dt><dd>{project.tools.slice(0, 4).join(' · ')}</dd></div>
                  <div><dt>FOCUS</dt><dd>{presentation.focus}</dd></div>
                </dl>
                <ProjectActions project={project} index={index} onPreview={setSelectedProject} />
              </Motion.article>
            )
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} dashboard preview`} onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}>
          <div className="modal-frame pixel-corners">
            <div className="modal-heading">
              <div><span>Dashboard preview</span><h3>{selectedProject.title}</h3></div>
              <button ref={closeButtonRef} type="button" onClick={() => setSelectedProject(null)} aria-label="Close preview"><FaTimes /></button>
            </div>
            <div className="modal-gallery">
              {selectedProject.images.map((image, index) => <img key={image} src={image} alt={`${selectedProject.title} preview ${index + 1}`} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
