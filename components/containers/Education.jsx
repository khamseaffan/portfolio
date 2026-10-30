export default function Education({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="education" className="scroll-mt-20 border-t border-[var(--ed-line)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Education</h2>
      <div className="mt-8">
        {items.map((edu) => (
          <article key={edu.institution} className="grid gap-2 border-t border-[var(--ed-line)] py-5 last:border-b sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
            <div className="text-sm text-[var(--ed-muted)]">
              {edu.startYear} to {edu.graduationYear}
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-[15px] font-medium">{edu.institution}</h3>
                <p className="text-sm text-[var(--ed-muted)] sm:text-right">
                  {edu.degree}, {edu.fieldOfStudy}
                  {edu.gpa ? <span className="text-[var(--ed-faint)]"> | {edu.gpa}</span> : null}
                </p>
              </div>
              {edu.location && <p className="mt-1 text-sm text-[var(--ed-faint)]">{edu.location}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
