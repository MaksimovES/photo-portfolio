import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Typography from '../components/Typography'
import { useIsDesktop } from '../hooks/useIsDesktop'

const EASE = [0.2, 0, 0, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: EASE },
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
      'Здравствуйте! Хочу записаться на студийную съёмку. Подскажите, пожалуйста, свободные даты.',
  },
  {
    label: 'Семейная прогулка',
    message: 'Здравствуйте! Интересует семейная прогулка. Подскажите, пожалуйста, свободные даты.',
  },
  {
    label: 'Театральная съёмка',
    message: 'Здравствуйте! Интересует театральная съёмка. МПодскажите, пожалуйста, свободные даты.',
  },
] as const

function telegramUrl(message?: string) {
  if (!message) return TELEGRAM_BASE
  return `${TELEGRAM_BASE}?text=${encodeURIComponent(message)}`
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <span className="h-px w-16 bg-gold/30" />
      <span className="font-body text-2xs text-gold/60 tracking-[0.25em] uppercase">
        {label}
      </span>
      <span className="h-px w-16 bg-gold/30" />
    </div>
  )
}

const TELEGRAM_SUBLABEL = '→ Telegram'

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

function ContactTelegramButton({
  href,
  label,
  sublabel = TELEGRAM_SUBLABEL,
  uniformSize = false,
}: {
  href: string
  label: string
  sublabel?: string
  uniformSize?: boolean
}) {
  const isDesktop = useIsDesktop()

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, откроется Telegram`}
      className={[
        'group relative flex items-center justify-center gap-3',
        'px-6 py-4 border border-gold/30 md:hover:border-gold/50',
        'rounded-sm overflow-hidden cursor-pointer',
        uniformSize
          ? 'w-full min-h-[4.5rem]'
          : 'w-full sm:w-auto sm:min-w-[220px] min-h-[4.5rem]',
      ].join(' ')}
      whileHover={isDesktop ? { scale: 1.02 } : undefined}
      whileTap={isDesktop ? { scale: 0.98 } : undefined}
    >
      <motion.span
        className="absolute inset-0 bg-gold/10"
        initial={{ x: '-100%' }}
        whileHover={isDesktop ? { x: 0 } : undefined}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <TelegramIcon className="w-5 h-5 text-gold relative z-10 shrink-0" />
      <span className="relative z-10 flex flex-col items-start gap-0.5 text-left">
        <span className="font-body text-sm tracking-[0.12em] uppercase text-gold leading-tight">
          {label}
        </span>
        <span className="font-body text-2xs tracking-[0.1em] uppercase text-gold/55 leading-tight">
          {sublabel}
        </span>
      </span>
    </motion.a>
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

function DesktopSocialTelegramLink() {
  const isDesktop = useIsDesktop()

  return (
    <motion.a
      href={telegramUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram @ketrin_maxim, откроется в новой вкладке"
      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full
        bg-cream-100 border border-gold/25 text-warm-dark shadow-warm-sm
        md:hover:border-gold/45 md:hover:bg-cream-50 md:hover:shadow-warm
        md:transition-[background-color,border-color,box-shadow] md:duration-300"
      whileHover={isDesktop ? { scale: 1.03 } : undefined}
      whileTap={isDesktop ? { scale: 0.98 } : undefined}
    >
      <TelegramIcon className="w-5 h-5 text-gold shrink-0" />
      <span className="font-body text-sm text-warm-dark tracking-wide">
        @ketrin_maxim
      </span>
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
                  Три способа начать разговор
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
      <div
        ref={socialRef}
        className="px-10 lg:px-14 py-20 lg:py-28 bg-cream-200 border-y border-cream-400/60"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
                Соцсети
              </span>
              <p
                className="mt-5 font-display text-warm-dark leading-[1.2] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}
              >
                Или напишите напрямую —{' '}
                <span className="italic text-gold">без шаблона</span>
              </p>
              <p className="mt-5 font-body text-warm-medium text-base lg:text-lg leading-relaxed max-w-md">
                Telegram — самый быстрый способ связаться. Отвечаю лично, обычно
                в течение дня.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="flex lg:justify-end"
            >
              <DesktopSocialTelegramLink />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileContactsLayout() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-20 pb-32 sm:pb-16 relative overflow-hidden">
      <div className="text-center space-y-6 sm:space-y-8 max-w-2xl w-full">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="label" className="text-gold tracking-[0.3em]">
            Связаться
          </Typography>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="h1" className="text-warm-dark">
            Контакты
          </Typography>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="body" className="text-warm-medium leading-relaxed text-sm sm:text-base px-1 sm:px-0">
            Буду рада обсудить Вашу съёмку, ответить на вопросы
            или просто пообщаться.{' '}
            <br className="hidden sm:block" />
            Напишите мне — и мы вместе создадим
            кадры, которые останутся с вами навсегда.
          </Typography>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <SectionDivider label="Запись на съёмку" />
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-3 pt-4 w-full max-w-[320px] mx-auto"
        >
          {BOOKING_TEMPLATES.map(({ label, message }) => (
            <ContactTelegramButton
              key={label}
              href={telegramUrl(message)}
              label={label}
              uniformSize
            />
          ))}
        </motion.div>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <SectionDivider label="Соцсети" />
        </motion.div>

        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full max-w-[320px] mx-auto"
        >
          <ContactTelegramButton href={telegramUrl()} label="Telegram" />
        </motion.div>
      </div>
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
