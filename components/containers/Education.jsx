'use client';

export default function Education({ items = [] }) {
  return (
    <section
      id="education"
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
            Education
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Grounded in the fundamentals.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((edu) => (
            <EducationCard key={edu.institution} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu }) {
  const [gpaValue, gpaMax] = (edu.gpa || '').split('/');

  return (
    <div
      className="relative flex flex-col gap-4 rounded-2xl border p-7 sm:p-8"
      style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
    >
      <div
        className="absolute left-3.5 top-3.5 h-3 w-3 border-l-[1.5px] border-t-[1.5px] opacity-60"
        style={{ borderColor: 'var(--cm-accent)' }}
      />

      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
          {edu.institution}
        </h3>
        <div
          className="whitespace-nowrap font-mono text-xs"
          style={{ color: 'var(--cm-text-faint)' }}
        >
          {edu.startYear} – {edu.graduationYear}
        </div>
      </div>

      <div className="text-[15px]" style={{ color: 'var(--cm-text-muted)' }}>
        {edu.degree} in {edu.fieldOfStudy}
      </div>

      {edu.location && (
        <div className="font-mono text-xs" style={{ color: 'var(--cm-text-faint)' }}>
          {edu.location}
        </div>
      )}

      <div className="h-px" style={{ background: 'var(--cm-border)' }} />

      {gpaValue && (
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono text-[26px] font-semibold sm:text-[28px]"
            style={{ color: 'var(--cm-accent)' }}
          >
            {gpaValue.trim()}
          </span>
          {gpaMax && (
            <span
              className="font-mono text-[11px] uppercase tracking-[0.06em]"
              style={{ color: 'var(--cm-text-faint)' }}
            >
              / {gpaMax.trim()} GPA
            </span>
          )}
        </div>
      )}
    </div>
  );
}
