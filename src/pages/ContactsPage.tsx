import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useIsDesktop } from '../hooks/useIsDesktop'

const EASE = [0.2, 0, 0, 1] as const

const mobileFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: EASE },
  }),
}

const desktopFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: EASE },
  }),
}

const TELEGRAM_BASE = 'https://t.me/ketrin_maxim'

const BOOKING_TEMPLATES = [
  {
    label: 'Студийная съёмка',
    message:
      'Здравствуйте! Хочу записаться на студийную съёмку.',
  },
  {
    label: 'Фотопрогулка',
    message:
      'Здравствуйте! Интересует фотопрогулка.',
  },
  {
    label: 'Театральная съёмка',
    message:
      'Здравствуйте! Интересует театральная съёмка.',
  },
  {
    label: 'Семейная прогулка',
    message: 'Здравствуйте! Интересует семейная прогулка.',
  },
] as const

function telegramUrl(message?: string) {
  if (!message) return TELEGRAM_BASE
  return `${TELEGRAM_BASE}?text=${encodeURIComponent(message)}`
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

function DesktopBookingRow({
  index,
  label,
  message,
  inView,
}: {
  index: number
  label: string
  message: string
  inView: boolean
}) {
  const isDesktop = useIsDesktop()
  const number = String(index).padStart(2, '0')

  return (
    <motion.a
      href={telegramUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, откроется Telegram`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="group relative flex items-center gap-6 lg:gap-10 py-7 lg:py-9 border-b border-cream-400/60 last:border-b-0 cursor-pointer"
      whileHover={isDesktop ? { x: 6 } : undefined}
    >
      <span className="font-display text-gold text-base lg:text-lg leading-none tabular-nums flex-shrink-0 pt-0.5">
        {number}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display text-warm-dark text-xl lg:text-2xl uppercase tracking-wider leading-none md:group-hover:text-gold md:transition-colors md:duration-300">
          {label}
        </span>
        <span className="mt-2 block font-body text-2xs tracking-[0.22em] uppercase text-warm-muted md:group-hover:text-gold/70 md:transition-colors md:duration-300">
          Написать в Telegram
        </span>
      </span>
      <span className="relative flex items-center w-8 lg:w-10 h-px bg-gold/30 md:group-hover:bg-gold md:transition-colors md:duration-300 flex-shrink-0">
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-gold/40 md:group-hover:border-gold rotate-45 md:transition-colors md:duration-300" />
      </span>
    </motion.a>
  )
}

function DesktopSocialTelegramCard({ inView }: { inView: boolean }) {
  const isDesktop = useIsDesktop()

  return (
    <motion.a
      href={telegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram @ketrin_maxim, откроется в новой вкладке"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
      className="group relative flex flex-col justify-between min-h-[280px] lg:min-h-[320px]
        px-10 lg:px-12 py-10 lg:py-12 bg-cream-100/90
        md:hover:bg-cream-50 md:transition-colors md:duration-500 cursor-pointer"
      whileHover={isDesktop ? { x: 4 } : undefined}
    >
      <motion.span
        className="absolute inset-y-0 left-0 w-px bg-gold/0 md:group-hover:bg-gold/50 md:transition-colors md:duration-500"
        aria-hidden
      />

      <div>
        <div className="flex items-center gap-3">
          <span
            className="flex items-center justify-center w-11 h-11 rounded-full
              bg-gold/12 border border-gold/25 md:group-hover:border-gold/45
              md:group-hover:bg-gold/18 md:transition-[background-color,border-color] md:duration-500"
          >
            <TelegramIcon className="w-5 h-5 text-gold" />
          </span>
          <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
            Telegram
          </span>
        </div>

        <p
          className="mt-8 lg:mt-10 font-display text-warm-dark leading-[0.95] tracking-[-0.03em]
            md:group-hover:text-gold md:transition-colors md:duration-500"
          style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
        >
          @ketrin_maxim
        </p>
      </div>

      <div className="mt-10 flex items-end justify-between gap-6">
        <div>
          <span className="block font-body text-2xs tracking-[0.22em] uppercase text-warm-muted">
            Написать в Telegram
          </span>
          <span className="mt-2 block font-body text-sm text-warm-medium">
            Ответ в течение дня
          </span>
        </div>

        <span
          className="relative flex items-center w-10 lg:w-12 h-px bg-gold/30
            md:group-hover:bg-gold md:group-hover:w-14
            md:transition-all md:duration-500 flex-shrink-0"
        >
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px]
              border-r border-t border-gold/40 md:group-hover:border-gold rotate-45
              md:transition-colors md:duration-500"
          />
        </span>
      </div>
    </motion.a>
  )
}

function DesktopContactsLayout() {
  const ref = useRef<HTMLElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const bookingInView = useInView(bookingRef, { once: true, margin: '-80px' })
  const socialInView = useInView(socialRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex-1 bg-cream-100 relative overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <motion.div
        className="absolute top-4 right-0 lg:right-10 xl:right-16 font-display leading-none select-none pointer-events-none text-[280px] lg:text-[360px] text-gold/[0.18]"
        style={{ y: decorY }}
        aria-hidden
      >
        @
      </motion.div>

      {/* Hero + booking split */}
      <div className="px-10 lg:px-14 pt-16 lg:pt-24 pb-20 lg:pb-28">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 xl:gap-32">
            {/* Intro column */}
            <div className="max-w-md lg:max-w-none">
              <motion.div
                custom={0}
                variants={desktopFadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 mb-10 lg:mb-14"
              >
                <span className="block h-px w-8 bg-gold flex-shrink-0" />
                <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
                  Связаться
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={desktopFadeUp}
                initial="hidden"
                animate="visible"
                className="font-display font-light text-warm-dark leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)' }}
              >
                Давайте
                <br />
                <span className="italic text-gold">поговорим</span>
              </motion.h1>

              <motion.div
                custom={2}
                variants={desktopFadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 lg:mt-8 flex items-center gap-3"
              >
                <span className="block h-px w-6 bg-warm-medium/40" />
                <span className="font-body text-2xs tracking-[0.28em] text-warm-medium uppercase">
                  Санкт-Петербург · Telegram
                </span>
              </motion.div>

              <motion.p
                custom={3}
                variants={desktopFadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 lg:mt-10 font-body text-warm-medium text-base lg:text-lg leading-relaxed"
              >
                Буду рада обсудить вашу съёмку, ответить на вопросы или просто
                пообщаться. Напишите — и мы вместе создадим кадры, которые
                останутся с вами навсегда.
              </motion.p>

              <motion.p
                custom={4}
                variants={desktopFadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 font-display italic text-warm-dark/80 leading-[1.35] text-lg lg:text-xl"
              >
                Выберите направление — текст уже готов.
              </motion.p>
            </div>

            {/* Booking column */}
            <div ref={bookingRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={bookingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE }}
                className="mb-8 lg:mb-10"
              >
                <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
                  Запись на съёмку
                </span>
                <h2
                  className="mt-4 font-display text-warm-dark leading-[1.05] tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
                >
                  Четыре способа начать разговор
                </h2>
              </motion.div>

              <div className="border-t border-cream-400/60">
                {BOOKING_TEMPLATES.map(({ label, message }, i) => (
                  <DesktopBookingRow
                    key={label}
                    index={i + 1}
                    label={label}
                    message={message}
                    inView={bookingInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social band */}
      <div ref={socialRef} className="px-10 lg:px-14 py-24 lg:py-32 bg-cream-100">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative border border-cream-400/70 bg-cream-200/50 overflow-hidden"
          >
            <span
              className="absolute top-0 left-0 w-10 h-10 border-l border-t border-gold/35 pointer-events-none"
              aria-hidden
            />
            <span
              className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-gold/35 pointer-events-none"
              aria-hidden
            />

            <div className="grid lg:grid-cols-[minmax(0,1fr)_1px_minmax(300px,420px)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={socialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
                className="px-10 lg:px-14 xl:px-16 py-12 lg:py-16 xl:py-20"
              >
                <div className="flex items-center gap-3 mb-8 lg:mb-10">
                  <span className="block h-px w-8 bg-gold flex-shrink-0" />
                  <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
                    Соцсети
                  </span>
                </div>

                <h2
                  className="font-display font-light text-warm-dark leading-[1.02] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 3.4vw, 3.25rem)' }}
                >
                  Или напишите
                  <br />
                  напрямую
                  <br />
                  <span className="italic text-gold">— без шаблона</span>
                </h2>

                <p className="mt-8 lg:mt-10 font-body text-warm-medium text-base lg:text-lg leading-relaxed max-w-md">
                  Telegram — самый быстрый способ связаться. Отвечаю лично, обычно
                  в течение дня.
                </p>

                <div className="mt-8 lg:mt-10 flex items-center gap-3">
                  <span className="block h-px w-6 bg-warm-medium/35" />
                  <span className="font-body text-2xs tracking-[0.24em] text-warm-muted uppercase">
                    Личный аккаунт · Санкт-Петербург
                  </span>
                </div>
              </motion.div>

              <div className="hidden lg:block bg-cream-400/45" aria-hidden />

              <DesktopSocialTelegramCard inView={socialInView} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MobileBookingRow({
  index,
  label,
  message,
  inView,
}: {
  index: number
  label: string
  message: string
  inView: boolean
}) {
  const number = String(index).padStart(2, '0')

  return (
    <motion.a
      href={telegramUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, откроется Telegram`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="group relative flex items-center gap-4 py-4 border-b border-cream-400/60 last:border-b-0 cursor-pointer min-h-[44px]"
    >
      <span className="font-display text-gold text-sm tabular-nums flex-shrink-0 pt-0.5">
        {number}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display text-warm-dark text-lg uppercase tracking-wider leading-none">
          {label}
        </span>
      </span>
      <span className="relative flex items-center w-6 h-px bg-gold/30 flex-shrink-0">
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-gold/40 rotate-45" />
      </span>
    </motion.a>
  )
}

function MobileSocialTelegramLink({ inView }: { inView: boolean }) {
  return (
    <motion.a
      href={telegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram @ketrin_maxim, откроется в новой вкладке"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 ml-auto"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold/12 border border-gold/20 flex-shrink-0">
        <TelegramIcon className="w-3.5 h-3.5 text-gold" />
      </span>
      <span className="font-display text-warm-dark text-sm tracking-[-0.02em]">@ketrin_maxim</span>
    </motion.a>
  )
}

function MobileContactsLayout() {
  const bookingRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  const bookingInView = useInView(bookingRef, { once: true, margin: '-60px' })
  const socialInView = useInView(socialRef, { once: true, margin: '-60px' })

  return (
    <section
      className="flex-1 bg-cream-100 relative overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <div
        className="absolute top-6 right-3 font-display leading-none select-none pointer-events-none text-[100px] text-gold/[0.14]"
        aria-hidden
      >
        @
      </div>

      {/* Hero + booking */}
      <div className="px-7 sm:px-9 pt-9 pb-10">
        <motion.div
          custom={0}
          variants={mobileFadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3"
        >
          <span className="block h-px w-8 bg-gold flex-shrink-0" />
          <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">Связаться</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={mobileFadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 font-display font-light text-warm-dark leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.1rem, 9vw, 3rem)' }}
        >
          Давайте
          <br />
          <span className="italic text-gold">поговорим</span>
        </motion.h1>

        <motion.div
          custom={2}
          variants={mobileFadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 flex items-center gap-3"
        >
          <span className="block h-px w-6 bg-warm-medium/40" />
          <span className="font-body text-2xs tracking-[0.22em] text-warm-medium uppercase">
            Санкт-Петербург · Telegram
          </span>
        </motion.div>

        <motion.p
          custom={3}
          variants={mobileFadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 font-body text-warm-medium text-sm leading-relaxed"
        >
          С радостью обсудим съёмку — напишите в Telegram.
          <span className="mt-1 block font-display italic text-warm-dark/80">
            Направление ниже — текст уже готов.
          </span>
        </motion.p>

        <div ref={bookingRef} className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={bookingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="font-body text-2xs tracking-[0.24em] text-gold uppercase">
              Запись на съёмку
            </span>
            <h2
              className="mt-3 font-display text-warm-dark leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.25rem, 5vw, 1.6rem)' }}
            >
              Четыре направления
            </h2>
          </motion.div>

          <div className="mt-5 border-t border-cream-400/60">
            {BOOKING_TEMPLATES.map(({ label, message }, i) => (
              <MobileBookingRow
                key={label}
                index={i + 1}
                label={label}
                message={message}
                inView={bookingInView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Social */}
      <div ref={socialRef} className="px-7 sm:px-9 py-10 bg-cream-200 border-t border-cream-400/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={socialInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative border border-cream-400/70 bg-cream-100/80 overflow-hidden p-5"
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
            <span className="block h-px w-8 bg-gold flex-shrink-0" />
            <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">Соцсети</span>
          </div>

          <h2
            className="mt-5 font-display font-light text-warm-dark leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(1.35rem, 6vw, 1.85rem)' }}
          >
            Напишите напрямую
            <br />
            <span className="italic text-gold">— без шаблона</span>
          </h2>

          <p className="mt-4 font-body text-warm-medium text-sm leading-relaxed">
            Отвечаю лично, обычно в течение дня.
          </p>

          <div className="mt-5 flex justify-end">
            <MobileSocialTelegramLink inView={socialInView} />
          </div>
        </motion.div>
      </div>

      <div className="h-8" aria-hidden />
    </section>
  )
}

export default function ContactsPage() {
  return (
    <>
      <div className="md:hidden">
        <MobileContactsLayout />
      </div>
      <div className="hidden md:block">
        <DesktopContactsLayout />
      </div>
    </>
  )
}
