'use client'
/**
 * BeeScrollAnimation — scroll-synced bee flight path.
 *
 * Measurement strategy
 * ────────────────────
 * We need to know WHERE each section's title sits on-screen when
 * that section fills the viewport. Two traps to avoid:
 *
 *   1. getBoundingClientRect() includes CSS transforms.
 *      FadeIn wrappers apply translateY(28px), shifting measured values.
 *      → Use offsetTop instead (layout-only, transform-immune).
 *
 *   2. Hardcoded viewport fractions drift if section heights ever change.
 *      → Derive every position from live DOM measurements.
 *
 * Layout contract (held by globals.css):
 *   Each section is min-height: 100vh with display:flex align-items:center.
 *   When section i is in view, scroll === section.offsetTop.
 *   Therefore: title's viewport-Y = titleDocTop - sectionDocTop.
 *
 * Timeline structure
 * ──────────────────
 *   Single ScrollTrigger covers body top→bottom with scrub: 1.2.
 *   Each segment is split into two tweens:
 *     [fly]   70% of the segment's scroll range — moves + peaks rotation
 *     [hover] 30% of the segment's scroll range — settles rotation to ~0
 *
 *   Segment durations are proportional to actual scroll distance so the
 *   bee's speed stays constant across sections regardless of their height.
 *
 * Rotation (bank)
 * ───────────────
 *   angle = clamp(dx / (vw * 0.35) * MAX_BANK, -MAX_BANK, MAX_BANK)
 *   Peaks at the midpoint tween, relaxes to 20% of peak during hover.
 *   Vertical drops add a small forward lean (negative rotation).
 */

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// ─── Constants ───────────────────────────────────────────────
const BEE_W        = 240  // must match Bee.module.css width
const BEE_H        = 300  // must match Bee.module.css height
const HALF_W       = BEE_W / 2  // 80
const HALF_H       = BEE_H / 2  // 100
const MAX_BANK     = 24   // maximum tilt angle in degrees
const TOTAL_UNITS  = 10   // arbitrary timeline duration — scrub scales this
const FLY_RATIO    = 0.70 // fraction of each segment spent flying
const HOVER_RATIO  = 0.30 // fraction of each segment spent hovering

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Walks the offsetParent chain to get an element's absolute
 * document-top without any CSS-transform influence.
 */
function getDocumentTop(el) {
  let top = 0
  let node = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent
  }
  return top
}

/**
 * Returns GSAP {x, y} so the BEE CENTER lands on (targetX, targetY).
 * GSAP transforms are relative to the element's top-left corner (top:0 left:0).
 */
function center(targetX, targetY) {
  return { x: targetX - HALF_W, y: targetY - HALF_H }
}

/**
 * Clamps value between min and max.
 */
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

/**
 * Computes tilt angle for a move from (x0,y0) to (x1,y1).
 * Horizontal distance drives the bank; a downward diagonal adds forward lean.
 */
function bankAngle(x0, y0, x1, y1, vw) {
  const dx = x1 - x0
  const dy = y1 - y0
  const lateral = clamp((dx / (vw * 0.35)) * MAX_BANK, -MAX_BANK, MAX_BANK)
  // Forward lean: tilt into a descent (capped at ±6°)
  const dive = clamp(dy / (vw * 0.5) * 6, -6, 6)
  return lateral + dive
}

