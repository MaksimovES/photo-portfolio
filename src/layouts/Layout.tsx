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
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  // Smooth-scroll to #hash target after page transition settles.
  // Runs on every navigation (location.key changes) so hash links work
  // both cross-page (e.g. /about → /#cases) and same-page.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    if (!id) return
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 850)
    return () => window.clearTimeout(timer)
  }, [location.key, location.hash])

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
        <AnimatePresence mode={isMenuTransition ? 'sync' : 'wait'} onExitComplete={() => { if (!location.hash) window.scrollTo(0, 0) }}>
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
