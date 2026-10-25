import { Suspense, lazy, useRef } from 'react'
import { journey } from '../data'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import { usePrefersReducedMotion } from '../lib/hooks'
import Words from '../lib/Words'

const JourneyScene = lazy(() => import('./three/JourneyScene'))

function Step({ step, className = '' }) {
  return (
    <article className={`journey-step ${className}`}>
      <span className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
        <span className="h-px w-8 bg-brand-teal" /> {step.n} — {step.kicker}
      </span>
      <h3 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl xl:text-5xl">
        <Words text={step.title} />
      </h3>
      <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-white/75 sm:text-base">{step.text}</p>
      <div className="mt-7 flex items-baseline gap-3">
        <span className="font-heading text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl">{step.stat[0]}</span>
        <span className="font-accent text-xs font-medium uppercase tracking-wider text-white/60">{step.stat[1]}</span>
      </div>
    </article>
  )
}

/** Pinned, scroll-scrubbed chapter: four care stages narrated by the 3D molar. */
export default function Journey() {
  const ref = useRef(null)
  const counterRef = useRef(null)
  const progress = useRef(0)
  const reduced = usePrefersReducedMotion()

  useAnimation(() => {
    const steps = gsap.utils.toArray('.journey-step')
    const stepLength = 2 // scroll "units" each step occupies

    gsap.set(steps.slice(1), { autoAlpha: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: `+=${steps.length * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          progress.current = self.progress
          const n = Math.min(steps.length, Math.floor(self.progress * steps.length) + 1)
          if (counterRef.current) counterRef.current.textContent = String(n).padStart(2, '0')
        },
      },
    })

    steps.forEach((step, i) => {
      const at = i * stepLength
      if (i > 0) {
        tl.fromTo(step, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.6 }, at)
        tl.from(step.querySelectorAll('.word'), { yPercent: 110, stagger: 0.04, duration: 0.6 }, at + 0.1)
      }
      if (i < steps.length - 1) tl.to(step, { autoAlpha: 0, y: -50, duration: 0.5 }, at + stepLength - 0.5)
    })

    tl.to('.journey-line', { scaleY: 1, ease: 'none', duration: steps.length * stepLength }, 0)

    // First chapter's words slide in on arrival rather than via scrub
    gsap.from(steps[0].querySelectorAll('.word'), {
      yPercent: 110,
      stagger: 0.05,
      duration: 0.9,
      scrollTrigger: { trigger: ref.current, start: 'top 60%' },
    })
  }, [], ref)

  if (reduced) {
    return (
      <section id="journey" className="rounded-[2.5rem] bg-brand-charcoal p-8 text-white sm:p-12 lg:p-16">
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.25em] text-white/50">Your Journey With Us</p>
        <div className="grid gap-12 md:grid-cols-2">
          {journey.map((s) => (
            <Step key={s.n} step={s} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="journey" ref={ref} className="relative h-screen overflow-hidden rounded-[2.5rem] bg-brand-charcoal text-white shadow-2xl">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />

      <div className="absolute inset-0 top-1/4 opacity-35 lg:left-1/2 lg:top-0 lg:opacity-100">
        <Suspense fallback={null}>
          <JourneyScene progress={progress} />
        </Suspense>
      </div>

      <div className="relative z-10 grid h-full grid-cols-1 p-7 sm:p-10 lg:grid-cols-2 lg:p-16">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">Your Journey With Us</p>
            <p className="text-xs font-semibold tabular-nums text-white/50">
              <span ref={counterRef} className="text-white">
                01
              </span>{' '}
              / {String(journey.length).padStart(2, '0')}
            </p>
          </div>

          <div className="relative flex-1">
            <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 sm:block">
              <div className="journey-line h-full w-full origin-top scale-y-0 bg-brand-teal" />
            </div>
            <div className="relative flex h-full flex-col justify-center sm:pl-10">
              {journey.map((s, i) => (
                <Step key={s.n} step={s} className={i === 0 ? '' : 'absolute inset-x-0 sm:left-10'} />
              ))}
            </div>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Keep scrolling ↓</p>
        </div>
      </div>
    </section>
  )
}
