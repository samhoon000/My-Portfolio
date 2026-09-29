import { useRef } from 'react'
import { motion as Motion, useInView, useReducedMotion } from 'framer-motion'
import { experiences } from '../data/portfolio-data'
import { SectionHeading } from './section-heading'
import { FaGlobe, FaLinkedin } from 'react-icons/fa'

const responsibilities = [
  'Analyzed MySQL datasets hosted on AWS RDS and validated analytical outputs using SQL, semantic modeling, and Natural Language-to-SQL workflows across varied business scenarios.',
  'Investigated and tested Tally data connectors by tracing backend JSON/data flows, identifying extraction issues, and contributing to more reliable connector behavior across different company structures.',
  'Worked with the backend codebase using Git and pull requests, debugging changes, running regression tests, and validating backend and frontend functionality.',
  'Tested data connectors and query-engine behavior, identifying issues related to data relationships, aggregations, grouping, and analytical accuracy.',
  'Reproduced product issues, investigated root causes, and validated fixes to improve the reliability of data analysis workflows.',
  'Co-presented Trinetro Labs’ startup pitch alongside the founder at the Elevate Government funding event in Bengaluru, presenting the product, technology, and business model to evaluators.',
]

export function ExperienceSection() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const frameRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: '-15% 0px' })

  const handlePointerMove = (event) => {
    if (
      reduceMotion ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) return

    const panel = panelRef.current
    if (!panel) return

    const bounds = panel.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      panel.style.setProperty('--experience-rotate-x', `${(0.5 - y) * 4}deg`)
      panel.style.setProperty('--experience-rotate-y', `${(x - 0.5) * 5}deg`)
      panel.style.setProperty('--experience-light-x', `${x * 100}%`)
      panel.style.setProperty('--experience-light-y', `${y * 100}%`)
      panel.style.setProperty('--experience-shift-x', `${(x - 0.5) * 8}px`)
      panel.style.setProperty('--experience-shift-y', `${(y - 0.5) * 6}px`)
    })
  }

  const handlePointerLeave = () => {
    const panel = panelRef.current
    if (!panel) return

    panel.style.setProperty('--experience-rotate-x', '0deg')
    panel.style.setProperty('--experience-rotate-y', '0deg')
    panel.style.setProperty('--experience-light-x', '50%')
    panel.style.setProperty('--experience-light-y', '0%')
    panel.style.setProperty('--experience-shift-x', '0px')
    panel.style.setProperty('--experience-shift-y', '0px')
  }

  return (
    <section ref={sectionRef} id="experience" className="scene-section notice-scene">
      <SectionHeading eyebrow="EXPERIENCE" title="Work in motion." description="Practical analytics work in a fast-moving product environment." />
      <div className={`timeline-rail ${isInView ? 'is-active' : ''}`}>
        {experiences.map((exp) => (
          <div key={exp.company} className={`timeline-entry ${isInView ? 'is-active' : ''}`}>
            <Motion.div
              className="experience-panel-reveal"
              initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.975 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
            >
              <article
                ref={panelRef}
                className="experience-record"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <Motion.div
                  className="experience-content"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
                >
                  <div className="ticket-top">
                    <div>
                      <span className="ticket-kicker">CURRENT ROLE · REMOTE</span>
                      <h3>Data Analyst Intern</h3>
                      <p>Trinetro Labs</p>
                    </div>
                    <time>AUGUST 2026 — PRESENT</time>
                  </div>
                  <ul>
                    {responsibilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="ticket-links">
                    <a href={exp.companyUrl} target="_blank" rel="noreferrer"><FaGlobe aria-hidden="true" /> Company ↗</a>
                    <a href={exp.linkedinUrl} target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn ↗</a>
                  </div>
                </Motion.div>
              </article>
            </Motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
