import { useState } from 'react'
import Preloader from '../components/Preloader/Preloader'
import Hero from '../components/Hero/Hero'
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll'
import Cases from '../components/Cases/Cases'
import Reviews from '../components/Reviews/Reviews'
import FAQ from '../components/FAQ/FAQ'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => typeof sessionStorage !== 'undefined' && Boolean(sessionStorage.getItem('portfolio_preloader_shown'))
  )

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <div id="hero" className="scroll-mt-[var(--header-height)]"><Hero isVisible={preloaderDone} /></div>
      <HorizontalScroll />
      <div id="cases" className="scroll-mt-[var(--header-height)]"><Cases /></div>
      <div id="reviews" className="scroll-mt-[var(--header-height)]"><Reviews /></div>
      <div id="faq" className="scroll-mt-[var(--header-height)]"><FAQ /></div>
    </>
  )
}
