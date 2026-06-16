import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, animate } from 'framer-motion'
import { getHomeCriticalPreloadUrls, preloadImageUrl } from '@/utils/images'

interface PreloaderProps {
  onComplete: () => void
}

const MIN_VISIBLE_MS = 1400
const MAX_WAIT_MS = 6000
const EXIT_MS = 820

function KineticName({ text, visible }: { text: string; visible: boolean }) {
  return (
    <span className="inline">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}
          animate={visible ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(12px)', y: 18 }}
          transition={{ duration: 0.65, ease: [0.2, 0, 0, 1], delay: i * 0.048 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [nameVisible, setNameVisible] = useState(false)
  const started = useRef(false)

  const alreadyShown =
    typeof sessionStorage !== 'undefined' &&
    Boolean(sessionStorage.getItem('portfolio_preloader_shown'))

  useEffect(() => {
    if (alreadyShown) {
      onComplete()
      return
    }

    document.body.classList.add('no-grain')
    setNameVisible(true)

    if (started.current) return
    started.current = true

    const startedAt = Date.now()
    const urls = getHomeCriticalPreloadUrls()
    let loadedCount = 0
    let animProgress = 0
    let animDone = false
    let finished = false

    const updateCount = () => {
      const loadProgress =
        urls.length === 0 ? 100 : Math.round((loadedCount / urls.length) * 100)
      setCount(Math.min(100, Math.max(loadProgress, animProgress)))
    }

    const tryComplete = () => {
      if (finished) return

      const elapsed = Date.now() - startedAt
      const imagesReady = loadedCount >= urls.length
      const minTimeReached = elapsed >= MIN_VISIBLE_MS

      if (imagesReady && animDone && minTimeReached) {
        finished = true
        setCount(100)
        window.setTimeout(() => {
          setExiting(true)
          window.setTimeout(() => {
            document.body.classList.remove('no-grain')
            sessionStorage.setItem('portfolio_preloader_shown', '1')
            onComplete()
          }, EXIT_MS)
        }, 200)
      }
    }

    urls.forEach(url => {
      void preloadImageUrl(url).then(() => {
        loadedCount += 1
        updateCount()
        tryComplete()
      })
    })

    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.2, 0, 0, 1] as [number, number, number, number],
      onUpdate: v => {
        animProgress = Math.round(v)
        updateCount()
      },
      onComplete: () => {
        animDone = true
        tryComplete()
      },
    })

    const maxWaitTimer = window.setTimeout(() => {
      if (finished) return
      finished = true
      setCount(100)
      setExiting(true)
      window.setTimeout(() => {
        document.body.classList.remove('no-grain')
        sessionStorage.setItem('portfolio_preloader_shown', '1')
        onComplete()
      }, EXIT_MS)
    }, MAX_WAIT_MS)

    return () => {
      controls.stop()
      window.clearTimeout(maxWaitTimer)
    }
  }, [alreadyShown, onComplete])

  if (alreadyShown) return null

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[10005] flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: '#1E160E' }}
      animate={exiting ? { y: '-100vh' } : { y: 0 }}
      transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute top-10 left-0 right-0 flex justify-center">
        <span className="font-body text-2xs tracking-[0.45em] text-cream-500 uppercase">
          Портфолио
        </span>
      </div>

      <div className="mb-4 text-center">
        <span
          className="font-display text-cream-100 leading-none tracking-[0.18em] uppercase"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)' }}
        >
          <KineticName text="KETRIN MAXIM" visible={nameVisible} />
        </span>
      </div>

      <div className="relative overflow-hidden">
        <span
          className="font-display text-cream-100 block leading-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', letterSpacing: '-0.04em' }}
        >
          {String(count).padStart(2, '0')}
        </span>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold origin-left"
        style={{ width: '100%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: count / 100 }}
        transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      />
    </motion.div>,
    document.body,
  )
}
