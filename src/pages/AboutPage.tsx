import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedCounter } from '../components/Hero/heroUtils'
import Typography from '../components/Typography'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { GENRES } from '../utils/genres'

const EASE = [0.2, 0, 0, 1] as const
const PHOTO_SRC = 'https://picsum.photos/seed/about-ketrin/600/800'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: EASE },
  }),
}

const mobileFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: EASE },
  }),
}

const stats = [
  { to: 8, label: 'лет в профессии' },
  { to: 4, label: 'направления' },
  { to: 127, label: 'историй снято' },
] as const

const principles = [
  {
    number: '01',
    title: 'Без ретуши',
    text: 'Я не разглаживаю кожу и не переделываю черты. Морщинки у глаз, родинки, веснушки — это вы, и это красиво. Моя задача — поймать вас настоящих, а не собрать из вас «идеальную картинку».',
  },
  {
    number: '02',
    title: 'Свет как соавтор',
    text: 'Мягкий оконный свет, закатная охра, контраст сцены — я долго выбираю, где и когда мы встретимся. Свет делает половину кадра, и я стараюсь, чтобы он работал на вас.',
  },
  {
    number: '03',
    title: 'Разговор, а не постановка',
    text: 'На съёмке мы говорим. О детстве, о любимой музыке, о том, что было утром. Лучшие кадры рождаются в паузах между «позируйте», когда вы уже забыли про камеру.',
  },
  {
    number: '04',
    title: 'Кадр, который останется',
    text: 'Я снимаю так, чтобы фотографии хотелось печатать и держать в руках. Не ленту сториз, а семейные альбомы, рамки на стене, открытки близким.',
  },
] as const

const storyChapters = [
  {
    marker: 'Начало',
    text: 'Камеру я взяла в руки не из профессиональных амбиций, а чтобы не забыть. Снимала друзей на кухне, прогулки у Невы, спектакли, в которых играли близкие. Через несколько лет поняла: то, что для меня было способом сохранить время, стало профессией и ремеслом.',
  },
  {
    marker: 'Сейчас',
    text: 'Сейчас я снимаю в четырёх направлениях — студийные портреты, уличные и природные прогулки, театр и танец, семейные истории. В каждом из них меня интересует одно и то же: момент, когда человек перестаёт «сниматься» и просто живёт в кадре. Ради этой секунды я и работаю.',
  },
  {
    marker: 'Петербург',
    text: 'Мне близка эстетика естественного света, тёплых тонов и честной плёночной подачи. Петербург с его влажным светом и бесконечной архитектурой — идеальная декорация для таких съёмок, поэтому чаще всего вы найдёте меня где-то между двориками Петроградки и студиями на Васильевском.',
  },
] as const

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-8 bg-gold flex-shrink-0" />
      <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">{children}</span>
    </div>
  )
}

