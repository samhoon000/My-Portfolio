import { motion as Motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function CafeBackground() {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  // Transition range: 150px -> 700px scroll distance for a smooth, natural pacing
  // cafe_1 (Exterior) fades from 1 -> 0 with a gentle zoom towards entrance
  const cafe1Opacity = useTransform(scrollY, [150, 700], [1, 0])
  const cafe1Scale = useTransform(scrollY, [0, 700], [1, shouldReduceMotion ? 1 : 1.14])
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
          alt="Cozy pixel-art portfolio workspace interior"
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
          alt="Snowy pixel-art portfolio entrance"
          className="pixel-crisp h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </Motion.div>

      {/* Common subtle edge vignette for readability across both images */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-base/60 via-transparent to-base/80" />
    </div>
  )
}
