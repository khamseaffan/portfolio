export default function Leadership({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="leadership" className="scroll-mt-20 border-t border-[var(--ed-line)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Leadership</h2>
      <div className="mt-8">
        {items.map((item) => (
          <article key={item.organization} className="grid gap-3 border-t border-[var(--ed-line)] py-5 last:border-b sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
            <div className="text-sm text-[var(--ed-muted)]">
              <div>{item.startDate}</div>
              <div className="text-[var(--ed-faint)]">{item.endDate}</div>
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-[15px] font-medium">{item.organization}</h3>
                <p className="text-sm text-[var(--ed-muted)] sm:text-right">{item.role}</p>
              </div>
              {item.location && <p className="mt-1 text-sm text-[var(--ed-faint)]">{item.location}</p>}
              {item.experiences?.length > 0 && (
                <ul className="mt-3 flex max-w-2xl flex-col gap-2">
                  {item.experiences.map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed text-[var(--ed-muted)]">
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
