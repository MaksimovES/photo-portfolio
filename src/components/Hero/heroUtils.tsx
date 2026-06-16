import { motion, animate } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

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
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
                  animate={
                    isVisible
                      ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                      : { opacity: 0, filter: 'blur(8px)', y: 12 }
                  }
                  transition={{
                    duration: 0.55,
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

// ─── Hero Eyebrow ────────────────────────────────────────────────────────────
export function HeroEyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-6 md:w-8 bg-gold flex-shrink-0" aria-hidden />
      <span className="font-body text-2xs tracking-[0.28em] text-warm-muted uppercase">
        {children}
      </span>
    </div>
  )
}

// ─── Hero Lead ───────────────────────────────────────────────────────────────
export function HeroLead({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`font-body text-warm-dark text-sm md:text-base leading-snug md:leading-relaxed
        border-l-2 border-gold/45 pl-3.5 md:pl-4
        [text-shadow:none] ${className}`}
    >
      {children}
    </p>
  )
}

// ─── Philosophy Title ────────────────────────────────────────────────────────
export function PhilosophyTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="block h-px w-8 bg-gold/55 flex-shrink-0" aria-hidden />
      <span
        className="font-display text-warm-dark text-[0.8125rem] md:text-base
          leading-snug tracking-[0.01em]"
      >
        {children}
      </span>
    </div>
  )
}

// ─── Philosophy Body ─────────────────────────────────────────────────────────
export function PhilosophyBody({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`font-body text-warm-medium text-xs md:text-[0.9375rem]
        leading-snug md:leading-relaxed pl-11 ${className}`}
    >
      {children}
    </p>
  )
}

/** @deprecated Use HeroEyebrow — kept for barrel compatibility */
export function DashLabel({ children }: { children: string }) {
  return <HeroEyebrow>{children}</HeroEyebrow>
}

// ─── Philosophy Blocks Data ──────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export const philosophyBlocks = [
  {
    title: 'Естественность и искренность',
    textMobile: 'Импровизирую от настроения, музыки и момента — без постановки.',
    textDesktop:
      'Не люблю постановочные кадры — импровизирую от вашего настроения, музыки и момента.',
  },
  {
    title: 'Комфорт и бережность',
    textMobile:
      'С психологическим образованием создаю атмосферу, где можно расслабиться и быть собой.',
    textDesktop: (
      <>
        Благодаря образованию в психологии создаю атмосферу, в которой вы расслабляетесь
        <span className="block">и остаётесь собой.</span>
      </>
    ),
  },
  {
    title: 'Живые эмоции',
    textMobile: 'Не прошу позировать — даю задания, раскрывающие естественность и движение.',
    textDesktop: (
      <>
        Не прошу позировать — даю небольшие задания, которые раскрывают естественность
        <span className="block">и органичное движение.</span>
      </>
    ),
  },
]
