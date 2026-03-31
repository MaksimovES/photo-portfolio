import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion, useInView } from 'framer-motion'

interface Review {
  id: number
  name: string
  date: string
  genre: string
  text: string
}

const scrollbarHideStyle = {
  msOverflowStyle: 'none',  /* IE и Edge */
  scrollbarWidth: 'none',   /* Firefox */
} as const;

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

const GAP_PX = 24

interface CardProps {
  review: Review
  className?: string
}

function ReviewCard({ review, className = '' }: CardProps) {
  return (
    <div
      className={`bg-cream-100 border border-cream-400 p-8 md:p-10 rounded-sm transition-all duration-500 outline-none
        h-[300px] md:h-[320px] w-full overflow-hidden min-w-0 flex flex-col justify-between ${className}`}
    >
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-6">
          <span className="font-body text-[10px] tracking-[0.25em] text-gold uppercase">
            {review.genre}
          </span>
          <span className="font-body text-[10px] text-warm-muted uppercase tracking-widest">
            {review.date}
          </span>
        </div>

        <p
          className="font-body text-warm-medium text-base md:text-lg leading-relaxed italic 
          break-words whitespace-normal line-clamp-5 overflow-hidden min-w-0"
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-4 mt-auto w-full min-w-0">
        <span className="h-px flex-1 bg-cream-400" />
        <span className="font-display text-warm-dark text-lg flex-shrink min-w-0 truncate">
          {review.name}
        </span>
        <span className="h-px w-4 bg-gold/30" />
      </div>
    </div>
  )
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const desktopViewportRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const [focusIndex, setFocusIndex] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  )
  const [viewportWidth, setViewportWidth] = useState(0)
  const interactionTimeoutRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  /** Пока true — не синхронизируем focusIndex из onScroll (иначе клик по стрелке сбрасывается). */
  const suppressScrollSyncRef = useRef(false)
  const suppressScrollTimerRef = useRef<number | null>(null)

  const visibleSlots = Math.min(3, Math.max(1, reviews.length))
  const maxDesktopStart = Math.max(0, reviews.length - visibleSlots)

  const cardWidth =
    viewportWidth > 0 && visibleSlots > 0
      ? (viewportWidth - (visibleSlots - 1) * GAP_PX) / visibleSlots
      : 0

  const desktopOffsetPx =
    cardWidth > 0 ? focusIndex * (cardWidth + GAP_PX) : 0

  const clampFocus = useCallback(
    (idx: number) => {
      if (isDesktop) {
        return Math.max(0, Math.min(maxDesktopStart, idx))
      }
      return Math.max(0, Math.min(reviews.length - 1, idx))
    },
    [isDesktop, maxDesktopStart],
  )

  const totalSteps = isDesktop ? maxDesktopStart + 1 : reviews.length

  const scrollMobileToIndex = useCallback(
    (idx: number, behavior: ScrollBehavior = 'smooth') => {
      const el = scrollRef.current
      if (!el) return

      const next = clampFocus(idx)
      const child = el.children[next] as HTMLElement | undefined
      if (!child) return

      if (suppressScrollTimerRef.current) window.clearTimeout(suppressScrollTimerRef.current)
      suppressScrollSyncRef.current = true

      const effectiveBehavior: ScrollBehavior = reduceMotion ? 'auto' : behavior

      el.scrollTo({
        left: child.offsetLeft,
        behavior: effectiveBehavior,
      })

      const suppressMs = effectiveBehavior === 'smooth' ? 850 : 160
      suppressScrollTimerRef.current = window.setTimeout(() => {
        suppressScrollSyncRef.current = false
        suppressScrollTimerRef.current = null
      }, suppressMs)
    },
    [clampFocus, reduceMotion],
  )

  const nudgeInteraction = useCallback(() => {
    setIsInteracting(true)
    if (interactionTimeoutRef.current) window.clearTimeout(interactionTimeoutRef.current)
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false)
    }, 5500)
  }, [])

  const goToDesktop = useCallback(
    (index: number) => {
      nudgeInteraction()
      setFocusIndex(clampFocus(index))
    },
    [clampFocus, nudgeInteraction],
  )

  const step = useCallback(
    (direction: 'left' | 'right') => {
      nudgeInteraction()
      const delta = direction === 'left' ? -1 : 1
      setFocusIndex((prev) => {
        const max = isDesktop ? maxDesktopStart : reviews.length - 1
        const next = prev + delta
        if (next < 0) return max
        if (next > max) return 0
        return next
      })
    },
    [isDesktop, maxDesktopStart, nudgeInteraction],
  )

  const handleScroll = useCallback(() => {
    if (isDesktop) return
    if (suppressScrollSyncRef.current) return
    const el = scrollRef.current
    if (!el) return

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    rafRef.current = window.requestAnimationFrame(() => {
      const { scrollLeft, clientWidth } = el
      const center = scrollLeft + clientWidth / 2

      let bestIdx = 0
      let bestDist = Infinity
      for (let i = 0; i < el.children.length; i++) {
        const c = el.children[i] as HTMLElement
        const mid = c.offsetLeft + c.offsetWidth / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      }
      setFocusIndex(clampFocus(bestIdx))
    })
  }, [clampFocus, isDesktop])

  useLayoutEffect(() => {
    const el = desktopViewportRef.current
    if (!el) return

    setViewportWidth(el.clientWidth)
    const ro = new ResizeObserver(() => {
      setViewportWidth(el.clientWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isDesktop) return

    const onPointerDown = () => nudgeInteraction()
    const onTouchStart = () => nudgeInteraction()
    const onWheel = () => nudgeInteraction()
    const onFocusIn = () => nudgeInteraction()

    el.addEventListener('pointerdown', onPointerDown, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('focusin', onFocusIn)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('focusin', onFocusIn)
    }
  }, [isDesktop, nudgeInteraction])

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) return
    if (isInteracting) return

    const id = window.setInterval(() => {
      setFocusIndex((prev) => {
        const max = isDesktop ? maxDesktopStart : reviews.length - 1
        return prev >= max ? 0 : prev + 1
      })
    }, 5200)

    return () => window.clearInterval(id)
  }, [isDesktop, isInView, isInteracting, maxDesktopStart, reduceMotion])

  const focusIndexRef = useRef(focusIndex)
  focusIndexRef.current = focusIndex

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isDesktop) return

    const ro = new ResizeObserver(() => {
      scrollMobileToIndex(focusIndexRef.current, 'auto')
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [isDesktop, scrollMobileToIndex])

  useEffect(() => {
    if (isDesktop) return
    scrollMobileToIndex(focusIndex, reduceMotion ? 'auto' : 'smooth')
  }, [focusIndex, isDesktop, reduceMotion, scrollMobileToIndex])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    return () => {
      if (suppressScrollTimerRef.current) window.clearTimeout(suppressScrollTimerRef.current)
    }
  }, [])

  useEffect(() => {
    setFocusIndex((prev) => clampFocus(prev))
  }, [clampFocus, isDesktop])

  const desktopTransition = reduceMotion
    ? 'none'
    : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)'

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-cream-200 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:mb-30">
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

        <div className="relative max-w-7xl mx-auto">
          {/* Desktop: карусель — вьюпорт + дорожка + translate */}
          <div
            className="hidden md:block relative"
            role="region"
            aria-roledescription="карусель"
            aria-label="Отзывы клиентов"
          >
            {totalSteps > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step('left')}
                  className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-2 lg:-translate-x-4
                    h-12 w-12 lg:h-14 lg:w-14 rounded-full border border-warm-medium/25 text-warm-dark
                    bg-cream-200/85 backdrop-blur-sm shadow-sm hover:border-gold hover:text-gold transition-colors
                    flex items-center justify-center"
                  aria-label="Предыдущий отзыв"
                >
                  <span className="text-xl lg:text-2xl leading-none mt-0.5">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => step('right')}
                  className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-2 lg:translate-x-4
                    h-12 w-12 lg:h-14 lg:w-14 rounded-full border border-warm-medium/25 text-warm-dark
                    bg-cream-200/85 backdrop-blur-sm shadow-sm hover:border-gold hover:text-gold transition-colors
                    flex items-center justify-center"
                  aria-label="Следующий отзыв"
                >
                  <span className="text-xl lg:text-2xl leading-none mt-0.5">→</span>
                </button>
              </>
            )}

            <div
              ref={desktopViewportRef}
              className="overflow-hidden mx-14 lg:mx-16 min-h-[320px]"
            >
              {viewportWidth > 0 && cardWidth > 0 ? (
                <div
                  className="flex gap-6 will-change-transform"
                  style={{
                    transform: `translate3d(-${desktopOffsetPx}px, 0, 0)`,
                    transition: desktopTransition,
                  }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0 min-w-0"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[320px] w-full rounded-sm bg-cream-100/40 border border-cream-400/40" aria-hidden />
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="font-body text-[11px] tracking-[0.25em] uppercase text-warm-muted">
                {focusIndex + 1} / {totalSteps}
              </div>
              {totalSteps > 1 && (
                <div
                  className="flex items-center justify-center gap-2"
                  role="tablist"
                  aria-label="Слайды отзывов"
                >
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={focusIndex === i}
                      onClick={() => goToDesktop(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        focusIndex === i
                          ? 'w-8 bg-gold'
                          : 'w-2 bg-warm-medium/25 hover:bg-warm-medium/40'
                      }`}
                      aria-label={`Показать отзывы, шаг ${i + 1} из ${totalSteps}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={scrollbarHideStyle}
            className={`flex md:hidden overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide touch-pan-x ${
              reduceMotion ? 'scroll-auto' : 'scroll-smooth'
            }`}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                className="flex-shrink-0 w-full snap-center px-3"
                initial={false}
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1, y: 0 }
                    : {
                        opacity: focusIndex === i ? 1 : 0.72,
                        scale: focusIndex === i ? 1 : 0.985,
                        y: focusIndex === i ? 0 : 2,
                      }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="max-w-2xl mx-auto w-full">
                  <ReviewCard review={review} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex md:hidden items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => step('left')}
              className="h-11 px-4 rounded-full border border-warm-medium/25 text-warm-dark bg-cream-100/60 backdrop-blur-sm active:scale-[0.98] transition"
              aria-label="Предыдущий отзыв"
            >
              ←
            </button>

            <div className="font-body text-[11px] tracking-[0.25em] uppercase text-warm-muted">
              {focusIndex + 1} / {reviews.length}
            </div>

            <button
              type="button"
              onClick={() => step('right')}
              className="h-11 px-4 rounded-full border border-warm-medium/25 text-warm-dark bg-cream-100/60 backdrop-blur-sm active:scale-[0.98] transition"
              aria-label="Следующий отзыв"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
