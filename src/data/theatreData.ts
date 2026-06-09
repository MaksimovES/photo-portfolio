/**
 * Данные театральных съёмок.
 *
 * Номер папки = порядок спектакля в THEATRE_PRODUCTIONS (01 → 1, 02 → 2, …).
 *
 * Как добавить фотографии:
 * 1. Черновики: photos/directions/theathre/<номер>/1.JPG, 2.JPG, … (gitignored)
 * 2. Публикация: скопируйте в public/directions/theathre/<номер>/
 * 3. Замените ph('…') на пути '/directions/theathre/<номер>/1.JPG', …
 * 4. Порядок в массиве = порядок в карусели.
 */

export interface TheatreProduction {
  director: string
  production: string
  photos: string[]
}

/** Генератор заглушек — удалите вызовы когда добавите реальные фото */
function ph(seed: string): string[] {
  return Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/1200/675`)
}

// ─── 01 ──────────────────────────────────────────────────────────────────────
const masterMargarita: TheatreProduction = {
  director: '',
  production: 'Attaque de panique: Les Aveugles',
  photos: [
    '/directions/theathre/1/1.JPG',
    '/directions/theathre/1/2.JPG',
    '/directions/theathre/1/3.JPG',
    '/directions/theathre/1/4.JPG',
    '/directions/theathre/1/5.JPG',
    '/directions/theathre/1/6.JPG',
  ],
}

// ─── 02 ──────────────────────────────────────────────────────────────────────
const chayka: TheatreProduction = {
  director: '',
  production: 'MusicAeterna Dance: Землетрясение',
  photos: [
    '/directions/theathre/2/1.JPG',
    '/directions/theathre/2/2.JPG',
    '/directions/theathre/2/3.JPG',
    '/directions/theathre/2/4.JPG',
    '/directions/theathre/2/5.JPG',
    '/directions/theathre/2/6.JPG',
    '/directions/theathre/2/7.JPG',
  ],
}

// ─── 03 ──────────────────────────────────────────────────────────────────────
const groza: TheatreProduction = {
  director: '',
  production: 'Узел: Жестяной барабан',
  photos: [
    '/directions/theathre/3/1.JPG',
    '/directions/theathre/3/2.JPG',
    '/directions/theathre/3/3.JPG',
    '/directions/theathre/3/4.JPG',
    '/directions/theathre/3/5.JPG',
    '/directions/theathre/3/6.JPG',
    '/directions/theathre/3/7.JPG',
  ],
}

// ─── 04 ──────────────────────────────────────────────────────────────────────
const triSestry: TheatreProduction = {
  director: '',
  production: 'ШУМ: Сказка о царе стакане',
  photos: [
    '/directions/theathre/4/1.JPG',
    '/directions/theathre/4/2.JPG',
    '/directions/theathre/4/3.JPG',
    '/directions/theathre/4/4.JPG',
    '/directions/theathre/4/5.JPG',
    '/directions/theathre/4/6.JPG',
    '/directions/theathre/4/7.JPG',
  ],
}

// ─── 05 ──────────────────────────────────────────────────────────────────────
const gorki10: TheatreProduction = {
  director: '',
  production: 'Новая сцена Александринского театра: Электрик.А',
  photos: [
    '/directions/theathre/5/1.JPG',
    '/directions/theathre/5/2.JPG',
    '/directions/theathre/5/3.JPG',
    '/directions/theathre/5/4.JPG',
    '/directions/theathre/5/5.JPG',
    '/directions/theathre/5/6.JPG',
    '/directions/theathre/5/7.JPG',
  ],
}

// ─── 06 ──────────────────────────────────────────────────────────────────────
const zhiznISudba: TheatreProduction = {
  director: '',
  production: 'Театр на Васильевском: Дуэль',
  photos: [
    '/directions/theathre/6/1.JPG',
    '/directions/theathre/6/2.JPG',
    '/directions/theathre/6/3.JPG',
    '/directions/theathre/6/4.JPG',
    '/directions/theathre/6/5.JPG',
    '/directions/theathre/6/6.JPG',
    '/directions/theathre/6/7.JPG',
  ],
}

// ─── 07 ──────────────────────────────────────────────────────────────────────
const idealnyMuzh: TheatreProduction = {
  director: '',
  production: 'Decki: Women`s gym',
  photos: [
    '/directions/theathre/7/1.JPG',
    '/directions/theathre/7/2.JPG',
    '/directions/theathre/7/3.JPG',
    '/directions/theathre/7/4.JPG',
    '/directions/theathre/7/5.JPG',
    '/directions/theathre/7/6.JPG',
    '/directions/theathre/7/7.JPG',
  ],
}

// ─── 08 ──────────────────────────────────────────────────────────────────────
const evgeniyOnegin: TheatreProduction = {
  director: '',
  production: 'Новая сцена Александринского театра: Нирвана',
  photos: [
    '/directions/theathre/8/1.JPG',
    '/directions/theathre/8/2.JPG',
    '/directions/theathre/8/3.JPG',
    '/directions/theathre/8/4.JPG',
    '/directions/theathre/8/5.JPG',
    '/directions/theathre/8/6.JPG',
    '/directions/theathre/8/7.JPG',
  ],
}

// ─── 09 ──────────────────────────────────────────────────────────────────────
const maskarad: TheatreProduction = {
  director: '',
  production: 'Невидимый театр: Любовь людей',
  photos: [
    '/directions/theathre/9/1.JPG',
    '/directions/theathre/9/2.JPG',
    '/directions/theathre/9/3.JPG',
    '/directions/theathre/9/4.JPG',
    '/directions/theathre/9/5.JPG',
    '/directions/theathre/9/6.JPG',
    '/directions/theathre/9/7.JPG',
  ],
}


// ─── Итоговый список (порядок = порядок на странице) ─────────────────────────
export const THEATRE_PRODUCTIONS: TheatreProduction[] = [
  masterMargarita,
  chayka,
  groza,
  triSestry,
  gorki10,
  zhiznISudba,
  idealnyMuzh,
  evgeniyOnegin,
  maskarad,
]
