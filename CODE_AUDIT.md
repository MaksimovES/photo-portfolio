# Code Audit — Photo Portfolio

Ветка: `test` | Дата: 2026-04-03

---

## Критические проблемы

### 1. `Layout.tsx:37-46` — утечка scroll-lock
Если компонент размонтируется с открытым меню, `overflow: hidden` остаётся навсегда.

**Сейчас:**
```typescript
useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => {
    document.body.style.overflow = '' // ← всегда сбрасывает, даже если было другое значение
  }
}, [menuOpen])
```

**Исправление:**
```typescript
useEffect(() => {
  const original = document.body.style.overflow
  if (menuOpen) document.body.style.overflow = 'hidden'
  return () => { document.body.style.overflow = original }
}, [menuOpen])
```

---

### 2. `Reviews.tsx` — не очищается `requestAnimationFrame`
RAF-pending при размонтировании компонента — утечка памяти. Нужно хранить id и вызывать `cancelAnimationFrame(rafRef.current)` в cleanup useEffect.

---

### 3. `Hero.tsx:18` — падение при `variants.find()!`
Non-null assertion без проверки. Если `active` некорректен — тихое падение.

**Сейчас:**
```typescript
const { component: ActiveHero } = variants.find(v => v.id === active)!
```

**Исправление:**
```typescript
const variant = variants.find(v => v.id === active)
if (!variant) return null
const { component: ActiveHero } = variant
```

---

## Производительность

### 4. `picsum.photos` во всех вариантах Hero
Внешний CDN без контроля кэша, влияет на LCP. Нужны локальные ассеты в `public/`.

Затронутые файлы:
- `HeroV1.tsx:24`
- `HeroV2.tsx:79`, `HeroV2.tsx:164`
- `HeroV3.tsx:53`

---

### 5. `key={index}` в списках с анимациями
Использование индекса как ключа ломает Framer Motion анимации при изменении порядка элементов.

Затронутые файлы:
- `FAQ.tsx:61`
- `Cases.tsx:127`
- `HorizontalScroll.tsx:71`

**Исправление:** добавить `id` в интерфейс данных и использовать его как ключ.

---

### 6. `Reviews.tsx` — ResizeObserver без debounce
На каждый пиксел ресайза вызывается `setState`. Нужен порог или debounce ~100ms.

---

### 7. `package.json` — GSAP установлен, но не используется
Нигде нет `import gsap`. Лишние ~100KB в бандле.

```bash
npm uninstall gsap
```

---

### 8. `index.html` — нет `<link rel="preload">` для шрифтов
Tenor Sans и DM Sans грузятся лениво, что бьёт по LCP (Largest Contentful Paint).

**Исправление** — добавить в `<head>`:
```html
<link rel="preload" as="font" href="/fonts/TenorSans.woff2" type="font/woff2" crossorigin>
<link rel="preload" as="font" href="/fonts/DMSans.woff2" type="font/woff2" crossorigin>
```

Или как минимум в CSS:
```css
@font-face {
  font-family: 'DM Sans';
  font-display: swap;
}
```

---

## Доступность (a11y)

### 9. `GenrePhotoGrid.tsx` — кликабельный `<div>` недоступен с клавиатуры
Фото нельзя открыть с клавиатуры — нет `role`, `tabIndex`, обработчика `onKeyDown`.

**Исправление:**
```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
  onClick={onClick}
>
```

---

### 10. Нет `:focus-visible` у интерактивных элементов
Кнопки навигации, Reviews, FAQ — пользователи клавиатуры не видят фокус.

**Исправление** — добавить к кнопкам:
```typescript
className="... focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
```

---

### 11. `ContactsPage.tsx` — внешние ссылки без `aria-label`
Telegram/Instagram открываются в новой вкладке без предупреждения для screen reader.

**Исправление:**
```typescript
<a
  href="https://t.me/..."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Telegram — откроется в новой вкладке"
>
```

---

## TypeScript и качество кода

### 12. Хардкод цветов вместо констант
`Header.tsx:13-15` возвращает `'#FAF7F2'`, `'#1E160E'` строками. Нужен экспорт из `tailwind.config.js` или отдельный файл констант.

---

### 13. `KineticName` дублирует `KineticHeading`
`Preloader.tsx` содержит практически идентичный компонент, уже реализованный в `heroUtils.tsx`. Нужно удалить дубликат и импортировать общий.

---

### 14. Social links захардкожены в 3 местах
`MenuOverlay.tsx`, `Footer.tsx`, `ContactsPage.tsx` содержат одни и те же ссылки на Instagram/Telegram.

**Исправление** — вынести в `src/constants/social.ts`:
```typescript
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/...' },
  { name: 'Telegram',  href: 'https://t.me/...' },
] as const
```

---

### 15. Нет Error Boundary
Если любой компонент крашнется — падает всё приложение. Нужен `ErrorBoundary` на уровне `App.tsx`.

---

## Мобильный UX

### 16. `HeroV3.tsx:29` — 62dvh на мобиле слишком много
На iPhone SE (375×667) остаётся ~100px для текста ниже фото. Лучше `50dvh` или `min(62dvh, 400px)`.

---

### 17. `MenuOverlay.tsx` — кнопки могут переноситься на 320px
`gap-7` (28px) слишком широкий на самых маленьких экранах.

**Исправление:**
```typescript
className="flex flex-wrap items-center justify-center gap-4 sm:gap-7"
```

---

## Приоритет исправлений

| # | Файл | Проблема | Приоритет |
|---|------|----------|-----------|
| 1 | `Layout.tsx:37-46` | Утечка scroll-lock | 🔴 Критично |
| 2 | `Reviews.tsx` | RAF не очищается | 🔴 Критично |
| 3 | `Hero.tsx:18` | Non-null assertion | 🔴 Критично |
| 4 | Hero компоненты | picsum.photos CDN | 🟠 Важно |
| 5 | FAQ, Cases, HorizontalScroll | `key={index}` | 🟠 Важно |
| 6 | `GenrePhotoGrid.tsx` | Нет keyboard a11y | 🟠 Важно |
| 7 | `package.json` | GSAP не используется | 🟡 Средне |
| 8 | Вся кодовая база | Нет `focus-visible` | 🟡 Средне |
| 9 | `ContactsPage.tsx` | Нет `aria-label` | 🟡 Средне |
| 10 | `Preloader.tsx` | Дубликат KineticHeading | 🟡 Средне |
| 11 | 3 файла | Social links дублируются | 🟡 Средне |
| 12 | `Header.tsx` | Хардкод цветов | 🟢 Низко |
| 13 | `index.html` | Нет preload шрифтов | 🟢 Низко |
| 14 | `HeroV3.tsx:29` | 62dvh тесно на мобиле | 🟢 Низко |
| 15 | `MenuOverlay.tsx` | gap-7 на 320px | 🟢 Низко |
| 16 | Весь проект | Нет Error Boundary | 🟢 Низко |
| 17 | `Reviews.tsx` | ResizeObserver без debounce | 🟢 Низко |
