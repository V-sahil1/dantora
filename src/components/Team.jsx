import { useRef } from 'react'
import { doctors } from '../data'
import { useBooking } from '../BookingContext'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

export default function Team() {
  const { openBooking } = useBooking()
  const ref = useRef(null)

  useAnimation(() => {
    gsap.from('.team-title .word', { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    gsap.fromTo(
      '.team-card',
      { clipPath: 'inset(0% 0% 100% 0% round 1.5rem)', y: 40 },
      {
        clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.team-grid', start: 'top 75%' },
      },
    )
    gsap.from('.team-media > *', {
      scale: 1.3,
      stagger: 0.15,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.team-grid', start: 'top 75%' },
    })
  }, [], ref)

  return (
    <section id="team" ref={ref} className="py-12 md:py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">05 — Clinical Leadership</span>
        <h2 className="team-title mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Words text="Meet Our Dental Specialists" />
        </h2>
        <p className="mt-3 font-body text-sm text-brand-muted">Passionate clinicians combining academic credentials with an empathic, attentive bedside manner.</p>
      </div>

      <div className="team-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d) => (
          <div key={d.name} className="team-card group overflow-hidden rounded-3xl border border-brand-charcoal/5 bg-white shadow-soft">
            <div className="team-media relative h-80 w-full overflow-hidden bg-brand-cream">
              {d.image ? (
                <img src={d.image} alt={d.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-mint via-brand-cream to-brand-softsage/60">
                  <span className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white/70 text-4xl font-bold tracking-tight text-brand-tealDark shadow-soft transition-transform duration-500 group-hover:scale-105">
                    {d.initials}
                  </span>
                </div>
              )}
              <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur-md">{d.role}</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{d.name}</h3>
              <p className="mt-0.5 text-xs font-medium text-brand-teal">{d.school}</p>
              <p className="mt-3 font-body text-xs leading-relaxed text-brand-muted">{d.bio}</p>
              <div className="mt-4 flex items-center justify-between border-t border-brand-charcoal/5 pt-4">
                <span className="text-xs font-medium text-brand-muted">{d.highlight}</span>
                <button onClick={() => openBooking(`Consultation with ${d.short}`)} className="text-xs font-bold hover:text-brand-teal">
                  Consult {d.short} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
