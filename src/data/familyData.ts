/**
 * Фотографии для страницы «Семейная».
 *
 * Как добавить:
 * 1. Черновики: photos/directions/family/1.JPG, 2.JPG, … (gitignored)
 * 2. Публикация: public/directions/family/
 * 3. Замените ph('family') на пути '/directions/family/1.JPG', …
 */

function ph(seed: string, count = 16): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/675/900`)
}

export const FAMILY_PHOTOS: string[] = ph('family')

// export const FAMILY_PHOTOS: string[] = [
//   '/directions/family/1.JPG',
//   '/directions/family/2.JPG',
//   ...
// ]
