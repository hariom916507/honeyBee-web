'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FAQ.module.css'

const FAQS = [
  {
    category: 'Product',
    q: 'What makes nectaBee honey different from supermarket honey?',
    a: 'nectaBee honey is 100% raw, single-origin, and cold-extracted. Supermarket honey is typically blended from multiple countries, ultra-filtered (removing pollen), and heat-treated — destroying enzymes and nutrients. Every jar from us is batch-coded, lab-verified, and traceable from hive to your table.',
  },
  {
    category: 'Product',
    q: 'Is your honey pure? How can I verify it?',
    a: 'Yes — every batch is independently tested by a third-party lab for purity, NMR authenticity, and absence of adulterants. Each jar carries a batch code; scan the QR on the label to view your honey\'s harvest date, hive location, and lab report.',
  },
  {
    category: 'Product',
    q: 'Why has my honey crystallised? Is it spoiled?',
    a: 'Crystallisation is actually a sign of real, natural honey — it proves no adulterants are present. Liquid honey that never crystallises is often adulterated with corn syrup. To re-liquify, place the jar in warm water (below 40°C). Never microwave — that destroys the enzymes.',
  },
  {
    category: 'Product',
    q: 'What is the shelf life of your honey?',
    a: 'Honey, when stored sealed and away from direct moisture, has an indefinite shelf life. Archaeologists have found 3,000-year-old honey in Egyptian tombs, still perfectly edible. We recommend consuming within 2 years of harvest for the best flavour and aroma profile.',
  },
  {
    category: 'Ordering',
    q: 'Do you ship across India? What are the delivery timelines?',
    a: 'Yes — we ship pan-India via premium courier partners. Metro cities typically receive orders within 2–3 business days. Tier-2 and Tier-3 cities take 4–6 business days. You will receive a tracking link as soon as your order is dispatched.',
  },
  {
    category: 'Ordering',
    q: 'Can I customise a gift set for a corporate event or wedding?',
    a: 'Absolutely. We offer bespoke gifting solutions — custom labels with your logo or message, curated variety boxes, premium packaging (kraft, ribbon, wooden crate), and handwritten message cards. Reach out via the Gifting section for a personalised quote.',
  },
  {
    category: 'Bulk',
    q: 'What is the minimum order quantity for bulk purchases?',
    a: 'Our bulk program starts at 50 units per order. Volume-tiered pricing applies: 50–199 units (10% off), 200–499 units (25% off), 500+ units (up to 40% off). We also offer white-label and private-label options for restaurants, hotels, and FMCG brands.',
  },
  {
    category: 'Bees',
    q: 'How do you ensure bee welfare in your harvesting practices?',
    a: 'We follow bee-first harvesting — we only harvest surplus honey, always leaving enough for the colony\'s natural nourishment. Our apiaries are in biodiverse, chemical-free zones. We never feed bees sugar syrup or use forced feeding. Each colony is monitored year-round for health and population.',
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(FAQS.map(f => f.category)))]

function AccordionItem({ item, index, isOpen, onToggle }) {
  const bodyRef   = useRef(null)
  const innerRef  = useRef(null)
  const lineRef   = useRef(null)

  useEffect(() => {
    const body  = bodyRef.current
    const inner = innerRef.current
    if (!body || !inner) return

    if (isOpen) {
      gsap.to(body, {
        height: inner.offsetHeight,
        duration: 0.55,
        ease: 'power3.out',
      })
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.out', delay: 0.15 })
    } else {
      gsap.to(body, {
        height: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <div className={`${styles.item} ${isOpen ? styles.item_open : ''}`}>
      <button
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.q_num}>0{index + 1}</span>
        <span className={styles.q_text}>{item.q}</span>
        <span className={styles.q_icon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="9" y1="3" x2="9" y2="15" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round"
              className={styles.icon_v}
              style={{ transformOrigin: '9px 9px' }}
            />
            <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div className={styles.body} ref={bodyRef} style={{ height: 0, overflow: 'hidden' }}>
        <div ref={innerRef} className={styles.body_inner}>
          <div className={styles.answer_line} ref={lineRef} />
          <p className={styles.answer}>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex]           = useState(0)

  const sectionRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const tabsRef     = useRef(null)
  const listRef     = useRef(null)
  const hexRef      = useRef(null)

  const filtered = FAQS.filter(f =>
    activeCategory === 'All' || f.category === activeCategory
  )

  // Reset open index when category changes
  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setOpenIndex(0)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Floating hex blobs
    gsap.to(hexRef.current, {
      y: -30, rotation: 8, duration: 6, ease: 'sine.inOut',
      yoyo: true, repeat: -1,
    })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
    })

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5'
    )
    .fromTo(tabsRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4'
    )
    .fromTo(listRef.current?.children ? Array.from(listRef.current.children) : [],
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, '-=0.2'
    )
  }, [])

  // Re-animate list items when category changes
  useEffect(() => {
    if (!listRef.current) return
    gsap.fromTo(
      Array.from(listRef.current.children),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
    )
  }, [activeCategory])

  return (
    <section id="faq" className={styles.faq} ref={sectionRef}>

      {/* Decorative honeycomb blobs */}
      <div className={styles.hex_blob} ref={hexRef} aria-hidden="true">
        <svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,4 188,52 188,178 100,226 12,178 12,52"
            fill="none" stroke="rgba(240,165,0,0.18)" strokeWidth="1.5" />
          <polygon points="100,24 168,62 168,168 100,206 32,168 32,62"
            fill="none" stroke="rgba(240,165,0,0.10)" strokeWidth="1" />
          <polygon points="100,44 148,72 148,158 100,186 52,158 52,72"
            fill="rgba(240,165,0,0.04)" stroke="rgba(240,165,0,0.07)" strokeWidth="1" />
        </svg>
      </div>
      <div className={styles.hex_blob_2} aria-hidden="true">
        <svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
          <polygon points="70,4 130,38 130,122 70,156 10,122 10,38"
            fill="none" stroke="rgba(240,165,0,0.12)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <p className={styles.eyebrow} ref={eyebrowRef}>
            <span className={styles.eyebrow_line} />
            Got Questions?
          </p>
          <h2 className={styles.title} ref={titleRef}>
            Frequently Asked
            <span className={styles.title_accent}> Questions</span>
          </h2>
          <p className={styles.subtitle} ref={subtitleRef}>
            Everything you need to know about our honey, sourcing, delivery and gifting.
            Can&apos;t find an answer? Write to us directly.
          </p>
        </div>

        {/* ── Category tabs ── */}
        <div className={styles.tabs} ref={tabsRef}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tab_active : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
              {activeCategory === cat && <span className={styles.tab_dot} />}
            </button>
          ))}
        </div>

        {/* ── Accordion list ── */}
        <div className={styles.list} ref={listRef}>
          {filtered.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className={styles.cta_row}>
          <p className={styles.cta_text}>Still have questions?</p>
          <a href="mailto:hello@nectabee.in" className={styles.cta_btn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Write to us
          </a>
        </div>

      </div>
    </section>
  )
}
