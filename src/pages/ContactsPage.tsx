import { motion } from 'framer-motion'
import Typography from '../components/Typography'

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'
const EASE = [0.2, 0, 0, 1] as const

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export default function ContactsPage() {
  return (
    <section
      className="relative flex-1 flex flex-col justify-center bg-cream-100 px-7 sm:px-9 md:px-16 lg:px-24 overflow-hidden"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100dvh - var(--header-height))',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <span className="absolute top-[18%] -left-[6%] font-display text-[clamp(6rem,22vw,14rem)] leading-none tracking-[-0.06em] text-cream-300/60">
          59°
        </span>
        <span className="absolute bottom-[14%] -right-[4%] font-body text-2xs tracking-[0.35em] text-cream-400/50 uppercase rotate-90 origin-bottom-right">
          N 30°19′
        </span>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-10 md:mb-14">
          <Typography variant="label" className="text-gold tracking-[0.32em]">
            Связь
          </Typography>
          <h1
            className="mt-4 font-display font-light text-warm-dark leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 4.5rem)' }}
          >
            Напишите
            <br />
            <span className="text-warm-muted">в Telegram</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16 lg:gap-24">
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram @ketrin_maxim, откроется в новой вкладке"
            variants={fadeUp}
            className="group relative block w-full max-w-[min(100%,22rem)] sm:max-w-sm shrink-0 cursor-pointer
              border border-cream-400/70 bg-cream-200/50 overflow-hidden
              px-8 sm:px-10 py-9 sm:py-11
              md:hover:bg-cream-100/80 md:transition-colors md:duration-500"
          >
            <span
              className="absolute top-0 left-0 w-8 h-8 border-l border-t border-gold/35 pointer-events-none"
              aria-hidden
            />
            <span
              className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/35 pointer-events-none"
              aria-hidden
            />

            <div className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0
                  bg-gold/12 border border-gold/25
                  md:group-hover:border-gold/45 md:group-hover:bg-gold/18
                  md:transition-[background-color,border-color] md:duration-500"
              >
                <TelegramIcon className="w-5 h-5 text-gold" />
              </span>
              <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
                Telegram
              </span>
            </div>

            <p
              className="mt-8 sm:mt-10 font-display text-warm-dark leading-[0.95] tracking-[-0.03em]
                md:group-hover:text-gold md:transition-colors md:duration-500"
              style={{ fontSize: 'clamp(1.85rem, 8vw, 2.75rem)' }}
            >
              @ketrin_maxim
            </p>

            <p className="mt-5 font-body text-sm text-warm-medium leading-relaxed">
              Отвечаю в течение дня.
              <span className="block mt-1 text-warm-muted text-xs tracking-wide">
                Нажмите, чтобы открыть чат
              </span>
            </p>
          </motion.a>

          <motion.div
            variants={fadeUp}
            className="md:pb-3 md:text-right md:max-w-[min(100%,18rem)]"
          >
            <span
              className="block w-10 h-px bg-gold/30 mb-6 md:ml-auto"
              aria-hidden
            />
            <p
              className="font-display text-warm-dark leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(1.75rem, 5.5vw, 3.25rem)' }}
            >
              Санкт-
              <br />
              Петербург
            </p>
            <p className="mt-4 font-body text-2xs tracking-[0.28em] text-warm-muted uppercase">
              Россия
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
