'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Pollen particles (baked — no randomness on re-render) ───
const PARTICLES = [
  { size: 5,  left: '5%',  delay: '0s',    dur: '10s',   op: 0.30, x: '8px'  },
  { size: 3,  left: '14%', delay: '2.3s',  dur: '13s',   op: 0.22, x: '-6px' },
  { size: 7,  left: '24%', delay: '0.8s',  dur: '9s',    op: 0.18, x: '10px' },
  { size: 4,  left: '38%', delay: '3.5s',  dur: '11s',   op: 0.25, x: '-8px' },
  { size: 6,  left: '52%', delay: '1.2s',  dur: '8.5s',  op: 0.16, x: '6px'  },
  { size: 3,  left: '65%', delay: '4.1s',  dur: '12s',   op: 0.20, x: '-5px' },
  { size: 8,  left: '76%', delay: '0.5s',  dur: '9.5s',  op: 0.14, x: '9px'  },
  { size: 4,  left: '87%', delay: '2.6s',  dur: '14s',   op: 0.28, x: '-7px' },
  { size: 5,  left: '94%', delay: '1.8s',  dur: '10.5s', op: 0.18, x: '4px'  },
]

// ─── Title words — each rendered individually for stagger ────
const LINE1 = ['From', 'Flower']
const LINE2 = ['to', 'Honey.']

