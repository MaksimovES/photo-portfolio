import Typography from '../components/Typography'

export default function AboutPage() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-8 pt-20 pb-20">
      <div className="text-center space-y-6 max-w-2xl">
        <Typography variant="label" className="text-gold tracking-[0.3em]">
          О фотографе
        </Typography>
        <Typography variant="h1" className="text-warm-dark">
          Обо мне
        </Typography>
        <Typography variant="body" className="text-warm-medium">
          Текст о фотографе, достижения и история — появятся здесь в Фазе 3.
        </Typography>

        <div className="flex items-center justify-center gap-4 pt-4">
          <span className="h-px w-12 bg-gold/40" />
          <span className="font-body text-2xs text-warm-muted tracking-[0.2em] uppercase">
            В разработке
          </span>
          <span className="h-px w-12 bg-gold/40" />
        </div>
      </div>
    </section>
  )
}
