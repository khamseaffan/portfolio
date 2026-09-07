'use client';

export default function Certification({ items = [] }) {
  return (
    <section
      id="certification"
      className="border-t bg-[var(--cm-bg)] px-6 py-16 text-[var(--cm-text)] sm:px-10 lg:px-24 lg:py-24"
      style={{ borderColor: 'var(--cm-border)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-5">
          <div
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: 'var(--cm-accent)' }}
          >
            <span className="inline-block h-px w-5" style={{ background: 'var(--cm-accent)' }} />
            Certifications
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Coursework worth naming.
          </h2>
        </div>

        <div
          className="rounded-2xl border"
          style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
        >
          {items.map((cert, i) => (
            <CertRow key={cert.title} cert={cert} last={i === items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertRow({ cert, last }) {
  return (
    <div
      className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-8"
      style={{ borderBottom: last ? 'none' : '1px solid var(--cm-border)' }}
    >
      <div className="flex flex-col gap-1.5 sm:flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[15px] font-semibold leading-snug">{cert.title}</h3>
          {cert.certificateLink && (
            <a
              href={cert.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.06em] underline-offset-4 hover:underline"
              style={{ color: 'var(--cm-accent)' }}
            >
              View ↗
            </a>
          )}
        </div>
        {cert.skills?.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs" style={{ color: 'var(--cm-text-faint)' }}>
            {cert.skills.join(' · ')}
          </div>
        )}
      </div>
      <div
        className="whitespace-nowrap font-mono text-xs sm:text-right"
        style={{ color: 'var(--cm-text-muted)' }}
      >
        {cert.issuedBy}
        <span style={{ color: 'var(--cm-text-faint)' }}> · {cert.date}</span>
      </div>
    </div>
  );
}