// ─── Per-section waypoint config ─────────────────────────────
//
// targetX / targetY: where on-screen the bee's center should land,
//   expressed as functions of (vw, vh, titleViewportY) so they
//   respond to any screen size.
//
// titleViewportY: title's Y when the section fills the viewport
//   (derived from DOM measurements at runtime).
//
const WAYPOINT_CONFIG = [
  {
    // Hero — center top
    sectionId: 'hero',
    getTarget: (vw, vh) => ({ x: vw * 0.50, y: vh * 0.14 }),
  },
  {
    // Our Honey — right bottom
    sectionId: 'our-honey',
    getTarget: (vw, vh) => ({ x: vw * 0.82, y: vh * 0.70 }),
  },
  {
    // Producer Excellence — left top
    sectionId: 'excellence',
    getTarget: (vw, vh) => ({ x: vw * 0.10, y: vh * 0.16 }),
  },
  {
    // Ethics & Stewardship — center bottom
    sectionId: 'ethics',
    getTarget: (vw, vh) => ({ x: vw * 0.48, y: vh * 0.72 }),
  },
  {
    // From Hive to Home — right top
    sectionId: 'hive-to-home',
    getTarget: (vw, vh) => ({ x: vw * 0.80, y: vh * 0.15 }),
  },
  {
    // Gifting & Bulk — left bottom
    sectionId: 'gifting',
    getTarget: (vw, vh) => ({ x: vw * 0.10, y: vh * 0.68 }),
  },
  {
    // FAQ — center middle
    sectionId: 'faq',
    getTarget: (vw, vh) => ({ x: vw * 0.46, y: vh * 0.40 }),
  },
  {
    // Get in Touch — right center
    sectionId: 'contact',
    getTarget: (vw, vh) => ({ x: vw * 0.80, y: vh * 0.42 }),
  },
]

// ─── Component ───────────────────────────────────────────────

export default function BeeScrollAnimation() {
  useEffect(() => {
    const bee = document.getElementById('bee')
    if (!bee) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const maxScroll = document.documentElement.scrollHeight - vh

    if (maxScroll <= 0) return

    // ── Measure each section and derive waypoints ─────────────
    const waypoints = WAYPOINT_CONFIG.map(({ sectionId, getTarget }) => {
      const section = document.getElementById(sectionId)
      if (!section) return null

      const sectionDocTop = getDocumentTop(section)
      const { x: targetX, y: targetY } = getTarget(vw, vh)

      return {
        ...center(targetX, targetY),
        // Fraction of total scroll at which this section is centered
        scrollFraction: clamp(sectionDocTop / maxScroll, 0, 1),
      }
    }).filter(Boolean)

    if (waypoints.length < 2) return

    // ── Initial placement — no animation ─────────────────────
    gsap.set(bee, {
      x: waypoints[0].x,
      y: waypoints[0].y,
      rotation: 0,
      transformOrigin: '50% 50%',
    })

    // ── Build scrubbed timeline ───────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end:   'bottom bottom',
        scrub: 1.2,   // inertia in seconds — lower = tighter tracking
      },
    })

    waypoints.slice(1).forEach((wp, i) => {
      const from = waypoints[i]

      // Duration proportional to scroll distance — bee speed stays constant
      const scrollGap      = wp.scrollFraction - from.scrollFraction
      const segmentUnits   = scrollGap * TOTAL_UNITS
      const flyDuration    = segmentUnits * FLY_RATIO
      const hoverDuration  = segmentUnits * HOVER_RATIO

      // Bank angle for this leg of the journey
      const bank = bankAngle(from.x, from.y, wp.x, wp.y, vw)

      // ── Fly phase ─────────────────────────────────────────
      // Midpoint: bee peaks its rotation at the halfway mark.
      // Two half-tweens let us overshoot at the midpoint then
      // settle to the final position naturally.
      const midX = (from.x + wp.x) / 2
      const midY = (from.y + wp.y) / 2

      tl.to(bee, {
        x:        midX,
        y:        midY,
        rotation: bank * 1.25,       // overshoot — peak tilt at midpoint
        ease:     'power2.in',
        duration: flyDuration / 2,
      })

      tl.to(bee, {
        x:        wp.x,
        y:        wp.y,
        rotation: bank,              // settle to natural bank at destination
        ease:     'power2.out',
        duration: flyDuration / 2,
      })

      // ── Hover phase ───────────────────────────────────────
      // Bee stays at the waypoint; rotation eases back toward level.
      tl.to(bee, {
        x:        wp.x,
        y:        wp.y,
        rotation: bank * 0.15,       // nearly upright while hovering
        ease:     'power3.out',
        duration: hoverDuration,
      })
    })

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return null
}
