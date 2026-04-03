import { motion } from 'framer-motion'
import { AnimatedCounter, counters } from './heroUtils'

interface HeroProps {
  isVisible: boolean
}

// ─── V2 — «Редакционный» ─────────────────────────────────────────────────────
// TEXT is the hero. Massive Tenor Sans display type dominates.
// Photo is secondary — asymmetric aside. Editorial magazine feel.
export default function HeroV2({ isVisible }: HeroProps) {
  return (
    <section
      className="relative bg-cream-100 overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <div
        className="flex flex-col md:grid md:grid-cols-[65fr_35fr]"
        style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      >

        {/* ══════════════════════════════════════════════════
            LEFT / MAIN COLUMN — Typography + content
        ══════════════════════════════════════════════════ */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-10 pb-8 md:py-16">

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-6 md:mb-8"
            initial={{ opacity: 0, x: -14 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 0.08 }}
          >
            <span className="block h-px w-6 bg-gold flex-shrink-0" />
            <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
              Портфолио фотографа
            </span>
          </motion.div>

          {/* MASSIVE Title */}
          <div className="mb-0 md:mb-4">
            {[
              { text: 'Не делаю', delay: 0.1, color: 'text-warm-dark' },
              { text: 'ретушь', delay: 0.2, color: 'text-warm-dark' },
              { text: 'потому что —', delay: 0.32, color: 'text-warm-medium/70' },
              { text: 'с Вами', delay: 0.44, color: 'text-gold' },
              { text: 'всё так!', delay: 0.54, color: 'text-gold' },
            ].map(({ text, delay, color }, i) => (
              <motion.div
                key={i}
                className={`font-display font-light leading-[0.95] tracking-[-0.04em] ${color}`}
                style={{ fontSize: 'clamp(2.6rem, 7.5vw, 7rem)' }}
                initial={{ opacity: 0, x: -24 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.85, ease: [0.2, 0, 0, 1], delay }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          {/* ── Mobile only: photo inserted between title and text ─────────── */}
          <motion.div
            className="block md:hidden mt-7 mb-7 relative overflow-hidden"
            style={{ aspectRatio: '16/9' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: [0.2, 0, 0, 1], delay: 0.6 }}
          >
            {/* Gold top accent */}
            <span className="absolute top-0 left-0 right-0 h-px bg-gold z-10" />
            <motion.div
              className="absolute inset-0 z-20 bg-cream-300 origin-top"
              initial={{ scaleY: 1 }}
              animate={isVisible ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
            />
            <img
              src="https://picsum.photos/seed/portfolio/800/450"
              alt="Портфолио фотографа"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-body text-warm-medium/75 text-sm md:text-base leading-relaxed mt-7 md:mt-8 mb-7 md:mb-8"
            style={{ maxWidth: '36ch' }}
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: 0.72 }}
          >
            Ловлю ваши настоящие эмоции и уникальность в каждом кадре.
            Посмотрите на себя моими глазами — и вы увидите, как прекрасны.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 border-t border-warm-dark/10 py-5 mb-7 md:mb-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.84 }}
          >
            {counters.map((c, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1.5 ${i > 0 ? 'border-l border-warm-dark/10 pl-4 md:pl-6' : ''}`}
              >
                <span
                  className="font-display font-light text-warm-dark leading-none tabular-nums"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)' }}
                >
                  <AnimatedCounter to={c.to} isVisible={isVisible} delay={0.94 + i * 0.12} />
                </span>
                <span className="font-body text-2xs tracking-[0.12em] text-warm-muted uppercase leading-snug">
                  {c.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1], delay: 1.0 }}
          >
            <a
              href="#cases"
              className="group inline-flex items-center gap-4
                border border-warm-dark/20 hover:border-gold
                text-warm-dark font-body text-2xs tracking-[0.22em] uppercase
                px-7 transition-all duration-300 hover:bg-gold/10"
              style={{ minHeight: '50px' }}
            >
              Направления съёмок
              <motion.span
                className="block h-px bg-gold flex-shrink-0"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 24 } : { width: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              />
            </a>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            RIGHT COLUMN — Photo (desktop only)
        ══════════════════════════════════════════════════ */}
        <div className="hidden md:flex items-stretch relative">
          {/* Gold left border accent */}
          <span className="absolute left-0 top-0 bottom-0 w-px bg-gold/40 z-10" />

          <div className="relative w-full overflow-hidden">
            {/* Shutter reveal */}
            <motion.div
              className="absolute inset-0 z-20 bg-cream-300 origin-top"
              initial={{ scaleY: 1 }}
              animate={isVisible ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            />
            <motion.img
              src="https://picsum.photos/seed/portfolio/600/800"
              alt="Портфолио фотографа"
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="eager"
              initial={{ scale: 1.06 }}
              animate={isVisible ? { scale: 1 } : { scale: 1.06 }}
              transition={{ duration: 2.0, ease: [0.2, 0, 0, 1], delay: 0.35 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
