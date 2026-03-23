'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GiftingBulk.module.css'

const GIFT_FEATURES = [
  { icon: '✦', text: 'Handwritten message card included' },
  { icon: '✦', text: 'Premium glass jars, gift-ready sealed' },
  { icon: '✦', text: 'Diwali, Wedding & Corporate themes' },
  { icon: '✦', text: 'Eco-friendly kraft & ribbon packaging' },
  { icon: '✦', text: 'Mix varieties in a single set' },
]

const BULK_FEATURES = [
  { icon: '◆', text: 'Minimum order from 50 units' },
  { icon: '◆', text: 'Custom white-label & branding' },
  { icon: '◆', text: 'Volume-tiered pricing up to 40% off' },
  { icon: '◆', text: 'GST invoice & B2B documentation' },
  { icon: '◆', text: 'Hotels, restaurants & FMCG welcome' },
]

const OCCASIONS = [
  'Diwali', 'Weddings', 'Corporate', 'Birthdays',
  'Anniversaries', 'Thank You', 'Raksha Bandhan', 'Eid',
]

const TRUST_STATS = [
  { value: 200, suffix: '+', label: 'Businesses Served' },
  { value: 12,  suffix: 'k+', label: 'Gift Sets Delivered' },
  { value: 48,  suffix: 'h',  label: 'Dispatch Time' },
]

