import { useRef } from 'react'
import { images, processSteps, stats } from '../data'
import { useBooking } from '../BookingContext'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

/** Infinite marquee of the four care stages. */
export function ProcessStrip() {
  const ref = useRef(null)

  useAnimation(() => {
    gsap.to('.marquee-track', { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
  }, [], ref)

  const items = [...processSteps, ...processSteps]

  return (
    <section id="process-strip" ref={ref} className="overflow-hidden py-7 md:py-9">
      <div className="marquee-track flex w-max items-center">
        {items.map((step, i) => (
          <div key={`${step.label}-${i}`} className="flex items-center">
            <div className="barcode-pattern mx-6 h-6 w-24 rounded-sm opacity-60 sm:mx-10 sm:w-32" />
            <div className="flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-tight sm:text-sm">
              <span className={`h-2 w-2 rounded-full ${step.dot}`} />
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function About() {
  const { openBooking } = useBooking()
  const ref = useRef(null)

  useAnimation(() => {
    // Headline "fills in" word by word as it scrolls through the viewport
    gsap.fromTo(
      '.about-word',
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: '.about-headline', start: 'top 85%', end: 'bottom 45%', scrub: true },
      },
    )

    gsap.from('.about-portrait', {
      y: 40,
      autoAlpha: 0,
      rotate: -4,
      stagger: 0.15,
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    })

    // Counters count up once visible
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count)
      const suffix = el.dataset.suffix || ''
      const decimals = el.dataset.count.includes('.') ? 1 : 0
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => (el.textContent = obj.v.toFixed(decimals) + suffix),
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    gsap.from('.about-stat', { y: 30, autoAlpha: 0, stagger: 0.12, scrollTrigger: { trigger: '.about-stats', start: 'top 85%' } })

    // Showcase image: parallax inside its frame + frame reveal
    gsap.from('.about-showcase', {
      clipPath: 'inset(12% 8% 12% 8% round 2rem)',
      scale: 0.96,
      duration: 1.2,
      scrollTrigger: { trigger: '.about-showcase', start: 'top 80%' },
    })
    gsap.fromTo(
      '.about-showcase img',
      { yPercent: -12 },
      { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.about-showcase', start: 'top bottom', end: 'bottom top', scrub: true } },
    )
    gsap.from('.about-overlay', { y: 30, autoAlpha: 0, scrollTrigger: { trigger: '.about-showcase', start: 'top 60%' } })
  }, [], ref)

  return (
    <section id="about" ref={ref} className="pb-16 pt-8 md:py-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 xl:gap-14">
        <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
          <div>
            <span className="mb-6 inline-block rounded-full border border-brand-charcoal/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              01 — About Us
            </span>
            <div className="flex items-center gap-4">
              {[
                { src: images.drChen, alt: 'Dr. Michael Chen' },
                { src: images.drJennings, alt: 'Dr. Sarah Jennings' },
              ].map((p) => (
                <div key={p.alt} className="about-portrait h-24 w-24 overflow-hidden rounded-2xl border-2 border-white shadow-soft sm:h-28 sm:w-28">
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>
          </div>

          <div className="about-stats pt-4">
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-brand-muted">Thousands Trust Us for Smiles!</p>
            <div className="grid grid-cols-3 gap-4 border-t border-brand-charcoal/10 pt-5">
              {stats.map((s) => (
                <div key={s.label} className="about-stat">
                  <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    <span data-count={s.count} data-suffix={s.suffix}>
                      0{s.suffix}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-brand-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-7">
          <h2 className="about-headline text-2xl font-bold leading-[1.25] tracking-tight sm:text-3xl md:text-4xl xl:text-5xl">
            <span className="font-bold">
              <Words text="We deliver personalized dental treatments with modern" wordClass="about-word" />
            </span>
            <span className="font-accent font-normal text-brand-muted">
              <Words text="technology and gentle care ensuring healthy confident smiles for every patient." wordClass="about-word" />
            </span>
          </h2>

          <div className="about-showcase group relative overflow-hidden rounded-3xl bg-white shadow-elevated">
            <img
              src={images.relaxedPatient}
              alt="Delighted patient relaxing in a modern dental chair"
              className="h-[300px] w-full scale-[1.25] object-cover sm:h-[400px] md:h-[460px]"
            />
            <div className="about-overlay glass-card absolute bottom-4 left-4 right-4 flex flex-col items-start justify-between gap-3 rounded-2xl !bg-brand-charcoal/70 p-4 text-white sm:bottom-6 sm:left-6 sm:right-6 sm:flex-row sm:items-center sm:p-5">
              <div>
                <h4 className="text-sm font-bold sm:text-base">Comprehensive Smile Reconstruction</h4>
                <p className="text-xs text-white/80">Tailored multi-disciplinary approaches for stress-free visits.</p>
              </div>
              <button
                onClick={() => openBooking('Smile Reconstruction Consultation')}
                className="shrink-0 rounded-full bg-brand-teal px-4 py-2 text-xs font-bold text-brand-charcoal transition-colors hover:bg-white"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
