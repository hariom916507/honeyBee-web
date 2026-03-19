'use client'
/**
 * FadeIn — IntersectionObserver-based reveal.
 *
 * variant:
 *   "default"  — 36px rise, for titles and body text
 *   "near"     — 16px rise, for dividers, tags, small elements
 */
import useInView from '../hooks/useInView'

export default function FadeIn({ children, delay = 0, variant = 'default', className = '' }) {
  const [ref, inView] = useInView(0.12)

  return (
    <div
      ref={ref}
      data-fade={variant === 'near' ? 'near' : undefined}
      className={`fade-in ${inView ? 'fade-in--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
