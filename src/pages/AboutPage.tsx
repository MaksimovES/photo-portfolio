import { motion } from 'framer-motion'
import Typography from '../components/Typography'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.2, 0, 0, 1] },
  }),
}

export default function AboutPage() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-8 pt-20 pb-20">
      <div className="text-center space-y-6 max-w-2xl">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Typography variant="label" className="text-gold tracking-[0.3em]">
            О фотографе
          </Typography>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <Typography variant="h1" className="text-warm-dark">
            Обо мне
          </Typography>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <Typography variant="body" className="text-warm-medium">
            Текст о фотографе, достижения и история — появятся здесь в Фазе 3.
          </Typography>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 pt-4"
        >
          <span className="h-px w-12 bg-gold/40" />
          <span className="font-body text-2xs text-warm-muted tracking-[0.2em] uppercase">
            В разработке
          </span>
          <span className="h-px w-12 bg-gold/40" />
        </motion.div>
      </div>
    </section>
  )
}