export default function Hero() {
  const sectionRef    = useRef(null)
  const eyebrowRef    = useRef(null)
  const subtitleRef   = useRef(null)
  const buttonsRef    = useRef(null)
  const statsRef      = useRef(null)
  const rightRef      = useRef(null)
  const wipeRef       = useRef(null)
  const badge1Ref     = useRef(null)
  const badge2Ref     = useRef(null)
  const qualityRef    = useRef(null)
  const tagRef        = useRef(null)
  const scrollRef     = useRef(null)
  const cursorGlowRef = useRef(null)
  const imgInnerRef   = useRef(null)
  const stat1Ref      = useRef(null)
  const stat2Ref      = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current

    // ── Collect all word spans via class ──────────────────────
    const words = section.querySelectorAll('.hero__word')

    // ── Initial states ────────────────────────────────────────
    gsap.set(words,               { y: '115%' })
    gsap.set(eyebrowRef.current,  { opacity: 0, x: -28 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 32 })
    gsap.set(buttonsRef.current,  { opacity: 0, y: 28 })
    gsap.set(statsRef.current,    { opacity: 0, y: 24 })
    gsap.set(rightRef.current,    { opacity: 0 })
    gsap.set(wipeRef.current,     { x: '0%' })
    gsap.set([badge1Ref.current, badge2Ref.current, qualityRef.current],
             { opacity: 0, scale: 0.72, y: 14 })
    gsap.set(tagRef.current,      { opacity: 0, y: 18 })
    gsap.set(scrollRef.current,   { opacity: 0 })

    // ── Master entrance timeline ──────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl
      // Eyebrow slides in
      .to(eyebrowRef.current,  { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' }, 0.25)
      // Words rise word-by-word from clipping mask
      .to(words,               { y: '0%', duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.5)
      // Subtitle & UI
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.95 }, 1.1)
      .to(buttonsRef.current,  { opacity: 1, y: 0, duration: 0.85 }, 1.25)
      .to(statsRef.current,    { opacity: 1, y: 0, duration: 0.80 }, 1.4)
      // Right panel
      .to(rightRef.current,    { opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.45)
      // Wipe off right
      .to(wipeRef.current,     { x: '101%', duration: 1.35, ease: 'power3.inOut' }, 0.55)
      // Badges spring in
      .to(badge1Ref.current,   { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(2)' }, 1.55)
      .to(badge2Ref.current,   { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(2)' }, 1.72)
      .to(qualityRef.current,  { opacity: 1, scale: 1, y: 0, duration: 0.70, ease: 'back.out(1.8)' }, 1.9)
      .to(tagRef.current,      { opacity: 1, y: 0, duration: 0.65 }, 2.05)
      .to(scrollRef.current,   { opacity: 1, duration: 0.9 }, 2.2)

    // ── Animated stat counters ────────────────────────────────
    const countUp = (el, to, fmt, delay) => {
      if (!el) return
      const obj = { n: 0 }
      gsap.to(obj, {
        n: to, duration: 2.5, ease: 'power2.out', delay,
        onUpdate: () => { el.textContent = fmt(obj.n) },
      })
    }
    countUp(stat1Ref.current, 150, n => Math.round(n) + 'M', 1.5)
    countUp(stat2Ref.current, 100, n => Math.round(n) + '%', 1.65)

    // ── Continuous badge float — offset phases ────────────────
    gsap.to(badge1Ref.current,  { y: -10, duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.3 })
    gsap.to(badge2Ref.current,  { y:   9, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.7 })
    gsap.to(qualityRef.current, { y:  -7, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 3.1 })

    // ── Scroll parallax — image drifts up slower than viewport ─
    const parallax = gsap.to(imgInnerRef.current, {
      y: -70,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // ── Mouse parallax — 3-D tilt on right panel ─────────────
    const onMouseMove = (e) => {
      const r  = section.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) / r.width
      const dy = (e.clientY - r.top  - r.height / 2) / r.height
      gsap.to(rightRef.current, {
        rotateY: dx * 8, rotateX: -dy * 5,
        x: dx * 18, y: dy * 10,
        duration: 1.0, ease: 'power2.out',
        transformPerspective: 900,
      })
      gsap.to(cursorGlowRef.current, {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        duration: 0.55, ease: 'power2.out',
      })
    }
    const onMouseLeave = () => {
      gsap.to(rightRef.current, {
        rotateY: 0, rotateX: 0, x: 0, y: 0,
        duration: 1.5, ease: 'elastic.out(1, 0.4)',
      })
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      tl.kill()
      parallax.scrollTrigger?.kill()
      parallax.kill()
    }
  }, [])

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* Film-grain noise texture */}
      <div className="hero__grain" aria-hidden="true" />

      {/* Cursor glow */}
      <div className="hero__cursor-glow" ref={cursorGlowRef} aria-hidden="true" />

      {/* Ambient mesh blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      {/* Floating pollen */}
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span key={i} className="hero__particle" style={{
            width: p.size, height: p.size, left: p.left,
            opacity: p.op, animationDuration: p.dur, animationDelay: p.delay,
            '--px': p.x,
          }} />
        ))}
      </div>

      <div className="hero__inner">

        {/* ══ LEFT COLUMN ══ */}
        <div className="hero__left">

          <p className="hero__eyebrow" ref={eyebrowRef}>
            <span className="hero__eyebrow-line" />
            Nature&apos;s Finest Craft
          </p>

          {/* Title — each word in its own overflow:hidden mask */}
          <h1 className="hero__display">
            <span className="hero__line-mask">
              {LINE1.map((word, i) => (
                <span key={i} className="hero__word-wrap">
                  <span className="hero__word">{word}</span>
                </span>
              ))}
            </span>
            <span className="hero__line-mask">
              {LINE2.map((word, i) => (
                <span key={i} className={`hero__word-wrap${i === 1 ? ' hero__word-wrap--accent' : ''}`}>
                  <span className="hero__word">{word}</span>
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__sub" ref={subtitleRef}>
            A journey through the ancient and extraordinary process
            that transforms nectar into liquid gold.
          </p>

          <div className="hero__buttons" ref={buttonsRef}>
            <a href="#our-honey" className="hero__btn-primary">
              <span className="hero__btn-shimmer" />
              Begin the Journey
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#excellence" className="hero__btn-secondary">
              How it works ↓
            </a>
          </div>

          <div className="hero__stats" ref={statsRef}>
            <div className="hero__stat">
              <span className="hero__stat-value" ref={stat1Ref}>0M</span>
              <span className="hero__stat-desc">Years of evolution</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-value" ref={stat2Ref}>0%</span>
              <span className="hero__stat-desc">Natural process</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-value">∞</span>
              <span className="hero__stat-desc">Shelf life</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div className="hero__right" ref={rightRef} style={{ transformStyle: 'preserve-3d' }}>
          <div className="hero__img-frame">

            {/* Parallax image wrapper — slightly oversized so GSAP y movement stays clipped */}
            <div className="hero__img-inner" ref={imgInnerRef}>
              <Image
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&q=85"
                alt="Golden honey in a jar"
                fill
                className="hero__img"
                priority
              />
            </div>

            {/* Duotone + vignette overlay */}
            <div className="hero__img-overlay" />

            {/* Golden light sweep */}
            <div className="hero__light-sweep" aria-hidden="true" />

            {/* Wipe reveal panel */}
            <div className="hero__wipe" ref={wipeRef} aria-hidden="true" />

            {/* Looping honey drips */}
            <div className="hero__drips" aria-hidden="true">
              <span className="hero__drop hero__drop--0" />
              <span className="hero__drop hero__drop--1" />
              <span className="hero__drop hero__drop--2" />
            </div>

            {/* Glass badge — top-left */}
            <div className="hero__badge hero__badge--tl" ref={badge1Ref}>
              <div className="hero__badge-icon-wrap">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="10" cy="9" rx="5" ry="4" fill="var(--honey)" opacity=".8"/>
                  <path d="M6 7 Q4 4 5 2 Q8 1 10 3" stroke="var(--brown)" strokeWidth="1" fill="none"/>
                  <path d="M14 7 Q16 4 15 2 Q12 1 10 3" stroke="var(--brown)" strokeWidth="1" fill="none"/>
                  <ellipse cx="10" cy="13" rx="4" ry="5" fill="var(--honey-dark)" opacity=".7"/>
                </svg>
              </div>
              <div>
                <span className="hero__badge-val">20k+</span>
                <span className="hero__badge-desc">Bee species worldwide</span>
              </div>
            </div>

            {/* Glass badge — bottom-right */}
            <div className="hero__badge hero__badge--br" ref={badge2Ref}>
              <div>
                <span className="hero__badge-val">Pure Gold</span>
                <span className="hero__badge-desc">Since 10,000 BC</span>
              </div>
              <div className="hero__badge-icon-wrap hero__badge-icon-wrap--star">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2l1.8 5.5H18l-4.9 3.5 1.8 5.5L10 13l-4.9 3.5 1.8-5.5L2 7.5h6.2z"
                    fill="var(--honey)" stroke="var(--honey-dark)" strokeWidth="0.5"/>
                </svg>
              </div>
            </div>

            {/* Glassmorphism quality card — right-center */}
            <div className="hero__quality-card" ref={qualityRef}>
              <div className="hero__quality-top">
                <span className="hero__quality-dot" />
                <span className="hero__quality-label">Lab Verified</span>
              </div>
              <div className="hero__quality-bar-track">
                <div className="hero__quality-bar-fill" />
              </div>
              <div className="hero__quality-bottom">
                <span className="hero__quality-pct">100%</span>
                <span className="hero__quality-sub">Raw &amp; Pure</span>
              </div>
            </div>

          </div>

          {/* Live tag pill */}
          <div className="hero__tag" ref={tagRef}>
            <span className="hero__tag-dot" />
            Crafted by 80,000 bees · per hive
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" ref={scrollRef} aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll to explore</span>
      </div>

    </section>
  )
}
