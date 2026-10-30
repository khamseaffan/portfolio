export default function Certification({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="certification" className="scroll-mt-20 border-t border-[var(--ed-line)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Certifications</h2>
      <div className="mt-8">
        {items.map((cert) => (
          <article key={cert.title} className="grid gap-2 border-t border-[var(--ed-line)] py-5 last:border-b sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
            <div>
              <h3 className="text-[15px] font-medium">{cert.title}</h3>
              {cert.skills?.length > 0 && (
                <p className="mt-1 text-sm text-[var(--ed-faint)]">{cert.skills.join(' / ')}</p>
              )}
            </div>
            <p className="text-sm text-[var(--ed-muted)] sm:text-right">
              {cert.issuedBy}
              {cert.date ? <span className="text-[var(--ed-faint)]"> · {cert.date}</span> : null}
              {cert.certificateLink && (
                <>
                  <span className="text-[var(--ed-faint)]"> · </span>
                  <a
                    href={cert.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ed-text)] underline-offset-4 hover:underline"
                  >
                    View
                  </a>
                </>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
