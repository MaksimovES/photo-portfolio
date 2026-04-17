import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const quotes = [
  'Увидеть себя настоящего',
  'Почувствовать себя увереннее',
  'Запечатлеть важный этап в жизни',
  'Впервые оказаться на съёмке',
  'Обновить снимки для соцсетей',
  'Уделить время себе',
]

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'

function SplitText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            animate={isInView ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.06 * i }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

function QuoteRow({ text, index, isInView }: { text: string; index: number; isInView: boolean }) {
  return (
    <div className="relative">
      <div className="overflow-hidden py-4 md:py-5">
        <motion.div
          initial={{ y: '100%' }}
          animate={isInView ? { y: '0%' } : {}}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.18 + index * 0.08,
          }}
        >
          <p className="font-display text-lg md:text-2xl lg:text-[1.75rem] text-warm-dark/80 leading-snug tracking-[-0.01em]">
            <span className="text-gold/50 mr-3 md:mr-4 font-body text-sm md:text-base tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            {text}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="h-px bg-cream-300/70"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.12 + index * 0.08 }}
        style={{ originX: 0 }}
      />
    </div>
  )
}

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
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 2.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
      />
      Записаться
      <motion.span
        aria-hidden
        className="relative flex items-center w-5 h-px bg-current"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-current rotate-45" />
      </motion.span>
    </a>
  )
}

export default function ForWhom() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const closingRef = useRef<HTMLDivElement>(null)
  const closingInView = useInView(closingRef, { once: true, margin: '-20px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      id="forwhom"
      ref={ref}
      className="relative py-14 md:py-20 lg:py-24 px-6 md:px-10 lg:px-14 bg-cream-100 overflow-hidden min-h-0"
    >
      <motion.div
        className="absolute top-4 right-0 md:right-10 lg:right-20 font-display leading-none select-none pointer-events-none text-[200px] md:text-[320px] text-gold/[0.18]"
        style={{ y: decorY }}
        aria-hidden
      >
        ?
      </motion.div>

      <div className="max-w-screen-xl mx-auto relative">
        <motion.p
          className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold/45 mb-4 md:mb-5"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        >
          Для кого
        </motion.p>

        <SplitText className="font-display text-[1.75rem] md:text-display-sm lg:text-display-md text-warm-dark leading-[1.1]">
          Если ваш запрос звучит как
        </SplitText>

        <div className="mt-8 md:mt-10 lg:mt-12">
          {quotes.map((quote, i) => (
            <QuoteRow key={i} text={quote} index={i} isInView={isInView} />
          ))}
        </div>

        <div ref={closingRef} className="mt-8 md:mt-10">
          <div className="flex flex-col items-start gap-5 md:gap-6">
            <div className="overflow-hidden">
              <motion.p
                className="font-display italic text-[1.65rem] md:text-display-sm text-gold leading-tight"
                initial={{ y: '100%', opacity: 0 }}
                animate={closingInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                — тогда вам ко мне
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={closingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.25 }}
            >
              <BookButton />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
