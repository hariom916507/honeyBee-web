'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

const NAV = [
  { label: 'Home',         href: '#hero'       },
  { label: 'Our Honey',    href: '#our-honey'  },
  { label: 'Why NectaBee', href: '#excellence' },
  { label: 'Gifting',      href: '#gifting'    },
  { label: 'FAQs',         href: '#faq'        },
  { label: 'Contact',      href: '#contact'    },
]

export default function Header() {
  const headerRef            = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Slide in after hero text has started animating
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 }
    )

    const onScroll = () => {
      const sy    = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(sy > 50)
      setProgress(total > 0 ? (sy / total) * 100 : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
    >
      <div className="site-header__inner">

        {/* ── Logo ── */}
        <a href="#hero" className="site-header__logo" aria-label="HoneyBee home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            {/* Outer hexagon */}
            <polygon
              points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5"
              fill="var(--honey)"
            />
            {/* Inner hexagon */}
            <polygon
              points="16,8 23,12 23,20 16,24 9,20 9,12"
              fill="var(--brown)"
              opacity="0.65"
            />
            {/* Centre dot */}
            <circle cx="16" cy="16" r="3" fill="var(--honey-light)" />
          </svg>
          <span className="site-header__brand">nectaBee</span>
        </a>

        {/* ── Nav ── */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className="site-header__link">
              {label}
            </a>
          ))}
        </nav>

        {/* ── CTA ── */}
        <a href="#our-honey" className="site-header__cta">
          Shop Now
        </a>
      </div>

      {/* Scroll progress bar */}
      <span
        className="site-header__progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </header>
  )
}
