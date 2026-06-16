import { motion } from 'framer-motion'
import {
  KineticHeading,
} from './heroUtils'
import { getHeroImageAttrs } from '@/utils/images'
import { HOME_HERO_IMAGE_SRC } from '@/data/mainPageData'
import { useMdViewport } from '@/hooks/useMdViewport'

interface HeroProps {
  isVisible: boolean
}

function HeroPhoto({
  isVisible,
  variant,
}: {
  isVisible: boolean
  variant: 'mobile' | 'desktop'
}) {
  const heroVariant = variant === 'desktop' ? 'w1600' : 'w800'
  const imageAttrs = getHeroImageAttrs(HOME_HERO_IMAGE_SRC, heroVariant)

  if (variant === 'mobile') {
    return (
      <motion.img
        {...imageAttrs}
        alt="Портретная фотография"
        className="absolute inset-0 w-full h-full object-cover object-[center_48%]"
        loading="eager"
        {...({ fetchpriority: 'high' } as Record<string, string>)}
        decoding="async"
        initial={{ scale: 1.1 }}
        animate={isVisible ? { scale: 1.05 } : { scale: 1.1 }}
        transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.25 }}
      />
    )
  }

  return (
    <motion.img
      {...imageAttrs}
      alt="Портретная фотография"
      className="block max-h-[calc(100dvh-var(--header-height)-6rem-30px)] lg:max-h-[calc(100dvh-var(--header-height)-8rem-30px)] max-w-full w-auto h-auto rounded-lg"
      loading="eager"
      {...({ fetchpriority: 'high' } as Record<string, string>)}
      decoding="async"
      initial={{ scale: 1.07 }}
      animate={isVisible ? { scale: 1 } : { scale: 1.07 }}
      transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.25 }}
    />
  )
}

