import FadeIn from '../components/FadeIn'

export default function Final() {
  return (
    <section id="final" className="final">

      {/* Decorative honeycomb background — top-right */}
      <svg
        aria-hidden="true"
        style={{position:'absolute', top:0, right:0, opacity:0.08, pointerEvents:'none'}}
        width="320" height="320" viewBox="0 0 320 320" fill="none"
      >
        {[
          [60,54],[91,54],[75,23],[45,23],[29,54],[45,85],[75,85],
          [122,54],[106,23],[136,23],[152,54],[136,85],[106,85],
          [60,116],[91,116],[75,147],[45,147],[29,116],[45,85],
        ].map(([cx,cy],i) => {
          const s = 18, h = Math.round(s * Math.sqrt(3)/2)
          return (
            <polygon key={i}
              points={`${cx+s},${cy} ${cx+s/2},${cy+h} ${cx-s/2},${cy+h} ${cx-s},${cy} ${cx-s/2},${cy-h} ${cx+s/2},${cy-h}`}
              fill="rgba(46,24,0,0.8)" stroke="rgba(46,24,0,0.5)" strokeWidth="1"
            />
          )
        })}
      </svg>

      <div className="final__content">

        <FadeIn delay={0} variant="near">
          <span className="final__label">The Result</span>
        </FadeIn>

        <FadeIn delay={150}>
          <h2 className="final__title">Pure Honey</h2>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="final__subtitle">
            Every jar holds millions of flower visits, thousands of bee-hours,
            and one extraordinary natural process refined over 150 million years.
          </p>
        </FadeIn>

        {/* 4-stat bar */}
        <FadeIn delay={480} variant="near">
          <div className="final__stats">
            <div className="final__stat">
              <span className="final__stat-value">80k</span>
              <span className="final__stat-label">Bees per hive</span>
            </div>
            <div className="final__stat-divider" />
            <div className="final__stat">
              <span className="final__stat-value">2M</span>
              <span className="final__stat-label">Flowers per jar</span>
            </div>
            <div className="final__stat-divider" />
            <div className="final__stat">
              <span className="final__stat-value">3 wks</span>
              <span className="final__stat-label">Nectar to honey</span>
            </div>
            <div className="final__stat-divider" />
            <div className="final__stat">
              <span className="final__stat-value">¹⁄₁₂</span>
              <span className="final__stat-label">Tsp per bee lifetime</span>
            </div>
          </div>
        </FadeIn>

        {/* Quote */}
        <FadeIn delay={620} variant="near">
          <div className="final__quote">
            <p className="final__quote-text">
              &ldquo;The keeping of bees is like the direction of sunbeams.&rdquo;
            </p>
            <p className="final__quote-attr">— Henry David Thoreau</p>
          </div>
        </FadeIn>

        <FadeIn delay={780} variant="near">
          <a href="#hero" className="final__cta">Back to the Beginning</a>
        </FadeIn>

      </div>
    </section>
  )
}
