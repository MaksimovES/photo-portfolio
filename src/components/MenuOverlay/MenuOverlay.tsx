import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { GENRES } from '../../utils/genres'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const overlayVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
}

const listVariants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
}

const itemVariants = {
  closed: { y: 50, opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  open: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } },
}

const bottomVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7, ease: [0.2, 0, 0, 1] } },
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      onClose()
      return
    }
    onClose()
    setTimeout(() => navigate(path, { state: { fromMenu: true } }), 40)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10002] bg-[#1A1008] flex flex-col"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Основной контент */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 md:pt-24 pb-4 md:pb-10 overflow-y-auto">
            {/* Тонкая золотая линия слева */}
            <motion.div
              className="absolute left-6 md:left-16 lg:left-24 top-28 bottom-28 w-px bg-gold/20 hidden md:block"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isOpen ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            />

            {/* Жанры */}
            <motion.nav variants={listVariants} initial="closed" animate="open">
              <ul className="space-y-0">
                {/* На главную */}
                <motion.li variants={itemVariants}>
                  <motion.button
                    onClick={() => handleNavClick('/')}
                    className="group w-full text-left flex items-baseline gap-3 md:gap-5 py-2 md:py-4 cursor-pointer"
                    whileHover="hovered"
                    initial="idle"
                  >
                    <span className="w-5 md:w-6 shrink-0" />
                    <span className="relative flex flex-col">
                      <motion.span
                        className="font-display font-light text-4xl md:text-7xl lg:text-display-lg leading-tight tracking-[-0.03em] text-cream-100"
                        variants={{
                          idle: { x: 0, color: '#FAF7F2' },
                          hovered: {
                            x: 10,
                            color: '#C9A96E',
                            transition: { duration: 0.35, ease: [0.2, 0, 0, 1] },
                          },
                        }}
                      >
                        На главную
                      </motion.span>
                      <motion.span
                        className="block h-px bg-gold/60 origin-left mt-1"
                        variants={{
                          idle: { scaleX: 0 },
                          hovered: {
                            scaleX: 1,
                            transition: { duration: 0.4, ease: [0.2, 0, 0, 1] },
                          },
                        }}
                      />
                    </span>
                  </motion.button>
                </motion.li>

                {GENRES.map((genre) => (
                  <motion.li key={genre.slug} variants={itemVariants}>
                    <motion.button
                      onClick={() => handleNavClick(`/genre/${genre.slug}`)}
                      className="group w-full text-left flex items-baseline gap-3 md:gap-5 py-2 md:py-4 cursor-pointer"
                      whileHover="hovered"
                      initial="idle"
                    >
                      {/* Номер */}
                      <motion.span
                        className="font-body text-2xs tracking-[0.2em] w-5 md:w-6 shrink-0 text-gold/50"
                        variants={{
                          idle: { color: 'rgba(201,169,110,0.5)', x: 0 },
                          hovered: {
                            color: 'rgba(201,169,110,1)',
                            x: 4,
                            transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
                          },
                        }}
                      >
                        {genre.number}
                      </motion.span>

                      {/* Текст жанра + описание под ним */}
                      <span className="relative flex flex-col">
                        <motion.span
                          className="font-display font-light text-4xl md:text-7xl lg:text-display-lg leading-tight tracking-[-0.03em] text-cream-100"
                          variants={{
                            idle: { x: 0, color: '#FAF7F2' },
                            hovered: {
                              x: 10,
                              color: '#C9A96E',
                              transition: { duration: 0.35, ease: [0.2, 0, 0, 1] },
                            },
                          }}
                        >
                          {genre.label}
                        </motion.span>
                        {/* Описание — на мобильных всегда видно под названием */}
                        <span className="font-body text-2xs text-cream-400/40 mt-0.5 block md:hidden">
                          {genre.description}
                        </span>
                        {/* Золотая линия под текстом */}
                        <motion.span
                          className="block h-px bg-gold/60 origin-left mt-1"
                          variants={{
                            idle: { scaleX: 0 },
                            hovered: {
                              scaleX: 1,
                              transition: { duration: 0.4, ease: [0.2, 0, 0, 1] },
                            },
                          }}
                        />
                      </span>

                      {/* Описание — на десктопе по hover */}
                      <motion.span
                        className="font-body text-sm text-cream-400/60 self-center ml-2 hidden md:block"
                        variants={{
                          idle: { opacity: 0, x: -8 },
                          hovered: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.3, delay: 0.05, ease: [0.2, 0, 0, 1] },
                          },
                        }}
                      >
                        {genre.description}
                      </motion.span>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </div>

          {/* Нижняя панель */}
          <motion.div
            variants={bottomVariants}
            initial="closed"
            animate="open"
            className="px-6 md:px-16 lg:px-24 pb-6 md:pb-10 border-t border-cream-500/10 pt-4 md:pt-6 shrink-0"
          >
            {/* Мобильная раскладка: всё в колонку */}
            <div className="flex flex-col gap-4 md:hidden">
              {/* Навигация */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => handleNavClick('/about')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="h-px w-6 bg-gold/40 block" />
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-cream-400">
                    Обо мне
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('/contacts')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="h-px w-6 bg-gold/40 block" />
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-cream-400">
                    Контакты
                  </span>
                </button>
              </div>

              {/* Соцсети */}
              <div className="flex items-center justify-center gap-5">
                {(['Instagram', 'Telegram'] as const).map((name) => (
                  <a
                    key={name}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-2xs tracking-[0.15em] uppercase text-cream-500/60"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

            {/* Десктопная раскладка: в строку */}
            <div className="hidden md:flex items-end justify-between">
              <div className="flex items-center gap-8">
                <motion.button
                  onClick={() => handleNavClick('/about')}
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover="hovered"
                  initial="idle"
                >
                  <motion.span
                    className="h-px bg-gold/40 block"
                    variants={{
                      idle: { width: 32 },
                      hovered: { width: 52, transition: { duration: 0.3, ease: [0.2, 0, 0, 1] } },
                    }}
                  />
                  <motion.span
                    className="font-body text-sm tracking-[0.15em] uppercase text-cream-400"
                    variants={{
                      idle: { color: '#C4B5A8', x: 0 },
                      hovered: {
                        color: '#C9A96E',
                        x: 4,
                        transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
                      },
                    }}
                  >
                    Обо мне
                  </motion.span>
                </motion.button>

                <motion.button
                  onClick={() => handleNavClick('/contacts')}
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover="hovered"
                  initial="idle"
                >
                  <motion.span
                    className="h-px bg-gold/40 block"
                    variants={{
                      idle: { width: 32 },
                      hovered: { width: 52, transition: { duration: 0.3, ease: [0.2, 0, 0, 1] } },
                    }}
                  />
                  <motion.span
                    className="font-body text-sm tracking-[0.15em] uppercase text-cream-400"
                    variants={{
                      idle: { color: '#C4B5A8', x: 0 },
                      hovered: {
                        color: '#C9A96E',
                        x: 4,
                        transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
                      },
                    }}
                  >
                    Контакты
                  </motion.span>
                </motion.button>
              </div>

              <div className="flex items-center gap-6">
                {(['Instagram', 'Telegram'] as const).map((name) => (
                  <motion.a
                    key={name}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-2xs tracking-[0.15em] uppercase text-cream-500/60 relative"
                    whileHover={{ color: '#C9A96E', y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
