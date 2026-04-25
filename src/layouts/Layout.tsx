import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/Header'
import MenuOverlay from '../components/MenuOverlay'
import Footer from '../components/Footer'

function ScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

const SCROLL_TOP_THRESHOLD = 600

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_TOP_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9998] w-10 h-10 md:w-12 md:h-12
            flex items-center justify-center
            bg-cream-100/90 backdrop-blur-sm border border-cream-400/60
            text-warm-dark md:hover:text-gold md:hover:border-gold
            transition-colors duration-300 rounded-full shadow-sm"
          aria-label="Наверх"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="md:w-5 md:h-5">
            <path d="M7 12V2M7 2L3 6M7 2L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const outlet = useOutlet()
  const isMenuTransition = Boolean((location.state as { fromMenu?: boolean } | null)?.fromMenu)
  const pendingHash = useRef<string | null>(null)
  const scrollPending = useRef(false)
  const hashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pageTransition = isMenuTransition
    ? {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }
    : {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }
  const pageExit = isMenuTransition
    ? {
        duration: 0.28,
        ease: [0.4, 0, 1, 1] as [number, number, number, number],
      }
    : {
        duration: 0.45,
        ease: [0.4, 0, 1, 1] as [number, number, number, number],
      }

  useEffect(() => {
    setMenuOpen(false)
    if (location.hash) {
      pendingHash.current = location.hash.slice(1)
    } else {
      pendingHash.current = null
    }
    scrollPending.current = true
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    return () => {
      if (hashTimerRef.current !== null) clearTimeout(hashTimerRef.current)
    }
  }, [])

  const handleExitComplete = useCallback(() => {
    if (scrollPending.current) {
      window.scrollTo(0, 0)
      scrollPending.current = false
    }
    const hash = pendingHash.current
    if (hash) {
      hashTimerRef.current = setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        pendingHash.current = null
        hashTimerRef.current = null
      }, 350)
    }
  }, [])

  return (
    <>
      <Header isMenuOpen={menuOpen} onMenuToggle={() => setMenuOpen((prev) => !prev)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          {outlet ? (
            <motion.div
              key={location.pathname}
              className="flex-1 flex flex-col will-change-transform"
              initial={{ opacity: 0, y: isMenuTransition ? 18 : 28 }}
              animate={{ opacity: 1, y: 0, transition: pageTransition }}
              exit={{ opacity: 0, y: -18, transition: pageExit }}
            >
              <ScrollToTop />
              {outlet}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      <BackToTopButton />
      <Footer />
    </>
  )
}
