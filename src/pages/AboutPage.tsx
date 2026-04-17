import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const EASE = [0.2, 0, 0, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: EASE },
  }),
}

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
]

export default function AboutPage() {
  const manifestoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef<HTMLDivElement>(null)

  const manifestoInView = useInView(manifestoRef, { once: true, margin: '-80px' })
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' })
  const principlesInView = useInView(principlesRef, { once: true, margin: '-80px' })
  const closingInView = useInView(closingRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section className="flex-1 bg-cream-100 relative overflow-hidden" style={{ paddingTop: 'var(--header-height)' }}>
      <motion.div
        className="absolute top-4 right-0 md:right-10 lg:right-16 font-display leading-none select-none pointer-events-none text-[220px] md:text-[360px] text-gold/[0.18]"
        style={{ y: decorY }}
        aria-hidden
      >
        K
      </motion.div>
      {/* ══════════ HERO ══════════ */}
      <div className="px-6 md:px-10 lg:px-14 pt-10 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-8 md:mb-12"
          >
            <span className="block h-px w-8 bg-gold flex-shrink-0" />
            <span className="font-body text-2xs tracking-[0.35em] text-gold uppercase">
              О фотографе
            </span>
          </motion.div>

          <div className="max-w-3xl">
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display font-light text-warm-dark leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
              >
                Екатерина
                <br />
                <span className="italic text-gold">Максимова</span>
              </motion.h1>

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-5 md:mt-7 flex items-center gap-3"
              >
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
                className="mt-8 md:mt-10 font-body text-warm-medium text-base md:text-lg leading-relaxed max-w-xl"
              >
                Восемь лет я снимаю людей так, как их вижу — без масок и без ретуши.
                В камере остаются живые взгляды, непричёсанные эмоции и те мелочи,
                которые делают вас — вами. Мне важно, чтобы, открыв потом папку со съёмкой,
                вы узнали себя и улыбнулись.
              </motion.p>
          </div>
        </div>
      </div>

      {/* ══════════ MANIFESTO ══════════ */}
      <div ref={manifestoRef} className="px-6 md:px-10 lg:px-14 py-16 md:py-28 bg-cream-200 border-y border-cream-400/60">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={manifestoInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE }}
            className="h-px w-24 bg-gold mx-auto origin-left mb-10 md:mb-14"
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={manifestoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="font-display italic text-warm-dark leading-[1.25]"
            style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.75rem)' }}
          >
            «Не делаю ретушь, потому что — <span className="text-gold">с Вами всё так</span>.
            Красота не в том, чтобы соответствовать картинке. Она в том,
            чтобы быть собой перед камерой — и не бояться этого».
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={manifestoInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="mt-10 md:mt-14 flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-body text-2xs tracking-[0.28em] text-warm-medium uppercase">
              Моя философия
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </motion.div>
        </div>
      </div>

      {/* ══════════ STORY ══════════ */}
      <div ref={storyRef} className="px-6 md:px-10 lg:px-14 py-16 md:py-28">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_7fr] gap-8 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
                Как я сюда пришла
              </span>
              <h2
                className="mt-5 font-display text-warm-dark leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Восемь лет, четыре направления и одна мысль — <span className="italic text-gold">видеть человека</span>.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="space-y-5 md:space-y-6 font-body text-warm-medium text-base md:text-lg leading-relaxed"
            >
              <p>
                Камеру я взяла в руки не из профессиональных амбиций, а чтобы не забыть.
                Снимала друзей на кухне, прогулки у Невы, спектакли, в которых играли близкие.
                Через несколько лет поняла: то, что для меня было способом сохранить время,
                стало профессией и ремеслом.
              </p>
              <p>
                Сейчас я снимаю в четырёх направлениях — студийные портреты, уличные и природные прогулки,
                театр и танец, семейные истории. В каждом из них меня интересует одно и то же:
                момент, когда человек перестаёт «сниматься» и просто живёт в кадре.
                Ради этой секунды я и работаю.
              </p>
              <p>
                Мне близка эстетика естественного света, тёплых тонов и честной плёночной подачи.
                Петербург с его влажным светом и бесконечной архитектурой — идеальная декорация
                для таких съёмок, поэтому чаще всего вы найдёте меня где-то между двориками Петроградки
                и студиями на Васильевском.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════ PRINCIPLES ══════════ */}
      <div ref={principlesRef} className="px-6 md:px-10 lg:px-14 py-16 md:py-28 bg-cream-200 border-y border-cream-400/60">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-10 md:mb-16 max-w-2xl"
          >
            <span className="font-body text-2xs tracking-[0.28em] text-gold uppercase">
              Мой подход
            </span>
            <h2
              className="mt-5 font-display text-warm-dark leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Как устроена моя съёмка
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream-400/60">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 24 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.08 }}
                className="bg-cream-200 p-6 md:p-10 flex gap-4 md:gap-6"
              >
                <span className="font-display text-gold text-base md:text-lg leading-none flex-shrink-0 pt-1 tabular-nums">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-display text-warm-dark text-xl md:text-2xl uppercase tracking-wider leading-none mb-3 md:mb-4">
                    {p.title}
                  </h3>
                  <p className="font-body text-warm-medium text-sm md:text-base leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ CLOSING + CTA ══════════ */}
      <div ref={closingRef} className="px-6 md:px-10 lg:px-14 py-16 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display italic text-warm-dark leading-[1.3]"
            style={{ fontSize: 'clamp(1.25rem, 2.8vw, 2rem)' }}
          >
            Если вам кажется, что «на меня смотреть нечего» — напишите.
            Я умею показать вам вас с той стороны, которую вы <span className="text-gold">никогда не замечали в зеркале</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contacts"
              className="group relative inline-flex items-center gap-4 border border-gold text-gold
                font-body text-2xs uppercase tracking-[0.28em] px-8 py-4
                md:hover:bg-gold md:hover:text-cream-100 md:transition-colors md:duration-300
                w-full sm:w-auto justify-center"
            >
              Написать мне
              <span className="relative flex items-center w-5 h-px bg-current">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-current rotate-45" />
              </span>
            </Link>
            <Link
              to="/#cases"
              className="group inline-flex items-center gap-3 border border-warm-dark/20 md:hover:border-gold
                text-warm-dark font-body text-2xs uppercase tracking-[0.22em] px-8 py-4
                md:transition-colors md:duration-300 w-full sm:w-auto justify-center"
            >
              Посмотреть работы
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
