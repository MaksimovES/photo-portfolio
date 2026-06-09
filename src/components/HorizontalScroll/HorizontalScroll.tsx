import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MAIN_PAGE_WORK_PHOTOS } from '@/data/mainPageData'

function Card({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: (index % 4) * 0.1 }}
    >
      <div
        className="relative overflow-hidden rounded-sm w-full bg-cream-200"
        style={{ aspectRatio: '3/4' }}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading={index < 4 ? 'eager' : 'lazy'}
        />
      </div>
    </motion.div>
  )
}

export default function HorizontalScroll() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section
      id="works"
      className="bg-cream-100 py-20 md:py-28"
    >
      {/* Section title */}
      <div ref={titleRef} className="px-4 md:px-6 mb-10 md:mb-14">
        <motion.h2
          className="font-display text-display-sm text-warm-dark"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          Примеры работ
        </motion.h2>
      </div>

      {/* Photo grid: 2 cols mobile, 4 cols desktop */}
      <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {MAIN_PAGE_WORK_PHOTOS.map((src, i) => (
          <Card key={src} src={src} index={i} />
        ))}
      </div>
    </section>
  )
}
