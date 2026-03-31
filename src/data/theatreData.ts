/**
 * Данные театральных съёмок.
 *
 * Как добавить фотографии:
 * 1. Положите фото в папку  public/theatre/<название-постановки>/
 *    Например: public/theatre/master-margarita/01.jpg
 *
 * 2. Замените строки с picsum.photos на реальные пути:
 *    '/theatre/master-margarita/01.jpg'
 *
 * 3. Порядок в массиве = порядок в карусели.
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
  director: 'Кирилл Серебренников',
  production: 'Мастер и Маргарита',
  photos: ph('mm'),
  // photos: [
  //   '/theatre/master-margarita/01.jpg',
  //   '/theatre/master-margarita/02.jpg',
  //   ...
  // ],
}

// ─── 02 ──────────────────────────────────────────────────────────────────────
const chayka: TheatreProduction = {
  director: 'Юрий Бутусов',
  production: 'Чайка',
  photos: ph('ch'),
}

// ─── 03 ──────────────────────────────────────────────────────────────────────
const groza: TheatreProduction = {
  director: 'Андрей Могучий',
  production: 'Гроза',
  photos: ph('gr'),
}

// ─── 04 ──────────────────────────────────────────────────────────────────────
const triSestry: TheatreProduction = {
  director: 'Тимофей Кулябин',
  production: 'Три сестры',
  photos: ph('ts'),
}

// ─── 05 ──────────────────────────────────────────────────────────────────────
const gorki10: TheatreProduction = {
  director: 'Дмитрий Крымов',
  production: 'Горки-10',
  photos: ph('g10'),
}

// ─── 06 ──────────────────────────────────────────────────────────────────────
const zhiznISudba: TheatreProduction = {
  director: 'Лев Додин',
  production: 'Жизнь и судьба',
  photos: ph('zhs'),
}

// ─── 07 ──────────────────────────────────────────────────────────────────────
const idealnyMuzh: TheatreProduction = {
  director: 'Константин Богомолов',
  production: 'Идеальный муж',
  photos: ph('im'),
}

// ─── 08 ──────────────────────────────────────────────────────────────────────
const evgeniyOnegin: TheatreProduction = {
  director: 'Римас Туминас',
  production: 'Евгений Онегин',
  photos: ph('eo'),
}

// ─── 09 ──────────────────────────────────────────────────────────────────────
const maskarad: TheatreProduction = {
  director: 'Валерий Фокин',
  production: 'Маскарад',
  photos: ph('mk'),
}

// ─── 10 ──────────────────────────────────────────────────────────────────────
const belayaGvardiya: TheatreProduction = {
  director: 'Сергей Женовач',
  production: 'Белая гвардия',
  photos: ph('bg'),
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
  belayaGvardiya,
]
