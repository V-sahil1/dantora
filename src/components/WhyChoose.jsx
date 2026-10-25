import { useRef } from 'react'
import { images } from '../data'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'
import { ArrowLeft, ArrowRight } from './Icons'

const cardBase =
  'why-card flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-3xl p-6 transition-shadow duration-300 sm:w-[48%] lg:w-auto lg:shrink'

export default function WhyChoose() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    track.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 300), behavior: 'smooth' })
  }

  useAnimation(({ desktop }) => {
    gsap.from('.why-title .word', { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 78%' } })
    gsap.from('.why-card', {
      y: 80,
      autoAlpha: 0,
      rotateX: desktop ? 8 : 0,
      transformPerspective: 900,
      stagger: 0.12,
      duration: 1,
      scrollTrigger: { trigger: trackRef.current, start: 'top 80%' },
    })
    if (desktop) {
      // Alternate cards drift at different speeds for depth
      gsap.utils.toArray('.why-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 ? -40 : 20,
          ease: 'none',
          scrollTrigger: { trigger: trackRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }
  }, [], ref)

  return (
    <section id="why-choose" ref={ref} className="py-12 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-brand-teal">03 — Why Choose Dentora</span>
          <h2 className="why-title text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <Words text="Why Choose Precision Dental?" />
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-start md:self-end lg:hidden">
          <button
            aria-label="Previous card"
            onClick={() => scroll(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-charcoal/20 bg-white shadow-sm transition-all hover:bg-brand-ivory"
          >
            <ArrowLeft />
          </button>
          <button
            aria-label="Next card"
            onClick={() => scroll(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal text-white shadow-md transition-all hover:bg-brand-tealDark"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
        <div className={`${cardBase} border border-brand-charcoal/10 bg-white shadow-soft hover:shadow-elevated`}>
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">98%</div>
              <p className="mt-1 max-w-[140px] text-xs font-medium leading-snug text-brand-muted">Reliable Oral Health Diagnostics</p>
            </div>
            <div className="flex h-14 items-end gap-2 pb-1 pl-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-9 w-4 rounded-full bg-brand-teal/70" />
                <span className="text-[10px] font-semibold text-brand-muted">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-12 w-4 rounded-full bg-brand-teal" />
                <span className="text-[10px] font-semibold text-brand-muted">Apr</span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-48 w-full overflow-hidden rounded-2xl border border-brand-charcoal/5">
            <img src={images.relaxedPatient} alt="Smiling patient receiving a gentle exam" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className={`${cardBase} bg-[#24a4ad] text-white shadow-elevated`}>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <img src={images.relaxedPatient} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <img src={images.heroPatient} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-[10px] font-bold text-brand-charcoal shadow-sm">
                  +
                </span>
              </div>
              <span className="text-xs font-semibold text-white/90">3.6K+ join the smiles</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-charcoal shadow-sm">🏆 Rewards</span>
          </div>
          <p className="pt-10 text-base font-semibold leading-snug sm:text-lg">
            Maintain your preventive care streak and earn exclusive whitening and cosmetic rewards.
          </p>
        </div>

        <div className={`${cardBase} border border-brand-charcoal/10 bg-white shadow-soft hover:shadow-elevated`}>
          <div>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-teal">3D Precision Scans</span>
            <h3 className="mb-3 text-xl font-bold tracking-tight">Complete Oral Diagnostics</h3>
            <div className="mb-3 h-40 w-full overflow-hidden rounded-2xl border border-brand-charcoal/5">
              <img src={images.scan3d} alt="3D digital dental jaw scan on a diagnostic display" className="h-full w-full object-cover" />
            </div>
          </div>
          <p className="font-body text-xs leading-relaxed text-brand-muted">
            Instant CBCT jaw mapping with 0.1mm sub-millimeter precision for gentle guided treatments.
          </p>
        </div>

        <div className={`${cardBase} border border-brand-charcoal/10 bg-brand-cream shadow-soft hover:shadow-elevated`}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">🌿</span>
              <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold">Private Suites</span>
            </div>
            <h3 className="mb-2 text-xl font-bold tracking-tight">Tailored Comfort Sanctuary</h3>
            <p className="mb-4 font-body text-xs leading-relaxed text-brand-muted">
              Aromatherapy, zero-waiting room check-in, and noise-canceling entertainment for relaxed appointments.
            </p>
          </div>
          <div className="h-36 w-full overflow-hidden rounded-2xl border border-brand-charcoal/5">
            <img src={images.heroPatient} alt="Comfortable smiling patient with dentist" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
