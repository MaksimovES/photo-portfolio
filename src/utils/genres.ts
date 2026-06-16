export interface Genre {
  slug: string
  label: string
  menuLabel?: string
  listLabel?: readonly string[]
  labelEn: string
  number: string
  description: string
}

export const GENRES: Genre[] = [
  {
    slug: 'studio',
    label: 'Персональная съемка в студии',
    listLabel: ['Персональная съемка', 'в студии'],
    menuLabel: 'Студийная',
    labelEn: 'Studio',
    number: '01',
    description: 'Портретный и телесный формат',
  },
  {
    slug: 'street',
    label: 'Фотопрогулка',
    labelEn: 'Street',
    number: '02',
    description: 'Съемка на природе или на улицах города',
  },
  {
    slug: 'family',
    label: 'Семейная',
    labelEn: 'Family',
    number: '03',
    description: 'Домашние истории и прогулки',
  },
  {
    slug: 'theatre',
    label: 'Театр',
    labelEn: 'Theatre',
    number: '04',
    description: 'Спектакли, танцевальные перфомансы и мастер-классы',
  },
]

export function getGenreBySlug(slug: string): Genre | undefined {
  return GENRES.find((g) => g.slug === slug)
}
