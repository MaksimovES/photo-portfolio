import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Review {
  id: number
  name: string
  date: string
  genre: string
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Анна и Дмитрий',
    date: 'Март 2024',
    genre: 'Свадьба',
    text: 'Невероятно атмосферные фотографии! Каждый кадр передаёт настроение нашего дня. Рекомендуем всем парам.',
  },
  {
    id: 2,
    name: 'Мария Соколова',
    date: 'Февраль 2024',
    genre: 'Портрет',
    text: 'Долго искала фотографа для бизнес-портрета. Результат превзошёл все ожидания — живые и выразительные снимки.',
  },
  {
    id: 3,
    name: 'Семья Петровых',
    date: 'Январь 2024',
    genre: 'Семья',
    text: 'Замечательная семейная съёмка. Дети не напрягались, всё прошло легко. Снимки бесценны!',
  },
  {
    id: 4,
    name: 'Александр Ковалёв',
    date: 'Декабрь 2023',
    genre: 'Репортаж',
    text: 'Снимал наше корпоративное мероприятие. Все коллеги восхищены результатом. Профессионально.',
  },
]

interface CardProps {
  review: Review
  className?: string
}

function ReviewCard({ review, className = '' }: CardProps) {
  return (
    <div
      className={`bg-cream-100 border border-cream-400 p-8 md:p-10 rounded-sm transition-all duration-500 outline-none
        /* ФИКСИРОВАННАЯ ВЫСОТА И ПРЕДОТВРАЩЕНИЕ РАСШИРЕНИЯ */
        h-[300px] md:h-[320px] w-full overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="w-full">
        {/* Meta */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-body text-[10px] tracking-[0.25em] text-gold uppercase">
            {review.genre}
          </span>
          <span className="font-body text-[10px] text-warm-muted uppercase tracking-widest">
            {review.date}
          </span>
        </div>

        {/* Text с исправлением вылета по ширине и высоте */}
        <p
          className="font-body text-warm-medium text-base md:text-lg leading-relaxed italic 
          break-words whitespace-normal line-clamp-5 overflow-hidden"
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Author row — всегда прижат к низу */}
      <div className="flex items-center gap-4 mt-auto w-full">
        <span className="h-px flex-1 bg-cream-400" />
        <span className="font-display text-warm-dark text-lg flex-shrink-0">
          {review.name}
        </span>
        <span className="h-px w-4 bg-gold/30" />
      </div>
    </div>
  )
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // clientWidth берет точную ширину видимой области без учета скроллбаров
      const width = scrollRef.current.clientWidth
      const scrollAmount = direction === 'left' ? -width : width

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-cream-200 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:mb-30">
        
        {/* Заголовок по центру */}
        <div className="text-center mb-6 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-7xl text-warm-dark leading-tight"
          >
            Отзывы <br />
            <span className="italic text-warm-medium/50 font-light text-2xl md:text-5xl">клиентов</span>
          </motion.h2>
        </div>

        {/* Контейнер со стрелками по бокам */}
        <div className="relative max-w-5xl mx-auto px-2 md:px-16">
          
          {/* Левая стрелка */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-10px] md:left-0 top-1/2 -translate-y-1/2 z-10 
                       w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                       rounded-full border border-warm-medium/20 text-warm-dark
                       hover:border-gold hover:text-gold transition-all duration-300 bg-cream-200/50 backdrop-blur-sm"
            aria-label="Предыдущий отзыв"
          >
            <span className="text-2xl md:text-3xl mt-[-2px]">←</span>
          </button>

          {/* Слайдер */}
          <div
            ref={scrollRef}
            className="flex overflow-hidden snap-x snap-mandatory scrollbar-hide 
                       touch-pan-x"
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 w-full snap-center px-4"
              >
                {/* Ограничиваем ширину самой карточки внутри слайда */}
                <div className="max-w-2xl mx-auto w-full">
                  <ReviewCard review={review} />
                </div>
              </div>
            ))}
          </div>

          {/* Правая стрелка */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-10px] md:right-0 top-1/2 -translate-y-1/2 z-10 
                       w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                       rounded-full border border-warm-medium/20 text-warm-dark
                       hover:border-gold hover:text-gold transition-all duration-300 bg-cream-200/50 backdrop-blur-sm"
            aria-label="Следующий отзыв"
          >
            <span className="text-2xl md:text-3xl mt-[-2px]">→</span>
          </button>
        </div>

      </div>
    </section>
  )
}