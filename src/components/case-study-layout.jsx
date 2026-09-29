import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Braces,
  Database,
  FileText,
  Presentation,
  Sparkles,
} from 'lucide-react'

function SceneHeading({ number, label, title, note }) {
  return (
    <div className="narrative-heading">
      <div><span>{String(number).padStart(2, '0')}</span><i /></div>
      <p>{label}</p>
      <h2>{title}</h2>
      {note && <small>{note}</small>}
    </div>
  )
}

function NarrativeSection({ children, className = '', reduceMotion }) {
  return (
    <Motion.section
      className={`narrative-section ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 54, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px -12%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.section>
  )
}

function HeroScene({ project, reduceMotion }) {
  return (
    <div className="narrative-hero-scene" aria-label={`${project.shortName} analytical system visualization`}>
      <div className="scene-grid" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-one" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-two" aria-hidden="true" />
      <Motion.div
        className="scene-core"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.78, rotateX: 12 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <Database aria-hidden="true" />
        <span>ANALYTICAL CORE</span>
        <strong>{project.systemLabel}</strong>
      </Motion.div>
      {project.heroNodes.map((node, index) => (
        <Motion.div
          key={node}
          className={`scene-node scene-node-${index + 1}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.35 + index * 0.1 }}
        >
          <i aria-hidden="true" />
          <span>{node}</span>
        </Motion.div>
      ))}
      <div className="scene-packet packet-one" aria-hidden="true" />
      <div className="scene-packet packet-two" aria-hidden="true" />
      <div className="scene-packet packet-three" aria-hidden="true" />
    </div>
  )
}

