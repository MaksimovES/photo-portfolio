import { motion } from 'framer-motion'
import { DashLabel, KineticHeading, philosophyBlocks } from './heroUtils'

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
        className="flex flex-col md:grid md:grid-cols-[54fr_46fr]"
        style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      >

        {/* ══════════════════════════════════════════════════
            MOBILE PHOTO PANEL
            Full-bleed crop + blur overlay for slogan/description
        ══════════════════════════════════════════════════ */}
        <div className="md:hidden order-1 flex flex-col min-h-0">
          <motion.div
            className="px-4 pt-4 pb-3"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <DashLabel>Портфолио фотографа</DashLabel>
          </motion.div>

          <div className="relative w-full h-[44dvh] overflow-hidden flex-shrink-0">
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
              className="absolute inset-x-0 bottom-0 h-1/4
                backdrop-blur-md bg-cream-100/40
                flex flex-col justify-end px-4 pb-3 gap-1.5"
            >
              <h1
                className="font-display font-light text-warm-dark leading-[1.03] tracking-[-0.03em] max-w-[min(100%,36ch)]"
                style={{ fontSize: 'clamp(1.625rem, 4.8vw, 4.5rem)' }}
              >
                <KineticHeading text="Не делаю ретушь," isVisible={isVisible} delay={0.15} />
                {' '}
                <KineticHeading text="потому что с вами " isVisible={isVisible} delay={0.4} />
                <KineticHeading text="всё так!" isVisible={isVisible} delay={0.55} className="text-gold" />
              </h1>

              <motion.p
                className="font-body text-warm-medium/80 text-sm leading-snug max-w-[44ch]"
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.75 }}
              >
                Я верю, что настоящая красота — в естественности.
                Моя задача уловить вашу уникальность, эмоции
                и мимолётные движения, которые делают вас собой.
              </motion.p>
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
          className="flex flex-col flex-1 justify-start md:justify-center order-2 md:order-1
            px-4 md:px-7 lg:px-9
            pt-4 pb-8 md:py-16 min-w-0"
        >

          {/* Desktop label */}
          <motion.div
            className="hidden md:flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <DashLabel>Портфолио фотографа</DashLabel>
          </motion.div>

          {/* Desktop slogan */}
          <h1
            className="hidden md:block relative z-10 font-display font-light text-warm-dark leading-[1.03] tracking-[-0.03em] mb-6 max-w-none md:mr-[-2.5rem] lg:mr-[-4rem]"
            style={{ fontSize: 'clamp(1.625rem, 4.8vw, 4.5rem)' }}
          >
            <span className="block whitespace-nowrap">
              <KineticHeading text="Не делаю ретушь," isVisible={isVisible} delay={0.15} />
            </span>
            <span className="block whitespace-nowrap">
              <KineticHeading text="потому что с вами " isVisible={isVisible} delay={0.4} />
              <KineticHeading text="всё так!" isVisible={isVisible} delay={0.55} className="text-gold" />
            </span>
          </h1>

          {/* Desktop description */}
          <motion.p
            className="hidden md:block font-body text-warm-medium/80 text-base leading-relaxed mb-7 max-w-[33vw] md:text-justify"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.75 }}
          >
            Я верю, что настоящая красота — в естественности.
            Моя задача уловить вашу уникальность, эмоции
            и мимолётные движения, которые делают вас собой.
          </motion.p>

          {/* Philosophy blocks */}
          <motion.div
            className="flex flex-col gap-3 md:gap-6 mb-4 md:mb-8"
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
                <DashLabel>{block.title}</DashLabel>
                <p className="font-body text-warm-medium/80 text-xs md:text-base leading-snug md:leading-relaxed pl-11">
                  <span className="md:hidden">{block.textMobile}</span>
                  <span className="hidden md:inline">{block.textDesktop}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 1.02 }}
          >
            <a
              href="#cases"
              className="group flex md:inline-flex items-center justify-center md:justify-start gap-4
                 rounded-lg md:rounded-xl bg-cream-200 border border-cream-400 shadow-sm
                 md:hover:border-gold md:hover:shadow-md
                 text-warm-dark font-body text-2xs tracking-[0.22em] uppercase
                 px-8 transition-all duration-300 md:hover:bg-gold/10 shimmer-btn"
              style={{ minHeight: '48px' }}
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
