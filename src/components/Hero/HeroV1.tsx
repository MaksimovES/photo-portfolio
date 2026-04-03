import { motion } from 'framer-motion'
import { AnimatedCounter, counters } from './heroUtils'

interface HeroProps {
  isVisible: boolean
}

// ─── V1 — «Погружение» ───────────────────────────────────────────────────────
// Full-bleed photo background. Dark gradient from bottom.
// Text, stats, CTA overlaid at the bottom. Cinematic, emotional.
export default function HeroV1({ isVisible }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-warm-dark"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      {/* Full-viewport container */}
      <div
        className="relative"
        style={{ height: 'calc(100dvh - var(--header-height))' }}
      >
        {/* ── Background Photo with Ken-Burns ──────────────────────────────── */}
        <motion.img
          src="https://picsum.photos/seed/portfolio/1200/900"
          alt="Портфолио фотографа"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={isVisible ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 3.2, ease: [0.2, 0, 0, 1] }}
        />

        {/* ── Gradient Overlay ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/95 via-warm-dark/40 to-transparent" />
        {/* subtle vignette sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/30 via-transparent to-transparent" />

        {/* ── Shutter curtain reveal ──────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-20 bg-warm-dark origin-top"
          initial={{ scaleY: 1 }}
          animate={isVisible ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />

        {/* ── Content anchored at bottom ───────────────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-10 md:pb-14">

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-4 md:mb-5"
            initial={{ opacity: 0, x: -16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.5 }}
          >
            <span className="block h-px w-8 bg-gold flex-shrink-0" />
            <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
              Портфолио фотографа
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display font-light text-cream-50 leading-[1.05] tracking-[-0.02em] mb-5 md:mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 1.0, ease: [0.2, 0, 0, 1], delay: 0.62 }}
          >
            Не делаю ретушь<br />
            потому что&nbsp;—<br />
            <span className="text-gold">с Вами всё так!</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="font-body text-cream-300/75 text-sm md:text-base leading-relaxed mb-7 md:mb-8"
            style={{ maxWidth: '38ch' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.78 }}
          >
            Ловлю ваши настоящие эмоции и уникальность в каждом кадре.
            Посмотрите на себя моими глазами — и вы увидите, как прекрасны.
          </motion.p>

          {/* Bottom row: stats + CTA */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.9 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 sm:flex sm:gap-10 border-l border-gold/30 pl-4 sm:border-none sm:pl-0">
              {counters.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 sm:border-l sm:border-cream-400/20 sm:pl-5 first:border-none first:pl-0"
                >
                  <span
                    className="font-display font-light text-cream-50 tabular-nums leading-none"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
                  >
                    <AnimatedCounter to={c.to} isVisible={isVisible} delay={1.0 + i * 0.12} />
                  </span>
                  <span className="font-body text-2xs tracking-[0.12em] text-cream-400/55 uppercase leading-snug">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#cases"
              className="group inline-flex items-center gap-4
                border border-cream-50/25 hover:border-gold
                text-cream-100 font-body text-2xs tracking-[0.22em] uppercase
                px-7 transition-all duration-300 hover:bg-gold/10 shrink-0"
              style={{ minHeight: '50px' }}
            >
              Направления съёмок
              <motion.span
                className="block h-px bg-gold flex-shrink-0"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 24 } : { width: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              />
            </a>
          </motion.div>
        </div>

        {/* ── Decorative corner line — top right ──────────────────────────── */}
        <motion.div
          className="absolute top-6 right-6 md:top-10 md:right-10 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="block h-px w-10 bg-gold/50 ml-auto" />
          <span className="block w-px h-10 bg-gold/50 ml-auto mt-0" />
        </motion.div>
      </div>
    </section>
  )
}
