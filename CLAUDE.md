# CLAUDE.md — Photo Portfolio (ketrin_maxim)

## Проект

Сайт-портфолио фотографа Екатерины Максимовой (ketrin_maxim). Санкт-Петербург.
Одновременно витрина для клиентов и кейс веб-разработчика.
Статус: почти готов. Статика, без бэкенда/CMS.
Деплой: VPS + nginx (в будущем). Домен и хостинг есть.

## Разработчик

Один человек на проекте. Общение на русском, код на английском.

## Стиль общения

- **Коротко по умолчанию.** Минимум текста, максимум дела. Подробно — только когда явно попрошу.
- **Не коммить без моего подтверждения.** Предлагай коммит — я решаю.
- **Playwright MCP скриншоты — только когда попрошу.** Не запускай автоматически.
- **Спрашивай перед кодом** при любом сомнении. Лучше вопрос, чем переделка.

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
    AboutPage.tsx      — полноценная страница «О фотографе»
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

## Git

- Ветки: `main` (стабильная) и `dev` (рабочая)
- Работа ведётся в `dev`, мерж в `main` только после подтверждения
- Коммиты: conventional commits (feat/fix/refactor)
- Мерж делает пользователь вручную (хук блокирует `git merge`)

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

## Правила кода

### Стиль

- Компоненты: функциональные, с хуками
- Стилизация: Tailwind-классы inline, НЕ CSS-модули
- Анимации: Framer Motion (основной), GSAP (точечно для сложных timeline)
- Экспорт компонентов: через `index.ts` barrel-файлы
- Именование: PascalCase для компонентов, camelCase для утилит и хуков

### Мобильные устройства — приоритет №1

**Большинство пользователей сайта заходят с мобильных устройств.** Все изменения должны быть идеальными на мобильных экранах по умолчанию, без дополнительных инструкций. Это значит:

- Hover-эффекты (`group-hover:`, `hover:`) — только для десктопа (`md:group-hover:`, `md:hover:`). На тач-устройствах hover не работает корректно и вызывает залипание состояний.
- Тестируй визуал в первую очередь на мобильных разрешениях (375–430px).
- Размеры шрифтов, отступы, touch-target'ы — проектируй сначала для мобилки, потом адаптируй для десктопа.

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
- Не создавать отдельные CSS-файлы для компонентов — стилизация через Tailwind inline. Глобальные стили в `src/index.css`
- Не делать скриншоты через Playwright без запроса
- Не коммитить без подтверждения