function ProblemScene({ project }) {
  return (
    <div className="problem-system-scene">
      <div className="problem-fragments">
        <span className="scene-caption">BEFORE · FRAGMENTED</span>
        {project.problemSources.map((source, index) => (
          <div key={source} className={`fragment-block fragment-${index + 1}`}>
            <Braces aria-hidden="true" /><span>{source}</span>
          </div>
        ))}
        <div className="problem-status"><span>SLOW</span><span>INCONSISTENT</span><span>MANUAL</span></div>
      </div>
      <div className="system-transfer" aria-hidden="true"><i /><ArrowRight /><i /></div>
      <div className="solution-core">
        <span className="scene-caption">AFTER · UNIFIED</span>
        <div className="solution-engine"><Database /><strong>{project.systemLabel}</strong><small>ONE DECISION SYSTEM</small></div>
        <div className="solution-signals">{project.solutionSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </div>
    </div>
  )
}

function DataFlowScene({ project }) {
  return (
    <div className="data-flow-scene">
      <div className="data-inputs">
        <span className="scene-caption">RAW DATA</span>
        {project.inputTypes.map((input, index) => (
          <div key={input} className="data-chip"><span>{String(index + 1).padStart(2, '0')}</span><strong>{input}</strong></div>
        ))}
      </div>
      <div className="data-stream" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--particle-index': index }} />)}
      </div>
      <div className="data-engine">
        <Database aria-hidden="true" />
        <span>STRUCTURED DATA</span>
        <strong>{project.storageLabel}</strong>
      </div>
      <div className="data-output">
        <span className="scene-caption">ANALYTICS → INSIGHTS</span>
        {project.outputTypes.map((output) => <div key={output}><BarChart3 aria-hidden="true" /><span>{output}</span></div>)}
      </div>
    </div>
  )
}

function PipelineScene({ project }) {
  return (
    <div className="pipeline-scene">
      {project.process.map((step, index) => (
        <div className="pipeline-stage" key={step}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i aria-hidden="true"><b /></i>
          <strong>{step}</strong>
          <small>{project.pipelineTools[index]}</small>
        </div>
      ))}
    </div>
  )
}

function EngineeringScene({ project }) {
  return (
    <div className="engineering-scene">
      <div className="query-stack">
        {project.engineeringFlow.map((step, index) => (
          <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>
        ))}
      </div>
      <div className="query-engine-core"><Braces /><span>ANALYSIS ENGINE</span><strong>{project.engineLabel}</strong></div>
      <div className="analysis-outputs">
        {project.analysis.map((item, index) => (
          <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>
        ))}
      </div>
    </div>
  )
}

function TechnologyScene({ project }) {
  return (
    <div className="technology-scene">
      <div className="technology-core"><Sparkles /><span>PROJECT SYSTEM</span><strong>{project.shortName}</strong></div>
      {project.technologyMap.map((technology, index) => (
        <div className={`technology-node technology-node-${index + 1}`} key={technology.name}>
          <strong>{technology.name}</strong><span>{technology.use}</span>
        </div>
      ))}
    </div>
  )
}

function InsightsScene({ project }) {
  return (
    <div className="insights-scene">
      <div className="insight-particles" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ '--insight-index': index }} />)}</div>
      <div className="insight-engine"><span>RAW DATA</span><ArrowRight /><strong>PATTERN</strong><ArrowRight /><b>INSIGHT</b></div>
      <div className="insight-metrics">
        {project.impactMetrics.map((metric, index) => (
          <article key={metric.label} className={`impact-metric impact-metric-${index + 1}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
            <small>{metric.note}</small>
          </article>
        ))}
      </div>
    </div>
  )
}

function TransformationScene({ project }) {
  return (
    <div className="transformation-scene">
      <div className="transformation-side is-before">
        <span>BEFORE</span><strong>{project.before.title}</strong>
        <div>{project.before.signals.map((signal) => <i key={signal}>{signal}</i>)}</div>
      </div>
      <div className="transformation-flow" aria-hidden="true"><i /><i /><i /><ArrowRight /></div>
      <div className="transformation-side is-after">
        <span>AFTER</span><strong>{project.after.title}</strong>
        <div>{project.after.signals.map((signal) => <i key={signal}>{signal}</i>)}</div>
      </div>
    </div>
  )
}

export function CaseStudyLayout({ project }) {
  const reduceMotion = useReducedMotion()
  const pageRef = useRef(null)
  const pointerFrame = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${project.title} | Abdul Samhoon`
    return () => { document.title = previousTitle }
  }, [project.title])

  const handlePointerMove = (event) => {
    if (reduceMotion || window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current)
    pointerFrame.current = requestAnimationFrame(() => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      pageRef.current?.style.setProperty('--scene-shift-x', `${x * 12}px`)
      pageRef.current?.style.setProperty('--scene-shift-y', `${y * 10}px`)
      pageRef.current?.style.setProperty('--scene-rotate-y', `${x * 2.6}deg`)
      pageRef.current?.style.setProperty('--scene-rotate-x', `${y * -2.2}deg`)
    })
  }

  const resetPointer = () => {
    pageRef.current?.style.setProperty('--scene-shift-x', '0px')
    pageRef.current?.style.setProperty('--scene-shift-y', '0px')
    pageRef.current?.style.setProperty('--scene-rotate-y', '0deg')
    pageRef.current?.style.setProperty('--scene-rotate-x', '0deg')
  }

  return (
    <div ref={pageRef} className="case-study-page narrative-page" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <main id="main-content" className="case-study-shell narrative-shell">
        <Link to="/#projects" className="study-back"><ArrowLeft /> Back to projects</Link>

        <Motion.header
          className="narrative-hero"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="narrative-hero-copy">
            <span>{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="narrative-hero-meta"><i>SCROLL TO EXPLORE</i><b>{project.data[0].value}</b><small>{project.data[0].label}</small></div>
          </div>
          <HeroScene project={project} reduceMotion={reduceMotion} />
        </Motion.header>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={1} label="THE PROBLEM → THE SOLUTION" title="From fragments to one decision system." note={project.problemShort} />
          <ProblemScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={2} label="DATA / INPUT" title="Raw records enter. Structured signals emerge." note={project.dataNote} />
          <DataFlowScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={3} label="PROJECT PIPELINE" title="A six-stage path from source to decision." />
          <PipelineScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={4} label="ENGINEERING / ANALYSIS" title="The work inside the system." />
          <EngineeringScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={5} label="TECHNOLOGY ECOSYSTEM" title="Each tool connected to a job." />
          <TechnologyScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion} className="insight-narrative-section">
          <SceneHeading number={6} label="DATA → INSIGHT" title="Patterns become decisions." note={project.takeaway} />
          <InsightsScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion}>
          <SceneHeading number={7} label="BEFORE → AFTER" title="The project’s value, in one transition." />
          <TransformationScene project={project} />
        </NarrativeSection>

        <NarrativeSection reduceMotion={reduceMotion} className="narrative-ending">
          <div className="ending-system">
            <div className="ending-core"><Database /><span>COMPLETED SYSTEM</span><strong>{project.shortName}</strong></div>
            <div className="ending-path" aria-label="Problem to impact workflow">
              {['PROBLEM', 'DATA', 'PROCESS', 'INSIGHT', 'IMPACT'].map((item, index) => <span key={item}>{item}{index < 4 && <ArrowRight />}</span>)}
            </div>
          </div>
          <div className="ending-copy">
            <span>PROJECT IMPACT</span>
            <h2>{project.outcome}</h2>
            <div className="study-docs narrative-docs">
              <Link to={project.reportRoute}><FileText /><span><strong>Project report</strong><small>Full methodology</small></span><ArrowUpRight /></Link>
              <Link to={project.presentationRoute}><Presentation /><span><strong>Presentation</strong><small>Project deck</small></span><ArrowUpRight /></Link>
            </div>
            <div className="narrative-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="button-primary"><FaGithub /> View GitHub</a>
              <Link to="/#projects" className="button-secondary"><ArrowLeft /> Back to projects</Link>
            </div>
          </div>
        </NarrativeSection>
      </main>
    </div>
  )
}
