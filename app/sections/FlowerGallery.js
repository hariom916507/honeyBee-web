import Image from 'next/image'
import FadeIn from '../components/FadeIn'

const FLOWERS = [
  {
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=900&q=80',
    alt: 'Vibrant wildflowers in a summer meadow',
    label: 'Wildflower Meadow',
    caption: 'Bees favour open meadows rich in colour and scent',
    span: 'large',
  },
  {
    src: 'https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=600&q=80',
    alt: 'Purple lavender field in full bloom',
    label: 'Lavender Fields',
    caption: 'A single forager visits up to 1,500 flowers per trip',
    span: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=600&q=80',
    alt: 'Bright yellow sunflower close-up',
    label: 'Sunflower',
    caption: 'Rich pollen and nectar — a favourite of honeybees',
    span: 'small',
  },
]

export default function FlowerGallery() {
  return (
    <section id="flowers" className="flowers">

      <div className="flowers__header">
        <FadeIn delay={0} variant="near">
          <span className="flowers__label">The Source</span>
        </FadeIn>
        <FadeIn delay={120}>
          <h2 className="flowers__title">Where It All Begins</h2>
        </FadeIn>
        <FadeIn delay={260}>
          <p className="flowers__subtitle">
            Every drop of honey traces back to a flower. Bees are drawn
            by scent and colour, returning again and again to the richest blooms.
          </p>
        </FadeIn>
      </div>

      <div className="flowers__grid">
        {FLOWERS.map((flower, i) => (
          <FadeIn key={flower.label} delay={i * 140} variant="near">
            <div className={`flowers__item flowers__item--${flower.span}`}>
              <div className="flowers__img-wrap">
                <Image
                  src={flower.src}
                  alt={flower.alt}
                  fill
                  sizes={flower.span === 'large' ? '(max-width:900px) 100vw, 55vw' : '(max-width:900px) 100vw, 22vw'}
                  className="flowers__img"
                />
                <div className="flowers__overlay">
                  <span className="flowers__item-label">{flower.label}</span>
                  <p className="flowers__item-caption">{flower.caption}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

    </section>
  )
}
