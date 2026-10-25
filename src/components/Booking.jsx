import { useEffect, useRef, useState } from 'react'
import { bookingServices, doctors } from '../data'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

const perks = [
  'Zero waiting room congestion guaranteed',
  'Complimentary 3D smile scan with first comprehensive exam',
  'Emergency appointments accommodated daily',
]

const today = () => new Date().toISOString().split('T')[0]

export default function Booking() {
  const ref = useRef(null)
  const [service, setService] = useState(bookingServices[0].value)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) return undefined
    const id = setTimeout(() => setSubmitted(false), 8000)
    return () => clearTimeout(id)
  }, [submitted])

  useAnimation(() => {
    // Dark panel grows into place as it enters, like a new chapter opening
    gsap.from('.booking-panel', {
      scale: 0.9,
      borderRadius: '4rem',
      autoAlpha: 0.5,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 35%', scrub: true },
    })
    gsap.from('.booking-title .word', { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 60%' } })
    gsap.from('.booking-perk', { x: -30, autoAlpha: 0, stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 55%' } })
    gsap.from('.booking-form', { y: 60, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: ref.current, start: 'top 55%' } })
    gsap.to('.booking-glow', { x: -200, y: 160, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  }, [], ref)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
    setService(bookingServices[0].value)
  }

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24">
      <div className="booking-panel relative overflow-hidden rounded-[2.5rem] bg-brand-charcoal p-8 text-white shadow-2xl sm:p-12 lg:p-16">
        <div className="booking-glow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal">07 — Immediate Scheduling</span>
            <h2 className="booking-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <Words text="Begin Your Journey to a Radiant Smile." />
            </h2>
            <p className="font-body text-sm leading-relaxed text-white/80">
              Select your desired service, date, and preferred doctor. We verify dental insurance beforehand so you know costs with total clarity.
            </p>
            <div className="space-y-4 border-t border-white/15 pt-4">
              {perks.map((p) => (
                <div key={p} className="booking-perk flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-sm font-bold text-brand-teal">✓</span>
                  <span className="text-xs text-white/90 sm:text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="booking-form space-y-4 rounded-3xl bg-white p-6 text-brand-charcoal shadow-elevated sm:p-8">
              <h3 className="text-xl font-bold">Book Your Visit Online</h3>
              <p className="text-xs text-brand-muted">Fill out the quick details below and our concierge will confirm your slot within 15 minutes.</p>

              <fieldset className="space-y-2 pt-2">
                <legend className="field-label">Select Treatment</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {bookingServices.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      aria-pressed={service === s.value}
                      onClick={() => setService(s.value)}
                      className={`rounded-xl border border-brand-charcoal/20 px-2.5 py-2 text-center text-xs font-semibold transition ${
                        service === s.value ? 'border-brand-teal bg-brand-teal text-white' : 'bg-brand-ivory hover:border-brand-teal'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="service" value={service} />
              </fieldset>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <label>
                  <span className="field-label">Full Name</span>
                  <input name="name" type="text" required placeholder="e.g. Rachel Adams" className="field" />
                </label>
                <label>
                  <span className="field-label">Phone Number</span>
                  <input name="phone" type="tel" required placeholder="(555) 019-2834" className="field" />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className="field-label">Preferred Date</span>
                  <input name="date" type="date" required min={today()} className="field" />
                </label>
                <label>
                  <span className="field-label">Preferred Doctor</span>
                  <select name="doctor" className="field">
                    <option>Any Available Doctor</option>
                    {doctors.map((d) => (
                      <option key={d.name}>
                        {d.name.split(',')[0]} ({d.role})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand-charcoal py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brand-teal hover:text-brand-charcoal"
                >
                  Confirm Appointment Request →
                </button>
              </div>

              {submitted && (
                <div role="status" className="flex animate-fade-in items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800">
                  <span>✓</span>
                  <span>Thank you! Your appointment request has been submitted. A Dentora clinical coordinator is preparing your intake pack.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
