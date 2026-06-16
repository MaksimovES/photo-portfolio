import { motion } from 'framer-motion'

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
      className="relative flex-1 flex flex-col justify-start bg-cream-100 px-7 sm:px-9 md:px-16 lg:px-24 overflow-hidden"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100dvh - var(--header-height))',
      }}
    >
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto pt-5 sm:pt-6 md:pt-10"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-6 md:mb-8">
          <p
            className="font-display font-light text-warm-dark leading-[1.12] tracking-[-0.025em] max-w-xl md:max-w-2xl"
            style={{ fontSize: 'clamp(1.25rem, 4.6vw, 2rem)' }}
          >
            <span className="block text-warm-dark/90">
              Снимаю так, чтобы вы
              <span className="md:hidden">
                <br />
                нравились себе
                <br />
                даже если
              </span>
              <span className="hidden md:inline"> нравились себе даже если </span>
            </span>
            <span
              className="block mt-1.5 md:mt-0 md:inline italic text-gold-deep font-normal"
              style={{ fontSize: 'clamp(1.375rem, 5.2vw, 2.25rem)' }}
            >
              «не умеете позировать»
            </span>
          </p>

          <span
            className="flex items-center gap-2.5 mt-6 md:mt-7 max-w-xs"
            aria-hidden
          >
            <span className="block h-px w-8 bg-gold/50 shrink-0" />
            <span className="block h-1 w-1 rounded-full bg-gold/45 shrink-0" />
            <span className="block h-px flex-1 bg-gold/20" />
          </span>
        </motion.div>

        <motion.a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram @ketrin_maxim, откроется в новой вкладке"
          variants={fadeUp}
          className="group relative flex flex-col w-full max-w-[min(100%,22rem)] sm:max-w-sm shrink-0 cursor-pointer mb-8 md:mb-10
            border border-cream-400/70 bg-cream-200/50 overflow-hidden
            px-5 py-4 sm:px-8 sm:py-7 md:px-10 md:py-11
            md:hover:bg-cream-100/80 md:transition-colors md:duration-500"
        >
          <span
            className="absolute top-0 left-0 w-5 h-5 md:w-8 md:h-8 border-l border-t border-gold/35 pointer-events-none"
            aria-hidden
          />
          <span
            className="absolute bottom-0 right-0 w-5 h-5 md:w-8 md:h-8 border-r border-b border-gold/35 pointer-events-none"
            aria-hidden
          />

          <div className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full flex-shrink-0
                bg-gold/12 border border-gold/25
                md:group-hover:border-gold/45 md:group-hover:bg-gold/18
                md:transition-[background-color,border-color] md:duration-500"
            >
              <TelegramIcon className="w-4 h-4 md:w-5 md:h-5 text-gold" />
            </span>
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <span className="block font-body text-[9px] md:text-2xs tracking-[0.28em] text-gold uppercase">
                  Telegram
                </span>
                <p
                  className="mt-0.5 md:hidden font-display text-warm-dark leading-none tracking-[-0.03em] truncate
                    md:group-hover:text-gold md:transition-colors md:duration-500"
                  style={{ fontSize: 'clamp(1.125rem, 5vw, 1.375rem)' }}
                >
                  @ketrin_maxim
                </p>
              </div>
              <span
                className="font-body text-gold/60 text-sm shrink-0 md:hidden"
                aria-hidden
              >
                →
              </span>
            </div>
          </div>

          <p
            className="hidden md:block mt-8 sm:mt-10 font-display text-warm-dark leading-[0.95] tracking-[-0.03em]
              md:group-hover:text-gold md:transition-colors md:duration-500"
            style={{ fontSize: 'clamp(1.85rem, 8vw, 2.75rem)' }}
          >
            @ketrin_maxim
          </p>

          <p className="mt-2.5 md:mt-5 font-body text-xs md:text-sm text-warm-medium leading-relaxed">
            <span className="block mt-0.5 md:mt-1 text-warm-muted text-[10px] md:text-xs tracking-wide">
              Напишите, обсудим дату, формат и детали.
            </span>
          </p>
        </motion.a>

      </motion.div>
    </section>
  )
}
