import FadeIn from '../components/FadeIn'
import Parallax from '../components/Parallax'

/* Pre-calculated honeycomb: 7-hex flower, s=18, h=15.6 */
/* Centre (60,54) + 6 surrounding at distance 31 */
const hexPoints = (cx, cy, s = 18) => {
  const h = Math.round(s * Math.sqrt(3) / 2)
  return `${cx+s},${cy} ${cx+s/2},${cy+h} ${cx-s/2},${cy+h} ${cx-s},${cy} ${cx-s/2},${cy-h} ${cx+s/2},${cy-h}`
}

const HEX_CENTRES = [
  [60, 54],            // centre
  [91, 54],            // right
  [75, 23],            // upper-right
  [45, 23],            // upper-left
  [29, 54],            // left
  [45, 85],            // lower-left
  [75, 85],            // lower-right
]

const HEX_OPACITY = [0.22, 0.10, 0.14, 0.12, 0.10, 0.12, 0.14]

export default function StepTwo() {
  return (
    <section id="processing" className="step step--warm">
      <div className="step__row step__row--reverse">

        {/* ── Text ─────────────────────────────────────────── */}
        <div className="step__text">
          <FadeIn delay={0} variant="near">
            <Parallax offset={40}>
              <span className="step__number">02</span>
            </Parallax>
          </FadeIn>

          <FadeIn delay={100}>
            <h2 className="step__title">Hive Processing</h2>
          </FadeIn>

          <FadeIn delay={250}>
            <p className="step__subtitle">
              Returned to the hive, nectar is passed between bees for up to
              twenty minutes. Enzymes break complex sugars into simpler forms,
              beginning the slow alchemy that creates honey.
            </p>
          </FadeIn>

          <FadeIn delay={380} variant="near">
            <div className="step__divider" />
          </FadeIn>

          <FadeIn delay={460} variant="near">
            <p className="step__detail">Temperature inside the hive: a constant 35 °C.</p>
          </FadeIn>
        </div>

        {/* ── Visual panel ─────────────────────────────────── */}
        <div className="step__panel">

          {/* Honeycomb SVG + primary stat */}
          <FadeIn delay={200}>
            <div className="step__card">
              <p className="step__card-eyebrow">Inside the hive</p>

              {/* 7-hex honeycomb decoration */}
              <svg width="120" height="108" viewBox="0 0 120 108" fill="none"
                style={{display:'block', margin:'0 auto 1.25rem'}}>
                {HEX_CENTRES.map(([cx, cy], i) => (
                  <polygon
                    key={i}
                    points={hexPoints(cx, cy)}
                    fill={`rgba(240,165,0,${HEX_OPACITY[i]})`}
                    stroke="rgba(240,165,0,0.35)"
                    strokeWidth="1.4"
                  />
                ))}
                {/* Honey drip in centre hex */}
                <circle cx="60" cy="54" r="6"
                  fill="rgba(240,165,0,0.55)" />
              </svg>

              <div className="step__stat-value">35 °C</div>
              <div className="step__stat-label">Constant hive temperature</div>
            </div>
          </FadeIn>

          {/* Two mini-stats */}
          <FadeIn delay={340}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">20 min</span>
                <span className="step__mini-desc">Nectar passing</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">50%</span>
                <span className="step__mini-desc">Hive humidity</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={460}>
            <div className="step__mini-cards">
              <div className="step__mini-card">
                <span className="step__mini-value">3+</span>
                <span className="step__mini-desc">Enzyme types</span>
              </div>
              <div className="step__mini-card">
                <span className="step__mini-value">7 days</span>
                <span className="step__mini-desc">Processing cycle</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
