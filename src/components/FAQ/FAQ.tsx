import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'Сколько времени занимает фотосессия?',
    answer:
      'Продолжительность зависит от типа съёмки. Портретная — 1–2 часа, свадебная — от 4 до 10 часов, семейная — 1.5–2 часа. Мы заранее обговариваем все детали и составляем план съёмки.',
  },
  {
    question: 'Когда я получу готовые фотографии?',
    answer:
      'Готовые фотографии передаются в течение 7–14 рабочих дней. Для свадебных съёмок — до 21 дня. Вы получаете снимки в высоком разрешении через личную галерею с возможностью скачивания.',
  },
  {
    question: 'Можно ли провести съёмку в другом городе?',
    answer:
      'Да, я работаю в разных городах и странах. Выезд за пределы Москвы обсуждается индивидуально: стоимость транспорта и проживания оплачивается дополнительно.',
  },
  {
    question: 'Как подготовиться к фотосессии?',
    answer:
      'После бронирования мы проводим предварительную беседу: обсуждаем пожелания, выбираем локацию, образ и настроение. Я дам рекомендации по одежде и расскажу, как вести себя перед камерой — даже если вы никогда раньше не снимались.',
  },
  {
    question: 'Какова стоимость съёмки?',
    answer:
      'Стоимость зависит от вида съёмки, её продолжительности и локации. Напишите мне — расскажу о всех вариантах и подберём формат под ваш запрос и бюджет.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-10 lg:px-14 bg-cream-100">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
        <motion.h2
          className="font-display text-display-sm md:text-display-md text-warm-dark mb-16 md:mb-20"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
        >
          Частые вопросы
        </motion.h2>

        {/* FAQ list */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.2, 0, 0, 1],
                delay: i * 0.07,
              }}
            >
              <div className="border-t border-cream-400">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between py-6 text-left gap-4 group cursor-pointer"
                >
                  <span
                    className={`font-body text-base md:text-lg leading-snug transition-colors duration-300 ${
                      openIndex === i ? 'text-gold' : 'text-warm-dark group-hover:text-gold'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* +/− indicator */}
                  <span
                    className={`flex-shrink-0 w-5 h-5 flex items-center justify-center
                      font-body text-xl leading-none transition-colors duration-300 ${
                      openIndex === i ? 'text-gold' : 'text-warm-muted group-hover:text-gold'
                    }`}
                    aria-hidden
                  >
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="font-body text-warm-medium text-sm md:text-base leading-relaxed pb-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Closing border */}
          <div className="border-t border-cream-400" />
        </div>
      </div>
    </section>
  )
}
