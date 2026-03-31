export interface Genre {
  slug: string
  label: string
  labelEn: string
  number: string
  description: string
}

export const GENRES: Genre[] = [
  {
    slug: 'studio',
    label: 'Студийная',
    labelEn: 'Studio',
    number: '01',
    description: 'Портретный и телесный формат',
  },
  {
    slug: 'street',
    label: 'Стрит',
    labelEn: 'Street',
    number: '02',
    description: 'Съемка на природе или на улицах города',
  },
  {
    slug: 'theatre',
    label: 'Театр',
    labelEn: 'Theatre',
    number: '03',
    description: 'Спектакли, танцевальные перфомансы',
  },
  {
    slug: 'family',
    label: 'Семейная',
    labelEn: 'Family',
    number: '04',
    description: 'Домашние истории и прогулки',
  },
]

export function getGenreBySlug(slug: string): Genre | undefined {
  return GENRES.find((g) => g.slug === slug)
}
