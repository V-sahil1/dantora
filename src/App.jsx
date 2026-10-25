import { useState } from 'react'
import { BookingProvider } from './BookingContext'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import FloatingNav from './components/FloatingNav'
import Hero from './components/Hero'
import About, { ProcessStrip } from './components/About'
import Journey from './components/Journey'
import WhyChoose from './components/WhyChoose'
import Services from './components/Services'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Faq from './components/Faq'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <SmoothScroll paused={!introDone}>
      <BookingProvider>
        <Preloader onDone={() => setIntroDone(true)} />
        <ScrollProgress />
        <FloatingNav />
        <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-5 md:py-5 lg:px-8">
          <Hero introDone={introDone} />
          <main>
            <ProcessStrip />
            <Journey />
            <About />
            <WhyChoose />
            <Services />
            <Team />
            <Testimonials />
            <Booking />
            <Faq />
          </main>
          <Footer />
        </div>
        <BookingModal />
      </BookingProvider>
    </SmoothScroll>
  )
}
