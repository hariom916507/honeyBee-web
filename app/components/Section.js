// Section — reusable full-height section wrapper
// Accepts an optional `id` and `className` for per-section overrides

export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__inner">
        {children}
      </div>
    </section>
  )
}
