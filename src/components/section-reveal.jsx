import { motion as Motion, useReducedMotion } from 'framer-motion'

export function SectionReveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <Motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Motion.div>
  )
}
