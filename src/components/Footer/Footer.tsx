import { Link } from 'react-router-dom'
import { GENRES } from '../../utils/genres'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[10000] bg-[#1A1008] text-cream-300 border-t border-white/5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      {/* Мобильная версия — Горизонтально-ориентированная верстка */}
      <div className="px-6 pt-8 pb-10 md:hidden">
        {/* Верхний ряд: Имя и Слоган в две колонки */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <p className="font-display font-light text-2xl text-cream-100 leading-[0.9] uppercase tracking-tighter">
            Ketrin <br /> Maxim
          </p>
          <p className="font-body text-[12px] text-warm-muted leading-relaxed max-w-[180px] opacity-80 text-right">
            Живые эмоции и настоящие истории в каждом кадре.
          </p>
        </div>

        {/* Средний ряд: Направления и Связь в одну линию */}
        <div className="flex justify-between items-start border-t border-white/5 pt-8 mb-10">
          <div className="flex-1">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-gold/50 mb-5">
              Направления
            </p>
            <nav className="grid grid-cols-1 gap-y-4">
              {GENRES.map((genre) => (
                <Link
                  key={genre.slug}
                  to={`/genre/${genre.slug}`}
                  className="font-body text-[14px] leading-[1.1] text-cream-400 hover:text-gold transition-colors duration-300"
                >
                  {genre.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-left">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-gold/50 mb-5">
              Связь
            </p>
            <div className="flex flex-col gap-y-3 items-start">
              <a
                href="https://instagram.com/ketrin_maxim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.1em] text-cream-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[14px] h-[14px] text-gold/80"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
                Instagram
              </a>
              <a
                href="https://t.me/ketrin_maxim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="group inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.1em] text-cream-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[14px] h-[14px] text-gold/80"
                  aria-hidden="true"
                >
                  <path d="M21.86 3.35a1.2 1.2 0 0 0-1.23-.19L2.9 10.14c-.86.34-.85 1.57.02 1.89l4.36 1.6 1.68 5.27c.2.62 1 .8 1.45.32l2.47-2.56 4.48 3.3c.62.46 1.51.13 1.68-.62l3.2-14.6a1.2 1.2 0 0 0-.38-1.39ZM9.9 14.52l-.38 3.72-1.23-3.88 9.2-6.72-7.59 6.88Z" />
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Десктопная версия — Классическая сетка */}
      <div className="hidden md:grid px-8 md:px-16 lg:px-24 pt-20 pb-16 grid-cols-3 gap-12 border-b border-white/5">
        <div className="space-y-6">
          <p className="font-display font-light text-4xl text-cream-100 leading-none uppercase tracking-tighter">
            Ketrin <br /> Maxim
          </p>
          <p className="font-body text-sm text-warm-muted leading-relaxed max-w-xs">
            Фотограф для тех, кто ценит живые эмоции и настоящие истории.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60">
            Направления
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {GENRES.map((genre) => (
              <Link
                key={genre.slug}
                to={`/genre/${genre.slug}`}
                className="font-body text-sm text-cream-400 hover:text-gold transition-colors duration-300"
              >
                {genre.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60">
            Контакты
          </p>
          <div className="flex gap-8">
            <a
              href="https://instagram.com/ketrin_maxim"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group inline-flex items-center gap-2.5 font-body text-xs uppercase tracking-widest text-cream-400 hover:text-gold transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors duration-300"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
              Instagram
            </a>
            <a
              href="https://t.me/ketrin_maxim"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="group inline-flex items-center gap-2.5 font-body text-xs uppercase tracking-widest text-cream-400 hover:text-gold transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors duration-300"
                aria-hidden="true"
              >
                <path d="M21.86 3.35a1.2 1.2 0 0 0-1.23-.19L2.9 10.14c-.86.34-.85 1.57.02 1.89l4.36 1.6 1.68 5.27c.2.62 1 .8 1.45.32l2.47-2.56 4.48 3.3c.62.46 1.51.13 1.68-.62l3.2-14.6a1.2 1.2 0 0 0-.38-1.39ZM9.9 14.52l-.38 3.72-1.23-3.88 9.2-6.72-7.59 6.88Z" />
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя информационная панель */}
      <div className="px-6 md:px-16 lg:px-24 pt-6 pb-0 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-body text-[10px] md:text-[12px] text-cream-400/30 tracking-[0.1em]">
            © {year} ketrin_maxim. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden md:block w-8 h-px bg-gold/10" />
            <p className="font-body text-[9px] md:text-[12px] text-cream-400/30 tracking-[0.1em] uppercase">
              Санкт-Петербург — Россия
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}