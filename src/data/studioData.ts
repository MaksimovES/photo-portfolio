/**
 * Фотографии для страницы «Студийная».
 *
 * Как добавить:
 * 1. Положите фото в public/studio/
 * 2. Замените строки с picsum.photos на реальные пути:
 *    '/studio/01.jpg', '/studio/02.jpg', ...
 * 3. Порядок = порядок в сетке (слева направо, сверху вниз).
 */

/** Заглушки — удалите когда добавите реальные фото */
function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const STUDIO_PHOTOS: string[] = ph('studio')

// Когда добавите реальные фото — замените на:
// export const STUDIO_PHOTOS: string[] = [
//   '/studio/01.jpg',
//   '/studio/02.jpg',
//   '/studio/03.jpg',
//   '/studio/04.jpg',
//   '/studio/05.jpg',
//   '/studio/06.jpg',
//   '/studio/07.jpg',
//   '/studio/08.jpg',
//   '/studio/09.jpg',
//   '/studio/10.jpg',
//   '/studio/11.jpg',
//   '/studio/12.jpg',
//   '/studio/13.jpg',
//   '/studio/14.jpg',
//   '/studio/15.jpg',
//   '/studio/16.jpg',
// ]
