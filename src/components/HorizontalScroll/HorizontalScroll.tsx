import { motion } from 'framer-motion'
import { MAIN_PAGE_WORK_PHOTOS } from '@/data/mainPageData'
import { getHomeGridImageAttrs } from '@/utils/images'
import { useMdViewport } from '@/hooks/useMdViewport'

function Card({
  src,
  index,
  eager,
}: {
  src: string
  index: number
  eager: boolean
}) {
  const imageAttrs = getHomeGridImageAttrs(src)
  const transition = {
    duration: 0.6,
    ease: [0.2, 0, 0, 1] as [number, number, number, number],
    delay: eager ? index * 0.08 : (index % 4) * 0.1,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: eager ? 16 : 32 }}
      {...(eager
        ? { animate: { opacity: 1, y: 0 }, transition }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-40px' },
            transition,
          })}
    >
      <div
        className="relative overflow-hidden rounded-sm w-full bg-cream-200"
        style={{ aspectRatio: '3/4' }}
      >
        <img
          {...imageAttrs}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </motion.div>
  )
}

export default function HorizontalScroll() {
  const isMd = useMdViewport()

  return (
    <section
      id="works"
      className="bg-cream-100 scroll-mt-[var(--header-height)] pt-6 pb-2 md:pt-6 md:pb-3 lg:pt-8"
    >
      <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {MAIN_PAGE_WORK_PHOTOS.map((src, i) => (
          <Card key={src} src={src} index={i} eager={!isMd && i < 2} />
        ))}
      </div>
    </section>
  )
}
