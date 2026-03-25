'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const INLINE_IMGS = [
  '/images/honeycomb-bees.jpg',
  '/images/honey_drizzle.png',
  '/images/white_honey.png',
]

export default function Hero() {
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const subRef      = useRef(null)
  const btnsRef     = useRef(null)
  const imgRef      = useRef(null)
  const scrollRef   = useRef(null)
  const sideLeftRef = useRef(null)
  const sideRightRef= useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current

    // ── word spans
    const words = section.querySelectorAll('.hw')
    gsap.set(words,              { y: '115%' })
    gsap.set(subRef.current,     { opacity: 0, y: 24 })
    gsap.set(btnsRef.current,    { opacity: 0, y: 20 })
    gsap.set(imgRef.current,     { opacity: 0, x: 60, scale: 0.94 })
    gsap.set(sideLeftRef.current,  { opacity: 0, x: -20 })
    gsap.set(sideRightRef.current, { opacity: 0, x: 20 })
    gsap.set(scrollRef.current,  { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl
      .to(sideLeftRef.current,   { opacity: 1, x: 0, duration: 0.9 }, 0.1)
      .to(sideRightRef.current,  { opacity: 1, x: 0, duration: 0.9 }, 0.1)
      .to(words,                 { y: '0%', duration: 1.0, stagger: 0.1, ease: 'power4.out' }, 0.5)
      .to(subRef.current,        { opacity: 1, y: 0, duration: 0.9 }, 1.2)
      .to(btnsRef.current,       { opacity: 1, y: 0, duration: 0.8 }, 1.4)
      .to(imgRef.current,        { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power3.out' }, 0.35)
      .to(scrollRef.current,     { opacity: 1, duration: 0.8 }, 2.2)

    return () => { tl.kill() }
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* Subtle honeycomb pattern background */}
      <div className="hero__hcbg" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroHc" x="0" y="0" width="70" height="80" patternUnits="userSpaceOnUse">
              <polygon points="35,3 67,21 67,57 35,75 3,57 3,21"
                fill="none" stroke="rgba(200,130,0,0.07)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroHc)"/>
        </svg>
      </div>

      {/* Soft ambient glows */}
      <div className="hero__glow hero__glow--a" aria-hidden="true" />
      <div className="hero__glow hero__glow--b" aria-hidden="true" />

      {/* ── Left sidebar ── */}
      <aside className="hero__side hero__side--left" ref={sideLeftRef} aria-label="Social links">
        <span className="hero__follow-text">Follow Us</span>
        <span className="hero__follow-line" />
        <ul className="hero__socials">
          {[
            { label: 'Facebook',  icon: 'f'  },
            { label: 'Instagram', icon: 'ig' },
            { label: 'Twitter',   icon: 'tw' },
            { label: 'LinkedIn',  icon: 'in' },
            { label: 'Pinterest', icon: '●'  },
          ].map(s => (
            <li key={s.label}>
              <a href="#" aria-label={s.label} className="hero__social-link">{s.icon}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main content ── */}
      <div className="hero__content">


        {/* Title */}
        <h1 className="hero__title" ref={titleRef}>

          {/* Line 1: Pure Honey. */}
          <span className="hero__line">
            {['Pure', 'Honey.'].map((w, i) => (
              <span key={i} className="hero__wrap">
                <span className="hw">{w}</span>
              </span>
            ))}
          </span>

          {/* Line 2: [thumbnails] + Transparent */}
          <span className="hero__line hero__line--row">
            <span className="hero__thumbs" aria-hidden="true">
              {INLINE_IMGS.map((src, i) => (
                <span key={i} className="hero__thumb">
                  <img src={src} alt="" className="hero__thumb-img" />
                </span>
              ))}
            </span>
            <span className="hero__wrap hero__wrap--accent">
              <span className="hw">Transparent</span>
            </span>
          </span>

          {/* Line 3: Sourcing. */}
          <span className="hero__line">
            <span className="hero__wrap hero__wrap--accent">
              <span className="hw">Sourcing.</span>
            </span>
          </span>

          {/* Line 4: Trusted Partnerships. */}
          <span className="hero__line">
            {['Trusted', 'Partnerships.'].map((w, i) => (
              <span key={i} className="hero__wrap">
                <span className="hw">{w}</span>
              </span>
            ))}
          </span>

        </h1>

        {/* Sub */}
        <p className="hero__sub" ref={subRef}>
          Connecting responsible beekeeping with consumers and brands<br/>
          through a transparent honey ecosystem.
        </p>

        {/* Buttons */}
        <div className="hero__btns" ref={btnsRef}>
          <a href="#our-honey" className="hero__btn-primary">
            Explore Honey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#excellence" className="hero__btn-outline">
            Partner With Nectabee
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>

      {/* ── Right image ── */}
      <div className="hero__img-col" ref={imgRef}>
        <Image
          src="/images/white_honey.png"
          alt="Premium nectaBee honey"
          width={800}
          height={800}
          priority
          className="hero__honey-img"
        />
      </div>

      {/* ── Right sidebar ── */}
      <aside className="hero__side hero__side--right" ref={sideRightRef} aria-label="Slide indicator">
        <span className="hero__slide-track">
          <span className="hero__slide-fill" />
        </span>
        <span className="hero__slide-num hero__slide-num--active">03</span>
      </aside>

      {/* Bottom center label */}
      <div className="hero__bottom-label" aria-hidden="true">Best Honey Bee</div>

      {/* Scroll hint */}
      <div className="hero__scroll" ref={scrollRef} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>

    </section>
  )
}
