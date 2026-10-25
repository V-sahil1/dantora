import { useRef, useState } from 'react'
import { faqs } from '../data'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import Words from '../lib/Words'

export default function Faq() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useAnimation(() => {
    gsap.from('.faq-title .word', { yPercent: 110, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    gsap.from('.faq-item', { y: 40, autoAlpha: 0, stagger: 0.1, scrollTrigger: { trigger: '.faq-list', start: 'top 85%' } })
  }, [], ref)

  return (
    <section id="faq" ref={ref} className="mx-auto max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">08 — Common Inquiries</span>
        <h2 className="faq-title mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          <Words text="Frequently Asked Questions" />
        </h2>
      </div>

      <div className="faq-list space-y-4">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="faq-item overflow-hidden rounded-2xl border border-brand-charcoal/10 bg-white">
              <button
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-bold sm:text-base"
              >
                <span>{f.q}</span>
                <span className={`text-xl text-brand-teal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`grid transition-all duration-400 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 font-body text-xs leading-relaxed text-brand-muted sm:text-sm">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
