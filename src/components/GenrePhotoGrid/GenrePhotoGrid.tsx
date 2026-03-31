import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function PhotoItem({ src, index, alt }: { src: string; index: number; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })

  const revealed = loaded && inView
  const delay = (index % 4) * 0.07

  return (
    <div ref={ref} className="relative z-[10000] aspect-[3/4] overflow-hidden bg-cream-300">
      {/* Image — всегда в DOM, грузится нормально */}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index < 8 ? 'eager' : 'lazy'}
        draggable={false}
        onLoad={() => setLoaded(true)}
        initial={{ scale: 1.06 }}
        animate={{ scale: revealed ? 1 : 1.06 }}
        transition={{ duration: 1.1, ease: [0.2, 0, 0, 1], delay }}
      />

      {/* Shimmer-оверлей — поверх фото, уходит когда loaded + inView */}
      <motion.div
        className="absolute inset-0 z-10 bg-cream-300 overflow-hidden pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.2, 0, 0, 1], delay }}
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
    </div>
  )
}

interface GenrePhotoGridProps {
  photos: string[]
}

export function GenrePhotoGrid({ photos }: GenrePhotoGridProps) {
  return (
    <div className="w-4/5 md:w-[80%] mx-auto max-w-8xl">
      <div className="flex items-end justify-between mb-3 pb-3 border-b border-cream-400/40">
        <span className="font-body text-2xs text-warm-muted tracking-[0.3em] uppercase select-none">
          Галерея
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
        {photos.map((src, i) => (
          <PhotoItem key={i} src={src} index={i} alt={`Фото ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
