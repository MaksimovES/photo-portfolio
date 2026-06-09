import { motion } from 'framer-motion'
import {
  HeroEyebrow,
  HeroLead,
  KineticHeading,
  PhilosophyBody,
  PhilosophyTitle,
  philosophyBlocks,
} from './heroUtils'

interface HeroProps {
  isVisible: boolean
}

export default function Hero({ isVisible }: HeroProps) {
  return (
    <section
      className="relative bg-cream-100"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <div
        className="flex flex-col md:grid md:grid-cols-[54fr_46fr] md:items-start"
        style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      >

        {/* ══════════════════════════════════════════════════
            MOBILE PHOTO PANEL
            Full-bleed crop + gradient scrim for slogan/description
        ══════════════════════════════════════════════════ */}
        <div className="md:hidden order-1 flex flex-col min-h-0 px-6">
          <motion.div
            className="pt-4 pb-3"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <HeroEyebrow>Портфолио фотографа</HeroEyebrow>
          </motion.div>

          <div
            className="relative w-full flex-shrink-0 rounded-lg border border-gold/30
              bg-cream-200 p-1.5 shadow-warm-sm"
          >
            <div className="relative w-full h-[44dvh] overflow-hidden rounded-[5px]">
            <motion.img
              src="/main-page/1test.JPG"
              alt="Портфолио фотографа"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              initial={{ scale: 1.1 }}
              animate={isVisible ? { scale: 1.05 } : { scale: 1.1 }}
              transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.25 }}
            />

            <div
              className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none
                bg-gradient-to-t from-cream-100 from-25% via-cream-100 via-55% to-cream-100/0"
              aria-hidden
            />

            <div
              className="absolute inset-x-0 bottom-0 h-[52%]
                flex flex-col justify-end pb-3 gap-2"
            >
              <h1
                className="font-display font-light text-warm-dark leading-[1.06] tracking-[-0.03em]
                  max-w-[min(100%,36ch)]
                  [text-shadow:0_1px_0_#FAF7F2,0_2px_20px_rgba(250,247,242,0.85)]"
                style={{ fontSize: 'clamp(1.625rem, 4.8vw, 4.5rem)' }}
              >
                <span className="block">
                  <KineticHeading text="Не делаю ретушь," isVisible={isVisible} delay={0.15} />
                </span>
                <span className="block">
                  <KineticHeading text="потому что с вами " isVisible={isVisible} delay={0.4} />
                  <KineticHeading
                    text="всё так!"
                    isVisible={isVisible}
                    delay={0.55}
                    className="italic text-gold-deep font-normal"
                  />
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.75 }}
              >
                <HeroLead className="max-w-[44ch] border-l-0 pl-0 text-warm-dark">
                  Я верю, что настоящая красота — в естественности.
                  Моя задача уловить вашу уникальность, эмоции
                  и мимолётные движения, которые делают вас собой.
                </HeroLead>
              </motion.div>
            </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            DESKTOP PHOTO PANEL
            Framed photo with corner accents
        ══════════════════════════════════════════════════ */}
        <div
          className="hidden md:flex relative order-2
            h-[calc(100dvh_-_var(--header-height))]
            items-center justify-center
            p-6 lg:p-8 min-h-0"
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

                <motion.img
                  src="/main-page/1test.JPG"
                  alt="Портфолио фотографа"
                  className="block max-h-[calc(100dvh-var(--header-height)-6rem-30px)] lg:max-h-[calc(100dvh-var(--header-height)-8rem-30px)] max-w-full w-auto h-auto rounded-lg"
                  loading="eager"
                  initial={{ scale: 1.07 }}
                  animate={isVisible ? { scale: 1 } : { scale: 1.07 }}
                  transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.25 }}
                />

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
            Mobile: philosophy blocks + CTA
            Desktop: label, slogan, description, philosophy blocks, CTA
        ══════════════════════════════════════════════════ */}
        <div
          className="flex flex-col flex-1 justify-start md:justify-start lg:justify-center order-2 md:order-1
            px-6 md:px-7 lg:px-9
            pt-4 pb-8 md:pt-10 md:pb-10 lg:py-14 min-w-0
            md:-translate-y-[5%]"
        >

          {/* Desktop label */}
          <motion.div
            className="hidden md:flex items-center gap-3 mb-5 lg:mb-7"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <HeroEyebrow>Портфолио фотографа</HeroEyebrow>
          </motion.div>

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
          <motion.div
            className="hidden md:block mb-5 lg:mb-7 max-w-[33vw]"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.75 }}
          >
            <HeroLead className="md:text-justify">
              Я верю, что настоящая красота — в естественности.
              Моя задача уловить вашу уникальность, эмоции
              и мимолётные движения, которые делают вас собой.
            </HeroLead>
          </motion.div>

          {/* Philosophy blocks */}
          <motion.div
            className="flex flex-col gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-5 lg:mb-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.86 }}
          >
            {philosophyBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                className="flex flex-col gap-1.5 md:gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay: 0.86 + i * 0.1 }}
              >
                <PhilosophyTitle>{block.title}</PhilosophyTitle>
                <PhilosophyBody>
                  <span className="md:hidden">{block.textMobile}</span>
                  <span className="hidden md:inline">{block.textDesktop}</span>
                </PhilosophyBody>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-auto md:mt-5 lg:mt-auto md:flex md:justify-end w-full"
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 1.02 }}
          >
            <a
              href="#cases"
              className="group flex md:inline-flex items-center justify-center md:justify-center gap-3 md:gap-4
                 rounded-lg md:rounded-xl bg-cream-200 border border-cream-400 shadow-warm-sm
                 md:hover:border-gold md:hover:shadow-warm-md
                 text-warm-dark font-body font-medium text-2xs tracking-[0.24em] uppercase
                 px-8 md:px-6 lg:px-8 transition-all duration-300 md:hover:bg-gold/10 shimmer-btn
                 min-h-[48px] md:min-h-[44px] lg:min-h-[48px]"
            >
              <motion.span
                className="block h-px bg-gold flex-shrink-0"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 24 } : { width: 0 }}
                transition={{ delay: 1.35, duration: 0.4 }}
              />
              Направления съёмок
              <motion.span
                className="block h-px bg-gold flex-shrink-0"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 24 } : { width: 0 }}
                transition={{ delay: 1.35, duration: 0.4 }}
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
