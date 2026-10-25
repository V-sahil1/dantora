import { useRef } from 'react'
import { navLinks } from '../data'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import { useActiveSection } from '../lib/hooks'
import { useBooking } from '../BookingContext'
import { scrollToHash } from './SmoothScroll'

/** Compact pill nav that drops in once the hero has scrolled away. */
export default function FloatingNav() {
  const ref = useRef(null)
  const active = useActiveSection()
  const { openBooking } = useBooking()

  useAnimation(() => {
    gsap.set(ref.current, { yPercent: -160, autoAlpha: 0 })
    const show = () => gsap.to(ref.current, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
    const hide = () => gsap.to(ref.current, { yPercent: -160, autoAlpha: 0, duration: 0.4, ease: 'power3.in' })
    ScrollTrigger.create({ trigger: '#hero', start: 'bottom top+=120', onEnter: show, onLeaveBack: hide })
  })

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 right-0 top-4 z-40 hidden justify-center px-4 md:flex">
      <nav
        aria-label="Floating navigation"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-brand-charcoal/85 p-1.5 shadow-elevated backdrop-blur-xl"
      >
        <a href="#hero" onClick={(e) => scrollToHash(e, '#hero')} className="mr-1 flex items-center gap-2 pl-3 pr-2 font-heading text-sm font-bold text-white">
          <span>🦷</span> Dentora
        </a>
        {navLinks.slice(1).map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollToHash(e, link.href)}
            className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
              active === link.href ? 'bg-white text-brand-charcoal' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => openBooking()}
          className="ml-1 rounded-full bg-brand-teal px-4 py-2 text-xs font-bold text-brand-charcoal transition hover:bg-white"
        >
          Book
        </button>
      </nav>
    </div>
  )
}
