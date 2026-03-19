'use client'
/**
 * GSAPInit — mounts once in layout, configures global GSAP defaults,
 * and keeps ScrollTrigger in sync with Next.js's soft navigation.
 *
 * No animation logic lives here — this is purely setup/teardown.
 */
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function GSAPInit() {
  useEffect(() => {
    // Global defaults — tweak to taste
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.9,
    })

    // Tell ScrollTrigger which element is the scroller.
    // Defaults to window — explicitly set for clarity.
    ScrollTrigger.defaults({
      scroller: window,
    })

    // Refresh after fonts / images load so measurements are accurate.
    window.addEventListener('load', ScrollTrigger.refresh)

    return () => {
      // Clean up all ScrollTrigger instances on unmount / route change.
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('load', ScrollTrigger.refresh)
    }
  }, [])

  // Renders nothing — side-effects only.
  return null
}
