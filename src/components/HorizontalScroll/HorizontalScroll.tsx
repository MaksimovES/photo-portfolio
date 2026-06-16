import { motion } from 'framer-motion'
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
  return (
    <section
      id="works"
      className="bg-cream-100 scroll-mt-[var(--header-height)] pt-2 pb-4 md:pt-10 md:pb-6 lg:pt-14"
    >
      <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {MAIN_PAGE_WORK_PHOTOS.map((src, i) => (
          <Card key={src} src={src} index={i} />
        ))}
      </div>
    </section>
  )
}