export default function Hero({ isVisible }: HeroProps) {
  const isMd = useMdViewport()

  return (
    <section
      className="relative bg-cream-100"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <div
        className="flex flex-col md:grid md:grid-cols-[54fr_46fr] md:items-start md:min-h-[calc(100dvh-var(--header-height))]"
      >

        {/* ══════════════════════════════════════════════════
            MOBILE PHOTO PANEL
            Editorial card: clean photo + dedicated text zone below
        ══════════════════════════════════════════════════ */}
        <div className="md:hidden order-1 flex flex-col min-h-0 px-6 pt-2 pb-0">
          <div
            className="relative w-full flex-shrink-0 rounded-lg border border-gold/30
              bg-cream-200 p-1.5 shadow-warm-sm overflow-hidden"
          >
            <motion.h1
              className="relative px-4 pt-4 pb-3 font-display font-light text-warm-dark leading-[1.1] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(1.375rem, 5.2vw, 1.75rem)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.15 }}
            >
              <span className="block text-warm-dark/90">
                <KineticHeading text="Не делаю ретушь," isVisible={isVisible} delay={0.15} />
              </span>
              <span className="block mt-1 text-warm-dark/90">
                <KineticHeading text="потому что с вами " isVisible={isVisible} delay={0.35} />
                <KineticHeading
                  text="всё так!"
                  isVisible={isVisible}
                  delay={0.52}
                  className="italic text-gold-deep font-normal"
                />
              </span>
              <span
                className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
                aria-hidden
              />
            </motion.h1>

            <div className="relative w-full h-[40dvh] overflow-hidden rounded-[5px]">
              {!isMd && <HeroPhoto isVisible={isVisible} variant="mobile" />}
            </div>
          </div>

          <motion.div
            className="pt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.45 }}
          >
            <motion.p
              className="font-body pl-4 border-l-2 border-gold/40"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.58 }}
            >
              <span
                className="block font-display font-light text-warm-dark leading-[1.38] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(0.9375rem, 3.8vw, 1.0625rem)' }}
              >
                На моих съёмках нет заученных поз
                <br />
                я отдаю предпочтение импровизации, ориентируясь на ваше состояние, настроение и музыку.
              </span>
              <span className="block mt-3.5 text-[0.875rem] leading-[1.68] text-warm-medium">
                Бережно направляю вас, чтобы вы могли расслабиться и{' '}
                <span className="text-gold-deep italic">быть собой.</span>
              </span>
            </motion.p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESKTOP PHOTO PANEL
            Framed photo with corner accents
        ══════════════════════════════════════════════════ */}
        <div
          className="hidden md:flex relative order-2
            h-[calc(100dvh_-_var(--header-height))]
            items-center justify-end
            py-6 lg:py-8 pl-2 lg:pl-3 pr-6 lg:pr-8 min-h-0"
        >
          <div className="relative max-h-full max-w-full">
            <motion.div
              className="absolute inset-0 translate-x-3 translate-y-3
                border border-gold/35 rounded-xl pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.2, 0, 0, 1] }}
            />

            <div className="relative p-[15px] bg-cream-200 rounded-xl">
              <div className="relative overflow-hidden rounded-lg leading-none">
                <motion.div
                  className="absolute inset-0 z-20 bg-cream-300 origin-top rounded-lg"
                  initial={{ scaleY: 1 }}
                  animate={isVisible ? { scaleY: 0 } : { scaleY: 1 }}
                  transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                />

                {isMd && <HeroPhoto isVisible={isVisible} variant="desktop" />}

                <motion.div
                  className="absolute inset-0 pointer-events-none z-10 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                >
                  <motion.span className="absolute top-0 left-0 block h-px bg-gold"
                    initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                    transition={{ delay: 1.45, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute top-0 left-0 block w-px bg-gold"
                    initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                    transition={{ delay: 1.45, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute top-0 right-0 block h-px bg-gold" style={{ transformOrigin: 'right' }}
                    initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                    transition={{ delay: 1.55, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute top-0 right-0 block w-px bg-gold"
                    initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                    transition={{ delay: 1.55, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute bottom-0 left-0 block h-px bg-gold/50"
                    initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                    transition={{ delay: 1.65, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute bottom-0 left-0 block w-px bg-gold/50"
                    initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                    transition={{ delay: 1.65, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute bottom-0 right-0 block h-px bg-gold/50" style={{ transformOrigin: 'right' }}
                    initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                    transition={{ delay: 1.75, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                  <motion.span className="absolute bottom-0 right-0 block w-px bg-gold/50"
                    initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                    transition={{ delay: 1.75, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            TEXT PANEL
            Desktop: slogan + description
        ══════════════════════════════════════════════════ */}
        <div
          className="hidden md:flex flex-col flex-1 order-2 md:order-1
            h-[calc(100dvh_-_var(--header-height))]
            px-6 md:px-7 lg:px-9
            pt-10 pb-6 lg:pt-14 lg:pb-8 min-w-0"
        >

          {/* Desktop slogan */}
          <h1
            className="hidden md:block relative z-10 font-display font-light text-warm-dark leading-[1.03] tracking-[-0.03em] mb-4 lg:mb-6 max-w-none md:mr-[-2.5rem] lg:mr-[-4rem]"
            style={{ fontSize: 'clamp(1.625rem, 4.8vw, 4.5rem)' }}
          >
            <span className="block whitespace-nowrap text-warm-dark">
              <KineticHeading text="Не делаю ретушь," isVisible={isVisible} delay={0.15} />
            </span>
            <span className="block whitespace-nowrap">
              <KineticHeading text="потому что с вами " isVisible={isVisible} delay={0.4} />
              <KineticHeading
                text="всё так!"
                isVisible={isVisible}
                delay={0.55}
                className="italic text-gold"
              />
            </span>
          </h1>

          {/* Desktop description */}
          <div className="flex flex-1 items-center min-w-0">
            <motion.div
              className="max-w-[min(36rem,42vw)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: 0.72 }}
            >
            <div className="relative pl-6 lg:pl-7">
              <span
                className="absolute left-0 top-0.5 bottom-0.5 w-px
                  bg-gradient-to-b from-gold/80 via-gold/30 to-transparent"
                aria-hidden
              />

              <p
                className="font-display font-light text-warm-dark tracking-[-0.012em]
                  text-[1.4375rem] lg:text-[1.5625rem] leading-[1.42] lg:leading-[1.44] text-pretty"
              >
                На моих съёмках нет заученных поз
                <br />
                <span className="text-warm-dark/88">
                  я отдаю предпочтение импровизации, ориентируясь на ваше состояние, настроение и музыку.
                </span>
              </p>

              <motion.p
                className="mt-5 lg:mt-6 font-body text-warm-medium
                  text-[1.125rem] lg:text-[1.1875rem] leading-[1.62] lg:leading-[1.66] text-pretty"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.75, ease: [0.2, 0, 0, 1], delay: 0.92 }}
              >
                Бережно направляю вас, чтобы вы могли расслабиться
                <br />
                и{' '}
                <span className="font-display font-light italic text-gold-deep">быть собой.</span>
              </motion.p>
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
