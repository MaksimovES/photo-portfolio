import { IMAGE_MANIFEST } from '@/data/imageManifest'
import {
  HOME_CRITICAL_GRID_COUNT,
  HOME_HERO_IMAGE_SRC,
  MAIN_PAGE_WORK_PHOTOS,
} from '@/data/mainPageData'

type VariantKey = 'w800' | 'w1600' | 'full'

export type OptimizedImageAttrs = {
  src: string
  srcSet?: string
  sizes?: string
}

function getVariantPaths(src: string) {
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  return {
    w800: `${base}-w800.webp`,
    w1600: `${base}-w1600.webp`,
    full: `${base}.webp`,
  }
}

function buildSrcSet(src: string, keys: VariantKey[]): string | undefined {
  const meta = IMAGE_MANIFEST[src]
  if (!meta) return undefined

  const paths = getVariantPaths(src)
  const widthByKey: Record<VariantKey, number> = {
    w800: meta.w800,
    w1600: meta.w1600,
    full: meta.w,
  }

  return keys
    .map(key => `${paths[key]} ${widthByKey[key]}w`)
    .join(', ')
}

export const GRID_IMAGE_SIZES = '(min-width: 768px) 19vw, 38vw'
export const HOME_GRID_IMAGE_SIZES = '(min-width: 768px) 24vw, 48vw'
export const CAROUSEL_IMAGE_SIZES = '(min-width: 1024px) 1024px, 80vw'
export const FULL_IMAGE_SIZES = 'min(100vw, 1600px)'
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 50vw, 90vw'
export const PORTRAIT_IMAGE_SIZES = '80px'

function getDefaultWebpSrc(src: string, variant: VariantKey = 'w800'): string {
  if (!IMAGE_MANIFEST[src]) return src
  return getVariantPaths(src)[variant]
}

export function getGridImageAttrs(src: string): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w800'])
  if (!srcSet) return { src }
  return { src: getDefaultWebpSrc(src, 'w800'), srcSet, sizes: GRID_IMAGE_SIZES }
}

export function getHomeGridImageAttrs(src: string): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w800'])
  if (!srcSet) return { src }
  return { src: getDefaultWebpSrc(src, 'w800'), srcSet, sizes: HOME_GRID_IMAGE_SIZES }
}

export function getCarouselImageAttrs(src: string): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w800', 'w1600'])
  if (!srcSet) return { src }
  return { src: getDefaultWebpSrc(src, 'w800'), srcSet, sizes: CAROUSEL_IMAGE_SIZES }
}

export function getFullImageAttrs(src: string): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w1600', 'full'])
  if (!srcSet) return { src }
  return { src, srcSet, sizes: FULL_IMAGE_SIZES }
}

export function getHeroVariantForViewport(): 'w800' | 'w1600' {
  if (typeof window === 'undefined') return 'w1600'
  return window.matchMedia('(min-width: 768px)').matches ? 'w1600' : 'w800'
}

export function getHeroImageAttrs(
  src: string,
  variant: 'w800' | 'w1600' = getHeroVariantForViewport(),
): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w800', 'w1600'])
  if (!srcSet) return { src }
  return { src: getDefaultWebpSrc(src, variant), srcSet, sizes: HERO_IMAGE_SIZES }
}

export function getPortraitImageAttrs(src: string): OptimizedImageAttrs {
  const srcSet = buildSrcSet(src, ['w800'])
  if (!srcSet) return { src }
  return { src, srcSet, sizes: PORTRAIT_IMAGE_SIZES }
}

export function getPreloadUrl(src: string, variant: 'w800' | 'w1600' | 'full' = 'w1600'): string {
  if (!IMAGE_MANIFEST[src]) return src
  return getVariantPaths(src)[variant]
}

export function preloadImageUrl(url: string): Promise<void> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = url
  })
}

export function getHomeCriticalPreloadUrls(): string[] {
  const heroVariant = getHeroVariantForViewport()
  const urls = [getPreloadUrl(HOME_HERO_IMAGE_SRC, heroVariant)]
  MAIN_PAGE_WORK_PHOTOS.slice(0, HOME_CRITICAL_GRID_COUNT).forEach(src => {
    urls.push(getPreloadUrl(src, 'w800'))
  })
  return urls
}

export function preloadHomeCriticalImages(): Promise<void> {
  return Promise.all(getHomeCriticalPreloadUrls().map(preloadImageUrl)).then(() => undefined)
}

export function preloadOptimizedImage(src: string, variant: 'w800' | 'w1600' | 'full' = 'w1600') {
  void preloadImageUrl(getPreloadUrl(src, variant))
}

export function preloadAdjacentImages(
  photos: string[],
  currentIndex: number,
  variant: 'w800' | 'w1600' | 'full' = 'w1600',
) {
  if (photos.length === 0) return
  const indices = new Set([
    currentIndex,
    (currentIndex - 1 + photos.length) % photos.length,
    (currentIndex + 1) % photos.length,
  ])
  indices.forEach(i => preloadOptimizedImage(photos[i], variant))
}
