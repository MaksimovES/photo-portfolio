import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrolled } from '../../hooks/useScrolled'
import { useIsDesktop } from '../../hooks/useIsDesktop'

interface HeaderProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
}

// Цвет кнопки по состоянию (без CSS-перехода — мгновенно через Framer Motion)
function getButtonColor(isMenuOpen: boolean, scrolled: boolean) {
  if (isMenuOpen) return '#FAF7F2'
  if (scrolled) return '#F5F0E8'
  return '#1E160E'
}

export default function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
  const scrolled = useScrolled()
  const isDesktop = useIsDesktop()

  const isDark = scrolled || isMenuOpen
  const buttonColor = getButtonColor(isMenuOpen, scrolled)

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0',
        'flex items-center justify-between',
        'px-6 md:px-10 lg:px-14',
        'transition-all duration-500',
        isDark ? 'h-16 bg-[#1A1008]/95 backdrop-blur-sm z-[10003]' : 'h-20 bg-transparent z-[10002]',
      ].join(' ')}
    >
      {/* Логотип / имя */}
      <Link to="/">
        <motion.div
          animate={{ color: buttonColor }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          whileHover={isDesktop ? { color: '#C9A96E' } : undefined}
        >
          <span className="font-display font-light text-2xl md:text-3xl leading-none tracking-[-0.01em]">
            Екатерина Максимова
          </span>
        </motion.div>
      </Link>

      {/* Кнопка меню */}
      <motion.button
        onClick={onMenuToggle}
        className="flex items-center gap-3 cursor-pointer select-none"
        animate={{ color: buttonColor }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        whileHover={isDesktop ? { color: '#C9A96E' } : undefined}
        whileTap={isDesktop ? { scale: 0.93 } : undefined}
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isMenuOpen}
      >
        {/* Текст: Меню ↔ Закрыть с вертикальным слайдом */}
        <span className="relative overflow-hidden h-4 flex items-center min-w-[52px] justify-end">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={isMenuOpen ? 'close' : 'menu'}
              className="font-body text-2xs uppercase tracking-[0.2em] block"
              initial={{ y: isMenuOpen ? 14 : -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isMenuOpen ? -14 : 14, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            >
              {isMenuOpen ? 'Закрыть' : 'Меню'}
            </motion.span>
          </AnimatePresence>
        </span>

        {/* Бургер → крестик */}
        <motion.span
          className="relative w-6 h-5 flex flex-col justify-between"
          animate={isMenuOpen ? 'open' : 'closed'}
        >
          <motion.span
            className="block h-px w-full bg-current origin-center"
            variants={{
              closed: { y: 0, rotate: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
              open: { y: 10, rotate: 45, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
            }}
          />
          <motion.span
            className="block h-px bg-current"
            variants={{
              closed: { width: '100%', opacity: 1, transition: { duration: 0.2 } },
              open: { width: 0, opacity: 0, transition: { duration: 0.2 } },
            }}
          />
          <motion.span
            className="block h-px w-full bg-current origin-center"
            variants={{
              closed: { y: 0, rotate: 0, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
              open: { y: -10, rotate: -45, transition: { duration: 0.35, ease: [0.2, 0, 0, 1] } },
            }}
          />
        </motion.span>
      </motion.button>
    </header>
  )
}
