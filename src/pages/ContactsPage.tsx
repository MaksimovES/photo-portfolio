import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Typography from '../components/Typography'
import { useIsDesktop } from '../hooks/useIsDesktop'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.2, 0, 0, 1] },
  }),
}

export default function ContactsPage() {
  const ref = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={ref}
      className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-20 pb-32 sm:pb-16 relative overflow-hidden"
    >
      <motion.div
        className="hidden md:block absolute top-10 right-10 lg:right-20 font-display leading-none select-none pointer-events-none text-[320px] text-gold/[0.18]"
        style={{ y: decorY }}
        aria-hidden
      >
        →
      </motion.div>
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

        {/* Разделитель */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 pt-2"
        >
          <span className="h-px w-16 bg-gold/30" />
          <span className="font-body text-2xs text-gold/60 tracking-[0.25em] uppercase">
            Соцсети
          </span>
          <span className="h-px w-16 bg-gold/30" />
        </motion.div>

        {/* Кнопки соцсетей */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto"
        >
          {/* Telegram */}
          <motion.a
            href="https://t.me/ketrin_maxim"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-gold/30 rounded-sm overflow-hidden w-full sm:w-auto sm:min-w-[220px] justify-center"
            whileHover={isDesktop ? { scale: 1.02 } : undefined}
            whileTap={isDesktop ? { scale: 0.98 } : undefined}
          >
            <motion.span
              className="absolute inset-0 bg-gold/10"
              initial={{ x: '-100%' }}
              whileHover={isDesktop ? { x: 0 } : undefined}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            />
            <svg
              className="w-5 h-5 text-gold relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="font-body text-sm tracking-[0.15em] uppercase text-gold relative z-10">
              Telegram
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
