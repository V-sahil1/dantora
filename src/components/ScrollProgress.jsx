import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'

export default function ScrollProgress() {
  const ref = useRef(null)

  useAnimation(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    })
  })

  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-brand-teal" />
}
