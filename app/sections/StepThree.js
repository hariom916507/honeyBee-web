import FadeIn from '../components/FadeIn'
import Parallax from '../components/Parallax'

export default function StepThree() {
  return (
    <section id="storage" className="step step--amber">
      <div className="step__row">

        {/* ── Text ─────────────────────────────────────────── */}
        <div className="step__text">
          <FadeIn delay={0} variant="near">
            <Parallax offset={40}>
              <span className="step__number">03</span>
            </Parallax>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="step__title">Storage &amp; Ripening</h2>
          </FadeIn>

          <FadeIn delay={250}>
            <p className="step__subtitle">
              Bees fan the nectar with their wings for days, evaporating water
              until moisture drops below 20%. Only then do they seal each
              cell with beeswax — nature&apos;s perfect preservation.
            </p>
          </FadeIn>

          <FadeIn delay={380} variant="near">
            <div className="step__divider" />
          </FadeIn>

          <FadeIn delay={460} variant="near">
            <p className="step__detail">Honey sealed in wax can last thousands of years.</p>
          </FadeIn>
        </div>

        {/* ── Visual panel ─────────────────────────────────── */}
        <div className="step__panel">

          {/* Moisture gauge card */}
          <FadeIn delay={200}>
            <div className="step__card">
              <p className="step__card-eyebrow">Moisture at sealing</p>

              {/* Wax cell SVG illustration */}
              <svg width="100%" height="52" viewBox="0 0 280 52" fill="none"
                style={{marginBottom:'1rem'}}>
                {/* 6 hex wax cells */}
                {[24, 68, 112, 156, 200, 244].map((cx, i) => (
                  <polygon
                    key={i}
                    points={`${cx+18},26 ${cx+9},42 ${cx-9},42 ${cx-18},26 ${cx-9},10 ${cx+9},10`}
                    fill={i < 4 ? 'rgba(240,165,0,0.22)' : 'rgba(240,165,0,0.08)'}
                    stroke="rgba(184,114,0,0.45)"
                    strokeWidth="1.3"
                  />
                ))}
                {/* Sealed cap on first 4 */}
                {[24, 68, 112, 156].map((cx, i) => (
                  <ellipse key={i} cx={cx} cy={10} rx={18} ry={4}
                    fill="rgba(184,114,0,0.3)" />
                ))}
              </svg>

              <div className="step__stat-value">&lt;20%</div>
              <div className="step__stat-label">Target moisture content</div>

              {/* Moisture reduction bar */}
              <div className="step__bar">
                <div className="step__bar-header">
                  <span>Water evaporated</span>
                  <span>80%</span>
                </div>
                <div className="step__bar-track">
                  <div className="step__bar-fill" style={{width: '80%'}} />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mini stats */}
          <FadeIn delay={340}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">3–7</span>
                <span className="step__mini-desc">Days of fanning</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">∞</span>
                <span className="step__mini-desc">Shelf life sealed</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={460}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">3,000</span>
                <span className="step__mini-desc">Yr old honey found</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">12°C</span>
                <span className="step__mini-desc">Ideal storage temp</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
