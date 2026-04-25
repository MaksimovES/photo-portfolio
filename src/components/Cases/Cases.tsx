import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GENRES } from '../../utils/genres'

const descriptions: Record<string, string> = {
  studio: 'Глубокое исследование личности через портретный и телесный формат. Работа со светом и тенями для создания эстетичных, минималистичных кадров.',
  street: 'Эстетика момента в ритме города или в гармонии с природой. Кинематографичные прогулки, где декорациями выступают улицы.',
  theatre: 'Съемка спектаклей, закулисья и танцевальных перфомансов. Ловим динамику движения и магию сцены.',
  family: 'Искренние домашние истории и теплые прогулки. Мы создаем честные кадры о вашей любви и уюте.',
}

const details: Record<string, string> = {
  studio: '1–3 часа · студия',
  street: 'от 1.5 часов · город / природа',
  theatre: 'событие · театры',
  family: 'от 2 часов · дом / прогулка',
}

function GenreItem({
  genre,
  index,
  isOpen,
  onToggle,
}: {
  genre: (typeof GENRES)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <div className="border-b border-gold/20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1], delay: index * 0.07 }}
        onClick={onToggle}
        className="py-6 md:py-10 flex gap-4 md:gap-10 items-center cursor-pointer group"
      >
        <span className="font-display text-gold leading-none text-xl md:text-2xl w-6 md:w-16 flex-shrink-0">
          {genre.number}
        </span>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-warm-medium text-lg md:text-2xl uppercase tracking-wider md:group-hover:text-gold transition-colors duration-300">
              {genre.label}
            </h3>
            <span className={`text-gold transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-6 flex flex-col items-start gap-5">
                  <div className="space-y-2">
                    <div className="overflow-hidden">
                      <motion.p
                        className="font-body text-warm-medium text-sm md:text-base leading-relaxed max-w-xl"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                      >
                        {descriptions[genre.slug] || genre.description}
                      </motion.p>
                    </div>
                    <div className="overflow-hidden">
                      <motion.span
                        className="block font-body text-[10px] md:text-xs text-gold tracking-[0.2em] uppercase italic opacity-80"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                      >
                        {details[genre.slug]}
                      </motion.span>
                    </div>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/genre/${genre.slug}`)
                    }}
                    className="group/btn relative flex items-center gap-3 py-2"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: [0.2, 0, 0, 1], delay: 0.3 }}
                  >
                    <span className="font-body text-[11px] md:text-xs uppercase tracking-[0.3em] text-warm-dark md:group-hover/btn:text-gold transition-colors duration-300">
                      Подробнее
                    </span>
                    <div className="relative w-8 h-px bg-gold/40 md:group-hover/btn:w-12 transition-all duration-500">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold" />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default function Cases() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="directions" className="py-16 md:py-32 px-6 md:px-14 bg-cream-100">
      <div className="max-w-screen-xl mx-auto">

        <div ref={titleRef} className="mb-10 md:mb-20">
          <motion.h2
            className="font-display md:text-3xl text-2xl md:text-display-md text-warm-dark uppercase tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Направления
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1 w-full">
            {GENRES.map((genre, i) => (
              <GenreItem
                key={genre.slug}
                genre={genre}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          <div className="hidden md:block md:w-[30%] flex-shrink-0 self-center">
            <div className="relative aspect-[2/3]">
              <div className="absolute inset-0 bg-cream-200 rounded-sm" />
              <div className="absolute -bottom-4 -left-4 inset-0 border border-gold/30 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
