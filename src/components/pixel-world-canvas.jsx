import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 600

function getFrameUrl(frameIndex) {
  if (frameIndex < 300) {
    const padded = String(frameIndex + 1).padStart(3, '0')
    return `/cafe1/ezgif-frame-${padded}.jpg`
  } else {
    const padded = String(frameIndex - 300 + 1).padStart(3, '0')
    return `/cafe2/ezgif-frame-${padded}.jpg`
  }
}

export function PixelWorldCanvas() {
  const canvasRef = useRef(null)
  const imageCacheRef = useRef(new Map())
  const loadingSetRef = useRef(new Set())
  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cache = imageCacheRef.current
    const loadingSet = loadingSetRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })

    const setupContextSmoothing = () => {
      if (!ctx) return
      ctx.imageSmoothingEnabled = false
      if ('mozImageSmoothingEnabled' in ctx) ctx.mozImageSmoothingEnabled = false
      if ('webkitImageSmoothingEnabled' in ctx) ctx.webkitImageSmoothingEnabled = false
      if ('msImageSmoothingEnabled' in ctx) ctx.msImageSmoothingEnabled = false
    }

    const drawImageToCanvas = (img) => {
      if (!img || !canvas || !ctx) return
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth || img.width || 1280
      const ih = img.naturalHeight || img.height || 720
      if (!iw || !ih) return

      const imgRatio = iw / ih
      const canvasRatio = cw / ch
      let drawW, drawH, drawX, drawY

      if (canvasRatio > imgRatio) {
        drawW = cw
        drawH = Math.round(cw / imgRatio)
        drawX = 0
        drawY = Math.round((ch - drawH) / 2)
      } else {
        drawH = ch
        drawW = Math.round(ch * imgRatio)
        drawX = Math.round((cw - drawW) / 2)
        drawY = 0
      }

      setupContextSmoothing()
      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    const findNearestImage = (targetIndex) => {
      if (cache.has(targetIndex)) return cache.get(targetIndex)
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (targetIndex - offset >= 0 && cache.has(targetIndex - offset)) {
          return cache.get(targetIndex - offset)
        }
        if (targetIndex + offset < TOTAL_FRAMES && cache.has(targetIndex + offset)) {
          return cache.get(targetIndex + offset)
        }
      }
      return null
    }

    const drawCurrentTarget = () => {
      const idx = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1))
      const clamped = Math.min(Math.max(idx, 0), TOTAL_FRAMES - 1)
      const img = findNearestImage(clamped)
      if (img) {
        drawImageToCanvas(img)
      }
    }

    const handleResize = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      setupContextSmoothing()
      drawCurrentTarget()
    }

    const loadFrame = (index) => {
      if (index < 0 || index >= TOTAL_FRAMES) return
      if (cache.has(index) || loadingSet.has(index)) return

      loadingSet.add(index)
      const img = new Image()
      img.src = getFrameUrl(index)

      const onLoaded = () => {
        cache.set(index, img)
        loadingSet.delete(index)
        const activeIdx = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1))
        if (index === 0 || index === activeIdx) {
          drawImageToCanvas(img)
        }
      }

      if (img.decode) {
        img.decode()
          .then(onLoaded)
          .catch(() => {
            img.onload = onLoaded
          })
      } else {
        img.onload = onLoaded
      }

      img.onerror = () => {
        loadingSet.delete(index)
      }
    }

    // 1. Immediately load initial frames and key landmark checkpoints
    const initialLandmarks = [0, 1, 2, 3, 50, 100, 150, 200, 250, 299, 300, 301, 350, 400, 450, 500, 550, 599]
    initialLandmarks.forEach((idx) => loadFrame(idx))

    // 2. Progressive background preloader during idle time
    let bgTimer = null
    let bgIndex = 0
    const idlePreload = () => {
      let loadedInBatch = 0
      while (bgIndex < TOTAL_FRAMES && loadedInBatch < 3) {
        loadFrame(bgIndex)
        bgIndex++
        loadedInBatch++
      }
      if (bgIndex < TOTAL_FRAMES) {
        bgTimer = setTimeout(idlePreload, 40)
      }
    }
    const startBgTimer = setTimeout(idlePreload, 200)

    // 3. Scroll progress calculation
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const maxScroll = Math.max(docHeight - winHeight, 1)
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      targetProgressRef.current = progress

      // Preload surrounding frames based on scroll position
      const estIdx = Math.round(progress * (TOTAL_FRAMES - 1))
      for (let o = -8; o <= 12; o++) {
        loadFrame(estIdx + o)
      }
    }

    let lastDrawnFrame = -1

    const animateLoop = () => {
      if (prefersReducedMotion) {
        targetProgressRef.current = 0
      }

      // Smooth lerp interpolation
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * 0.18

      const frameIdx = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1))
      const clampedIdx = Math.min(Math.max(frameIdx, 0), TOTAL_FRAMES - 1)

      if (clampedIdx !== lastDrawnFrame) {
        const img = findNearestImage(clampedIdx)
        if (img) {
          drawImageToCanvas(img)
          lastDrawnFrame = clampedIdx
        }
      }

      rafIdRef.current = requestAnimationFrame(animateLoop)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    handleResize()
    handleScroll()
    rafIdRef.current = requestAnimationFrame(animateLoop)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      if (bgTimer) clearTimeout(bgTimer)
      if (startBgTimer) clearTimeout(startBgTimer)
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}
