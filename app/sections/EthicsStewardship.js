'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './EthicsStewardship.module.css'

const PILLARS = [
  {
    num: '01',
    title: 'Producer-Managed Apiaries',
    desc: 'Every hive is owned and monitored by our master beekeepers — zero middlemen, total accountability.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3L25 9v10l-11 6L3 19V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 3v22M3 9l11 6 11-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Bee-First Harvesting',
    desc: 'We harvest only the surplus. Colony health determines the season, not market demand.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3M6.93 6.93l2.12 2.12M18.95 18.95l2.12 2.12M6.93 21.07l2.12-2.12M18.95 9.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'No Forced Feeding',
    desc: "Bees retain ample reserves to thrive through winter. Nature's balance, always respected.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4C9.58 4 6 7.58 6 12c0 5 8 14 8 14s8-9 8-14c0-4.42-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="14" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Responsible Handling',
    desc: 'Smoke-free, calm-entry protocols. Our bees are handled with the same care as family.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Biodiverse Forage',
    desc: 'Apiaries placed within thriving wildflower corridors and ancient floral ecosystems.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 24V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 12C14 12 10 9 7 10c0 0-1 5 4 6 0 0 0-4 3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 16C14 16 18 13 21 14c0 0 1 5-4 6 0 0 0-4-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Long-Term Colony Care',
    desc: 'Generational thinking. We build hive strength over decades, not quarters.',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function EthicsStewardship() {
  const sectionRef   = useRef(null)
  const eyebrowRef   = useRef(null)
  const titleRef     = useRef(null)
  const subtitleRef  = useRef(null)
  const badgeRef     = useRef(null)
  const cardsRef     = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header
    const tl = gsap.timeline({
      scrollTrigger: { trigger: eyebrowRef.current, start: 'top 82%', once: true },
    })
    tl
      .fromTo(eyebrowRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(titleRef.current.querySelectorAll('span'),
        { opacity: 0, y: 52, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.05, ease: 'power4.out', stagger: 0.13 },
        '-=0.4'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.55'
      )
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(2)' },
        '-=0.5'
      )

    // Cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 56, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.85, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: cardsRef.current[0], start: 'top 78%', once: true },
      }
    )

    // Icon hex entrance
    cardsRef.current.forEach((card) => {
      if (!card) return
      const iconBox = card.querySelector(`.${styles.iconBox}`)
      gsap.fromTo(iconBox,
        { scale: 0.65, opacity: 0, rotation: -20 },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.7, ease: 'back.out(2)',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        }
      )
    })
  }, [])

  return (
    <section id="ethics" className={styles.ethics} ref={sectionRef}>

      {/* Subtle honeycomb pattern */}
      <div className={styles.hcBg} aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ethHc" x="0" y="0" width="60" height="69" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,17 56,49 30,64 4,49 4,17"
                fill="none" stroke="rgba(200,140,0,0.07)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ethHc)"/>
        </svg>
      </div>

      {/* Ambient glow blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      {/* Decorative floating hexagons */}
      <svg className={`${styles.floatHex} ${styles.floatHexA}`} viewBox="0 0 180 207" fill="none" aria-hidden="true">
        <polygon points="90,5 172,48 172,155 90,198 8,155 8,48" stroke="rgba(200,140,0,0.12)" strokeWidth="1.5" fill="rgba(240,165,0,0.03)"/>
        <polygon points="90,22 155,60 155,143 90,181 25,143 25,60" stroke="rgba(200,140,0,0.07)" strokeWidth="1" fill="none"/>
      </svg>
      <svg className={`${styles.floatHex} ${styles.floatHexB}`} viewBox="0 0 120 138" fill="none" aria-hidden="true">
        <polygon points="60,3 114,33 114,105 60,135 6,105 6,33" stroke="rgba(200,140,0,0.1)" strokeWidth="1.5" fill="rgba(240,165,0,0.025)"/>
      </svg>

      <div className={styles.inner}>

        {/* ── Header row ── */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow} ref={eyebrowRef}>
              <span className={styles.eyebrowDot} />
              Our Commitment
            </p>
            <h2 className={styles.title} ref={titleRef}>
              <span className={styles.titleLine1}>Bee Ethics &amp;</span>
              <span className={styles.titleLine2}>Stewardship</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.subtitle} ref={subtitleRef}>
              Six unbreakable pillars that govern every decision — from hive placement
              to the final jar. Because great honey begins with profound respect.
            </p>
            <div className={styles.badge} ref={badgeRef}>
              <span className={styles.badgeNum}>6</span>
              <span className={styles.badgeLabel}>Core Pillars of<br/>Ethical Beekeeping</span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} aria-hidden="true">
          <span className={styles.dividerLine} />
          <svg viewBox="0 0 24 27" fill="none" className={styles.dividerHex} aria-hidden="true">
            <polygon points="12,1 22,6.5 22,17.5 12,23 2,17.5 2,6.5" stroke="var(--honey)" strokeWidth="1.2" fill="none"/>
          </svg>
          <span className={styles.dividerLine} />
        </div>

        {/* ── Cards grid ── */}
        <div className={styles.grid}>
          {PILLARS.map((p, i) => (
            <article
              key={p.num}
              className={styles.card}
              ref={el => cardsRef.current[i] = el}
            >
              {/* Watermark number */}
              <span className={styles.waterNum} aria-hidden="true">{p.num}</span>

              {/* Icon */}
              <div className={styles.iconBox}>
                <svg className={styles.iconHexSvg} viewBox="0 0 80 92" fill="none" aria-hidden="true">
                  <polygon points="40,3 76,23 76,67 40,87 4,67 4,23"
                    fill="rgba(240,165,0,0.08)" stroke="rgba(200,130,0,0.3)" strokeWidth="1.4"/>
                </svg>
                <div className={styles.iconEl}>{p.icon}</div>
              </div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>

              {/* Hover bar */}
              <div className={styles.hoverBar} aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* ── Quote strip ── */}
        <div className={styles.quote}>
          <svg className={styles.quoteIcon} viewBox="0 0 32 24" fill="none" aria-hidden="true">
            <path d="M0 24V14C0 6.268 4.477 1.6 13.43 0l1.5 2.4C10.1 3.6 7.6 6.2 7 10h5V24H0zm18 0V14C18 6.268 22.477 1.6 31.43 0l1.5 2.4C28.1 3.6 25.6 6.2 25 10h5V24H18z" fill="rgba(200,130,0,0.15)"/>
          </svg>
          <p className={styles.quoteText}>
            We don&rsquo;t just keep bees &mdash; we are custodians of an ancient, irreplaceable craft.
          </p>
        </div>

      </div>
    </section>
  )
}
