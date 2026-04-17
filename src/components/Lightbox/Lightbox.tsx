import { useEffect, useCallback, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'

interface LightboxProps {
  photos: string[]
  currentIndex: number
  onClose: () => void
  onChangeIndex: (index: number) => void
}

const SWIPE_THRESHOLD = 50
const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

function LightboxContent({ photos, currentIndex, onClose, onChangeIndex }: LightboxProps) {
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setDirection(-1)
      onChangeIndex(currentIndex - 1)
    }
  }, [currentIndex, hasPrev, onChangeIndex])

  const goNext = useCallback(() => {
    if (hasNext) {
      setDirection(1)
      onChangeIndex(currentIndex + 1)
    }
  }, [currentIndex, hasNext, onChangeIndex])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goPrev, goNext])

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.documentElement.style.overflow = originalOverflow
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD && info.velocity.x > 0) {
      goPrev()
    } else if (info.offset.x < -SWIPE_THRESHOLD && info.velocity.x < 0) {
      goNext()
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === containerRef.current) onClose()
  }

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? '40%' : '-40%',
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? '-40%' : '40%',
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10005] flex items-center justify-center"
      variants={overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-warm-dark/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center
                   text-cream-200/70 md:hover:text-cream-100 transition-colors"
        aria-label="Закрыть"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute top-4 left-4 z-10 font-body text-xs text-cream-200/50 tracking-[0.15em] select-none">
        {currentIndex + 1} / {photos.length}
      </div>

      {hasPrev && (
        <button
          onClick={goPrev}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 items-center justify-center
                     text-cream-200/50 md:hover:text-cream-100 transition-colors"
          aria-label="Предыдущее фото"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button
          onClick={goNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 items-center justify-center
                     text-cream-200/50 md:hover:text-cream-100 transition-colors"
          aria-label="Следующее фото"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={containerRef}
        className="relative z-[1] flex items-center justify-center w-full h-full px-4 py-16 md:px-20"
        onClick={handleOverlayClick}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="flex items-center justify-center max-w-full max-h-full touch-none"
          >
            <img
              src={photos[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-sm select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function Lightbox(props: LightboxProps) {
  return createPortal(<LightboxContent {...props} />, document.body)
}
