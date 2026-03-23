'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FromHiveToHome.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Nectar Collection',
    desc: 'Our bees forage across biodiverse, chemical-free meadows — visiting up to 1,500 flowers to fill a single honeycomb cell.',
    fact: '5 km flight radius per forager bee',
    color: '#f0a500',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8 C16 8 10 14 10 22 C10 30 16 38 24 42 C32 38 38 30 38 22 C38 14 32 8 24 8Z"
          stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <path d="M24 8 L24 24 M24 24 L16 18 M24 24 L32 18"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.6"/>
        <path d="M18 34 C20 36 24 37 24 37 C24 37 28 36 30 34"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'In-Hive Ripening',
    desc: 'Worker bees fan their wings at 200 beats per second to evaporate moisture, concentrating nectar into pure honey over 7–10 days.',
    fact: 'Moisture reduced from 80% to under 20%',
    color: '#e8920a',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18 Z"
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.5"/>
        <path d="M24 14 L24 10 M34 24 L38 24 M14 24 L10 24 M24 34 L24 38"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Cold Extraction',
    desc: 'Frames are uncapped by hand and spun in gravity-fed extractors. No heat, no pressure — every enzyme, every pollen grain stays intact.',
    fact: 'Extracted at ambient temperature ≤ 35°C',
    color: '#d4810e',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="8" width="20" height="28" rx="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M22 38 L22 44 M26 38 L26 44 M20 44 L28 44"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 20 Q24 28 28 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="24" cy="16" r="2.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Lab Verification',
    desc: 'Every batch is third-party tested for purity, moisture content, and antibiotic residues before it ever reaches a jar.',
    fact: 'Export-grade quality certification on every batch',
    color: '#c27010',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8 L18 26 L10 40 L38 40 L30 26 L30 8 Z"
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <line x1="14" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
        <path d="M16 33 C18 30 22 29 24 31 C26 33 30 32 32 30"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M20 17 L28 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 12 L26 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Sealed & Delivered',
    desc: 'Hand-filled into premium glass jars, batch-coded and QR-linked. Shipped directly from our facility — no warehouses, no middlemen.',
    fact: 'Farm to your doorstep in 3–5 days',
    color: '#b06010',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="16" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 22 L36 22" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 29 L22 31 L28 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function FromHiveToHome() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const lineRef     = useRef(null)
  const stepsRef    = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Header fade up
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
      }
    )

    // ── Timeline line draws downward with scrub
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1.2,
        },
      }
    )

    // ── Steps slide in alternating
    stepsRef.current.forEach((el, i) => {
      if (!el) return
      const isRight = i % 2 === 1
      gsap.fromTo(
        el,
        { opacity: 0, x: isRight ? 60 : -60, y: 20 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      )
    })
  }, [])

  return (
    <section id="hive-to-home" className={styles.hth} ref={sectionRef}>

      {/* Honeycomb background pattern */}
      <div className={styles.hth__bg} aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hcomb" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
              <polygon points="28,2 54,16 54,48 28,62 2,48 2,16"
                fill="none" stroke="rgba(240,165,0,0.07)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hcomb)"/>
        </svg>
      </div>

      <div className={styles.hth__inner}>

        {/* ── Header ── */}
        <div className={styles.hth__header} ref={headerRef}>
          <span className={styles.hth__eyebrow}>The Journey</span>
          <h2 className={styles.hth__title}>From Hive to Home</h2>
          <p className={styles.hth__subtitle}>
            Five meticulous steps. Zero shortcuts. Every drop of nectaBee honey
            carries the full story of how it was made.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className={styles.hth__timeline}>

          {/* Central vertical line */}
          <div className={styles.hth__line_wrap} aria-hidden="true">
            <div className={styles.hth__line} ref={lineRef} />
          </div>

          {STEPS.map((step, i) => (
            <article
              key={step.num}
              className={`${styles.hth__step} ${i % 2 === 1 ? styles['hth__step--right'] : ''}`}
              ref={el => stepsRef.current[i] = el}
            >
              {/* Ghost number */}
              <span className={styles.hth__ghost}>{step.num}</span>

              {/* Dot on timeline */}
              <div className={styles.hth__dot} style={{ background: step.color }} />

              {/* Card */}
              <div className={styles.hth__card}>
                <div className={styles.hth__card_top}>
                  <div className={styles.hth__icon} style={{ color: step.color, borderColor: `${step.color}40` }}>
                    {step.icon}
                  </div>
                  <span className={styles.hth__num} style={{ color: step.color }}>{step.num}</span>
                </div>
                <h3 className={styles.hth__step_title}>{step.title}</h3>
                <p className={styles.hth__step_desc}>{step.desc}</p>
                <div className={styles.hth__fact} style={{ borderColor: `${step.color}60` }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="6" cy="6" r="5" stroke={step.color} strokeWidth="1.2"/>
                    <path d="M6 5v4M6 3.5v.5" stroke={step.color} strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: step.color }}>{step.fact}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className={styles.hth__cta}>
          <p className={styles.hth__cta_text}>
            Taste the difference that full traceability makes.
          </p>
          <a href="#our-honey" className={styles.hth__cta_btn}>
            Shop Our Honey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
