'use client'
import { useEffect } from 'react'
import { gsap } from '../lib/gsap'

/**
 * TextZoom — mounts once, attaches smooth GSAP scale on
 * mouseenter / mouseleave to every text element on the page.
 * GSAP animates the transform directly so overflow:hidden on
 * parent cards never clips the effect.
 */

const TARGETS = [
  /* headings */
  { sel: 'h1, h2, h3, h4',            scale: 1.04, dur: 0.45 },
  /* nav */
  { sel: '.site-header__link',         scale: 1.10, dur: 0.35 },
  { sel: '.site-header__brand',        scale: 1.07, dur: 0.35 },
  /* eyebrows / labels */
  { sel: '.hero__eyebrow, .our-honey__eyebrow, .pe__pill',
                                        scale: 1.07, dur: 0.40 },
  /* subtitles / body emphasis */
  { sel: '.hero__sub, .pe__subtitle, .our-honey__subtitle',
                                        scale: 1.03, dur: 0.45 },
  /* stat numbers */
  { sel: '.hero__stat-value, .pe-stat__value',
                                        scale: 1.14, dur: 0.40 },
  /* stat blocks */
  { sel: '.hero__stat',                scale: 1.08, dur: 0.40 },
  /* card titles & taglines */
  { sel: '.honey-card__name, .honey-card__tagline, .honey-card__price',
                                        scale: 1.07, dur: 0.38 },
  { sel: '.pe-card__title',            scale: 1.06, dur: 0.38 },
  /* hero live tag */
  { sel: '.hero__tag',                 scale: 1.07, dur: 0.38 },
]

const EASE_IN  = 'back.out(2.2)'
const EASE_OUT = 'power2.out'

export default function TextZoom() {
  useEffect(() => {
    const cleanups = []

    TARGETS.forEach(({ sel, scale, dur }) => {
      const els = document.querySelectorAll(sel)
      els.forEach(el => {
        const onEnter = () =>
          gsap.to(el, { scale, duration: dur, ease: EASE_IN,  overwrite: 'auto' })
        const onLeave = () =>
          gsap.to(el, { scale: 1, duration: dur * 0.85, ease: EASE_OUT, overwrite: 'auto' })

        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  return null
}
