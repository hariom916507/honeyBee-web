/**
 * Central GSAP setup — import from here everywhere.
 *
 * Keeps plugin registration in one place so it never happens twice
 * and is easy to extend (e.g. add ScrollSmoother, Flip, etc. later).
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
