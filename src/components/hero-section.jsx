import { useEffect, useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowDownRight, Download } from 'lucide-react'

function SpaceField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const hero = canvas?.closest('.hero-section')
    if (!canvas || !context || !hero) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let width = 0
    let height = 0
    let frame = 0
    let active = true
    let stars = []
    let meteors = []

    const makeScene = () => {
      const mobile = width < 720
      const count = mobile ? 34 : 78
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * (mobile ? 1.05 : 1.45) + .25,
        depth: index % 3 === 0 ? 1 : index % 3 === 1 ? .55 : .22,
        alpha: Math.random() * .46 + .16,
        phase: Math.random() * Math.PI * 2,
      }))
      meteors = Array.from({ length: mobile ? 1 : 3 }, (_, index) => ({
        x: .56 + Math.random() * .38,
        y: .08 + Math.random() * .54,
        length: 18 + Math.random() * 32,
        alpha: index === 0 ? .28 : .12,
        speed: .018 + Math.random() * .012,
        delay: Math.random() * 16,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      makeScene()
    }

    const draw = (now) => {
      if (!active) return
      pointer.x += (pointer.tx - pointer.x) * .035
      pointer.y += (pointer.ty - pointer.y) * .035
      context.clearRect(0, 0, width, height)

      stars.forEach((star) => {
        const shimmer = reduced ? 1 : .76 + Math.sin(now * .00075 + star.phase) * .24
        const px = star.x * width + pointer.x * star.depth * 14
        const py = star.y * height + pointer.y * star.depth * 9
        context.beginPath()
        context.arc(px, py, star.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(242,235,222,${star.alpha * shimmer})`
        context.fill()
      })

      if (!reduced) {
        meteors.forEach((meteor) => {
          const cycle = ((now * .001 * meteor.speed + meteor.delay) % 1)
          if (cycle > .14) return
          const travel = cycle / .14
          const x = meteor.x * width + travel * 120
          const y = meteor.y * height + travel * 52
          const gradient = context.createLinearGradient(x, y, x - meteor.length, y - meteor.length * .42)
          gradient.addColorStop(0, `rgba(255,240,218,${meteor.alpha * (1 - travel)})`)
          gradient.addColorStop(1, 'rgba(255,240,218,0)')
          context.beginPath()
          context.moveTo(x, y)
          context.lineTo(x - meteor.length, y - meteor.length * .42)
          context.strokeStyle = gradient
          context.lineWidth = .8
          context.stroke()
        })
      }

      frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - .5) * 2
      pointer.ty = ((event.clientY - rect.top) / rect.height - .5) * 2
      hero.style.setProperty('--space-x', `${pointer.tx * -7}px`)
      hero.style.setProperty('--space-y', `${pointer.ty * -5}px`)
    }

    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
      hero.style.setProperty('--space-x', '0px')
      hero.style.setProperty('--space-y', '0px')
    }

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
      }
    })

    resize()
    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    observer.observe(hero)
    draw(performance.now())

    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="space-field" aria-hidden="true" />
}

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
      />
      <SpaceField />
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
