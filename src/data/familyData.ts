/**
 * Фотографии для страницы «Семейная».
 *
 * Как добавить:
 * 1. Положите фото в public/family/
 * 2. Замените строки с picsum.photos на реальные пути:
 *    '/family/01.jpg', '/family/02.jpg', ...
 */

function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const FAMILY_PHOTOS: string[] = ph('family')

// export const FAMILY_PHOTOS: string[] = [
//   '/family/01.jpg',
//   ...
// ]
