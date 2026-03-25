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

// Arrow icon matching the screenshot style
function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Header() {
  const headerRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 }
    )

    const onScroll = () => {
      const sy    = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (sy / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={headerRef} className="hdr">

      <div className="hdr__inner">

        {/* ── Logo ── */}
        <a href="#hero" className="hdr__logo" aria-label="nectaBee home">
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" fill="var(--honey)" />
            <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" fill="rgba(0,0,0,0.35)" />
            <circle cx="16" cy="16" r="3" fill="var(--honey-light)" />
          </svg>
          <div className="hdr__brand-wrap">
            <span className="hdr__brand">nectaBee</span>
            <span className="hdr__tagline">Natural Honey Products</span>
          </div>
        </a>

        {/* ── Nav ── */}
        <nav className="hdr__nav" aria-label="Main navigation">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className="hdr__link">
              {label}
              <Arrow />
            </a>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="hdr__actions">
          {/* Search */}
          <button className="hdr__icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* CTA */}
          <a href="#contact" className="hdr__cta">
            Get In Touch
            <Arrow />
          </a>

          {/* Hamburger */}
          <button
            className={`hdr__ham${menuOpen ? ' hdr__ham--open' : ''}`}
            aria-label="Menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>

      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="hdr__mobile-nav" aria-label="Mobile navigation">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className="hdr__mobile-link"
               onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="hdr__cta hdr__cta--mobile"
             onClick={() => setMenuOpen(false)}>
            Get In Touch <Arrow />
          </a>
        </nav>
      )}

      {/* Scroll progress bar */}
      <span
        className="hdr__progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </header>
  )
}
