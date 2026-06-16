import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useIsDesktop'

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'
const nbsp = '\u00A0'
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function WriteCta() {
  const isDesktop = useIsDesktop()

  return (
    <motion.a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 border border-gold/50 rounded-sm overflow-hidden shrink-0"
      whileHover={isDesktop ? { scale: 1.02 } : undefined}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 bg-gold/10"
        initial={{ x: '-100%' }}
        whileHover={isDesktop ? { x: 0 } : undefined}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      />
      <svg
        className="w-4 h-4 text-gold relative z-10 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
      <span className="font-body text-xs tracking-[0.18em] uppercase text-gold relative z-10">
        Написать
      </span>
    </motion.a>
  )
}

export function TheatreTerms() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section lang="ru" className="pb-16 md:pb-24 px-6 md:px-14">
      <motion.div
        ref={ref}
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="border border-gold/20 bg-cream-200/40 rounded-sm px-6 py-8 md:px-12 md:py-10">
          <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
            <motion.p
              className="font-body text-[0.9375rem] sm:text-base md:text-lg leading-[1.65] text-pretty text-warm-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            >
              Условия и{nbsp}детали съёмки обговариваются индивидуально
            </motion.p>

            <motion.div
              className="w-full sm:w-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
            >
              <WriteCta />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
