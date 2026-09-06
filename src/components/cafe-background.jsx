import { useState } from 'react'
import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

function SnowParticles() {
  const [flakes] = useState(() =>
    Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.3,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 5,
    }))
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-[#fff4de] shadow-[0_0_3px_rgba(255,244,222,0.8)]"
          style={{
            left: `${flake.x}%`,
            top: `-10px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowDrift ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export function CafeBackground() {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  // Transition range: 150px -> 700px scroll distance for a smooth, natural pacing
  // cafe_1 (Exterior) fades from 1 -> 0 with a gentle zoom towards entrance
  const cafe1Opacity = useTransform(scrollY, [150, 700], [1, 0])
  const cafe1Scale = useTransform(scrollY, [0, 700], [1, shouldReduceMotion ? 1 : 1.14])
  const snowOpacity = useTransform(scrollY, [100, 500], [1, 0])

  // cafe_2 (Interior) fades from 0 -> 1 with a gentle settle to scale 1.0
  const cafe2Opacity = useTransform(scrollY, [150, 700], [0, 1])
  const cafe2Scale = useTransform(scrollY, [150, 700], [shouldReduceMotion ? 1 : 1.06, 1])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden select-none" aria-hidden="true">
      
      {/* LAYER 1: cafe_2.png (Cozy Interior) - Persistent base */}
      <Motion.div
        style={{
          opacity: cafe2Opacity,
          scale: cafe2Scale,
        }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <img
          src="/cafe_2.png"
          alt="Cozy Pixel-Art Café Interior"
          className="pixel-crisp h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </Motion.div>

      {/* LAYER 2: cafe_1.png (Snowy Exterior) - Placed directly on top of cafe_2 */}
      <Motion.div
        style={{
          opacity: cafe1Opacity,
          scale: cafe1Scale,
        }}
        className="absolute inset-0 z-10 h-full w-full"
      >
        <img
          src="/cafe_1.png"
          alt="Snowy Pixel-Art Café Exterior"
          className="pixel-crisp h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Snow effect on exterior */}
        <Motion.div style={{ opacity: snowOpacity }} className="absolute inset-0">
          <SnowParticles />
        </Motion.div>
      </Motion.div>

      {/* Common subtle edge vignette for readability across both images */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-base/60 via-transparent to-base/80" />
    </div>
  )
}
