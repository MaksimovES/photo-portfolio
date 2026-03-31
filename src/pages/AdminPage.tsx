import Typography from '../components/Typography'

export default function AdminPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 bg-warm-dark">
      <div className="text-center space-y-6 max-w-2xl">
        <Typography variant="label" className="text-gold/60 tracking-[0.3em]">
          Панель управления
        </Typography>
        <Typography variant="h2" className="text-cream-100">
          Администратор
        </Typography>
        <Typography variant="body" className="text-warm-muted">
          Авторизация и управление контентом сайта появятся здесь в Фазе 6.
        </Typography>

        <div className="flex items-center justify-center gap-4 pt-4">
          <span className="h-px w-12 bg-gold/20" />
          <span className="font-body text-2xs text-warm-muted/50 tracking-[0.2em] uppercase">
            В разработке
          </span>
          <span className="h-px w-12 bg-gold/20" />
        </div>
      </div>
    </section>
  )
}
