import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const LETTERS = 'Dentora'.split('')

export default function Preloader({ onDone }) {
  const ref = useRef(null)
  const numRef = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(ref.current, { display: 'none' })
        onDone()
        return
      }

      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: () => gsap.set(ref.current, { display: 'none' }) })

      tl.from('.pre-letter', { yPercent: 110, stagger: 0.05, duration: 0.9, ease: 'power4.out' })
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            },
          },
          0.2,
        )
        .to('.pre-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.2)
        .to('.pre-inner', { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .add(onDone, '<')
        .to(ref.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '<0.1')
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex flex-col justify-between bg-brand-charcoal p-6 text-white sm:p-10" aria-hidden="true">
      <div className="pre-inner flex h-full flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          <span>Modern Family Dentistry</span>
          <span>Est. 2012</span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <h1 className="flex text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            {LETTERS.map((l, i) => (
              <span key={i} className="line-mask">
                <span className="pre-letter inline-block">{l}</span>
              </span>
            ))}
          </h1>
          <span ref={numRef} className="font-mono text-2xl tabular-nums text-brand-teal sm:text-4xl">
            000
          </span>
        </div>
      </div>
      <div className="pre-bar absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand-teal" />
    </div>
  )
}
