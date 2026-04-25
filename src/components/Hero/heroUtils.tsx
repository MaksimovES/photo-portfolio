import { motion, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

// ─── Animated Counter ────────────────────────────────────────────────────────
export function AnimatedCounter({
  to,
  isVisible,
  delay = 0,
}: {
  to: number
  isVisible: boolean
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0, 0, 1],
      delay,
      onUpdate(v) {
        if (ref.current) ref.current.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [isVisible, to, delay])

  return <span ref={ref}>0</span>
}

// ─── Kinetic Heading ─────────────────────────────────────────────────────────
export function KineticHeading({
  text,
  isVisible,
  delay = 0,
  className,
}: {
  text: string
  isVisible: boolean
  delay?: number
  className?: string
}) {
  const words = text.split(' ')
  let charOffset = 0

  return (
    <span className={`inline${className ? ` ${className}` : ''}`}>
      {words.map((word, wi) => {
        const wordStart = charOffset
        charOffset += word.length + 1
        return (
          <span key={wi}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 14 }}
                  animate={
                    isVisible
                      ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                      : { opacity: 0, filter: 'blur(10px)', y: 14 }
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.2, 0, 0, 1],
                    delay: delay + (wordStart + ci) * 0.027,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 && ' '}
          </span>
        )
      })}
    </span>
  )
}

// ─── Counters Data ────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const counters = [
  { to: 127, label: 'историй снято' },
  { to: 8,   label: 'лет в профессии' },
  { to: 4,   label: 'направления' },
]
