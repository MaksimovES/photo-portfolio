import { useState } from 'react'
import Preloader from '../components/Preloader/Preloader'
import Hero from '../components/Hero/Hero'
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll'
import Cases from '../components/Cases/Cases'
import Reviews from '../components/Reviews/Reviews'
import FAQ from '../components/FAQ/FAQ'
import SectionIndex from '../components/SectionIndex/SectionIndex'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => typeof sessionStorage !== 'undefined' && Boolean(sessionStorage.getItem('portfolio_preloader_shown'))
  )

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <SectionIndex visible={preloaderDone} />
      <div id="hero"><Hero isVisible={preloaderDone} /></div>
      <div id="directions"><HorizontalScroll /></div>
      <div id="cases"><Cases /></div>
      <div id="reviews"><Reviews /></div>
      <div id="faq"><FAQ /></div>
    </>
  )
}
