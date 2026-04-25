import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Typography from '../components/Typography'
import { getGenreBySlug } from '../utils/genres'
import { TheatreCarouselBlock } from '../components/TheatreCarousel'
import { GenrePhotoGrid } from '../components/GenrePhotoGrid'
import { THEATRE_PRODUCTIONS } from '../data/theatreData'
import { STUDIO_PHOTOS } from '../data/studioData'
import { STREET_PHOTOS } from '../data/streetData'
import { FAMILY_PHOTOS } from '../data/familyData'
import { useIsDesktop } from '../hooks/useIsDesktop'

const GENRE_PHOTOS: Record<string, string[]> = {
  studio: STUDIO_PHOTOS,
  street: STREET_PHOTOS,
  family: FAMILY_PHOTOS,
}

export default function GenrePage() {
  const { slug } = useParams<{ slug: string }>()
  const genre = slug ? getGenreBySlug(slug) : undefined
  const isDesktop = useIsDesktop()

  if (!genre) {
    return <Navigate to="/" replace />
  }

  const isTheatre = slug === 'theatre'
  const gridPhotos = slug ? GENRE_PHOTOS[slug] : undefined

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center px-8 pt-32 pb-20">
        <div className="text-center space-y-6 max-w-2xl">
          <Typography variant="label" className="text-gold tracking-[0.3em]">
            {genre.number} — {genre.labelEn}
          </Typography>
          <Typography variant="h2" className="text-warm-dark md:text-5xl">
            {genre.label}
          </Typography>
          <Typography variant="h2" className="text-warm-medium text-xl md:text-xl">
            {genre.description}
          </Typography>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 pt-8">
          <span className="h-px w-16 bg-gold/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <span className="h-px w-16 bg-gold/30" />
        </div>
      </section>

      {/* Theatre: carousel blocks */}
      {isTheatre && (
        <section className="pb-10 md:pb-32">
          <div className="space-y-20 md:space-y-28">
            {THEATRE_PRODUCTIONS.map((prod, i) => (
              <TheatreCarouselBlock
                key={prod.production}
                director={prod.director}
                production={prod.production}
                photos={prod.photos}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Other genres: photo grid */}
      {!isTheatre && gridPhotos && (
        <section className="pb-10 md:pb-32">
          <GenrePhotoGrid photos={gridPhotos} />
        </section>
      )}

      {/* Back to directions */}
      <div className="pb-8 md:pb-14 px-6 md:px-14">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#directions"
              className="inline-flex items-center gap-3 py-3 group"
            >
              <motion.span
                className="text-gold"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.6 }}
              >
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                  <path d="M8 2L3 7L8 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
              <span className="font-body text-2xs uppercase tracking-[0.22em] text-warm-medium md:group-hover:text-gold transition-colors duration-300">
                Все направления
              </span>
              <span className="h-px w-6 bg-gold/30" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* CTA — записаться */}
      <section className="pb-16 md:pb-24 px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
          className="max-w-screen-xl mx-auto flex flex-col items-center text-center gap-4 md:gap-5"
        >
          <span className="font-body text-2xs uppercase tracking-[0.3em] text-gold/60">
            Хочется в кадр?
          </span>
          <p className="font-display font-light text-xl md:text-[2rem] leading-tight tracking-[-0.02em] text-warm-dark">
            Запишитесь на съёмку
          </p>
          <p className="font-body text-xs md:text-sm text-warm-medium max-w-[240px] md:max-w-xs leading-relaxed">
            Напишите в Telegram — обсудим формат, дату и детали
          </p>

          <motion.a
            href="https://t.me/ketrin_maxim"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-4 flex items-center gap-2.5 px-7 py-3 md:px-10 md:py-4 border border-gold/40 rounded-sm overflow-hidden"
            whileHover={isDesktop ? { scale: 1.02 } : undefined}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 bg-gold/10"
              initial={{ x: '-100%' }}
              whileHover={isDesktop ? { x: 0 } : undefined}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            />
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-gold relative z-10 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="font-body text-xs md:text-sm tracking-[0.18em] uppercase text-gold relative z-10">
              Записаться
            </span>
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
