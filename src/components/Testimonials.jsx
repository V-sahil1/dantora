import { useRef } from 'react'
import { testimonials } from '../data'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

export default function Testimonials() {
  const ref = useRef(null)

  useAnimation(() => {
    gsap.from(ref.current, {
      scale: 0.96,
      autoAlpha: 0.4,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 45%', scrub: true },
    })
    gsap.from('.testi-title .word', { yPercent: 110, stagger: 0.04, scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
    gsap.from('.testi-card', {
      y: 70,
      autoAlpha: 0,
      rotate: (i) => (i - 1) * 1.5,
      stagger: 0.15,
      duration: 1,
      scrollTrigger: { trigger: '.testi-grid', start: 'top 80%' },
    })
    gsap.from('.testi-quote', { scale: 0.5, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
  }, [], ref)

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden rounded-3xl bg-brand-cream p-8 py-12 sm:p-12 md:py-20">
      <span className="testi-quote pointer-events-none font-heading absolute -right-4 -top-10 select-none text-[14rem] font-bold leading-none text-brand-teal/15 sm:text-[20rem]" aria-hidden="true">
        ”
      </span>

      <div className="relative mb-12 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-tealDark">06 — Real Experiences</span>
        <h2 className="testi-title mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Words text="Patient Stories of Restored Confidence" />
        </h2>
      </div>

      <div className="testi-grid relative grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="testi-card flex flex-col justify-between rounded-2xl bg-white p-7 shadow-soft">
            <div className="space-y-3">
              <div className="text-sm text-amber-400" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote className="font-accent text-sm italic leading-relaxed text-brand-charcoal/90 sm:text-[15px]">"{t.quote}"</blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-charcoal/5 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mint text-xs font-bold">{t.initials}</div>
              <div>
                <h4 className="text-xs font-bold">{t.name}</h4>
                <p className="text-[11px] text-brand-muted">{t.meta}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
