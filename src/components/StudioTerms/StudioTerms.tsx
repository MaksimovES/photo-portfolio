import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIsDesktop } from '../../hooks/useIsDesktop'

const TELEGRAM_URL = 'https://t.me/ketrin_maxim'
const nbsp = '\u00A0'

const TERMS = [
  {
    label: 'Предоплата',
    value: `50% при${nbsp}бронировании даты, оставшаяся сумма оплачивается после${nbsp}съёмки.`,
  },
  {
    label: 'Аренда студии',
    value: 'включена в стоимость.',
  },
  {
    label: 'Место проведения',
    value: `съёмки проводятся только в${nbsp}фотостудиях из${nbsp}моего списка. Подбор и${nbsp}бронирование студии осуществляются из${nbsp}доступных проверенных вариантов.`,
  },
  {
    label: `Тайминг`,
    value: `1${nbsp}студийный час (55${nbsp}минут).`,
  },
  {
    label: 'Количество готовых фотографий',
    value: `от${nbsp}40${nbsp}до${nbsp}60${nbsp}снимков с${nbsp}цветокоррекцией.`,
  },
  {
    label: 'Срок готовности',
    value: `в${nbsp}течение трёх${nbsp}дней после${nbsp}съёмки.`,
  },
  {
    label: 'Передача материалов',
    value: `ссылкой на${nbsp}Яндекс${nbsp}Диск.`,
  },
  {
    label: 'Ретушь фотографий',
    value: `не${nbsp}выполняется.`,
  },
  {
    label: 'Исходники',
    value: `не${nbsp}предоставляются.`,
  },
  {
    label: `Отбор фотографий`,
    value: 'осуществляется фотографом самостоятельно.',
  },
  {
    label: 'Конфиденциальность',
    value: `если для${nbsp}вас важно сохранить съёмку в${nbsp}тайне и${nbsp}избежать публикации в${nbsp}портфолио, пожалуйста, сообщите об${nbsp}этом заранее.`,
  },
] as { label: string; value: string }[]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

function TermItem({
  label,
  value,
  index,
  isInView,
}: {
  label: string
  value: string
  index: number
  isInView: boolean
}) {
  return (
    <motion.li
      className="relative pl-8 md:pl-10"
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay: 0.08 + index * 0.04 }}
    >
      <span
        className="absolute left-0 top-[0.55em] -translate-y-1/2 h-[5px] w-[5px] rotate-45 border border-gold/45 bg-cream-100"
        aria-hidden="true"
      />

      <p className="font-body text-sm md:text-[0.9375rem] leading-[1.65] text-pretty hyphens-auto text-warm-medium">
        <span className="font-medium text-warm-dark">{label}</span>
        <span className="whitespace-nowrap" aria-hidden="true">
          {'\u00A0—\u00A0'}
        </span>
        <span>{value}</span>
      </p>
    </motion.li>
  )
}

function BookCta() {
  const isDesktop = useIsDesktop()

  return (
    <motion.a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center gap-2.5 w-full md:w-auto px-7 py-3.5 border border-gold/50 rounded-sm overflow-hidden shrink-0"
      whileHover={isDesktop ? { scale: 1.02 } : undefined}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className="absolute inset-0 bg-gold/10"
        initial={{ x: '-100%' }}
        whileHover={isDesktop ? { x: 0 } : undefined}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      />
      <svg
        className="w-4 h-4 text-gold relative z-10 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
      <span className="font-body text-xs tracking-[0.18em] uppercase text-gold relative z-10">
        Записаться
      </span>
    </motion.a>
  )
}

export function StudioTerms() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section lang="ru" className="pb-16 md:pb-24 px-6 md:px-14">
      <motion.div
        ref={ref}
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="border border-gold/20 bg-cream-200/40 rounded-sm px-6 py-8 md:px-12 md:py-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center pb-8 md:pb-10 border-b border-gold/15"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            >
              <p className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.32em] text-gold/50 mb-3 md:mb-4">
                Условия и{nbsp}детали съёмки
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-display text-4xl md:text-[3.25rem] text-warm-dark tracking-tight leading-none">
                  20{nbsp}000{nbsp}₽
                </span>
                <span className="font-body text-xs text-warm-muted whitespace-nowrap">
                  /{nbsp}съёмка
                </span>
              </div>
            </motion.div>

            <div className="relative pt-8 md:pt-10">
              <span
                className="absolute left-[2px] top-8 md:top-10 bottom-0 w-px bg-gradient-to-b from-gold/35 via-gold/15 to-transparent"
                aria-hidden="true"
              />

              <ul className="space-y-5 md:space-y-6">
                {TERMS.map((item, i) => (
                  <TermItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    index={i}
                    isInView={isInView}
                  />
                ))}
              </ul>
            </div>

            <motion.div
              className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-gold/15 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
            >
              <BookCta />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
