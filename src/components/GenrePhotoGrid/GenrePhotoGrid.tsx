import { useState, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Lightbox } from '../Lightbox'

function PhotoItem({
  src,
  index,
  alt,
  onClick,
}: {
  src: string
  index: number
  alt: string
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasRevealed = useRef(false)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })

  const shouldReveal = loaded && inView
  if (shouldReveal) hasRevealed.current = true

  // Once revealed, always stay revealed — no re-animation
  const revealed = hasRevealed.current
  const delay = (index % 4) * 0.07

  return (
    <div
      ref={ref}
      className="relative z-[10000] aspect-[3/4] overflow-hidden bg-cream-300 cursor-pointer"
      onClick={onClick}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index < 8 ? 'eager' : 'lazy'}
        draggable={false}
        onLoad={() => setLoaded(true)}
        initial={false}
        animate={{ scale: revealed ? 1 : 1.06 }}
        transition={{ duration: 1.1, ease: [0.2, 0, 0, 1], delay: revealed && !hasRevealed.current ? delay : 0 }}
      />

      {/* Shimmer — only while not yet revealed */}
      {!revealed && (
        <div className="absolute inset-0 z-10 bg-cream-300 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 -skew-x-12"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,251,245,0.55) 50%, transparent 100%)',
              animation: 'shimmer 1.6s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </div>
  )
}

interface GenrePhotoGridProps {
  photos: string[]
}

export function GenrePhotoGrid({ photos }: GenrePhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const changeLightboxIndex = useCallback((i: number) => setLightboxIndex(i), [])

  return (
    <>
      <div className="w-4/5 md:w-[80%] mx-auto max-w-8xl">
        <div className="flex items-end justify-between mb-3 pb-3 border-b border-cream-400/40">
          <span className="font-body text-2xs text-warm-muted tracking-[0.3em] uppercase select-none">
            Галерея
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
          {photos.map((src, i) => (
            <PhotoItem
              key={i}
              src={src}
              index={i}
              alt={`Фото ${i + 1}`}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onChangeIndex={changeLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}
