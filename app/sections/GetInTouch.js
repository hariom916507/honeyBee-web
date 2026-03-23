'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GetInTouch.module.css'

const CONTACT_ITEMS = [
  {
    label: 'Email us',
    value: 'hello@nectabee.in',
    href: 'mailto:hello@nectabee.in',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: 'Call us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/>
      </svg>
    ),
  },
  {
    label: 'Visit us',
    value: 'NectaBee LLP 54, PU4, Vijay Nagar Indore, Madhya Pradesh - 452010',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

const SUBJECTS = ['General Enquiry', 'Place an Order', 'Gifting & Bulk', 'Partnership', 'Other']

function FloatingField({ label, type = 'text', name, as = 'input', options = [], value, onChange }) {
  const [focused, setFocused] = useState(false)
  const isLifted = focused || value.length > 0

  return (
    <div className={`${styles.field} ${focused ? styles.field_focused : ''}`}>
      <label className={`${styles.field_label} ${isLifted ? styles.field_label_up : ''}`}>
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.field_input}
          rows={5}
        />
      ) : as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${styles.field_input} ${styles.field_select}`}
        >
          <option value="" disabled hidden />
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={styles.field_input}
        />
      )}

      <span className={styles.field_bar} />
    </div>
  )
}

export default function GetInTouch() {
  const sectionRef   = useRef(null)
  const leftRef      = useRef(null)
  const rightRef     = useRef(null)
  const contactsRef  = useRef(null)
  const socialsRef   = useRef(null)
  const dripRef      = useRef(null)
  const footerRef    = useRef(null)

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1600)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Honey drip loop
    gsap.fromTo(dripRef.current,
      { y: -6 },
      { y: 6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }
    )

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })

    // Left panel slides in from left
    tl.fromTo(leftRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }
    )

    // Contact items stagger up
    .fromTo(Array.from(contactsRef.current?.children || []),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.13 }, '-=0.5'
    )

    // Socials pop in
    .fromTo(Array.from(socialsRef.current?.children || []),
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.1 }, '-=0.3'
    )

    // Right form slides in from right
    tl.fromTo(rightRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }, 0.2
    )

    // Footer fades
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 92%', once: true } }
    )
  }, [])

  // Animate success checkmark
  useEffect(() => {
    if (!sent) return
    gsap.fromTo(`.${styles.success_icon}`,
      { scale: 0, rotation: -20 },
      { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.8)' }
    )
    gsap.fromTo(`.${styles.success_text}`,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
    )
  }, [sent])

  return (
    <>
    <section id="contact" className={styles.git} ref={sectionRef}>

      {/* Background decorations */}
      <div className={styles.bg_circle_1} aria-hidden="true" />
      <div className={styles.bg_circle_2} aria-hidden="true" />

      {/* Honey drip decoration */}
      <div className={styles.drip_wrap} ref={dripRef} aria-hidden="true">
        <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gitDrip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(240,165,0,0.55)"/>
              <stop offset="100%" stopColor="rgba(240,165,0,0)"/>
            </linearGradient>
          </defs>
          <ellipse cx="40" cy="8" rx="20" ry="8" fill="rgba(240,165,0,0.4)"/>
          <path d="M20 8 Q26 50 40 100 Q54 50 60 8Z" fill="url(#gitDrip)"/>
        </svg>
      </div>

      <div className={styles.inner}>

        {/* ══ LEFT PANEL ══ */}
        <div className={styles.left} ref={leftRef}>

          <div className={styles.left_header}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrow_dot} />
              We&apos;re Here
            </p>
            <h2 className={styles.title}>
              Get in<br />
              <span className={styles.title_accent}>Touch.</span>
            </h2>
            <p className={styles.subtitle}>
              Whether you&apos;re curious about our honey, planning a bulk order,
              or simply want to say hello — we&apos;d love to hear from you.
            </p>
          </div>

          {/* Contact details */}
          <div className={styles.contacts} ref={contactsRef}>
            {CONTACT_ITEMS.map(item => (
              <a key={item.label} href={item.href} className={styles.contact_item}>
                <div className={styles.contact_icon}>{item.icon}</div>
                <div className={styles.contact_text}>
                  <span className={styles.contact_label}>{item.label}</span>
                  <span className={styles.contact_value}>{item.value}</span>
                </div>
                <svg className={styles.contact_arrow} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className={styles.social_row}>
            <span className={styles.social_label}>Follow us</span>
            <div className={styles.socials} ref={socialsRef}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} className={styles.social_btn} aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Decorative honeycomb SVG */}
          <div className={styles.hex_deco} aria-hidden="true">
            <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
              {[
                [90, 30], [130, 53], [130, 99], [90, 122],
                [50, 99], [50, 53], [90, 76],
              ].map(([cx, cy], i) => (
                <polygon key={i}
                  points={`${cx},${cy-22} ${cx+19},${cy-11} ${cx+19},${cy+11} ${cx},${cy+22} ${cx-19},${cy+11} ${cx-19},${cy-11}`}
                  fill="none"
                  stroke="rgba(240,165,0,0.18)"
                  strokeWidth="1.2"
                />
              ))}
            </svg>
          </div>

        </div>

        {/* ══ RIGHT PANEL — FORM ══ */}
        <div className={styles.right} ref={rightRef}>
          <div className={styles.form_card}>

            {sent ? (
              <div className={styles.success}>
                <div className={styles.success_icon}>
                  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28" cy="28" r="26" stroke="var(--honey)" strokeWidth="2"/>
                    <path d="M18 28l7 7 13-13" stroke="var(--honey)" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.success_text}>
                  <h3 className={styles.success_title}>Message Sent!</h3>
                  <p className={styles.success_sub}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button className={styles.success_reset} onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.form_header}>
                  <h3 className={styles.form_title}>Send a Message</h3>
                  <p className={styles.form_sub}>We reply within 24 hours, always.</p>
                </div>

                <div className={styles.form_row}>
                  <FloatingField label="Your Name" name="name" value={form.name} onChange={handleChange} />
                  <FloatingField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
                </div>

                <FloatingField label="Subject" name="subject" as="select"
                  options={SUBJECTS} value={form.subject} onChange={handleChange} />

                <FloatingField label="Your Message" name="message" as="textarea"
                  value={form.message} onChange={handleChange} />

                <button type="submit" className={`${styles.submit} ${sending ? styles.submit_sending : ''}`}>
                  {sending ? (
                    <>
                      <span className={styles.spinner} />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>

    {/* ── Footer bar ── */}
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_brand}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={styles.footer_logo}>
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="var(--honey)" strokeWidth="1.5"/>
            <circle cx="16" cy="16" r="5" fill="var(--honey)" opacity="0.7"/>
          </svg>
          <span className={styles.footer_name}>nectaBee</span>
        </div>
        <p className={styles.footer_copy}>
          © {new Date().getFullYear()} nectaBee. Crafted with care. Pure honey, every drop.
        </p>
        <div className={styles.footer_links}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Shipping</a>
        </div>
      </div>
    </footer>
    </>
  )
}
