# Dentora — Modern Dental Clinic Website

Animated, story-driven single-page site built from the Stitch design export.

**Stack:** React 18 · Vite · Tailwind CSS 3 · GSAP 3 (ScrollTrigger) · Three.js via @react-three/fiber + drei · Lenis smooth scroll

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## How the page is structured

| Order | Component | Motion |
|---|---|---|
| 0 | `Preloader` | Wordmark letters + 000→100 counter, then curtain wipes up |
| 1 | `Hero` | Word-by-word title reveal, 3 auto-rotating slides with Ken Burns zoom, parallax exit |
| 2 | `ProcessStrip` | Infinite marquee of the four care stages |
| 3 | `Journey` | **Pinned chapter.** Scroll scrubs through 4 stages while the molar (`three/JourneyScene`) turns, gets scan rings, polishes, then glows |
| 4 | `About` | Headline fills in word by word on scroll, counters count up, parallax showcase photo |
| 5 | `WhyChoose` | Cards tilt in, drift at different speeds |
| 6 | `Services` | **Pinned horizontal scroller** on desktop (≥1024px); stacked grid below |
| 7 | `Team` | Clip-path wipe reveal with image zoom-out |
| 8 | `Testimonials` | Section scales in; cards fan in |
| 9 | `Booking` | Dark panel grows into place; form slides up |
| 10 | `Faq`, `Footer` | Staggered reveals, giant watermark |

Also: `FloatingNav` (appears once the hero scrolls away), `ScrollProgress` bar, `BookingModal` (opened from any "Book" button), `SmoothScroll` (Lenis, paused while preloading / modal open).

## Editing content

All copy, services, doctors, FAQs and journey steps live in [`src/data.js`](src/data.js). Photos are in `src/assets/`.

## Animation conventions

- Every section calls `useAnimation(setup, deps, scopeRef)` from `src/lib/useAnimation.js`. It wraps `useGSAP` + `gsap.matchMedia`, **skips everything when the visitor prefers reduced motion**, and passes `{ desktop }` so a section can branch layouts.
- Word reveals use `<Words text="…" />` (`src/lib/Words.jsx`), which wraps each word in a `.line-mask > .word` pair; animate `.word` with `yPercent: 110`.
- The Three.js scene is lazy-loaded (`React.lazy`) so the ~260 KB gzip Three chunk never blocks first paint.

## Not wired up

Forms (booking, modal, newsletter) show a success state but post nowhere. Dr. Arya Sharma has no photo (initials placeholder) — drop one in `src/assets/` and set `image` in `data.js`.
