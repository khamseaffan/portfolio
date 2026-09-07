'use client';

const CATEGORY_ORDER = [
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Cloud & DevOps',
  'Database Management',
  'System Design',
  'Testing & Debugging',
  'Tools & Methodologies',
];

const CATEGORY_LABELS = {
  'Programming Languages': 'Languages',
  'Frontend Development': 'Frontend',
  'Backend Development': 'Backend',
  'Cloud & DevOps': 'Cloud & DevOps',
  'Database Management': 'Databases',
  'System Design': 'System Design',
  'Testing & Debugging': 'Testing & Monitoring',
  'Tools & Methodologies': 'Tools & Workflow',
};

const TIER_RANK = { core: 0, used: 1, familiar: 2 };

// A short, curated subset for the footer stat — mirrors the "headline" tools
// rather than dumping every core item into one line.
const FEATURED_CORE_TITLES = ['Python', 'FastAPI', 'AWS', 'Next.js', 'Agentic Systems'];

export default function TechStack({ items = [] }) {
  const groups = CATEGORY_ORDER.map((name) => ({
    name,
    label: CATEGORY_LABELS[name] || name,
    items: items
      .filter((item) => item.category === name)
      .slice()
      .sort((a, b) => (TIER_RANK[a.tier] ?? 3) - (TIER_RANK[b.tier] ?? 3)),
  })).filter((group) => group.items.length > 0);

  const featuredCore = FEATURED_CORE_TITLES.filter((title) =>
    items.some((item) => item.title === title && item.tier === 'core')
  );

  return (
    <section
      id="tech-stack"
      aria-label="Tech stack"
      className="relative border-t bg-[var(--cm-bg)] text-[var(--cm-text)]"
      style={{ borderColor: 'var(--cm-border)' }}
    >
      <div className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: 'var(--cm-accent)' }}
          >
            <span className="inline-block h-px w-5" style={{ background: 'var(--cm-accent)' }} />
            Stack
          </div>

          <h2 className="mt-3.5 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            The stack behind the systems.
          </h2>

          <p className="mt-3.5 max-w-xl text-[15.5px] leading-relaxed" style={{ color: 'var(--cm-text-muted)' }}>
            Sized by how load-bearing each tool is in production, not by how many logos fit on a page.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em]">
            <span className="inline-flex items-center gap-2" style={{ color: 'var(--cm-text)' }}>
              <span className="inline-block h-[5px] w-[5px] rounded-full" style={{ background: 'var(--cm-accent)' }} aria-hidden="true" />
              Core to production
            </span>
            <span style={{ color: 'var(--cm-text-muted)' }}>Used in production</span>
            <span style={{ color: 'var(--cm-text-faint)' }}>Familiar</span>
          </div>

          <div
            className="relative mt-8 rounded-2xl border p-6 sm:p-8"
            style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
          >
            <CornerBrackets />
            <dl className="flex flex-col">
              {groups.map((group, i) => (
                <StackRow key={group.name} group={group} index={i} />
              ))}
            </dl>
          </div>

          <div
            className="mt-10 grid grid-cols-1 border-t sm:grid-cols-3"
            style={{ borderColor: 'var(--cm-border)' }}
          >
            <FooterStat label="Domains Covered" value={String(groups.length)} />
            <FooterStat label="Tools Catalogued" value={`${items.length}+`} bordered />
            <FooterStat
              label="Core to Production"
              value={featuredCore.join(' · ')}
              bordered
              accent
              mono
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StackRow({ group, index }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      className="flex flex-col gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-7"
      style={{ borderColor: 'var(--cm-border)' }}
    >
      <dt className="flex items-baseline gap-2.5 sm:w-[180px] sm:flex-shrink-0 lg:w-[200px]">
        <span className="font-mono text-[11px]" style={{ color: 'var(--cm-accent)' }}>
          {num}
        </span>
        <span
          className="font-mono text-[12.5px] uppercase tracking-[0.08em]"
          style={{ color: 'var(--cm-text-muted)' }}
        >
          {group.label}
        </span>
      </dt>
      <dd className="m-0 flex flex-1 flex-wrap items-baseline gap-x-5 gap-y-2">
        {group.items.map((item) => (
          <ToolTag key={item.title} item={item} />
        ))}
      </dd>
    </div>
  );
}

function ToolTag({ item }) {
  const tier = item.tier || 'familiar';

  if (tier === 'core') {
    return (
      <span
        className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-sm font-semibold"
        style={{ color: 'var(--cm-text)' }}
      >
        <span
          className="inline-block h-[5px] w-[5px] rounded-full"
          style={{ background: 'var(--cm-accent)' }}
          aria-hidden="true"
        />
        {item.title}
      </span>
    );
  }

  if (tier === 'used') {
    return (
      <span
        className="whitespace-nowrap font-mono text-[13px] font-medium"
        style={{ color: 'var(--cm-text-muted)' }}
      >
        {item.title}
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap font-mono text-xs" style={{ color: 'var(--cm-text-faint)' }}>
      {item.title}
    </span>
  );
}

function FooterStat({ label, value, bordered, accent, mono }) {
  return (
    <div
      className={`py-6 sm:px-8 first:sm:pl-0 last:sm:pr-0 ${
        bordered ? 'border-t sm:border-l sm:border-t-0' : ''
      }`}
      style={bordered ? { borderColor: 'var(--cm-border)' } : undefined}
    >
      <div
        className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em]"
        style={{ color: 'var(--cm-text-faint)' }}
      >
        {label}
      </div>
      <div
        className={mono ? 'font-mono text-sm font-semibold sm:text-[15px]' : 'font-mono text-xl font-semibold sm:text-2xl'}
        style={{ color: accent ? 'var(--cm-accent)' : 'var(--cm-text)' }}
      >
        {value}
      </div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <div
        className="absolute left-3.5 top-3.5 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] opacity-60"
        style={{ borderColor: 'var(--cm-accent)' }}
      />
      <div
        className="absolute bottom-3.5 right-3.5 h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] opacity-60"
        style={{ borderColor: 'var(--cm-accent)' }}
      />
    </>
  );
}
