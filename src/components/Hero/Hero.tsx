import { motion } from 'framer-motion'
import { AnimatedCounter, KineticHeading, counters } from './heroUtils'

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
        className="flex flex-col md:grid md:grid-cols-[42fr_58fr]"
        style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      >

        {/* ══════════════════════════════════════════════════
            PHOTO PANEL
            Mobile : order-1 (top), 38dvh (compact to fit stats in viewport)
            Desktop: order-2 (right), full column height
        ══════════════════════════════════════════════════ */}
        <div
          className="relative order-1 md:order-2
            h-[38dvh] md:h-[calc(100dvh_-_var(--header-height))]
            flex items-stretch"
        >
          {/* Offset shadow border — gives depth */}
          <motion.div
            className="absolute inset-4 md:inset-6 lg:inset-8 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4
              border border-gold/35 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.2, 0, 0, 1] }}
          />

          {/* Photo container */}
          <div className="relative flex-1 m-4 md:m-6 lg:m-8 overflow-hidden bg-cream-200">
            {/* Shutter curtain */}
            <motion.div
              className="absolute inset-0 z-20 bg-cream-300 origin-top"
              initial={{ scaleY: 1 }}
              animate={isVisible ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />

            {/* Photo with Ken-Burns */}
            <motion.img
              src="https://picsum.photos/seed/portfolio/600/800"
              alt="Портфолио фотографа"
              className="absolute inset-0 w-full h-full object-contain"
              loading="eager"
              initial={{ scale: 1.07 }}
              animate={isVisible ? { scale: 1 } : { scale: 1.07 }}
              transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.25 }}
            />

            {/* Corner accents */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.3, duration: 0.4 }}
            >
              {/* top-left */}
              <motion.span className="absolute top-0 left-0 block h-px bg-gold"
                initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                transition={{ delay: 1.45, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              <motion.span className="absolute top-0 left-0 block w-px bg-gold"
                initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                transition={{ delay: 1.45, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              {/* top-right */}
              <motion.span className="absolute top-0 right-0 block h-px bg-gold" style={{ transformOrigin: 'right' }}
                initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                transition={{ delay: 1.55, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              <motion.span className="absolute top-0 right-0 block w-px bg-gold"
                initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                transition={{ delay: 1.55, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              {/* bottom-left */}
              <motion.span className="absolute bottom-0 left-0 block h-px bg-gold/50"
                initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                transition={{ delay: 1.65, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              <motion.span className="absolute bottom-0 left-0 block w-px bg-gold/50"
                initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                transition={{ delay: 1.65, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              {/* bottom-right */}
              <motion.span className="absolute bottom-0 right-0 block h-px bg-gold/50" style={{ transformOrigin: 'right' }}
                initial={{ width: 0 }} animate={isVisible ? { width: 22 } : { width: 0 }}
                transition={{ delay: 1.75, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
              <motion.span className="absolute bottom-0 right-0 block w-px bg-gold/50"
                initial={{ height: 0 }} animate={isVisible ? { height: 22 } : { height: 0 }}
                transition={{ delay: 1.75, duration: 0.4, ease: [0.2, 0, 0, 1] }} />
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            TEXT PANEL
            Mobile : order-2 (below photo)
            Desktop: order-1 (left column, vertically centered)
        ══════════════════════════════════════════════════ */}
        <div
          className="flex flex-col justify-start md:justify-center order-2 md:order-1
            px-6 md:px-10 lg:px-14
            pt-6 pb-8 md:py-16"
        >

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-4 md:mb-7"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.1 }}
          >
            <span className="block h-px w-8 bg-gold flex-shrink-0" />
            <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
              Портфолио фотографа
            </span>
          </motion.div>

          {/* Title with KineticHeading */}
          <h1
            className="font-display font-light text-warm-dark leading-[1.03] tracking-[-0.03em] mb-4 md:mb-6"
            style={{ fontSize: 'clamp(2rem, 5.2vw, 4.5rem)' }}
          >
            <KineticHeading text="Не делаю ретушь" isVisible={isVisible} delay={0.15} />
            <br />
            <KineticHeading text="потому что —" isVisible={isVisible} delay={0.4} />
            <br />
            <KineticHeading text="с Вами всё так!" isVisible={isVisible} delay={0.6} className="text-gold" />
          </h1>

          {/* Description */}
          <motion.p
            className="font-body text-warm-medium/80 text-sm md:text-base leading-relaxed mb-5 md:mb-7"
            style={{ maxWidth: '34ch' }}
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.75 }}
          >
            Ловлю ваши настоящие эмоции и уникальность в каждом кадре.
            Посмотрите на себя моими глазами — и вы увидите, как прекрасны.
          </motion.p>

          {/* Stats — 3-col grid with dividers */}
          <motion.div
            className="grid grid-cols-3 divide-x divide-cream-400 border-t border-b border-cream-400 py-3 md:py-4 mb-5 md:mb-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.86 }}
          >
            {counters.map((c, i) => (
              <div key={i} className={`flex flex-col gap-1 md:gap-1.5 ${i > 0 ? 'pl-3 md:pl-5' : ''}`}>
                <span
                  className="font-display font-light text-warm-dark leading-none tabular-nums"
                  style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)' }}
                >
                  <AnimatedCounter to={c.to} isVisible={isVisible} delay={0.96 + i * 0.12} />
                </span>
                <span className="font-body text-2xs tracking-[0.12em] text-warm-medium/60 uppercase leading-snug">
                  {c.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 1.02 }}
          >
            <a
              href="#cases"
              className="group flex md:inline-flex items-center justify-center md:justify-start gap-4
                border border-warm-dark/20 hover:border-gold
                text-warm-dark font-body text-2xs tracking-[0.22em] uppercase
                px-8 transition-all duration-300 hover:bg-gold/10"
              style={{ minHeight: '48px' }}
            >
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
