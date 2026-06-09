/**
 * Фотографии для страницы «Стрит».
 *
 * Как добавить:
 * 1. Черновики: photos/directions/street/1.JPG, 2.JPG, … (gitignored)
 * 2. Публикация: public/directions/street/
 * 3. Замените ph('street') на пути '/directions/street/1.JPG', …
 */

function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const STREET_PHOTOS: string[] = ph('street')

// export const STREET_PHOTOS: string[] = [
//   '/directions/street/1.JPG',
//   '/directions/street/2.JPG',
//   ...
// ]
