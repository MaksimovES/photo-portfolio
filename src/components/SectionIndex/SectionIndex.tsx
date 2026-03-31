import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = ['hero', 'directions', 'forwhom', 'cases', 'reviews', 'faq']
const TOTAL = SECTIONS.length

const pad = (n: number) => String(n).padStart(2, '0')

export default function SectionIndex({ visible }: { visible: boolean }) {
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrent(index + 1)
        },
        { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <motion.div
      // z-[9998]: под зернистостью (9999), над фото Hero (нужно опустить там до < 9998), под меню (10002+)
      className="hidden md:flex fixed bottom-4 right-6 md:bottom-10 md:right-10 z-[9998] items-center gap-3 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.2, 0, 0, 1] }}
    >
      <div className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.22em] uppercase">
        <motion.span
          key={current}
          className="text-warm-dark"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          {pad(current)}
        </motion.span>
        <span className="text-warm-medium/40">/</span>
        <span className="text-warm-medium/40">{pad(TOTAL)}</span>
      </div>

      {/* Vertical line */}
      <div className="w-px h-10 bg-gold/35" />
    </motion.div>
  )
}
