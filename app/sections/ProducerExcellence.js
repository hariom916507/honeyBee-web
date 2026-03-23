'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STATS = [
  { value: 2000, suffix: '+', label: 'Active Bee Boxes'      },
  { value: 100,  suffix: '%', label: 'Producer-Managed'      },
  { value: 0,    suffix: '',  label: 'Middlemen. Ever.'      },
  { value: 15,   suffix: '+', label: 'Years of Beekeeping'   },
]

const FEATURES = [
  {
    title: 'Floral Stewardship',
    desc:  'Biodiverse zones. Chemical-free. Bees forage naturally across native flora, preserving local ecosystems.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6 C24 6 10 14 10 26 C10 33.7 16.3 40 24 40 C31.7 40 38 33.7 38 26 C38 14 24 6 24 6Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        <path d="M24 6 L24 40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M15 18 C18 22 24 22 24 22 C24 22 18 26 15 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M33 18 C30 22 24 22 24 22 C24 22 30 26 33 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="44" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Gentle Processing',
    desc:  'Cold-extracted. Minimally filtered. Every step preserves the natural enzymes, pollen, and living nutrients.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="24" y1="6"  x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6"  y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11.5" y1="11.5" x2="17"   y2="17"   stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="31"   y1="31"   x2="36.5" y2="36.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36.5" y1="11.5" x2="31"   y2="17"   stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="17"   y1="31"   x2="11.5" y2="36.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Lab Verified',
    desc:  'Third-party tested. Purity certified to export-grade quality standards. What you see is what you get.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4 L38 10 L38 24 C38 33 31 40 24 44 C17 40 10 33 10 24 L10 10 Z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M17 24 L22 29 L31 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Full Traceability',
    desc:  'Every jar is batch-coded and QR-linked. Scan to trace your honey from hive location to harvest date.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8"  y="8"  width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="28" y="8"  width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="8"  y="28" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="11" y="11" width="6"  height="6"  rx="1" fill="currentColor"/>
        <rect x="31" y="11" width="6"  height="6"  rx="1" fill="currentColor"/>
        <rect x="11" y="31" width="6"  height="6"  rx="1" fill="currentColor"/>
        <line x1="28" y1="28" x2="28" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="40" x2="28" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="40" y1="34" x2="40" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="34" y1="40" x2="37" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function ProducerExcellence() {
  const sectionRef  = useRef(null)
  const pillRef     = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const subtitleRef = useRef(null)
  const statsRef    = useRef([])
  const cardsRef    = useRef([])
  const imgRef      = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Pill badge drops in
    gsap.fromTo(pillRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: pillRef.current, start: 'top 85%', once: true } }
    )

    // ── Title lines stagger up
    gsap.fromTo([line1Ref.current, line2Ref.current, subtitleRef.current],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: line1Ref.current, start: 'top 80%', once: true } }
    )

    // ── Stat counters animate up
    statsRef.current.forEach((el, i) => {
      if (!el) return
      const stat   = STATS[i]
      const valEl  = el.querySelector('.pe-stat__value')
      const obj    = { n: 0 }

      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      )

      // Only animate non-zero values
      if (stat.value > 0) {
        gsap.to(obj, {
          n: stat.value, duration: 1.8, ease: 'power2.out', delay: 0.3 + i * 0.12,
          onUpdate: () => { valEl.textContent = Math.round(obj.n).toLocaleString() + stat.suffix },
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      }
    })

    // ── Feature cards stagger up
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.13,
        scrollTrigger: { trigger: cardsRef.current[0], start: 'top 78%', once: true } }
    )

    // ── Image strip parallax
    gsap.fromTo(imgRef.current,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: imgRef.current, start: 'top 85%', once: true } }
    )
  }, [])

  return (
    <section id="excellence" className="pe" ref={sectionRef}>

      <div className="pe__grain" aria-hidden="true" />

      <div className="pe__inner">

        {/* ══ LEFT — content ══ */}
        <div className="pe__left">

          <div className="pe__pill" ref={pillRef}>
            <span className="pe__pill-dot" />
            2,000+ Active Bee Boxes &nbsp;·&nbsp; Producer-Managed Apiaries
          </div>

          <div className="pe__header">
            <h2 className="pe__title">
              <span className="pe__title-line" ref={line1Ref}>Producer-Led</span>
              <span className="pe__title-line pe__title-line--accent" ref={line2Ref}>Excellence.</span>
            </h2>
            <p className="pe__subtitle" ref={subtitleRef}>
              We own and manage every bee box — farm to bottle, every single step.
              No outsourcing. No compromise. Just pure transparency.
            </p>
          </div>

          <div className="pe__stats">
            {STATS.map((s, i) => (
              <div key={s.label} className="pe__stat" ref={el => statsRef.current[i] = el}>
                <div className="pe-stat__value">{s.value === 0 ? '0' : '0'}{s.suffix}</div>
                <div className="pe-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="pe__grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="pe-card" ref={el => cardsRef.current[i] = el}>
                <div className="pe-card__icon-wrap">
                  <div className="pe-card__icon">{f.icon}</div>
                </div>
                <h3 className="pe-card__title">{f.title}</h3>
                <p className="pe-card__desc">{f.desc}</p>
                <div className="pe-card__line" aria-hidden="true" />
              </div>
            ))}
          </div>

        </div>

        {/* ══ RIGHT — image at natural size ══ */}
        <div className="pe__right" ref={imgRef}>
          <Image
            src="/images/Gemini_Generated_Image_wamfkvwamfkvwamf.png"
            alt="Producer-managed apiary"
            width={0}
            height={0}
            sizes="50vw"
            className="pe__img"
          />
        </div>

      </div>
    </section>
  )
}
