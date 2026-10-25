import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useAnimation } from '../lib/useAnimation'
import { scrollToHash } from './SmoothScroll'
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from './Icons'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Services', href: '#treatments' },
      { label: 'About Us', href: '#about' },
      { label: 'Dentist', href: '#team' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Blog', href: '#' },
      { label: 'Faq', href: '#faq' },
      { label: '404 Error', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'License', href: '#' },
      { label: 'Instruction', href: '#' },
    ],
  },
]

const socials = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'X', href: '#', Icon: XIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
]

const EMAIL = 'hellodentora@gmail.com'

const onLink = (e, href) => {
  if (href.length > 1) scrollToHash(e, href)
}

export default function Footer() {
  const ref = useRef(null)

  useAnimation(() => {
    gsap.from('.footer-col', { y: 40, autoAlpha: 0, stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
    // Wordmark letters rise out of the card's bottom edge as the footer scrolls in
    gsap.from('.footer-letter', {
      yPercent: 100,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: { trigger: '.footer-word', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
    })
  }, [], ref)

  return (
    <footer ref={ref} className="mt-16 overflow-hidden rounded-[2rem] bg-white px-6 pt-10 shadow-soft sm:px-10 sm:pt-14 md:rounded-[2.5rem]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12">
        {columns.map((col) => (
          <div key={col.title} className="footer-col lg:col-span-2">
            <h4 className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-brand-muted">{col.title}</h4>
            <ul className="mt-5 space-y-3 text-sm text-brand-charcoal">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => onLink(e, l.href)} className="transition-colors hover:text-brand-teal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col col-span-2 sm:col-span-3 lg:col-span-5 lg:col-start-8">
          <h4 className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-brand-muted">We'd love to help you with ease</h4>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-block break-all font-heading text-2xl font-semibold tracking-tight underline decoration-1 underline-offset-[6px] transition-colors hover:text-brand-teal sm:text-3xl xl:text-4xl"
          >
            {EMAIL}
          </a>
          <p className="mt-8 text-sm text-brand-charcoal">Follow Us</p>
          <div className="mt-3 flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-charcoal text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p
        className="footer-word mt-10 flex select-none justify-center overflow-hidden font-heading text-[23vw] font-bold leading-[0.8] tracking-tighter lg:text-[17rem]"
        aria-hidden="true"
      >
        {'Dentora'.split('').map((l, i) => (
          <span
            key={i}
            className="footer-letter inline-block bg-gradient-to-b from-brand-charcoal/[0.09] to-brand-charcoal/[0.015] bg-clip-text pb-[0.05em] text-transparent"
          >
            {l}
          </span>
        ))}
      </p>

      <div className="flex flex-col items-center gap-3 border-t border-brand-charcoal/5 py-6 text-xs text-brand-muted sm:grid sm:grid-cols-3">
        <p className="sm:justify-self-start">©{new Date().getFullYear()} All Rights Reserved</p>
        <a href="#" className="transition-colors hover:text-brand-charcoal sm:justify-self-center">
          Terms &amp; Conditions
        </a>
        <a href="#" className="transition-colors hover:text-brand-charcoal sm:justify-self-end">
          Privacy &amp; Policy
        </a>
      </div>
    </footer>
  )
}
