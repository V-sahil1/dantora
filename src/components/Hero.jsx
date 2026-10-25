import { useRef, useState } from 'react'
import { heroChips, heroSlides, images, navLinks } from '../data'
import { useBooking } from '../BookingContext'
import { gsap, useGSAP } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import { useActiveSection, useMagnetic } from '../lib/hooks'
import Words from '../lib/Words'
import { scrollToHash } from './SmoothScroll'
import { ArrowRight, CloseIcon, MenuIcon } from './Icons'

const SLIDE_INTERVAL = 7000

function NavBar() {
  const { openBooking } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()
  const ctaRef = useRef(null)
  useMagnetic(ctaRef, 0.25)

  return (
    <>
      <header className="hero-nav relative z-20 flex items-center justify-between gap-4">
        <a href="#hero" onClick={(e) => scrollToHash(e, '#hero')} aria-label="Dentora Home" className="group flex items-center gap-2.5 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:rotate-12">
            🦷
          </span>
          <span className="font-heading text-2xl font-bold tracking-tight">Dentora</span>
        </a>

        <nav aria-label="Main Navigation" className="glass-card hidden items-center gap-1.5 rounded-full p-1.5 shadow-glass md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToHash(e, link.href)}
              className={
                active === link.href
                  ? 'rounded-full bg-white px-5 py-2 text-xs font-semibold text-brand-charcoal shadow-sm transition-all duration-200 lg:text-sm'
                  : 'rounded-full px-4 py-2 text-xs font-medium text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white lg:text-sm'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            ref={ctaRef}
            onClick={() => openBooking()}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-brand-charcoal shadow-lg transition-colors duration-300 hover:bg-brand-teal hover:text-white sm:px-6 sm:text-sm"
          >
            Book a Call
          </button>
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="glass-card inline-flex rounded-full p-2 text-white hover:bg-white/20 focus:outline-none md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="glass-card relative z-30 mt-3 space-y-2 rounded-2xl p-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMenuOpen(false)
                scrollToHash(e, link.href)
              }}
              className={`block rounded-lg px-3 py-2 text-sm text-white ${
                active === link.href ? 'bg-white/20 font-semibold' : 'font-medium text-white/90 hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

/** Headline copy for one slide; animates itself in when swapped mid-session. */
function SlideCopy({ slide, selfAnimate }) {
  const ref = useRef(null)
  useAnimation(() => {
    if (!selfAnimate) return
    gsap
      .timeline()
      .from('.hero-title .word', { yPercent: 110, stagger: 0.05, duration: 0.9 })
      .from('.hero-text', { y: 20, autoAlpha: 0, duration: 0.7 }, 0.4)
  }, [], ref)

  return (
    <div ref={ref}>
      <h1 className="hero-title text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
        <Words text={slide.title[0]} />
        <br />
        <Words text={slide.title[1]} />
      </h1>
      <p className="hero-text mt-6 max-w-xl font-body text-base leading-relaxed text-white/85 sm:text-lg">{slide.text}</p>
    </div>
  )
}

export default function Hero({ introDone }) {
  const { openBooking } = useBooking()
  const sectionRef = useRef(null)
  const ctaRef = useRef(null)
  const imgRefs = useRef([])
  const hasChanged = useRef(false)
  const [index, setIndex] = useState(0)
  const [selectedChip, setSelectedChip] = useState(heroChips[0])
  const slide = heroSlides[index]

  useMagnetic(ctaRef, 0.2)

  const go = (delta) => {
    hasChanged.current = true
    setIndex((i) => (i + delta + heroSlides.length) % heroSlides.length)
  }

  // Auto-advance + slow Ken Burns zoom on the active photo
  useGSAP(
    () => {
      const id = setTimeout(() => go(1), SLIDE_INTERVAL)
      gsap.fromTo(imgRefs.current[index], { scale: 1.12 }, { scale: 1, duration: SLIDE_INTERVAL / 1000 + 1, ease: 'none' })
      return () => clearTimeout(id)
    },
    { dependencies: [index] },
  )

  // Intro choreography (after the preloader) + parallax exit while scrolling away
  useAnimation(() => {
    if (!introDone) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-nav > *', { y: -24, autoAlpha: 0, stagger: 0.1, duration: 0.8 }, 0.1)
      .from('.hero-title .word', { yPercent: 110, stagger: 0.06, duration: 1.1 }, 0.4)
      .from('.hero-text', { y: 24, autoAlpha: 0, duration: 0.8 }, 0.9)
      .from('.hero-cta > *', { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7 }, 1.0)
      .from('.hero-card', { y: 30, autoAlpha: 0, duration: 0.7 }, 1.15)
      .from('.hero-chip', { scale: 0.6, autoAlpha: 0, stagger: 0.05, duration: 0.5, ease: 'back.out(1.7)' }, 1.0)
      .from('.hero-bar', { autoAlpha: 0, y: 10, duration: 0.6 }, 1.3)

    const exit = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-content', { y: 180, autoAlpha: 0, ease: 'none', scrollTrigger: exit })
    gsap.to(sectionRef.current, { scale: 0.94, ease: 'none', scrollTrigger: exit })
  }, [introDone], sectionRef)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[90vh] origin-top flex-col justify-between overflow-hidden rounded-[2rem] p-6 text-white shadow-2xl sm:p-9 md:rounded-[2.75rem] lg:min-h-[94vh] lg:p-12"
    >
      {heroSlides.map((s, i) => (
        <img
          key={s.alt}
          ref={(el) => (imgRefs.current[i] = el)}
          src={s.image}
          alt={i === index ? s.alt : ''}
          aria-hidden={i !== index}
          className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      <NavBar />

      <div className="hero-content relative z-10 my-auto grid grid-cols-1 items-center gap-8 py-8 lg:grid-cols-12 lg:py-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <SlideCopy key={index} slide={slide} selfAnimate={hasChanged.current} />

          <div className="hero-cta mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              ref={ctaRef}
              onClick={() => openBooking()}
              className="group flex items-center gap-4 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-sm font-bold text-brand-charcoal shadow-xl transition-colors duration-300 hover:bg-brand-teal hover:text-white sm:text-base"
            >
              Book an Appointment
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white transition-colors group-hover:bg-brand-charcoal">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
            <a
              href="tel:8004336867"
              className="glass-card hidden items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold text-white/95 transition-all hover:bg-white/25 sm:inline-flex"
            >
              Direct Emergency line: (800) 433-6867
            </a>
          </div>

          <div className="pt-6">
            <a
              href="#about"
              onClick={(e) => scrollToHash(e, '#about')}
              className="hero-card glass-card flex max-w-xs items-center gap-3.5 rounded-2xl p-3 shadow-glass transition-transform duration-300 hover:scale-[1.02] sm:max-w-sm sm:p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/30">
                <img src={images.relaxedPatient} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal/20">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] text-brand-charcoal">▶</span>
                </div>
              </div>
              <div className="text-left">
                <p className="line-clamp-2 text-xs font-medium leading-snug text-white/95">Restore natural, healthy, confident smiles.</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs text-amber-400">★ 4.9</span>
                  <span className="text-[11px] text-white/70">(2.4k Patient Reviews)</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-end gap-3 pt-6 lg:col-span-5 lg:items-end lg:self-end lg:pt-0 xl:col-span-4">
          <div className="flex max-w-md flex-wrap gap-2.5 lg:justify-end">
            {heroChips.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setSelectedChip(chip)
                  openBooking(chip)
                }}
                className={`hero-chip glass-card rounded-full px-4 py-2 text-xs transition sm:text-sm ${
                  selectedChip === chip ? '!bg-white font-bold text-brand-charcoal shadow-md' : 'font-medium text-white hover:bg-white/30'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-bar relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-4 text-xs font-medium text-white/80 sm:flex-row">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/90">Your Teeth • Our Science</div>
        <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <button onClick={() => go(-1)} className="text-white/60 transition hover:text-white">
            Prev
          </button>
          <span className="text-xs font-bold tracking-widest text-white">
            {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <button onClick={() => go(1)} className="text-white/90 transition hover:text-white">
            Next
          </button>
        </div>
        <a href="#process-strip" onClick={(e) => scrollToHash(e, '#process-strip')} className="inline-flex items-center gap-1.5 transition hover:text-brand-teal">
          Scroll for More <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  )
}
