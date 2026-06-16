import { useState, useCallback, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import {
  getCarouselImageAttrs,
  preloadAdjacentImages,
  preloadOptimizedImage,
} from '@/utils/images'

interface TheatreCarouselBlockProps {
  director: string
  production: string
  photos: string[]
  index: number
}

export function TheatreCarouselBlock({
  director,
  production,
  photos,
  index,
}: TheatreCarouselBlockProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const blockRef = useRef<HTMLDivElement>(null)
  const inView = useInView(blockRef, { once: true, margin: '200px 0px' })

  useEffect(() => {
    if (!inView) return
    preloadAdjacentImages(photos, current, 'w800')
  }, [photos, current, inView])

  const goTo = useCallback(
    (nextIdx: number) => {
      if (nextIdx === current) return
      preloadOptimizedImage(photos[nextIdx], 'w800')
      setCurrent(nextIdx)
    },
    [current, photos],
  )

  const prev = useCallback(() => {
    goTo((current - 1 + photos.length) % photos.length)
  }, [current, photos.length, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % photos.length)
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
    <div
      ref={blockRef}
      className="w-4/5 mx-auto max-w-5xl [content-visibility:auto] [contain-intrinsic-size:auto_320px]"
    >
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
        className="relative z-[10000] aspect-video bg-warm-dark/10 overflow-hidden group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {inView && (
          <img
            {...getCarouselImageAttrs(photos[current])}
            alt={`${production} — ${current + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
        )}

        {/* Bottom bar: dots + counter */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between bg-gradient-to-t from-warm-dark/50 to-transparent">
          <div className="pointer-events-auto flex gap-1.5 items-center">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex h-[5px] w-5 items-center justify-center outline-none"
                aria-label={`Фото ${i + 1}`}
              >
                <span
                  className={`block h-full rounded-full transition-[width,background-color] duration-500 ease-out ${
                    i === current
                      ? 'w-5 bg-gold'
                      : 'w-[5px] bg-cream-100/40 md:hover:bg-cream-100/70'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-body text-2xs text-cream-100/60 tracking-[0.2em]">
            {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="
            absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 md:w-10 md:h-10
            flex items-center justify-center
            bg-warm-dark/60 md:hover:bg-warm-dark/85
            text-cream-100
            transition-[opacity,background-color] duration-300
            opacity-100 md:opacity-45 md:group-hover:opacity-100
            border border-cream-100/10
            rounded-full
            outline-none
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
            bg-warm-dark/60 md:hover:bg-warm-dark/85
            text-cream-100
            transition-[opacity,background-color] duration-300
            opacity-100 md:opacity-45 md:group-hover:opacity-100
            border border-cream-100/10
            rounded-full
            outline-none
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
      </div>
    </div>
  )
}
