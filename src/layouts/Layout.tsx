import { useState, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/Header'
import MenuOverlay from '../components/MenuOverlay'
import Footer from '../components/Footer'


export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const outlet = useOutlet()
  const isMenuTransition = Boolean((location.state as { fromMenu?: boolean } | null)?.fromMenu)
  const pageTransition = isMenuTransition
    ? {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    : {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
  const pageExit = isMenuTransition
    ? {
        duration: 0.28,
        ease: [0.4, 0, 1, 1] as [number, number, number, number]
      }
    : {
        duration: 0.45,
        ease: [0.4, 0, 1, 1] as [number, number, number, number]
      }

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

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

  return (
    <>
      <Header isMenuOpen={menuOpen} onMenuToggle={() => setMenuOpen((prev) => !prev)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode={isMenuTransition ? 'sync' : 'wait'} onExitComplete={() => window.scrollTo(0, 0)}>
          {outlet ? (
            <motion.div
              key={location.pathname}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, y: isMenuTransition ? 18 : 28 }}
              animate={{ opacity: 1, y: 0, transition: pageTransition }}
              exit={{ opacity: 0, y: -18, transition: pageExit }}
            >
              {outlet}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
