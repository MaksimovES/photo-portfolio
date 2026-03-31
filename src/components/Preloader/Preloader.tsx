import { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

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

    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.2, 0, 0, 1] as [number, number, number, number],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setExiting(true)
          setTimeout(() => {
            document.body.classList.remove('no-grain')
            sessionStorage.setItem('portfolio_preloader_shown', '1')
            onComplete()
          }, 820)
        }, 200)
      },
    })

    return () => controls.stop()
  }, [alreadyShown, onComplete])

  if (alreadyShown) return null

  return (
    <motion.div
      className="fixed inset-0 z-[10005] flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: '#1E160E' }}
      animate={exiting ? { y: '-100vh' } : { y: 0 }}
      transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top label */}
      <div className="absolute top-10 left-0 right-0 flex justify-center">
        <span className="font-body text-2xs tracking-[0.45em] text-cream-500 uppercase">
          Портфолио
        </span>
      </div>

      {/* Name */}
      <div className="mb-4 text-center">
        <span
          className="font-display text-cream-100 leading-none tracking-[0.18em] uppercase"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)' }}
        >
          <KineticName text="KETRIN MAXIM" visible={nameVisible} />
        </span>
      </div>

      {/* Counter */}
      <div className="relative overflow-hidden">
        <motion.span
          className="font-display text-cream-100 block leading-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', letterSpacing: '-0.04em' }}
          key={count}
          animate={{ opacity: 1 }}
        >
          {String(count).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold origin-left"
        style={{ width: '100%' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.2, 0, 0, 1] }}
      />
    </motion.div>
  )
}