export default function GiftingBulk() {
  const sectionRef   = useRef(null)
  const headerRef    = useRef(null)
  const giftRef      = useRef(null)
  const bulkRef      = useRef(null)
  const tagsRef      = useRef(null)
  const trustRef     = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header stagger up
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: headerRef.current, start: 'top 83%', once: true },
      }
    )

    // Gift panel slides from left
    gsap.fromTo(giftRef.current,
      { opacity: 0, x: -70, rotateY: 4 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: giftRef.current, start: 'top 80%', once: true },
      }
    )

    // Bulk panel slides from right
    gsap.fromTo(bulkRef.current,
      { opacity: 0, x: 70, rotateY: -4 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: bulkRef.current, start: 'top 80%', once: true },
      }
    )

    // Occasion tags stagger
    if (tagsRef.current) {
      gsap.fromTo(
        tagsRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5, ease: 'back.out(1.4)', stagger: 0.07,
          scrollTrigger: { trigger: tagsRef.current, start: 'top 88%', once: true },
        }
      )
    }

    // Trust stat counters
    trustRef.current.forEach((el, i) => {
      if (!el) return
      const stat  = TRUST_STATS[i]
      const valEl = el.querySelector('[data-val]')
      const obj   = { n: 0 }

      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      )
      gsap.to(obj, {
        n: stat.value, duration: 1.8, ease: 'power2.out', delay: 0.25 + i * 0.12,
        onUpdate: () => { valEl.textContent = Math.round(obj.n) + stat.suffix },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, [])

  return (
    <section id="gifting" className={styles.gb} ref={sectionRef}>

      {/* Decorative blobs */}
      <div className={styles.blob_tl} aria-hidden="true" />
      <div className={styles.blob_br} aria-hidden="true" />

      <div className={styles.gb__inner}>

        {/* ── Header ── */}
        <div className={styles.gb__header} ref={headerRef}>
          <span className={styles.gb__eyebrow}>Made to Share</span>
          <h2 className={styles.gb__title}>Gifting &amp; Bulk Orders</h2>
          <p className={styles.gb__subtitle}>
            Whether you're celebrating a moment or stocking a business —
            nectaBee is crafted to be shared.
          </p>
        </div>

        {/* ── Dual Panels ── */}
        <div className={styles.gb__panels}>

          {/* ── Gift Panel ── */}
          <div className={styles.gb__panel} ref={giftRef}>

            {/* Popular badge */}
            <div className={styles.gb__badge}>Most Popular</div>

            {/* Large decorative visual */}
            <div className={styles.gb__visual}>
              <div className={styles.gb__visual_ring} />
              <svg className={styles.gb__icon_svg} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ribbon bow */}
                <path d="M60 42 C48 28 28 22 24 34 C20 46 48 50 60 42Z" fill="rgba(240,165,0,0.25)" stroke="#f0a500" strokeWidth="1.5"/>
                <path d="M60 42 C72 28 92 22 96 34 C100 46 72 50 60 42Z" fill="rgba(240,165,0,0.25)" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Box */}
                <rect x="24" y="42" width="72" height="56" rx="6" fill="rgba(240,165,0,0.1)" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Lid */}
                <rect x="18" y="36" width="84" height="14" rx="4" fill="rgba(240,165,0,0.18)" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Ribbon vertical */}
                <line x1="60" y1="36" x2="60" y2="98" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Ribbon horizontal */}
                <line x1="24" y1="63" x2="96" y2="63" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Jar inside box hint */}
                <rect x="44" y="68" width="32" height="24" rx="6" fill="rgba(240,165,0,0.3)" stroke="#f0a500" strokeWidth="1.2"/>
                <path d="M44 76 Q60 80 76 76" stroke="#f0a500" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Content */}
            <div className={styles.gb__content}>
              <p className={styles.gb__panel_tag}>For Every Occasion</p>
              <h3 className={styles.gb__panel_title}>Curated Gift Sets</h3>
              <p className={styles.gb__panel_desc}>
                Thoughtfully assembled honey gift sets for every occasion. Premium packaging,
                personal touches, and pure honey worth giving.
              </p>

              <ul className={styles.gb__features}>
                {GIFT_FEATURES.map((f, i) => (
                  <li key={i} className={styles.gb__feature}>
                    <span className={styles.gb__feature_icon}>{f.icon}</span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <div className={styles.gb__price_row}>
                <div>
                  <p className={styles.gb__price_label}>Starting from</p>
                  <p className={styles.gb__price}>₹499 <span>/set</span></p>
                </div>
                <a href="#" className={styles.gb__btn_gift}>
                  Explore Gift Sets
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Bulk Panel ── */}
          <div className={`${styles.gb__panel} ${styles['gb__panel--dark']}`} ref={bulkRef}>

            <div className={styles.gb__for_biz}>For Business</div>

            {/* Visual */}
            <div className={`${styles.gb__visual} ${styles['gb__visual--dark']}`}>
              <div className={`${styles.gb__visual_ring} ${styles['gb__visual_ring--dark']}`} />
              <svg className={styles.gb__icon_svg} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Three stacked boxes */}
                <rect x="20" y="74" width="80" height="30" rx="5" fill="rgba(240,165,0,0.12)" stroke="rgba(240,165,0,0.5)" strokeWidth="1.5"/>
                <rect x="28" y="50" width="64" height="28" rx="5" fill="rgba(240,165,0,0.15)" stroke="rgba(240,165,0,0.6)" strokeWidth="1.5"/>
                <rect x="36" y="28" width="48" height="26" rx="5" fill="rgba(240,165,0,0.2)" stroke="#f0a500" strokeWidth="1.5"/>
                {/* Box handle lines */}
                <line x1="46" y1="41" x2="74" y2="41" stroke="#f0a500" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="50" y1="63" x2="70" y2="63" stroke="rgba(240,165,0,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="40" y1="89" x2="80" y2="89" stroke="rgba(240,165,0,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
                {/* Checkmark */}
                <circle cx="88" cy="30" r="14" fill="rgba(240,165,0,0.15)" stroke="#f0a500" strokeWidth="1.5"/>
                <path d="M82 30 L86 34 L94 26" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Content */}
            <div className={styles.gb__content}>
              <p className={`${styles.gb__panel_tag} ${styles['gb__panel_tag--dark']}`}>Wholesale &amp; B2B</p>
              <h3 className={`${styles.gb__panel_title} ${styles['gb__panel_title--dark']}`}>Bulk &amp; Wholesale</h3>
              <p className={`${styles.gb__panel_desc} ${styles['gb__panel_desc--dark']}`}>
                Scale without compromise. From boutique hotels to retail chains —
                our bulk program delivers consistency, traceability, and real savings.
              </p>

              <ul className={styles.gb__features}>
                {BULK_FEATURES.map((f, i) => (
                  <li key={i} className={`${styles.gb__feature} ${styles['gb__feature--dark']}`}>
                    <span className={`${styles.gb__feature_icon} ${styles['gb__feature_icon--dark']}`}>{f.icon}</span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <div className={styles.gb__price_row}>
                <div>
                  <p className={`${styles.gb__price_label} ${styles['gb__price_label--dark']}`}>Volume pricing</p>
                  <p className={`${styles.gb__price} ${styles['gb__price--dark']}`}>Up to <span>40% off</span></p>
                </div>
                <a href="#" className={styles.gb__btn_bulk}>
                  Request a Quote
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Occasion Tags ── */}
        <div className={styles.gb__occasions_wrap}>
          <p className={styles.gb__occasions_label}>Perfect for</p>
          <div className={styles.gb__occasions} ref={tagsRef}>
            {OCCASIONS.map(tag => (
              <span key={tag} className={styles.gb__tag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* ── Trust Bar ── */}
        <div className={styles.gb__trust}>
          {TRUST_STATS.map((s, i) => (
            <div key={s.label} className={styles.gb__trust_item}
              ref={el => trustRef.current[i] = el}>
              <div className={styles.gb__trust_val} data-val>0{s.suffix}</div>
              <div className={styles.gb__trust_label}>{s.label}</div>
            </div>
          ))}
          <div className={styles.gb__trust_divider} />
          <p className={styles.gb__trust_quote}>
            "The Diwali gift sets were stunning — our clients loved every jar."
            <strong> — Meera R., Corporate HR</strong>
          </p>
        </div>

      </div>
    </section>
  )
}
