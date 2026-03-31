import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  '«Хочу увидеть себя настоящего»',
  '«Хочу почувствовать себя уверенее»',
  '«Хочу запечатлеть важный этап в жизни»',
  '«Ни разу не был(а) на съёмке, хочу попробовать»',
  '«Нужны новые снимки для соцсетей»',
  '«Хочу уделить время себе»',
]

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'

function BookButton() {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative inline-flex items-center gap-4
        font-body text-xs uppercase tracking-[0.28em]
        border border-gold text-gold
        px-8 py-4
        md:hover:bg-gold md:hover:text-cream-100
        md:transition-colors md:duration-300
        whitespace-nowrap overflow-hidden
      "
    >
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        animate={{ x: ['-120%', '220%'] }}
        transition={{
          duration: 2.1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2.2,
        }}
      />

      Записаться

      {/* Arrow nudge */}
      <motion.span
        aria-hidden
        className="relative flex items-center w-5 h-px bg-current"
        animate={{ x: [0, 5, 0] }}
        transition={{
          duration: 0.9,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2.2,
        }}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-current rotate-45" />
      </motion.span>
    </a>
  )
}

export default function ForWhom() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const closingDelay = 0.2 + quotes.length * 0.1 + 0.2

  return (
    <section
      id="forwhom"
      ref={ref}
      className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-14 bg-cream-100 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-4 lg:gap-20 items-start">

          {/* ── LEFT: heading + line + (desktop) closing & button ── */}
          <div>
            <motion.h2
              className="font-display text-display-sm md:text-display-md text-warm-dark"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
            >
              Если ваш запрос звучит как:
            </motion.h2>

            {/* Animated gold rule */}
            <motion.div
              className="mt-8 h-px bg-gold origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.2, 0, 0, 1], delay: 0.35 }}
            />

            {/* Desktop closing + button */}
            <motion.div
              className="hidden lg:flex flex-col items-start gap-8 mt-14"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: closingDelay }}
            >
              <p className="font-display italic text-display-sm text-gold leading-tight whitespace-nowrap">
                — тогда вам ко мне!
              </p>
              <BookButton />
            </motion.div>
          </div>

          {/* ── RIGHT: decorative mark + numbered quotes ── */}
          <div className="relative">

            {/* Big decorative « — desktop only */}
            <div
              className="hidden lg:block absolute -top-4 -left-3 font-display leading-none select-none pointer-events-none
                text-[200px] text-gold/[0.08]"
              aria-hidden
            >
              «
            </div>

            {/* Quotes */}
            <div className="relative">
              {quotes.map((quote, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 72, y: 6 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2 + i * 0.1,
                  }}
                  className="border-t border-cream-400 py-5 md:py-6 flex items-baseline gap-5"
                >
                  <span className="flex-shrink-0 font-body text-[10px] uppercase tracking-[0.2em] text-gold/50 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-base md:text-xl text-warm-dark leading-snug">
                    {quote}
                  </p>
                </motion.div>
              ))}
              <div className="border-t border-cream-400" />
            </div>
          </div>
        </div>

        {/* Mobile closing + button (below quotes) */}
        <motion.div
          className="lg:hidden mt-12 flex flex-col items-start gap-7"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: closingDelay }}
        >
          <p className="font-display italic text-[1.75rem] md:text-display-sm text-gold whitespace-nowrap">
            — тогда вам ко мне!
          </p>
          <BookButton />
        </motion.div>

      </div>
    </section>
  )
}
