import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface FaqSection {
  title: string
  text: string
}

interface FaqItem {
  question: string
  answer?: ReactNode
  sections?: FaqSection[]
}

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'

const faqs: FaqItem[] = [
  {
    question: 'Сколько длится фотосессия?',
    answer:
      'Продолжительность зависит от типа съёмки. Съемка в студии длится 1 час. Фотопрогулка до 1.5 часов. Другие форматы - индивидуально.',
  },
  {
    question: 'Когда я получу готовые фотографии?',
    answer:
      'Готовые снимки отправляются ссылкой на Яндекс Диск в течение 24 часов после съёмки.',
  },
  {
    question: 'Стоимость съёмки?',
    answer:
      'Со стоимостью съемки и подробными условиями можно ознакомиться на странице интересующего вас формата.',
  },
  {
    question: 'Можно ли подарить фотосессию другому человеку?',
    answer: (
      <>
        Да, вы можете приобрести электронный подарочный сертификат. Для оформления и оплаты напишите мне в{' '}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram, откроется в новой вкладке"
          className="text-gold underline underline-offset-4 decoration-gold/40 md:hover:decoration-gold transition-colors duration-300"
        >
          Telegram
        </a>
        .
      </>
    ),
  },
  {
    question: 'Как подготовиться к фотосессии?',
    sections: [
      {
        title: 'Одежда',
        text: 'Выбирайте вещи, в которых чувствуете себя уверенно и комфортно. Лучше всего смотрится однотонная одежда без крупных принтов, логотипов и надписей. Не забудьте про обувь, если она является важной частью образа.',
      },
      {
        title: 'Аксессуары',
        text: 'Если вы любите украшения, обязательно возьмите их с собой. Серьги, кольца, браслеты, заколки и другие детали помогут разнообразить кадры и подчеркнуть ваш стиль.',
      },
      {
        title: 'Макияж',
        text: 'Рекомендую лёгкий и естественный макияж: ровный тон, небольшой акцент на глаза и увлажнённые губы. Главное — чтобы вы чувствовали себя комфортно и оставались собой.',
      },
      {
        title: 'Волосы',
        text: 'Чистые и ухоженные волосы всегда выглядят выигрышно в кадре. Подойдёт как распущенная укладка, так и простая аккуратная причёска.',
      },
      {
        title: 'Музыка',
        text: 'Подготовьте плейлист с любимыми композициями. Музыка помогает расслабиться, настроиться на съёмку и чувствовать себя более естественно перед камерой.',
      },
      {
        title: 'Отдых',
        text: 'Постарайтесь хорошо выспаться накануне съёмки и не переживать по мелочам. Самые красивые фотографии получаются тогда, когда вы расслаблены и получаете удовольствие от процесса. Главное — не переживайте и не стремитесь выглядеть идеально. Моя задача — помочь вам чувствовать себя комфортно и сохранить ваши лучшие моменты в кадре.',
      },
    ],
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
                      {faq.sections ? (
                        <div className="space-y-5 pb-7">
                          {faq.sections.map((section) => (
                            <div key={section.title}>
                              <p className="font-body text-warm-dark text-sm md:text-base font-medium mb-1">
                                {section.title}
                              </p>
                              <p className="font-body text-warm-medium text-sm md:text-base leading-relaxed">
                                {section.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-body text-warm-medium text-sm md:text-base leading-relaxed pb-7">
                          {faq.answer}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.2, 0, 0, 1],
              delay: faqs.length * 0.07,
            }}
          >
            <div className="border-t border-cream-400">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram, откроется в новой вкладке"
                className="w-full flex items-center justify-between py-6 text-left gap-4 group"
              >
                <span className="font-body text-base md:text-lg leading-snug text-warm-dark group-hover:text-gold transition-colors duration-300">
                  Не нашли ответ на свой вопрос? —{' '}
                  <span className="underline underline-offset-4 decoration-gold/40 group-hover:decoration-gold">
                    напишите напрямую
                  </span>
                </span>
                <span
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center font-body text-xl leading-none text-warm-muted group-hover:text-gold transition-colors duration-300"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Closing border */}
          <div className="border-t border-cream-400" />
        </div>
      </div>
    </section>
  )
}
