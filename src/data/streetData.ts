/**
 * Фотографии для страницы «Стрит».
 *
 * Как добавить:
 * 1. Положите фото в public/street/
 * 2. Замените строки с picsum.photos на реальные пути:
 *    '/street/01.jpg', '/street/02.jpg', ...
 */

function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const STREET_PHOTOS: string[] = ph('street')

// export const STREET_PHOTOS: string[] = [
//   '/street/01.jpg',
//   ...
// ]
