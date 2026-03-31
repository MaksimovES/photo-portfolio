import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface HeroProps {
  isVisible: boolean
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0, 0, 1] },
  },
}

const photoReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
  },
}

const shutterVariants = {
  hidden: { scaleY: 1, originY: 0 },
  visible: {
    scaleY: 0,
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
  },
}

// Кинетический текст — каждый символ появляется с размытием
function KineticHeading({ text, isVisible, delay = 0 }: { text: string; isVisible: boolean; delay?: number }) {
  return (
    <span className="inline">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}
          animate={
            isVisible
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: 'blur(12px)', y: 18 }
          }
          transition={{
            duration: 0.65,
            ease: [0.2, 0, 0, 1],
            delay: delay + i * 0.032,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

// Анимированный счётчик
function AnimatedCounter({
  to,
  suffix = '',
  isVisible,
  delay = 0,
}: {
  to: number
  suffix?: string
  isVisible: boolean
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0, 0, 1],
      delay,
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [isVisible])

  return <span ref={ref}>0{suffix}</span>
}

const counters = [
  { to: 127, suffix: '', label: 'историй снято' },
  { to: 8, suffix: '', label: 'лет в профессии' },
  { to: 4, suffix: '', label: 'направления' },
]

export default function Hero({ isVisible }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col justify-start px-6 md:px-10 lg:px-14 pt-24 pb-16 bg-cream-100">
      <motion.div
        className="w-full max-w-screen-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="block font-body text-2xs tracking-[0.35em] text-gold uppercase mb-6"
        >
          Портфолио фотографа
        </motion.span>

        {/* Full-width heading — kinetic */}
        <h1
          className="relative z-10 font-display font-light text-warm-dark leading-[1] tracking-[-0.03em] mb-6 md:mb-0
            text-[clamp(1.7rem,6vw,4rem)]"
        >
          <KineticHeading text="Не делаю ретушь" isVisible={isVisible} delay={0.1} />
          <br />
          <KineticHeading text="Потому что с Вами всё так" isVisible={isVisible} delay={0.45} />
        </h1>

        {/* Bottom row: photo + info */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
          {/* Photo — on mobile first (order-1), on desktop right (order-2) */}
          <div className="relative w-[70%] mx-auto md:w-[50%] flex justify-center md:justify-end flex-shrink-0 order-1 md:order-2 md:-mt-20" style={{ zIndex: 10000 }}>
            <div className="relative" style={{ width: 'min(480px, 80vw)', aspectRatio: '3/4' }}>
              {/* Shutter overlay — slides down when photo reveals */}
              <motion.div
                className="absolute inset-0 z-10 bg-cream-300 rounded-sm origin-top"
                variants={shutterVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
              />
              <motion.div
                className="absolute inset-0"
                variants={photoReveal}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
              >
              <div className="absolute inset-0 rounded-sm overflow-hidden">
                <img
                  src="https://picsum.photos/seed/portfolio/480/640"
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
              </motion.div>
              {/* Frame */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ inset: '-10px' }}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                {/* Outer border */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none">
                  <motion.rect
                    x="1" y="1"
                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                    stroke="#C9A96E"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 1.5, duration: 1.2, ease: [0.2, 0, 0, 1] }}
                  />
                </svg>

                {/* Corner accents — top left */}
                <motion.span
                  className="absolute top-0 left-0 block h-px bg-gold"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: 40 } : { width: 0 }}
                  transition={{ delay: 1.6, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />
                <motion.span
                  className="absolute top-0 left-0 block w-px bg-gold"
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: 40 } : { height: 0 }}
                  transition={{ delay: 1.6, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />

                {/* Corner accents — top right */}
                <motion.span
                  className="absolute top-0 right-0 block h-px bg-gold"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: 40 } : { width: 0 }}
                  transition={{ delay: 1.7, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                  style={{ transformOrigin: 'right' }}
                />
                <motion.span
                  className="absolute top-0 right-0 block w-px bg-gold"
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: 40 } : { height: 0 }}
                  transition={{ delay: 1.7, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />

                {/* Corner accents — bottom left */}
                <motion.span
                  className="absolute bottom-0 left-0 block h-px bg-gold/60"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: 40 } : { width: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block w-px bg-gold/60"
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: 40 } : { height: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />

                {/* Corner accents — bottom right */}
                <motion.span
                  className="absolute bottom-0 right-0 block h-px bg-gold/60"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: 40 } : { width: 0 }}
                  transition={{ delay: 1.9, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                  style={{ transformOrigin: 'right' }}
                />
                <motion.span
                  className="absolute bottom-0 right-0 block w-px bg-gold/60"
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: 40 } : { height: 0 }}
                  transition={{ delay: 1.9, duration: 0.5, ease: [0.2, 0, 0, 1] }}
                />
              </motion.div>
            </div>
          </div>

          {/* Info — on mobile second (order-2), on desktop left (order-1) */}
          <div className="flex-1 md:max-w-md order-2 md:order-1 md:mt-20">
            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="font-body text-warm-dark text-base md:text-lg leading-relaxed mb-0"
            >
              Я верю, что настоящая красота — в естественности.
            </motion.p>

            {/* Описание */}
            <motion.p
              variants={itemVariants}
              className="font-body text-warm-medium/80 text-sm md:text-base leading-relaxed mb-8 max-w-[300px] md:max-w-none"
            >
              Моя задача — уловить вашу уникальность, эмоции и мимолётные движения, которые делают
              вас собой. На снимках вы увидите себя такими, какие вы есть — с вашими эмоциями,
              индивидуальностью и характером. Ваша уникальность — это то, что делает вас красивыми.
            </motion.p>

            {/* Counters */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 mb-8"
            >
              {counters.map((c, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-display font-light text-warm-dark text-[clamp(1.6rem,4vw,2.2rem)] leading-none tracking-[-0.02em]">
                    <AnimatedCounter to={c.to} suffix={c.suffix} isVisible={isVisible} delay={0.8 + i * 0.15} />
                  </span>
                  <span className="font-body text-2xs tracking-[0.18em] text-warm-medium/60 uppercase">
                    {c.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <a
                href="#directions"
                className="inline-flex items-center gap-3 border border-gold text-warm-dark font-body
                  text-2xs tracking-[0.18em] uppercase px-8 py-4
                  hover:bg-gold hover:border-gold transition-colors duration-300"
              >
                Направления съемок
                <span className="block h-px w-5 bg-current" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
