# CLAUDE.md — Photo Portfolio (ketrin_maxim)

## Проект

Сайт-портфолио фотографа Екатерины Максимовой (ketrin_maxim). Санкт-Петербург.
Одновременно витрина для клиентов и кейс веб-разработчика.

## Стек

- **React 18** + TypeScript + Vite 5
- **Tailwind CSS 3** (кастомная дизайн-система в `tailwind.config.js`)
- **Framer Motion** — анимации переходов страниц, hero, UI-элементов
- **GSAP** — подключён, используется точечно
- **React Router v6** — маршрутизация с layout-обёрткой и `AnimatePresence`
- Шрифты: **Tenor Sans** (display/заголовки), **DM Sans** (body/текст)
- Алиас: `@` -> `/src`

## Структура

```
src/
  App.tsx              — маршруты (/, /genre/:slug, /about, /contacts, /admin)
  main.tsx             — точка входа
  index.css            — глобальные стили, CSS-переменные, grain-overlay
  layouts/Layout.tsx   — header + menu overlay + main (AnimatePresence) + footer
  pages/
    HomePage.tsx       — Preloader -> Hero -> HorizontalScroll -> ForWhom -> Cases -> Reviews -> FAQ
    GenrePage.tsx      — динамическая страница жанра (theatre = carousel, остальные = grid)
    AboutPage.tsx      — заглушка (фаза 3)
    ContactsPage.tsx   — ссылки на Telegram/Instagram
    AdminPage.tsx      — админка (вне Layout)
  components/
    Hero/              — главный hero-блок с анимированными счётчиками
    Header/            — fixed header, dark при скролле, бургер -> крестик
    MenuOverlay/       — полноэкранное меню
    Footer/            — отдельные мобильная и десктопная версии
    GenrePhotoGrid/    — masonry-сетка фотографий
    Lightbox/          — лайтбокс для просмотра фото
    TheatreCarousel/   — горизонтальный карусель для театральных постановок
    HorizontalScroll/  — горизонтальный скролл направлений
    Cases/, Reviews/, FAQ/, ForWhom/, Preloader/, SectionIndex/, Typography/
  data/                — массивы фотографий (theatreData, studioData, streetData, familyData)
  utils/genres.ts      — список жанров (studio, street, theatre, family)
  hooks/               — useScrolled, useIsDesktop
```

## Дизайн-система

- **Палитра**: тёплая кремовая (cream-50..500), warm-dark (#1E160E), gold (#C9A96E), terracotta
- **CSS-переменные**: определены в `index.css` :root (--color-bg, --color-accent, --header-height и т.д.)
- **Tailwind-токены**: расширены в `tailwind.config.js` — кастомные цвета, шрифты, тени, easing
- **Grain-overlay**: SVG noise через `body::after`, z-index 9999
- **Easing**: `--ease-emphasis` (0.2,0,0,1), `--ease-menu` (0.76,0,0.24,1)

## Команды

```bash
npm run dev       # запуск dev-сервера (Vite)
npm run build     # tsc + vite build
npm run preview   # preview production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Язык сайта

Интерфейс на **русском языке**. Все тексты UI, заголовки, описания — на русском.
Код (переменные, компоненты, комментарии в коде) — на английском.

## Правила работы

### Главное правило: СПРАШИВАЙ ПЕРЕД КОДОМ

Если есть хоть малейшее сомнение (даже 1%) в том, что ты правильно понимаешь задачу — **задай уточняющий вопрос перед тем, как писать код**. Лучше задать "глупый" вопрос, чем переделывать. Примеры ситуаций, когда нужно спрашивать:

- Неясно, какой именно визуальный результат ожидается
- Задача может быть интерпретирована двумя или более способами
- Не понятно, касается ли изменение мобильной, десктопной или обеих версий
- Непонятен приоритет: дизайн vs функциональность
- Изменение может затронуть другие части сайта
- Нужно выбрать между несколькими подходами к реализации

### Стиль кода

- Компоненты: функциональные, с хуками
- Стилизация: Tailwind-классы inline, НЕ CSS-модули
- Анимации: Framer Motion (основной), GSAP (точечно для сложных timeline)
- Экспорт компонентов: через `index.ts` barrel-файлы
- Именование: PascalCase для компонентов, camelCase для утилит и хуков

### Архитектурные принципы

- Mobile-first адаптивность (используй sm:, md:, lg: брейкпоинты Tailwind)
- Grain-overlay на body — учитывай z-index (grain = 9999)
- Header fixed с `z-[10002]`/`z-[10003]` — контент должен иметь `padding-top: var(--header-height)`
- Переходы между страницами через `AnimatePresence` в Layout — не дублируй эту логику
- Sticky footer layout через flex на `#root`

### Чего НЕ делать

- Не удалять grain-overlay без явного запроса
- Не менять дизайн-токены (цвета, шрифты) без согласования
- Не добавлять новые npm-зависимости без обсуждения
- Не трогать Preloader логику без необходимости
- Не менять структуру маршрутов без обсуждения
- Не создавать отдельные CSS-файлы для компонентов (CSS-модули и т.п.) — стилизация через Tailwind-классы inline. Глобальные стили и CSS-переменные живут в `src/index.css`

### Визуальная проверка

При изменениях UI — по возможности проверяй через Playwright MCP (скриншоты).
Файлы скриншотов сохраняются в `.playwright-mcp/`.
