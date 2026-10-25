import { useRef } from 'react'
import { services } from '../data'
import { useBooking } from '../BookingContext'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

/** On desktop the section pins and the cards scroll horizontally; on smaller screens they stack. */
export default function Services() {
  const { openBooking } = useBooking()
  const ref = useRef(null)
  const trackRef = useRef(null)

  useAnimation(({ desktop }) => {
    gsap.from('.services-title .word', { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 75%' } })

    if (desktop) {
      const track = trackRef.current
      const distance = () => track.scrollWidth - track.clientWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.from('.service-card', { x: 120, autoAlpha: 0, stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
    } else {
      gsap.from('.service-card', { y: 60, autoAlpha: 0, stagger: 0.1, scrollTrigger: { trigger: trackRef.current, start: 'top 80%' } })
    }
  }, [], ref)

  return (
    <section id="treatments" ref={ref} className="py-16 md:py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">04 — Our Specialties</span>
          <h2 className="services-title mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <Words text="Comprehensive Dental Solutions" />
          </h2>
        </div>
        <p className="max-w-md font-body text-sm text-brand-muted">
          From preventative wellness checkups to state-of-the-art restorative implants, we cater to all generations of smiles under one tranquil roof.
          <span className="mt-2 hidden text-xs font-semibold uppercase tracking-wider text-brand-charcoal lg:block">Scroll to explore →</span>
        </p>
      </div>

      <div ref={trackRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:flex-nowrap lg:will-change-transform">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="service-card group flex flex-col justify-between rounded-3xl border border-brand-charcoal/5 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-elevated lg:w-[400px] lg:shrink-0 lg:p-8"
          >
            <div>
              <div className="mb-5 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mint text-xl">{s.icon}</span>
                <span className="rounded-full bg-brand-ivory px-3 py-1 text-xs font-semibold text-brand-muted">{s.tag}</span>
              </div>
              <span className="text-xs font-bold text-brand-softsage">0{i + 1}</span>
              <h3 className="mt-1 text-xl font-bold transition-colors group-hover:text-brand-tealDark">{s.title}</h3>
              <p className="mt-2.5 font-body text-sm leading-relaxed text-brand-muted">{s.text}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-brand-charcoal/5 pt-6 text-xs font-bold">
              <span className={s.metaHighlight ? 'text-emerald-600' : 'text-brand-muted'}>{s.meta}</span>
              <button onClick={() => openBooking(s.booking)} className="flex items-center gap-1 transition-transform hover:text-brand-teal group-hover:translate-x-1">
                Book Now →
              </button>
            </div>
          </div>
        ))}

        <div className="service-card hidden w-[320px] shrink-0 flex-col justify-center rounded-3xl bg-brand-charcoal p-8 text-white lg:flex">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Not sure where to start?</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">Book a free 15-minute smile consult.</h3>
          <button
            onClick={() => openBooking('Free Smile Consult')}
            className="mt-6 w-fit rounded-full bg-brand-teal px-5 py-2.5 text-xs font-bold text-brand-charcoal transition hover:bg-white"
          >
            Reserve a slot →
          </button>
        </div>
      </div>
    </section>
  )
}
