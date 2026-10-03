import { lazy, Suspense, useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowDownRight, Download } from 'lucide-react'

const BlackHoleScene = lazy(() => import('./black-hole-scene').then((module) => ({ default: module.BlackHoleScene })))

export function HeroSection() {
  const heroRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneOpacity = useTransform(scrollYProgress, [0, .58, 1], [1, .74, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 55])
  const reveal = reduceMotion ? false : { opacity: 0, y: 28 }

  return (
    <section id="home" ref={heroRef} className="hero-section">
      <Motion.div
        className="hero-space-art"
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity: sceneOpacity, scale: sceneScale, y: sceneY }}
      >
        <Suspense fallback={<div className="black-hole-scene" />}>
          <BlackHoleScene />
        </Suspense>
      </Motion.div>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-rule" aria-hidden="true">
          <span>01 — PORTFOLIO / 2026</span>
          <span>INDIA · REMOTE</span>
        </div>

        <div className="hero-stage">
          <Motion.div
            className="hero-copy"
            initial={reveal}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
            style={reduceMotion ? undefined : { y: copyY }}
          >
            <p className="hero-eyebrow">Data Analyst · AI &amp; Data Science</p>
            <h1><span>Abdul</span><span className="hero-name-outline">Samhoon</span></h1>
            <p className="hero-intro">I turn complex data into clear systems, useful decisions, and business-ready stories.</p>
            <div className="hero-actions">
              <a href="#projects" className="button-primary" data-cursor="VIEW">Selected work <ArrowDownRight /></a>
              <a href="/Abdul_Samhoon_Resume.pdf" download className="button-text">Résumé <Download /></a>
            </div>
          </Motion.div>

          <Motion.div
            className="hero-annotation"
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: .55, ease: [.16, 1, .3, 1] }}
          >
            <span>FIG. 01</span>
            <strong>DEEP DATA FIELD</strong>
            <i aria-hidden="true" />
          </Motion.div>
        </div>

        <div className="hero-footerline">
          <span>AVAILABLE FOR DATA &amp; ANALYTICS OPPORTUNITIES</span>
          <a className="hero-scroll-cue" href="#main-content">
            <span>Scroll to explore</span>
            <ArrowDown />
          </a>
        </div>
      </div>

      <div className="hero-transition" aria-hidden="true">
        <div className="hero-data-grid" />
      </div>
    </section>
  )
}
