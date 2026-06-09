/**
 * Фотографии для страницы «Студийная».
 *
 * Как добавить:
 * 1. Черновики: photos/directions/studio/1.JPG, 2.JPG, … (gitignored)
 * 2. Публикация: public/directions/studio/
 * 3. Замените ph('studio') на пути '/directions/studio/1.JPG', …
 * 4. Порядок = порядок в сетке (слева направо, сверху вниз).
 */

/** Заглушки — удалите когда добавите реальные фото */
function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const STUDIO_PHOTOS: string[] = ph('studio')

// Когда добавите реальные фото — замените на:
// export const STUDIO_PHOTOS: string[] = [
//   '/directions/studio/1.JPG',
//   '/directions/studio/2.JPG',
//   ...
// ]
