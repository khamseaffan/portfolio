export default function Experience({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="experience" className="scroll-mt-20 border-t border-[var(--ed-line)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_9rem] lg:items-start lg:gap-10">
        <div className="order-2 lg:order-1">
          {items.map((item) => (
            <ExperienceRow key={`${item.organization}-${item.startDate}`} item={item} />
          ))}
        </div>
        <div className="order-1 mb-8 lg:sticky lg:top-24 lg:order-2 lg:mb-0 lg:self-start lg:text-right">
          <h2 className="font-display text-6xl leading-none tracking-[-0.04em] sm:text-7xl">Work</h2>
          <p className="mt-2 text-sm text-[var(--ed-faint)]">New York</p>
        </div>
      </div>
    </section>
  );
}

function OrgLink({ name, url }) {
  const splitAt = name.indexOf(' (');
  const title = splitAt > 0 ? name.slice(0, splitAt) : name;
  const rest = splitAt > 0 ? name.slice(splitAt) : '';

  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
        {title}
      </a>
      {rest}
    </>
  );
}

function ExperienceRow({ item }) {
  const highlights = item.highlights?.length
    ? item.highlights
    : (item.experiences || []).slice(0, 4).map((detail) => ({ title: null, detail }));
  const stack = item.techStack || [];

  return (
    <article className="border-t border-[var(--ed-line)] py-6 last:border-b">
      <div className="grid gap-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
        <div className="text-sm text-[var(--ed-muted)]">
          <div>{item.startDate}</div>
          <div className="text-[var(--ed-faint)]">{item.endDate}</div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <h3 className="text-[15px] font-medium">
              {item.url ? <OrgLink name={item.organization} url={item.url} /> : item.organization}
            </h3>
            <p className="text-sm text-[var(--ed-muted)] sm:text-right">{item.role}</p>
          </div>
          {item.location && <p className="mt-1 text-sm text-[var(--ed-faint)]">{item.location}</p>}
          {item.tagline && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ed-muted)]">{item.tagline}</p>}
          {highlights.length > 0 && (
            <ul className="mt-3 flex max-w-2xl flex-col gap-2.5">
              {highlights.map((highlight, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  {highlight.title && <span className="block font-medium">{highlight.title}</span>}
                  <span className="text-[var(--ed-muted)]">{highlight.detail}</span>
                </li>
              ))}
            </ul>
          )}
          {stack.length > 0 && (
            <ul className="mt-3 flex max-w-2xl flex-wrap gap-1.5">
              {stack.map((tech) => (
                <li key={tech} className="rounded-full border border-[var(--ed-line)] px-2 py-0.5 text-[11px] text-[var(--ed-faint)]">
                  {tech}
                </li>
              ))}
            </ul>
          )}
          {item.companyNote && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ed-faint)]">{item.companyNote}</p>
          )}
        </div>
      </div>
    </article>
  );
}
