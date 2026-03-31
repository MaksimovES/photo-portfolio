import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface PhotoCard {
  id: number
  label: string
  genre: string
  fromColor: string
  toColor: string
}

const photos: PhotoCard[] = [
  { id: 1,  label: '001', genre: 'Свадьба',    fromColor: '#F5F0E8', toColor: '#C4B5A8' },
  { id: 2,  label: '002', genre: 'Портрет',    fromColor: '#EDE4D8', toColor: '#DDD3C7' },
  { id: 3,  label: '003', genre: 'Репортаж',   fromColor: '#DDD3C7', toColor: '#C4B5A8' },
  { id: 4,  label: '004', genre: 'Семья',      fromColor: '#F5F0E8', toColor: '#EDE4D8' },
  { id: 5,  label: '005', genre: 'Love story', fromColor: '#EDE4D8', toColor: '#C4B5A8' },
  { id: 6,  label: '006', genre: 'Студия',     fromColor: '#DDD3C7', toColor: '#C4B5A8' },
  { id: 7,  label: '007', genre: 'Свадьба',    fromColor: '#F5F0E8', toColor: '#C4B5A8' },
  { id: 8,  label: '008', genre: 'Портрет',    fromColor: '#EDE4D8', toColor: '#DDD3C7' },
  { id: 9,  label: '009', genre: 'Репортаж',   fromColor: '#DDD3C7', toColor: '#C4B5A8' },
  { id: 10, label: '010', genre: 'Семья',      fromColor: '#F5F0E8', toColor: '#EDE4D8' },
  { id: 11, label: '011', genre: 'Love story', fromColor: '#EDE4D8', toColor: '#C4B5A8' },
  { id: 12, label: '012', genre: 'Студия',     fromColor: '#DDD3C7', toColor: '#C4B5A8' },
]

function Card({ photo, index }: { photo: PhotoCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: (index % 4) * 0.1 }}
    >
      <div
        className="relative overflow-hidden rounded-sm w-full"
        style={{ aspectRatio: '3/4' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${photo.fromColor} 0%, ${photo.toColor} 100%)` }}
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
        {photos.map((photo, i) => (
          <Card key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  )
}
