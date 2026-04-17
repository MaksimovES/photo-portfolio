import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TheatreCarouselBlockProps {
  director: string
  production: string
  photos: string[]
  index: number
}

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? '12%' : '-12%' }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? '-12%' : '12%' }),
}

export function TheatreCarouselBlock({
  director,
  production,
  photos,
  index,
}: TheatreCarouselBlockProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(new Set())
  const touchStartX = useRef<number>(0)

  const handleLoad = (i: number) => {
    setLoaded(prev => new Set(prev).add(i))
  }

  const goTo = useCallback((nextIdx: number, dir: number) => {
    setDirection(dir)
    setCurrent(nextIdx)
  }, [])

  const prev = useCallback(() => {
    goTo((current - 1 + photos.length) % photos.length, -1)
  }, [current, photos.length, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % photos.length, 1)
  }, [current, photos.length, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  }

  return (
    <div className="w-4/5 mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex items-end justify-between mb-3 pb-3 border-b border-cream-400/40">
        <span className="font-body text-2xs text-warm-muted tracking-[0.3em] uppercase select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="text-right">
          <p className="font-body text-2xs text-warm-muted tracking-[0.25em] uppercase mb-1">
            {director}
          </p>
          <p className="font-display font-light text-base md:text-lg text-warm-dark tracking-wide leading-tight">
            {production}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative z-[10000] aspect-video bg-cream-200 overflow-hidden group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides via AnimatePresence */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="absolute inset-0"
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 z-10 bg-cream-200 overflow-hidden pointer-events-none"
              animate={{ opacity: loaded.has(current) ? 0 : 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
            >
              <div
                className="absolute inset-0 -skew-x-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,251,245,0.55) 50%, transparent 100%)',
                  animation: 'shimmer 1.6s ease-in-out infinite',
                }}
              />
            </motion.div>

            <img
              src={photos[current]}
              alt={`${production} — ${current + 1}`}
              className="w-full h-full object-cover"
              loading={current === 0 ? 'eager' : 'lazy'}
              draggable={false}
              onLoad={() => handleLoad(current)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="
            absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 md:w-10 md:h-10
            flex items-center justify-center
            bg-warm-dark/50 md:hover:bg-warm-dark/80
            text-cream-100
            transition-all duration-300
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            backdrop-blur-sm
            border border-cream-100/10
            rounded-full
          "
          aria-label="Предыдущее фото"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="
            absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 md:w-10 md:h-10
            flex items-center justify-center
            bg-warm-dark/50 md:hover:bg-warm-dark/80
            text-cream-100
            transition-all duration-300
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            backdrop-blur-sm
            border border-cream-100/10
            rounded-full
          "
          aria-label="Следующее фото"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2L10 7L5 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Bottom bar: dots + counter */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between bg-gradient-to-t from-warm-dark/50 to-transparent">
          <div className="flex gap-1.5 items-center">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-5 h-[3px] bg-gold'
                    : 'w-[5px] h-[5px] bg-cream-100/40 md:hover:bg-cream-100/70'
                }`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
          <span className="font-body text-2xs text-cream-100/60 tracking-[0.2em]">
            {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
