/**
 * Bee — inline SVG, realistic frontal anatomy.
 *
 * Proportions (in 200×265 viewBox, rendered at 160×200px):
 *   Head    cy=48  ry=34  → height ~68px  (33% of body)
 *   Thorax  cy=96  ry=22  → height ~44px  (21% of body)
 *   Abdomen cy=155 ry=52  → height ~104px (50% of body)
 */

import styles from './Bee.module.css'

export default function Bee() {
  return (
    <div id="bee" className={styles.bee} aria-hidden="true" role="presentation">
      <div className={styles.beeFloat}>
        <svg
          viewBox="0 0 200 265"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="bEyeL" cx="38%" cy="28%" r="66%">
              <stop offset="0%"   stopColor="#2e1c08" />
              <stop offset="40%"  stopColor="#140c04" />
              <stop offset="100%" stopColor="#030100" />
            </radialGradient>
            <radialGradient id="bEyeR" cx="62%" cy="28%" r="66%">
              <stop offset="0%"   stopColor="#2e1c08" />
              <stop offset="40%"  stopColor="#140c04" />
              <stop offset="100%" stopColor="#030100" />
            </radialGradient>
            <linearGradient id="bFronsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#c89020" />
              <stop offset="45%"  stopColor="#e8b830" />
              <stop offset="100%" stopColor="#a87018" />
            </linearGradient>
            <radialGradient id="bClypGrad" cx="50%" cy="38%" r="60%">
              <stop offset="0%"   stopColor="#f0cc50" />
              <stop offset="70%"  stopColor="#c89828" />
              <stop offset="100%" stopColor="#906010" />
            </radialGradient>
            <radialGradient id="bThoraxGrad" cx="38%" cy="28%" r="64%">
              <stop offset="0%"   stopColor="#4a3000" />
              <stop offset="100%" stopColor="#160a00" />
            </radialGradient>
            <radialGradient id="bAbdGrad" cx="30%" cy="20%" r="70%">
              <stop offset="0%"   stopColor="#f5be00" />
              <stop offset="52%"  stopColor="#d48c00" />
              <stop offset="100%" stopColor="#6a3c00" />
            </radialGradient>
            <linearGradient id="bMandGrad" x1="0%" y1="0%" x2="40%" y2="100%">
              <stop offset="0%"   stopColor="#3a2008" />
              <stop offset="100%" stopColor="#0a0400" />
            </linearGradient>
            <clipPath id="bAbdClip">
              <ellipse cx="100" cy="155" rx="32" ry="52" />
            </clipPath>
            <filter id="bShadow" x="-30%" y="-20%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3.5"
                floodColor="rgba(0,0,0,0.38)" />
            </filter>
          </defs>

          {/* ══════════════════════════════════════════════
              WINGS  — pivot at thorax shoulders (y≈90)
              ══════════════════════════════════════════════ */}

          {/* Left upper wing */}
          <g transform="translate(70,90)">
            <g>
              <animateTransform attributeName="transform" type="rotate"
                values="52;40;52" dur="0.28s" repeatCount="indefinite" />
              <ellipse cx="-60" cy="0" rx="74" ry="27"
                fill="rgba(192,210,168,0.44)"
                stroke="rgba(72,96,52,0.68)" strokeWidth="1.4" />
              <path d="M0,0 Q-66,-10 -130,-6"   stroke="rgba(58,82,42,0.78)" strokeWidth="1.7" fill="none"/>
              <path d="M-4,5 Q-56,-2 -104,3"    stroke="rgba(58,82,42,0.46)" strokeWidth="0.9" fill="none"/>
              <path d="M-12,2 Q-20,17 -22,25"   stroke="rgba(58,82,42,0.44)" strokeWidth="0.8" fill="none"/>
              <path d="M-32,0 Q-40,14 -42,23"   stroke="rgba(58,82,42,0.42)" strokeWidth="0.75" fill="none"/>
              <path d="M-54,-3 Q-62,12 -64,21"  stroke="rgba(58,82,42,0.4)"  strokeWidth="0.7" fill="none"/>
              <path d="M-76,-5 Q-82,8 -84,16"   stroke="rgba(58,82,42,0.36)" strokeWidth="0.65" fill="none"/>
              <path d="M-98,-5 Q-102,5 -102,11" stroke="rgba(58,82,42,0.3)"  strokeWidth="0.6" fill="none"/>
              <path d="M-22,17 Q-42,19 -44,15"  stroke="rgba(58,82,42,0.27)" strokeWidth="0.55" fill="none"/>
              <path d="M-42,17 Q-64,17 -66,13"  stroke="rgba(58,82,42,0.24)" strokeWidth="0.5"  fill="none"/>
              <path d="M-64,14 Q-86,14 -88,10"  stroke="rgba(58,82,42,0.2)"  strokeWidth="0.48" fill="none"/>
            </g>
          </g>

          {/* Left lower wing */}
          <g transform="translate(70,100)">
            <g>
              <animateTransform attributeName="transform" type="rotate"
                values="34;24;34" dur="0.28s" begin="-0.14s" repeatCount="indefinite" />
              <ellipse cx="-36" cy="0" rx="50" ry="19"
                fill="rgba(192,210,168,0.36)"
                stroke="rgba(72,96,52,0.5)" strokeWidth="1.1" />
              <path d="M0,0 Q-44,-4 -82,1"     stroke="rgba(58,82,42,0.58)" strokeWidth="1.2" fill="none"/>
              <path d="M-14,2 Q-22,12 -24,19"  stroke="rgba(58,82,42,0.36)" strokeWidth="0.68" fill="none"/>
              <path d="M-34,0 Q-42,10 -44,16"  stroke="rgba(58,82,42,0.32)" strokeWidth="0.62" fill="none"/>
            </g>
          </g>

          {/* Right upper wing */}
          <g transform="translate(130,90)">
            <g>
              <animateTransform attributeName="transform" type="rotate"
                values="-52;-40;-52" dur="0.28s" repeatCount="indefinite" />
              <ellipse cx="60" cy="0" rx="74" ry="27"
                fill="rgba(192,210,168,0.44)"
                stroke="rgba(72,96,52,0.68)" strokeWidth="1.4" />
              <path d="M0,0 Q66,-10 130,-6"    stroke="rgba(58,82,42,0.78)" strokeWidth="1.7" fill="none"/>
              <path d="M4,5 Q56,-2 104,3"      stroke="rgba(58,82,42,0.46)" strokeWidth="0.9" fill="none"/>
              <path d="M12,2 Q20,17 22,25"     stroke="rgba(58,82,42,0.44)" strokeWidth="0.8" fill="none"/>
              <path d="M32,0 Q40,14 42,23"     stroke="rgba(58,82,42,0.42)" strokeWidth="0.75" fill="none"/>
              <path d="M54,-3 Q62,12 64,21"    stroke="rgba(58,82,42,0.4)"  strokeWidth="0.7" fill="none"/>
              <path d="M76,-5 Q82,8 84,16"     stroke="rgba(58,82,42,0.36)" strokeWidth="0.65" fill="none"/>
              <path d="M98,-5 Q102,5 102,11"   stroke="rgba(58,82,42,0.3)"  strokeWidth="0.6" fill="none"/>
              <path d="M22,17 Q42,19 44,15"    stroke="rgba(58,82,42,0.27)" strokeWidth="0.55" fill="none"/>
              <path d="M42,17 Q64,17 66,13"    stroke="rgba(58,82,42,0.24)" strokeWidth="0.5"  fill="none"/>
              <path d="M64,14 Q86,14 88,10"    stroke="rgba(58,82,42,0.2)"  strokeWidth="0.48" fill="none"/>
            </g>
          </g>

          {/* Right lower wing */}
          <g transform="translate(130,100)">
            <g>
              <animateTransform attributeName="transform" type="rotate"
                values="-34;-24;-34" dur="0.28s" begin="-0.14s" repeatCount="indefinite" />
              <ellipse cx="36" cy="0" rx="50" ry="19"
                fill="rgba(192,210,168,0.36)"
                stroke="rgba(72,96,52,0.5)" strokeWidth="1.1" />
              <path d="M0,0 Q44,-4 82,1"      stroke="rgba(58,82,42,0.58)" strokeWidth="1.2" fill="none"/>
              <path d="M14,2 Q22,12 24,19"    stroke="rgba(58,82,42,0.36)" strokeWidth="0.68" fill="none"/>
              <path d="M34,0 Q42,10 44,16"    stroke="rgba(58,82,42,0.32)" strokeWidth="0.62" fill="none"/>
            </g>
          </g>

          {/* ══════════════════════════════════════════════
              LEGS — 3 jointed pairs from thorax (cy≈96)
              ══════════════════════════════════════════════ */}

          <path d="M 72,92 Q 50,110 38,132 Q 28,150 32,168"
            stroke="#180c00" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <path d="M 128,92 Q 150,110 162,132 Q 172,150 168,168"
            stroke="#180c00" strokeWidth="2.4" fill="none" strokeLinecap="round"/>

          <path d="M 70,104 Q 46,126 32,152 Q 22,172 26,190"
            stroke="#180c00" strokeWidth="2.1" fill="none" strokeLinecap="round"/>
          <path d="M 130,104 Q 154,126 168,152 Q 178,172 174,190"
            stroke="#180c00" strokeWidth="2.1" fill="none" strokeLinecap="round"/>

          <path d="M 72,116 Q 52,140 42,166 Q 34,186 38,204"
            stroke="#180c00" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
          <path d="M 128,116 Q 148,140 158,166 Q 166,186 162,204"
            stroke="#180c00" strokeWidth="1.9" fill="none" strokeLinecap="round"/>

          {/* ══════════════════════════════════════════════
              BODY
              ══════════════════════════════════════════════ */}

          {/* Abdomen */}
          <ellipse cx="100" cy="155" rx="32" ry="52"
            fill="url(#bAbdGrad)" filter="url(#bShadow)" />
          <g clipPath="url(#bAbdClip)">
            <ellipse cx="88" cy="136" rx="12" ry="9" fill="rgba(255,210,40,0.24)" />
            <rect x="68" y="122" width="64" height="15" fill="#150900" opacity="0.92" />
            <rect x="68" y="147" width="64" height="15" fill="#150900" opacity="0.92" />
            <rect x="68" y="172" width="64" height="15" fill="#150900" opacity="0.92" />
            <rect x="68" y="193" width="64" height="14" fill="#150900" opacity="0.85" />
          </g>
          <ellipse cx="100" cy="155" rx="32" ry="52"
            fill="none" stroke="rgba(50,28,0,0.26)" strokeWidth="1.2" />

          {/* Thorax */}
          <ellipse cx="100" cy="96" rx="28" ry="22"
            fill="url(#bThoraxGrad)" filter="url(#bShadow)" />

          {/* Thorax amber fur — left side */}
          <path d="M 74,88 Q 64,84 60,88"   stroke="rgba(210,155,0,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <path d="M 72,97 Q 62,94 58,98"   stroke="rgba(210,155,0,0.5)"  strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M 75,106 Q 65,104 62,108" stroke="rgba(210,155,0,0.44)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          {/* Thorax amber fur — right side */}
          <path d="M 126,88 Q 136,84 140,88"  stroke="rgba(210,155,0,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <path d="M 128,97 Q 138,94 142,98"  stroke="rgba(210,155,0,0.5)"  strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M 125,106 Q 135,104 138,108" stroke="rgba(210,155,0,0.44)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          {/* Scutum top fur */}
          <path d="M 88,76 Q 86,70 90,68"   stroke="rgba(210,155,0,0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M 96,74 Q 94,68 98,66"   stroke="rgba(210,155,0,0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M 104,74 Q 104,68 108,66" stroke="rgba(210,155,0,0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M 112,76 Q 114,70 118,68" stroke="rgba(210,155,0,0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>

          <ellipse cx="100" cy="96" rx="28" ry="22"
            fill="none" stroke="rgba(36,20,0,0.3)" strokeWidth="1" />

          {/* Petiole */}
          <ellipse cx="100" cy="120" rx="13" ry="8" fill="#1a0900" />

          {/* Stinger */}
          <path d="M 98,205 Q 100,218 100,228 Q 100,218 102,205"
            stroke="#7a4400" strokeWidth="2.8" fill="none" strokeLinecap="round"/>

          {/* ══════════════════════════════════════════════
              HEAD — proportionally reduced
              cx=100 cy=48  rx=48 ry=34  (height=68px, ~33% of bee)
              ══════════════════════════════════════════════ */}

          {/* Head background (vertex + gena) */}
          <ellipse cx="100" cy="48" rx="48" ry="34"
            fill="#160a00" filter="url(#bShadow)" />

          {/* ── COMPOUND EYES ── cx=60/140  cy=46  rx=16  ry=15 ── */}

          {/* Left compound eye */}
          <ellipse cx="60" cy="46" rx="16" ry="15" fill="url(#bEyeL)" />
          <ellipse cx="54" cy="37" rx="4.5" ry="5"  fill="rgba(255,255,255,0.35)"  />
          <ellipse cx="51" cy="34" rx="2"   ry="2.5" fill="rgba(255,255,255,0.55)" />
          <ellipse cx="64" cy="40" rx="3"   ry="3.5" fill="rgba(255,255,255,0.22)" />
          <ellipse cx="60" cy="46" rx="16" ry="15"
            fill="none" stroke="rgba(90,55,10,0.55)" strokeWidth="1.4" />

          {/* Right compound eye */}
          <ellipse cx="140" cy="46" rx="16" ry="15" fill="url(#bEyeR)" />
          <ellipse cx="146" cy="37" rx="4.5" ry="5"  fill="rgba(255,255,255,0.35)"  />
          <ellipse cx="149" cy="34" rx="2"   ry="2.5" fill="rgba(255,255,255,0.55)" />
          <ellipse cx="136" cy="40" rx="3"   ry="3.5" fill="rgba(255,255,255,0.22)" />
          <ellipse cx="140" cy="46" rx="16" ry="15"
            fill="none" stroke="rgba(90,55,10,0.55)" strokeWidth="1.4" />

          {/* ── FRONS — golden strip between eyes ── */}
          {/* eye inner edges: x=82 (left) and x=118 (right) → gap=36px */}
          <ellipse cx="100" cy="40" rx="10" ry="30" fill="url(#bFronsGrad)" />
          <path d="M 96,22 Q 92,18 93,14"   stroke="rgba(240,190,40,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <path d="M 100,20 Q 98,15 99,11"  stroke="rgba(240,190,40,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <path d="M 104,22 Q 108,18 107,14" stroke="rgba(240,190,40,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>

          {/* ── CLYPEUS — lower golden face ── */}
          <ellipse cx="100" cy="68" rx="13" ry="12" fill="url(#bClypGrad)" />
          <path d="M 94,74 Q 90,79 91,84"   stroke="rgba(230,175,30,0.55)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          <path d="M 100,75 Q 98,81 99,86"  stroke="rgba(230,175,30,0.55)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          <path d="M 106,74 Q 110,79 109,84" stroke="rgba(230,175,30,0.55)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>

          {/* ── VERTEX FUR ── */}
          <path d="M 78,20 Q 74,14 78,11"   stroke="rgba(215,165,25,0.52)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M 86,15 Q 83,8 87,6"     stroke="rgba(215,165,25,0.52)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M 114,15 Q 117,8 113,6"   stroke="rgba(215,165,25,0.52)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M 122,20 Q 126,14 122,11" stroke="rgba(215,165,25,0.52)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

          {/* ── OCELLI ── */}
          <circle cx="100" cy="17" r="3"   fill="#28160a" />
          <circle cx="91"  cy="21" r="2.5" fill="#28160a" />
          <circle cx="109" cy="21" r="2.5" fill="#28160a" />
          <circle cx="99"  cy="16" r="1"   fill="rgba(255,255,255,0.4)" />
          <circle cx="90"  cy="20" r="0.8" fill="rgba(255,255,255,0.4)" />
          <circle cx="108" cy="20" r="0.8" fill="rgba(255,255,255,0.4)" />

          {/* ── MANDIBLES ── */}
          <path d="M 88,78 Q 76,89 70,104 Q 74,114 80,108 Q 85,96 90,84 Z"
            fill="url(#bMandGrad)" />
          <path d="M 88,78 Q 76,89 70,104 Q 74,114 80,108 Q 85,96 90,84 Z"
            fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.9" />
          <path d="M 84,84 Q 78,94 74,104"
            stroke="rgba(80,50,10,0.28)" strokeWidth="0.8" fill="none"/>

          <path d="M 112,78 Q 124,89 130,104 Q 126,114 120,108 Q 115,96 110,84 Z"
            fill="url(#bMandGrad)" />
          <path d="M 112,78 Q 124,89 130,104 Q 126,114 120,108 Q 115,96 110,84 Z"
            fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.9" />
          <path d="M 116,84 Q 122,94 126,104"
            stroke="rgba(80,50,10,0.28)" strokeWidth="0.8" fill="none"/>

          {/* ── ANTENNAE ── */}
          <ellipse cx="87" cy="20" rx="4" ry="6" fill="#180c00" />
          <ellipse cx="113" cy="20" rx="4" ry="6" fill="#180c00" />

          <path d="M 87,15 Q 68,1 48,-14"
            stroke="#180c00" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="48" cy="-14" r="4.5" fill="#180c00" />

          <path d="M 113,15 Q 132,1 152,-14"
            stroke="#180c00" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="152" cy="-14" r="4.5" fill="#180c00" />

        </svg>
      </div>
    </div>
  )
}
