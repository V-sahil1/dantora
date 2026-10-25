import { gsap, useGSAP } from './gsap'

/**
 * Runs a GSAP setup function inside a scoped context, but only when the
 * visitor has not asked for reduced motion. The callback receives
 * `{ desktop }` so sections can branch between layouts.
 */
export function useAnimation(setup, deps = [], scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // `all` always matches: matchMedia only invokes the callback when at
      // least one condition is true, and phones match neither of the others.
      mm.add(
        {
          all: '(min-width: 1px)',
          reduced: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 1024px)',
        },
        (ctx) => {
          const { reduced, desktop } = ctx.conditions
          if (reduced) return undefined
          return setup({ desktop })
        },
      )
      return () => mm.revert()
    },
    { scope, dependencies: deps },
  )
}
