import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const QUOTES = [
  'увидеть себя настоящего',
  'почувствовать себя увереннее',
  'запечатлеть важный этап в жизни',
  'впервые оказаться на съёмке',
  'обновить снимки для соцсетей',
  'уделить время себе.',
]

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'

function BookButton() {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative inline-flex items-center gap-3 md:gap-4
        font-body text-2xs md:text-xs uppercase tracking-[0.28em]
        border border-gold text-gold
        px-5 py-2.5 md:px-8 md:py-4
        md:hover:bg-gold md:hover:text-cream-100
        md:transition-colors md:duration-300
        whitespace-nowrap overflow-hidden
      "
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
      />
      Записаться
      <motion.span
        aria-hidden
        className="relative flex items-center w-4 md:w-5 h-px bg-current"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-current rotate-45" />
      </motion.span>
    </a>
  )
}

export function StudioForWhom() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} className="w-full max-w-lg md:max-w-2xl mx-auto text-left mt-4 md:mt-10">
      <motion.p
        className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gold/45 mb-2 md:mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      >
        Для кого
      </motion.p>

      <motion.p
        className="font-display text-[0.9375rem] sm:text-lg md:text-xl text-warm-dark/85 leading-relaxed tracking-[-0.01em]"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <span className="text-warm-dark">Чаще всего ко мне обращаются, когда хочется: </span>
        {QUOTES.map((quote, i) => (
          <span key={quote}>
            {i > 0 && (i === QUOTES.length - 1 ? ' или ' : ', ')}
            <span className="text-warm-medium">{quote}</span>
          </span>
        ))}
      </motion.p>

      <motion.div
        className="mt-4 md:mt-5 flex justify-center md:justify-start"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
      >
        <BookButton />
      </motion.div>
    </div>
  )
}
