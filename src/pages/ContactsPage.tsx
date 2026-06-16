import { motion } from 'framer-motion'
import { getPortraitImageAttrs } from '@/utils/images'

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'
const CONTACT_PORTRAIT_SRC = '/contacts/portrait.png'
const portraitImageAttrs = getPortraitImageAttrs(CONTACT_PORTRAIT_SRC)
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
      className="relative flex-1 flex flex-col bg-cream-100 px-7 sm:px-9 md:px-16 lg:px-24 overflow-hidden"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100dvh - var(--header-height))',
      }}
    >
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col items-start justify-center
          pb-8 md:items-center md:justify-start md:pt-8 md:pb-0"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          className="mb-0 mt-0 md:mt-8 w-full min-w-0 md:text-center"
        >
          <p
            className="font-display font-light text-warm-dark leading-[1.15] tracking-[-0.025em] md:mx-auto"
            style={{ fontSize: 'clamp(1.25rem, 4.6vw, 2rem)' }}
          >
            <span className="block text-warm-dark/90 max-w-[20rem] sm:max-w-[22rem] md:max-w-2xl md:mx-auto">
              Снимаю так, чтобы вы
              <br />
              нравились себе даже если
              <br />
              <span
                className="whitespace-nowrap italic text-gold-deep font-normal"
                style={{ fontSize: 'clamp(1.375rem, 5.2vw, 2.25rem)' }}
              >
                «не умеете позировать»
              </span>
            </span>
          </p>

          <span
            className="flex items-center gap-2.5 mt-4 max-w-xs md:mx-auto"
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
          className="w-full mt-4 sm:mt-5 md:mt-6 md:w-auto md:max-w-md lg:max-w-lg md:mx-auto group relative flex shrink-0 cursor-pointer
            border border-cream-400/70 bg-cream-200/50 overflow-hidden
            px-6 py-6 sm:px-7 sm:py-7 md:px-10 md:py-10
            md:hover:bg-cream-100/80 md:transition-colors md:duration-500"
        >
          <span
            className="absolute top-0 left-0 w-5 h-5 md:w-7 md:h-7 border-l border-t border-gold/35 pointer-events-none"
            aria-hidden
          />
          <span
            className="absolute bottom-0 right-0 w-5 h-5 md:w-7 md:h-7 border-r border-b border-gold/35 pointer-events-none"
            aria-hidden
          />

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-3 md:gap-3.5">
              <span
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0
                  bg-gold/12 border border-gold/25
                  md:group-hover:border-gold/45 md:group-hover:bg-gold/18
                  md:transition-[background-color,border-color] md:duration-500"
              >
                <TelegramIcon className="w-4 h-4 md:w-[1.125rem] md:h-[1.125rem] text-gold" />
              </span>
              <div className="min-w-0">
                <span className="hidden md:block font-body text-[9px] md:text-2xs tracking-[0.28em] text-gold uppercase">
                  Telegram
                </span>
                <p
                  className="md:hidden font-display text-warm-dark leading-none tracking-[-0.03em]
                    md:group-hover:text-gold md:transition-colors md:duration-500"
                  style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)' }}
                >
                  @ketrin_maxim
                </p>
              </div>
            </div>

            <p
              className="hidden md:block mt-5 font-display text-warm-dark leading-[0.95] tracking-[-0.03em]
                md:group-hover:text-gold md:transition-colors md:duration-500"
              style={{ fontSize: 'clamp(1.6rem, 6.8vw, 2.35rem)' }}
            >
              @ketrin_maxim
            </p>

            <p className="mt-2.5 md:mt-4 font-body text-[11px] md:text-sm text-warm-medium leading-relaxed">
              <span className="block text-warm-muted text-[10px] md:text-xs tracking-wide">
                Напишите, обсудим дату, формат и детали
              </span>
            </p>
          </div>

          <div className="relative shrink-0 self-center pl-4 sm:pl-5 md:pl-6">
            <span
              className="absolute -inset-1.5 rounded-full bg-gold/10 blur-[3px] pointer-events-none"
              aria-hidden
            />
            <img
              {...portraitImageAttrs}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover object-[center_18%]
                border border-cream-400/90 ring-1 ring-gold/20
                md:group-hover:ring-gold/35 md:transition-[box-shadow] md:duration-500"
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
