'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PRODUCTS = [
  {
    name:    'Tulsi Honey',
    tag:     'Medicinal',
    tagline: 'Original Tulsi flora',
    desc:    'Gentle infusion of holy basil. Supports immunity and daily wellness. Crafted for your morning ritual.',
    price:   '₹650',
    weight:  '250g',
    accent:  '#5a8a4a',
    imgBg:   'linear-gradient(145deg, #d4e8c8 0%, #a8cc90 100%)',
    img:     'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=85',
  },
  {
    name:    'Acacia Honey',
    tag:     'Single-Origin',
    tagline: 'Crystal clear, mild sweet',
    desc:    'Single-origin purity. Crystal clear with delicate sweetness. Perfect companion for tea and toast.',
    price:   '₹550',
    weight:  '250g',
    accent:  '#c8943a',
    imgBg:   'linear-gradient(145deg, #fef5d4 0%, #f0d080 100%)',
    img:     'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=600&q=85',
  },
  {
    name:    'Vitex Honey',
    tag:     'Rare Floral',
    tagline: 'Light golden, herbal notes',
    desc:    'Rare floral harvest. Light golden hue with delicate herbal finish. A true connoisseur\'s choice.',
    price:   '₹700',
    weight:  '250g',
    accent:  '#8b5fbd',
    imgBg:   'linear-gradient(145deg, #ede0f8 0%, #c8a8e8 100%)',
    img:     'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=600&q=85',
  },
  {
    name:    'Mustard Honey',
    tag:     'Bold Flavour',
    tagline: 'Deep golden, antioxidant-rich',
    desc:    'Bold character with deep golden warmth. Ideal for culinary creations. Rich in natural antioxidants.',
    price:   '₹500',
    weight:  '250g',
    accent:  '#c8940a',
    imgBg:   'linear-gradient(145deg, #fef8d0 0%, #f0c840 100%)',
    img:     'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600&q=85',
  },
]

export default function OurHoney() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const cardsRef    = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header fade-up
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    // Cards stagger in
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 72, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section id="our-honey" className="our-honey" ref={sectionRef}>

      {/* Decorative honeycomb bg */}
      <div className="our-honey__hc-bg" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hc" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon
                points="30,2 56,16 56,44 30,58 4,44 4,16"
                fill="none"
                stroke="rgba(240,165,0,0.12)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hc)" />
        </svg>
      </div>

      {/* Section header */}
      <div className="our-honey__header" ref={headerRef}>
        <p className="our-honey__eyebrow">Pure &amp; Natural</p>
        <h2 className="our-honey__title">Our Honey</h2>
        <p className="our-honey__subtitle">
          Crafted in small batches. Real botanicals. Pure honey — straight from the hive to your home.
        </p>
      </div>

      {/* Product grid */}
      <div className="our-honey__grid">
        {PRODUCTS.map((p, i) => (
          <article
            key={p.name}
            className="honey-card"
            style={{ '--accent': p.accent }}
            ref={el => cardsRef.current[i] = el}
          >
            {/* Image area */}
            <div className="honey-card__img-wrap" style={{ background: p.imgBg }}>
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="honey-card__img"
                sizes="(max-width:900px) 80vw, 25vw"
              />
              {/* Gradient scrim at bottom of image */}
              <div className="honey-card__scrim" />
              {/* Tag chip */}
              <span className="honey-card__tag">{p.tag}</span>
              {/* Shimmer sweep on hover */}
              <div className="honey-card__shimmer" aria-hidden="true" />
            </div>

            {/* Card body */}
            <div className="honey-card__body">
              <div>
                <p className="honey-card__tagline">{p.tagline}</p>
                <h3 className="honey-card__name">{p.name}</h3>
                <p className="honey-card__desc">{p.desc}</p>
              </div>

              <div className="honey-card__footer">
                <div className="honey-card__price-wrap">
                  <span className="honey-card__price">{p.price}</span>
                  <span className="honey-card__weight">/ {p.weight}</span>
                </div>
                <button className="honey-card__btn" type="button">
                  Shop Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="our-honey__footer">
        <a href="#collecting" className="our-honey__cta">
          Discover the Journey ↓
        </a>
      </div>

    </section>
  )
}
