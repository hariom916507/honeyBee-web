import FadeIn from '../components/FadeIn'
import Parallax from '../components/Parallax'

export default function StepOne() {
  return (
    <section id="collecting" className="step step--light">
      <div className="step__row">

        {/* ── Text ─────────────────────────────────────────── */}
        <div className="step__text">
          <FadeIn delay={0} variant="near">
            <Parallax offset={40}>
              <span className="step__number">01</span>
            </Parallax>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="step__title">Collecting Nectar</h2>
          </FadeIn>

          <FadeIn delay={250}>
            <p className="step__subtitle">
              Worker bees travel up to five kilometres, visiting as many as
              1,500 flowers to fill a single honey stomach. Each flight is a
              precise act of nature — guided by scent, memory, and the sun.
            </p>
          </FadeIn>

          <FadeIn delay={380} variant="near">
            <div className="step__divider" />
          </FadeIn>

          <FadeIn delay={460} variant="near">
            <p className="step__detail">Up to 80,000 bees per hive. Millions of flowers per jar.</p>
          </FadeIn>
        </div>

        {/* ── Visual panel ─────────────────────────────────── */}
        <div className="step__panel">

          {/* Primary stat card */}
          <FadeIn delay={200}>
            <div className="step__card">
              <p className="step__card-eyebrow">Per foraging flight</p>

              {/* Simple flight path SVG */}
              <svg width="100%" height="48" viewBox="0 0 280 48" fill="none" style={{marginBottom:'1rem'}}>
                <path d="M 8,38 Q 70,8 140,24 Q 210,40 272,10"
                  stroke="rgba(240,165,0,0.35)" strokeWidth="1.5"
                  strokeDasharray="5 4" fill="none"/>
                {/* Flower dots */}
                {[8,60,110,160,210,260].map((x, i) => (
                  <g key={i}>
                    <circle cx={x} cy={i % 2 === 0 ? 36 : 14} r="5"
                      fill="rgba(240,165,0,0.12)" stroke="rgba(240,165,0,0.4)" strokeWidth="1.2"/>
                    <circle cx={x} cy={i % 2 === 0 ? 36 : 14} r="2"
                      fill="rgba(240,165,0,0.6)"/>
                  </g>
                ))}
              </svg>

              <div className="step__stat-value">5 km</div>
              <div className="step__stat-label">Maximum foraging range</div>
            </div>
          </FadeIn>

          {/* Two mini-stats */}
          <FadeIn delay={340}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">1,500</span>
                <span className="step__mini-desc">Flowers per trip</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">40 min</span>
                <span className="step__mini-desc">Per flight</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={460}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">80k</span>
                <span className="step__mini-desc">Bees per hive</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">¹⁄₁₂</span>
                <span className="step__mini-desc">Tsp per lifetime</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
