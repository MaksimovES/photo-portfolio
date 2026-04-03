import { useState } from 'react'
import HeroV1 from './HeroV1'
import HeroV2 from './HeroV2'
import HeroV3 from './HeroV3'

interface HeroProps {
  isVisible: boolean
}

const variants = [
  { id: 1 as const, short: '1', label: '1 — Погружение',    component: HeroV1 },
  { id: 2 as const, short: '2', label: '2 — Редакционный',  component: HeroV2 },
  { id: 3 as const, short: '3', label: '3 — Портрет',       component: HeroV3 },
]

export default function Hero({ isVisible }: HeroProps) {
  const [active, setActive] = useState<1 | 2 | 3>(1)
  const { component: ActiveHero } = variants.find(v => v.id === active)!

  return (
    <div className="relative">
      <ActiveHero isVisible={isVisible} />

      {/* ── Floating variant switcher ───────────────────────────────────────── */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-1
          bg-warm-dark/90 backdrop-blur-sm
          rounded-full px-3 py-2 shadow-warm-xl
          border border-cream-400/10"
      >
        {/* Label — hidden on very small screens */}
        <span className="hidden sm:block font-body text-2xs tracking-[0.2em] text-cream-500 uppercase mr-1 pl-1 select-none">
          Вариант
        </span>

        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={`
              font-body text-xs transition-all duration-200 rounded-full select-none
              ${active === v.id
                ? 'bg-gold text-warm-dark font-medium px-3 py-1'
                : 'text-cream-400 hover:text-cream-100 px-3 py-1 hover:bg-white/5'}
            `}
          >
            {/* Short number on mobile, full label on sm+ */}
            <span className="sm:hidden">{v.short}</span>
            <span className="hidden sm:inline">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
