'use client'
/**
 * Parallax — moves its child at a slower rate than the scroll.
 * Finds the nearest <section> ancestor as the scroll trigger boundary.
 *
 * offset: total px of travel across the section's scroll range.
 *   Positive = child drifts upward as section scrolls past (natural depth).
 */
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Parallax({ children, offset = 50, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const section = el.closest('section')
    if (!section) return

    const anim = gsap.fromTo(
      el,
      { y: offset * 0.4 },
      {
        y: offset * -0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end:   'bottom top',
          scrub: true,
        },
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [offset])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
