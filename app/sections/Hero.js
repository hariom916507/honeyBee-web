'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import FadeIn from '../components/FadeIn'

export default function Hero() {
  const titleRef   = useRef(null)
  const sectionRef = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    const title   = titleRef.current
    const section = sectionRef.current
    const grid    = gridRef.current
    if (!title || !section || !grid) return

    gsap.set(title, { opacity: 0, y: 48 })

    const revealTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      },
    })

    const parallaxAnim = gsap.to(grid, {
      y: '-18%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end:   'bottom top',
        scrub: true,
      },
    })

    return () => {
      revealTrigger.kill()
      parallaxAnim.scrollTrigger?.kill()
      parallaxAnim.kill()
    }
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero__grid" ref={gridRef} />

      {/* Left floating facts */}
      <div className="hero__facts hero__facts--left">
        <FadeIn delay={900}>
          <div className="hero__fact">
            <div className="hero__fact-value">150M</div>
            <div className="hero__fact-label">Years of evolution</div>
          </div>
        </FadeIn>
        <FadeIn delay={1050}>
          <div className="hero__fact">
            <div className="hero__fact-value">20k+</div>
            <div className="hero__fact-label">Bee species worldwide</div>
          </div>
        </FadeIn>
      </div>

      {/* Centre content */}
      <div className="hero__content">
        <FadeIn delay={0} variant="near">
          <p className="hero__label">Nature&apos;s Finest Craft</p>
        </FadeIn>

        <h1 className="hero__title" ref={titleRef}>
          From Flower<br />to Honey
        </h1>

        <FadeIn delay={400}>
          <p className="hero__subtitle">
            A journey through the ancient and extraordinary process<br />
            that transforms nectar into liquid gold.
          </p>
        </FadeIn>

        <FadeIn delay={600} variant="near">
          <a href="#collecting" className="hero__cta">
            Begin the Journey
            <span className="hero__cta-arrow">↓</span>
          </a>
        </FadeIn>
      </div>

      {/* Right floating facts */}
      <div className="hero__facts hero__facts--right">
        <FadeIn delay={900}>
          <div className="hero__fact">
            <div className="hero__fact-value">100%</div>
            <div className="hero__fact-label">Natural process</div>
          </div>
        </FadeIn>
        <FadeIn delay={1050}>
          <div className="hero__fact">
            <div className="hero__fact-value">∞</div>
            <div className="hero__fact-label">Shelf life when sealed</div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
