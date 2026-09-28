import { useEffect, useRef } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'
import { contactDetails } from '../data/portfolio-data'

function DataSculpture() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * ratio))
      canvas.height = Math.max(1, Math.floor(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const rotate = (point, ax, ay) => {
      let [x, y, z] = point
      const cosy = Math.cos(ax)
      const siny = Math.sin(ax)
      const y1 = y * cosy - z * siny
      const z1 = y * siny + z * cosy
      const cosx = Math.cos(ay)
      const sinx = Math.sin(ay)
      return [x * cosx + z1 * sinx, y1, -x * sinx + z1 * cosx]
    }

    const draw = (now) => {
      if (!visible) return
      const t = reduced ? 0.7 : (now - start) * 0.00024
      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045
      context.clearRect(0, 0, width, height)

      const cx = width * 0.5
      const cy = height * 0.49
      const scale = Math.min(width, height) * 0.26
      const rings = width < 640 ? 22 : 34
      const segments = width < 640 ? 46 : 72
      const points = []

      for (let i = 0; i < rings; i += 1) {
        const u = (i / (rings - 1) - 0.5) * Math.PI * 1.42
        const row = []
        for (let j = 0; j < segments; j += 1) {
          const v = (j / segments) * Math.PI * 2
          const swell = 1 + 0.2 * Math.sin(v * 3 + t * 2) * Math.cos(u * 2)
          const radius = Math.cos(u) * swell
          const x = radius * Math.cos(v)
          const y = Math.sin(u) * 1.2
          const z = radius * Math.sin(v) + 0.17 * Math.sin(u * 4 + v * 2 + t * 3)
          const r = rotate([x, y, z], -0.36 + pointer.y * 0.22, t + pointer.x * 0.34)
          const perspective = 3.8 / (4.3 - r[2])
          row.push({ x: cx + r[0] * scale * perspective, y: cy + r[1] * scale * perspective, z: r[2], p: perspective })
        }
        points.push(row)
      }

      context.lineWidth = 0.7
      for (let i = 0; i < rings; i += 1) {
        context.beginPath()
        points[i].forEach((point, j) => j ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y))
        context.closePath()
        context.strokeStyle = `rgba(232,229,222,${0.05 + (i / rings) * 0.16})`
        context.stroke()
      }
      for (let j = 0; j < segments; j += 3) {
        context.beginPath()
        points.forEach((row, i) => i ? context.lineTo(row[j].x, row[j].y) : context.moveTo(row[j].x, row[j].y))
        context.strokeStyle = 'rgba(232,229,222,.11)'
        context.stroke()
      }

      points.flat().filter((_, index) => index % 11 === 0).sort((a, b) => a.z - b.z).forEach((point) => {
        const alpha = Math.max(0.08, Math.min(0.68, (point.z + 1.5) / 3))
        context.beginPath()
        context.arc(point.x, point.y, Math.max(.5, point.p * 1.55), 0, Math.PI * 2)
        context.fillStyle = `rgba(255,250,240,${alpha})`
        context.fill()
      })

      const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.8)
      gradient.addColorStop(0, 'rgba(255,255,255,.035)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      if (!reduced) frame = requestAnimationFrame(draw)
    }

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduced) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
      }
    })

    resize()
    canvas.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', resize, { passive: true })
    observer.observe(canvas)
    draw(performance.now())

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="data-sculpture" aria-label="Interactive abstract three-dimensional data sculpture" role="img" />
}

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion ? false : { opacity: 0, y: 32 }

  return (
    <section id="home" className="hero-section">
      <div className="hero-rule" aria-hidden="true"><span>01 — PORTFOLIO / 2026</span><span>INDIA · REMOTE</span></div>
      <div className="hero-stage">
        <Motion.div className="hero-copy" initial={reveal} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.16, 1, .3, 1] }}>
          <p className="hero-eyebrow">Data Analyst · AI & Data Science</p>
          <h1><span>Abdul</span><span className="hero-name-outline">Samhoon</span></h1>
          <p className="hero-intro">I turn complex data into clear systems, useful decisions, and business-ready stories.</p>
          <div className="hero-actions">
            <a href="#projects" className="button-primary" data-cursor="VIEW">Selected work <ArrowDownRight /></a>
            <a href="/Abdul_Samhoon_Resume.pdf" download className="button-text">Résumé <Download /></a>
          </div>
        </Motion.div>

        <Motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .16, ease: [.16, 1, .3, 1] }}>
          <DataSculpture />
          <div className="sculpture-caption"><span>FIG. 01</span><span>ANALYTICAL FORM</span></div>
        </Motion.div>
      </div>
      <div className="hero-footerline">
        <span>AVAILABLE FOR DATA & ANALYTICS OPPORTUNITIES</span>
        <div>
          <a href={contactDetails.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
          <a href={contactDetails.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  )
}
