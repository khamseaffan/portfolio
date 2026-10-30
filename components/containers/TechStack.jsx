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
  'Cloud & DevOps': 'Cloud',
  'Database Management': 'Databases',
  'System Design': 'Systems',
  'Testing & Debugging': 'Testing',
  'Tools & Methodologies': 'Tools',
};

const TIER_RANK = { core: 0, used: 1, familiar: 2 };

export default function TechStack({ items = [] }) {
  const groups = CATEGORY_ORDER.map((name) => ({
    name,
    label: CATEGORY_LABELS[name] || name,
    items: items
      .filter((item) => item.category === name)
      .slice()
      .sort((a, b) => (TIER_RANK[a.tier] ?? 3) - (TIER_RANK[b.tier] ?? 3)),
  })).filter((group) => group.items.length > 0);

  if (!groups.length) return null;

  return (
    <section id="tech-stack" aria-label="Tech stack" className="scroll-mt-20 border-t border-[var(--ed-line)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Skills</h2>
      <dl className="mt-8">
        {groups.map((group) => (
          <div key={group.name} className="grid gap-2 border-t border-[var(--ed-line)] py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 last:border-b">
            <dt className="text-sm text-[var(--ed-faint)]">{group.label}</dt>
            <dd className="m-0 text-sm leading-relaxed">
              {group.items.map((item, i) => (
                <span key={item.title}>
                  {i > 0 && <span className="text-[var(--ed-faint)]"> / </span>}
                  <span
                    className={
                      item.tier === 'core'
                        ? 'font-medium text-[var(--ed-text)]'
                        : item.tier === 'used'
                          ? 'text-[var(--ed-muted)]'
                          : 'text-[var(--ed-faint)]'
                    }
                  >
                    {item.title}
                  </span>
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
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