function CornerAccents({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
      <motion.span
        className="absolute top-0 left-0 block h-px bg-gold"
        initial={{ width: 0 }}
        animate={animate ? { width: 22 } : { width: 0 }}
        transition={{ delay: 1.05, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute top-0 left-0 block w-px bg-gold"
        initial={{ height: 0 }}
        animate={animate ? { height: 22 } : { height: 0 }}
        transition={{ delay: 1.05, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute top-0 right-0 block h-px bg-gold"
        style={{ transformOrigin: 'right' }}
        initial={{ width: 0 }}
        animate={animate ? { width: 22 } : { width: 0 }}
        transition={{ delay: 1.15, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute top-0 right-0 block w-px bg-gold"
        initial={{ height: 0 }}
        animate={animate ? { height: 22 } : { height: 0 }}
        transition={{ delay: 1.15, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 left-0 block h-px bg-gold/50"
        initial={{ width: 0 }}
        animate={animate ? { width: 22 } : { width: 0 }}
        transition={{ delay: 1.25, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 left-0 block w-px bg-gold/50"
        initial={{ height: 0 }}
        animate={animate ? { height: 22 } : { height: 0 }}
        transition={{ delay: 1.25, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 right-0 block h-px bg-gold/50"
        style={{ transformOrigin: 'right' }}
        initial={{ width: 0 }}
        animate={animate ? { width: 22 } : { width: 0 }}
        transition={{ delay: 1.35, duration: 0.4, ease: EASE }}
      />
      <motion.span
        className="absolute bottom-0 right-0 block w-px bg-gold/50"
        initial={{ height: 0 }}
        animate={animate ? { height: 22 } : { height: 0 }}
        transition={{ delay: 1.35, duration: 0.4, ease: EASE }}
      />
    </motion.div>
  )
}

function HeroPhotoPanel() {
  return (
    <div className="relative h-[42dvh] md:h-auto md:min-h-[520px] lg:min-h-[600px] flex items-stretch">
      <motion.div
        className="absolute inset-3 md:inset-5 lg:inset-6 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 border border-gold/35 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
      />

      <div className="relative flex-1 m-3 md:m-5 lg:m-6 overflow-hidden bg-cream-200">
        <motion.div
          className="absolute inset-0 z-20 bg-cream-300 origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        />

        <motion.img
          src={PHOTO_SRC}
          alt="Екатерина Максимова — фотограф"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          loading="eager"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE, delay: 0.2 }}
        />

        <CornerAccents animate />

        <motion.div
          className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 bg-cream-100/90 backdrop-blur-sm px-4 py-3 border border-cream-400/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
        >
          <span className="block font-body text-2xs tracking-[0.22em] text-gold uppercase">Санкт-Петербург</span>
          <span className="mt-1 block font-display text-warm-dark text-sm md:text-base">Екатерина Максимова</span>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ to, label, index }: { to: number; label: string; index: number }) {
  return (
    <motion.div
      custom={4 + index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-1.5 md:gap-2 rounded-sm bg-cream-100/80 border border-cream-400/70 px-5 py-4 md:px-6 md:py-5"
    >
      <span
        className="font-display font-light text-warm-dark leading-none tabular-nums"
        style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
      >
        <AnimatedCounter to={to} isVisible delay={0.5 + index * 0.1} />
      </span>
      <span className="font-body text-2xs tracking-[0.14em] text-warm-medium uppercase leading-snug">
        {label}
      </span>
    </motion.div>
  )
}

function PrincipleRow({
  number,
  title,
  text,
  index,
  inView,
}: {
  number: string
  title: string
  text: string
  index: number
  inView: boolean
}) {
  const isDesktop = useIsDesktop()

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="group relative grid grid-cols-1 lg:grid-cols-[72px_minmax(0,220px)_1fr] gap-4 lg:gap-8 py-7 lg:py-9 border-b border-cream-400/60 last:border-b-0"
      whileHover={isDesktop ? { x: 4 } : undefined}
    >
      <span className="font-display text-gold text-base lg:text-lg leading-none tabular-nums pt-1">{number}</span>
      <h3 className="font-display text-warm-dark text-xl lg:text-2xl uppercase tracking-wider leading-none md:group-hover:text-gold md:transition-colors md:duration-300">
        {title}
      </h3>
      <p className="font-body text-warm-medium text-sm lg:text-base leading-relaxed lg:max-w-2xl">{text}</p>
    </motion.div>
  )
}

function GenreLinkCard({
  slug,
  label,
  number,
  description,
  index,
  inView,
}: {
  slug: string
  label: string
  number: string
  description: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.12 + index * 0.07 }}
    >
      <Link
        to={`/genre/${slug}`}
        className="group relative flex flex-col justify-between min-h-[148px] lg:min-h-[168px] px-6 lg:px-8 py-6 lg:py-7 bg-cream-100/90 border border-cream-400/50 md:hover:border-gold/40 md:hover:bg-cream-50 md:transition-[background-color,border-color] md:duration-500"
      >
        <motion.span
          className="absolute inset-y-0 left-0 w-px bg-gold/0 md:group-hover:bg-gold/45 md:transition-colors md:duration-500"
          aria-hidden
        />

        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-gold text-sm tabular-nums">{number}</span>
          <span
            className="relative flex items-center w-8 h-px bg-gold/25 md:group-hover:bg-gold md:group-hover:w-10 md:transition-all md:duration-500 flex-shrink-0 mt-2"
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-gold/40 md:group-hover:border-gold rotate-45 md:transition-colors md:duration-500" />
          </span>
        </div>

        <div>
          <p
            className="font-display text-warm-dark leading-[0.95] tracking-[-0.02em] md:group-hover:text-gold md:transition-colors md:duration-500"
            style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)' }}
          >
            {label}
          </p>
          <p className="mt-2 font-body text-2xs tracking-[0.18em] uppercase text-warm-muted">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function DesktopAboutLayout() {
  const ref = useRef<HTMLElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)
  const genresRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const manifestoInView = useInView(manifestoRef, { once: true, margin: '-80px' })
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' })
  const principlesInView = useInView(principlesRef, { once: true, margin: '-80px' })
  const genresInView = useInView(genresRef, { once: true, margin: '-80px' })
  const closingInView = useInView(closingRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="flex-1 bg-cream-100 relative overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <motion.div
        className="absolute top-4 right-0 lg:right-10 xl:right-16 font-display leading-none select-none pointer-events-none text-[280px] lg:text-[380px] text-gold/[0.16]"
        style={{ y: decorY }}
        aria-hidden
      >
        K
      </motion.div>

      {/* Hero */}
      <div className="px-10 lg:px-14 pt-16 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12 lg:gap-16 xl:gap-24 items-start">
            <div className="max-w-xl lg:max-w-none lg:pt-6">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-10 lg:mb-14">
                <SectionLabel>О фотографе</SectionLabel>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display font-light text-warm-dark leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5rem)' }}
              >
                Екатерина
                <br />
                <span className="italic text-gold">Максимова</span>
              </motion.h1>

              <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-6 lg:mt-8 flex items-center gap-3">
                <span className="block h-px w-6 bg-warm-medium/40" />
                <span className="font-body text-2xs tracking-[0.28em] text-warm-medium uppercase">
                  Фотограф · Санкт-Петербург
                </span>
              </motion.div>

              <motion.p
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 lg:mt-10 font-body text-warm-medium text-base lg:text-lg leading-relaxed max-w-lg"
              >
                Восемь лет я снимаю людей так, как их вижу — без масок и без ретуши. В камере остаются живые
                взгляды, непричёсанные эмоции и те мелочи, которые делают вас — вами. Мне важно, чтобы, открыв
                потом папку со съёмкой, вы узнали себя и улыбнулись.
              </motion.p>

              <div className="mt-8 lg:mt-10 grid grid-cols-3 gap-3 lg:gap-4">
                {stats.map((stat, i) => (
                  <StatCard key={stat.label} to={stat.to} label={stat.label} index={i} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            >
              <HeroPhotoPanel />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <div ref={manifestoRef} className="relative px-10 lg:px-14 py-24 lg:py-32 bg-cream-200 border-y border-cream-400/60 overflow-hidden">
        <span
          className="absolute -left-4 lg:left-6 top-1/2 -translate-y-1/2 font-display text-[180px] lg:text-[280px] text-gold/[0.12] leading-none select-none pointer-events-none"
          aria-hidden
        >
          «
        </span>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={manifestoInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-px w-24 bg-gold mx-auto origin-center mb-10 lg:mb-14"
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="font-display italic text-warm-dark leading-[1.22] text-balance"
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3rem)' }}
          >
            Не делаю ретушь, потому что — <span className="text-gold">с Вами всё так</span>. Красота не в том,
            чтобы соответствовать картинке. Она в том, чтобы быть собой перед камерой — и не бояться этого.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={manifestoInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="mt-10 lg:mt-14 flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-body text-2xs tracking-[0.28em] text-warm-medium uppercase">Моя философия</span>
            <span className="h-px w-10 bg-gold/40" />
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div ref={storyRef} className="px-10 lg:px-14 py-20 lg:py-32">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_7fr] gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">Как я сюда пришла</span>
              <h2
                className="mt-5 font-display text-warm-dark leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}
              >
                Восемь лет, четыре направления и одна мысль — <span className="italic text-gold">видеть человека</span>.
              </h2>
            </motion.div>

            <div className="relative">
              <span className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent hidden lg:block" aria-hidden />

              <div className="space-y-10 lg:space-y-14 lg:pl-10">
                {storyChapters.map((chapter, i) => (
                  <motion.article
                    key={chapter.marker}
                    initial={{ opacity: 0, y: 26 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.15 + i * 0.12 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="hidden lg:flex w-2 h-2 rounded-full bg-gold/70 flex-shrink-0 -ml-[1.35rem]" aria-hidden />
                      <span className="font-body text-2xs tracking-[0.24em] text-gold uppercase">{chapter.marker}</span>
                      <span className="h-px flex-1 bg-cream-400/70" />
                    </div>
                    <p className="font-body text-warm-medium text-base lg:text-lg leading-relaxed">{chapter.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div ref={principlesRef} className="px-10 lg:px-14 py-20 lg:py-32 bg-cream-200 border-y border-cream-400/60">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-10 lg:mb-14 max-w-2xl"
          >
            <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">Мой подход</span>
            <h2
              className="mt-5 font-display text-warm-dark leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}
            >
              Как устроена моя съёмка
            </h2>
          </motion.div>

          <div className="border-t border-cream-400/60">
            {principles.map((p, i) => (
              <PrincipleRow
                key={p.number}
                number={p.number}
                title={p.title}
                text={p.text}
                index={i}
                inView={principlesInView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Genres */}
      <div ref={genresRef} className="px-10 lg:px-14 py-20 lg:py-32">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={genresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative border border-cream-400/70 bg-cream-200/40 overflow-hidden"
          >
            <span className="absolute top-0 left-0 w-10 h-10 border-l border-t border-gold/35 pointer-events-none" aria-hidden />
            <span className="absolute bottom-0 right-0 w-10 h-10 border-r border-b border-gold/35 pointer-events-none" aria-hidden />

            <div className="px-10 lg:px-14 xl:px-16 py-12 lg:py-16 border-b border-cream-400/60">
              <SectionLabel>Направления</SectionLabel>
              <h2
                className="mt-6 font-display font-light text-warm-dark leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
              >
                Четыре способа
                <br />
                <span className="italic text-gold">увидеть вас</span>
              </h2>
              <p className="mt-6 font-body text-warm-medium text-base lg:text-lg leading-relaxed max-w-xl">
                В каждом направлении — та же честность и внимание к свету. Выберите формат, который ближе к вашей
                истории.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {GENRES.map((genre, i) => (
                <GenreLinkCard
                  key={genre.slug}
                  slug={genre.slug}
                  label={genre.label}
                  number={genre.number}
                  description={genre.description}
                  index={i}
                  inView={genresInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Closing */}
      <div ref={closingRef} className="px-10 lg:px-14 pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display italic text-warm-dark leading-[1.3] text-balance"
            style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.25rem)' }}
          >
            Если вам кажется, что «на меня смотреть нечего» — напишите. Я умею показать вам вас с той стороны,
            которую вы <span className="text-gold">никогда не замечали в зеркале</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mt-10 lg:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contacts"
              className="group relative inline-flex items-center gap-4 border border-gold text-gold font-body text-2xs uppercase tracking-[0.28em] px-8 py-4 md:hover:bg-gold md:hover:text-cream-100 md:transition-colors md:duration-300 w-full sm:w-auto justify-center"
            >
              Написать мне
              <span className="relative flex items-center w-5 h-px bg-current">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-current rotate-45" />
              </span>
            </Link>
            <Link
              to="/#cases"
              className="group inline-flex items-center gap-3 border border-warm-dark/20 md:hover:border-gold text-warm-dark font-body text-2xs uppercase tracking-[0.22em] px-8 py-4 md:transition-colors md:duration-300 w-full sm:w-auto justify-center"
            >
              Посмотреть работы
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MobileAboutLayout() {
  const manifestoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const manifestoInView = useInView(manifestoRef, { once: true, margin: '-60px' })
  const storyInView = useInView(storyRef, { once: true, margin: '-60px' })
  const principlesInView = useInView(principlesRef, { once: true, margin: '-60px' })

  return (
    <section className="flex-1 bg-cream-100 relative overflow-hidden" style={{ paddingTop: 'var(--header-height)' }}>
      <div className="px-5 sm:px-8 pt-10 pb-8">
        <motion.div custom={0} variants={mobileFadeUp} initial="hidden" animate="visible">
          <Typography variant="label" className="text-gold tracking-[0.3em]">
            О фотографе
          </Typography>
        </motion.div>

        <motion.div custom={1} variants={mobileFadeUp} initial="hidden" animate="visible" className="mt-5">
          <h1
            className="font-display font-light text-warm-dark leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.1rem, 9vw, 3rem)' }}
          >
            Екатерина
            <br />
            <span className="italic text-gold">Максимова</span>
          </h1>
        </motion.div>

        <motion.div custom={2} variants={mobileFadeUp} initial="hidden" animate="visible" className="mt-4">
          <Typography variant="caption" className="text-warm-medium tracking-[0.22em] uppercase">
            Фотограф · Санкт-Петербург
          </Typography>
        </motion.div>

        <motion.div custom={3} variants={mobileFadeUp} initial="hidden" animate="visible" className="mt-6">
          <HeroPhotoPanel />
        </motion.div>

        <motion.div custom={4} variants={mobileFadeUp} initial="hidden" animate="visible" className="mt-6">
          <Typography variant="body" className="text-warm-medium leading-relaxed text-sm sm:text-base">
            Восемь лет я снимаю людей так, как их вижу — без масок и без ретуши. В камере остаются живые взгляды,
            непричёсанные эмоции и те мелочи, которые делают вас — вами.
          </Typography>
        </motion.div>

        <motion.div custom={5} variants={mobileFadeUp} initial="hidden" animate="visible" className="mt-5 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 rounded-sm bg-cream-200 border border-cream-400/70 px-3 py-3 text-center"
            >
              <span className="font-display text-warm-dark text-xl tabular-nums leading-none">{stat.to}</span>
              <span className="font-body text-[9px] tracking-[0.1em] text-warm-medium uppercase leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div ref={manifestoRef} className="px-5 sm:px-8 py-12 bg-cream-200 border-y border-cream-400/60">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          className="font-display italic text-warm-dark leading-[1.28] text-center"
          style={{ fontSize: 'clamp(1.2rem, 5.5vw, 1.65rem)' }}
        >
          «Не делаю ретушь, потому что — <span className="text-gold">с Вами всё так</span>. Красота не в том,
          чтобы соответствовать картинке. Она в том, чтобы быть собой перед камерой — и не бояться этого».
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={manifestoInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="mt-6 text-center font-body text-2xs tracking-[0.24em] text-warm-medium uppercase"
        >
          Моя философия
        </motion.p>
      </div>

      <div ref={storyRef} className="px-5 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <Typography variant="label" className="text-gold tracking-[0.24em]">
            Как я сюда пришла
          </Typography>
          <h2
            className="mt-4 font-display text-warm-dark leading-[1.08] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.45rem, 6vw, 2rem)' }}
          >
            Восемь лет, четыре направления и одна мысль — <span className="italic text-gold">видеть человека</span>.
          </h2>
        </motion.div>

        <div className="mt-7 space-y-6">
          {storyChapters.map((chapter, i) => (
            <motion.div
              key={chapter.marker}
              initial={{ opacity: 0, y: 18 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.12 + i * 0.1 }}
            >
              <span className="font-body text-2xs tracking-[0.2em] text-gold uppercase">{chapter.marker}</span>
              <p className="mt-2 font-body text-warm-medium text-sm sm:text-base leading-relaxed">{chapter.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={principlesRef} className="px-5 sm:px-8 py-12 bg-cream-200 border-y border-cream-400/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={principlesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <Typography variant="label" className="text-gold tracking-[0.24em]">
            Мой подход
          </Typography>
          <h2
            className="mt-4 font-display text-warm-dark leading-[1.08]"
            style={{ fontSize: 'clamp(1.45rem, 6vw, 2rem)' }}
          >
            Как устроена моя съёмка
          </h2>
        </motion.div>

        <div className="mt-7 space-y-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 16 }}
              animate={principlesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 + i * 0.08 }}
              className="bg-cream-100 border border-cream-400/60 p-5"
            >
              <div className="flex items-start gap-3">
                <span className="font-display text-gold text-sm tabular-nums pt-0.5">{p.number}</span>
                <div>
                  <h3 className="font-display text-warm-dark text-lg uppercase tracking-wider leading-none">{p.title}</h3>
                  <p className="mt-3 font-body text-warm-medium text-sm leading-relaxed">{p.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 py-12">
        <Typography variant="label" className="text-gold tracking-[0.24em]">
          Направления
        </Typography>
        <div className="mt-5 flex flex-col gap-3">
          {GENRES.map((genre) => (
            <Link
              key={genre.slug}
              to={`/genre/${genre.slug}`}
              className="flex items-center justify-between border border-cream-400/70 bg-cream-200/50 px-5 py-4"
            >
              <div>
                <span className="font-display text-warm-dark text-lg">{genre.label}</span>
                <span className="mt-1 block font-body text-2xs tracking-[0.16em] uppercase text-warm-muted">
                  {genre.description}
                </span>
              </div>
              <span className="font-display text-gold text-sm tabular-nums">{genre.number}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 pb-20 text-center">
        <p
          className="font-display italic text-warm-dark leading-[1.32]"
          style={{ fontSize: 'clamp(1.15rem, 5vw, 1.5rem)' }}
        >
          Если вам кажется, что «на меня смотреть нечего» — напишите. Я умею показать вас с той стороны, которую вы{' '}
          <span className="text-gold">никогда не замечали в зеркале</span>.
        </p>

        <div className="mt-8 flex flex-col gap-3 max-w-[320px] mx-auto">
          <Link
            to="/contacts"
            className="inline-flex items-center justify-center gap-3 border border-gold text-gold font-body text-2xs uppercase tracking-[0.24em] px-8 py-4 md:hover:bg-gold md:hover:text-cream-100 md:transition-colors md:duration-300"
          >
            Написать мне
          </Link>
          <Link
            to="/#cases"
            className="inline-flex items-center justify-center border border-warm-dark/20 text-warm-dark font-body text-2xs uppercase tracking-[0.2em] px-8 py-4"
          >
            Посмотреть работы
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <div className="md:hidden">
        <MobileAboutLayout />
      </div>
      <div className="hidden md:block">
        <DesktopAboutLayout />
      </div>
    </>
  )
}
