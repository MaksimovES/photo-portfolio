import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Typography from '../components/Typography'
import { getGenreBySlug } from '../utils/genres'
import { TheatreCarouselBlock } from '../components/TheatreCarousel'
import { GenrePhotoGrid } from '../components/GenrePhotoGrid'
import { StudioTerms } from '../components/StudioTerms'
import { StreetTerms } from '../components/StreetTerms'
import { FamilyTerms } from '../components/FamilyTerms'
import { TheatreTerms } from '../components/TheatreTerms'
import { THEATRE_PRODUCTIONS } from '../data/theatreData'
import { STUDIO_PHOTOS } from '../data/studioData'
import { STREET_PHOTOS } from '../data/streetData'
import { FAMILY_PHOTOS } from '../data/familyData'
import { GENRE_INTRO_TEXTS } from '../data/genreIntroTexts'
const GENRE_PHOTOS: Record<string, string[]> = {
  studio: STUDIO_PHOTOS,
  street: STREET_PHOTOS,
  family: FAMILY_PHOTOS,
}

export default function GenrePage() {
  const { slug } = useParams<{ slug: string }>()
  const genre = slug ? getGenreBySlug(slug) : undefined
  if (!genre) {
    return <Navigate to="/" replace />
  }

  const isTheatre = slug === 'theatre'
  const isStudio = slug === 'studio'
  const isStreet = slug === 'street'
  const isFamily = slug === 'family'
  const gridPhotos = slug ? GENRE_PHOTOS[slug] : undefined

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero section */}
      <section
        className="flex flex-col items-center justify-center px-6 md:px-8 pt-[5.25rem] md:pt-32 pb-4 md:pb-20"
      >
        <div className={`text-center max-w-2xl ${isStudio ? 'space-y-3 md:space-y-6' : 'space-y-6'}`}>
          <Typography
            variant="h2"
            className={`text-warm-dark md:text-5xl ${isStudio ? 'text-2xl' : ''}`}
          >
            {isStudio ? (
              <>
                Персональная съемка
                <span className="md:hidden"> в студии</span>
                <br className="hidden md:block" />
                <span className="hidden md:block">в студии</span>
              </>
            ) : (
              genre.label
            )}
          </Typography>
          {slug && GENRE_INTRO_TEXTS[slug] ? (
            <div className="w-full text-center space-y-4 md:space-y-5">
              {GENRE_INTRO_TEXTS[slug].map((text) => (
                <p
                  key={text}
                  className="font-body text-[0.9375rem] sm:text-base md:text-lg leading-[1.65] text-pretty"
                >
                  <span className="text-warm-medium">
                    {text.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex} className={lineIndex > 0 ? 'block' : undefined}>
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <Typography variant="h2" className="text-warm-medium text-xl md:text-xl">
              {genre.description}
            </Typography>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 pt-4 md:pt-8">
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

      {isStudio ? (
        <StudioTerms />
      ) : isStreet ? (
        <StreetTerms />
      ) : isFamily ? (
        <FamilyTerms />
      ) : (
        <TheatreTerms />
      )}
    </div>
  )
}
