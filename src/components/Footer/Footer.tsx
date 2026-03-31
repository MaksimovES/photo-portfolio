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
          <p className="font-body text-[12px] text-warm-muted leading-relaxed max-w-[180px] text-right opacity-80">
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

          <div className="text-right">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-gold/50 mb-5">
              Связь
            </p>
            <div className="flex flex-col gap-y-3">
              <a
                href="https://instagram.com/ketrin_maxim"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] uppercase tracking-[0.1em] text-cream-400 border-b border-gold/20 pb-0.5"
              >
                Instagram
              </a>
              <a
                href="https://t.me/ketrin_maxim"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] uppercase tracking-[0.1em] text-cream-400 border-b border-gold/20 pb-0.5"
              >
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
          <p className="font-body text-sm text-warm-muted leading-relaxed max-w-xs italic">
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
              className="font-body text-xs uppercase tracking-widest text-cream-400 hover:text-gold transition-all duration-300"
            >
              Instagram
            </a>
            <a
              href="https://t.me/ketrin_maxim"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs uppercase tracking-widest text-cream-400 hover:text-gold transition-all duration-300"
            >
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