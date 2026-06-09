import { useState } from 'react'
import Preloader from '../components/Preloader/Preloader'
import Hero from '../components/Hero/Hero'
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll'
import Cases from '../components/Cases/Cases'
import Reviews from '../components/Reviews/Reviews'
import FAQ from '../components/FAQ/FAQ'
import SectionBridge from '../components/SectionBridge/SectionBridge'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => typeof sessionStorage !== 'undefined' && Boolean(sessionStorage.getItem('portfolio_preloader_shown'))
  )

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <div id="hero"><Hero isVisible={preloaderDone} /></div>
      <SectionBridge />
      <HorizontalScroll />
      <SectionBridge />
      <div id="cases"><Cases /></div>
      <SectionBridge className="bg-gradient-to-b from-cream-100 to-cream-200" />
      <div id="reviews"><Reviews /></div>
      <SectionBridge className="bg-gradient-to-b from-cream-200 to-cream-100" />
      <div id="faq"><FAQ /></div>
    </>
  )
}
