import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

let lenis = null

export const getLenis = () => lenis

/** Smoothly scrolls to a hash target; falls back to native when Lenis is off. */
export function scrollToHash(e, href) {
  const target = document.querySelector(href)
  if (!target) return
  e?.preventDefault()
  if (lenis) lenis.scrollTo(target, { offset: -12 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

export default function SmoothScroll({ paused, children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (paused) lenis.stop()
    else {
      lenis.start()
      ScrollTrigger.refresh()
    }
  }, [paused])

  return children
}
