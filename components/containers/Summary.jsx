'use client';

const defaultStats = [
  { label: 'Suggestion Latency', value: '3.4s → 1.5s' },
  { label: 'Docs Verified / Day', value: '800+' },
  { label: 'Emails Automated / Day', value: '500+' },
  { label: 'Prompt Tokens Cut', value: '−60%' },
];

export default function Summary({ profile }) {
  const name = profile?.name || 'Affan Khamse';
  const eyebrow = profile?.eyebrow || 'AI Engineer — New York City';
  const headline =
    profile?.headline || "I turn AI prototypes into systems that hold up in production.";
  const tagline = profile?.tagline || profile?.bio || '';
  const stats = profile?.stats?.length ? profile.stats : defaultStats;
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  return (
    <section
      id="summary"
      aria-label={`${name} — ${eyebrow}`}
      className="relative overflow-hidden bg-[var(--cm-bg)] text-[var(--cm-text)]"
    >
      {/* decorative trace lines — cheap, static except a slow dash flow */}
      <svg
        aria-hidden="true"
        viewBox="0 0 620 1000"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto opacity-70 lg:block"
      >
        <path
          d="M 620 120 L 460 120 L 460 260 L 340 260 L 340 420"
          fill="none"
          stroke="var(--cm-border-strong)"
          strokeWidth="1"
        />
        <path
          d="M 620 360 L 520 360 L 520 540 L 400 540"
          fill="none"
          stroke="var(--cm-border-strong)"
          strokeWidth="1"
        />
        <path
          d="M 620 120 L 460 120 L 460 260 L 340 260 L 340 420"
          fill="none"
          stroke="var(--cm-accent)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          className="animate-cm-flow"
          opacity="0.65"
        />
        <circle cx="460" cy="120" r="3" fill="var(--cm-accent)" className="animate-cm-trace" />
        <circle cx="340" cy="260" r="3" fill="var(--cm-border-strong)" />
        <circle cx="340" cy="420" r="3" fill="var(--cm-border-strong)" />
        <circle cx="400" cy="540" r="3" fill="var(--cm-border-strong)" />
      </svg>

      <div className="relative z-10 flex flex-col gap-8 px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-24 lg:pt-40">
        <div
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]"
          style={{ color: 'var(--cm-accent)' }}
        >
          <span className="inline-block h-px w-6" style={{ background: 'var(--cm-accent)' }} />
          {eyebrow}
        </div>

        <h1
          className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {headline}
        </h1>

        <p
          className="max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--cm-text-muted)' }}
        >
          {tagline}
        </p>

        <div className="mt-2 flex flex-wrap gap-4">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wide transition-transform active:scale-95"
            style={{ background: 'var(--cm-accent)', color: 'var(--cm-on-accent)' }}
          >
            View the work
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wide transition-transform active:scale-95"
            style={{ borderColor: 'var(--cm-border-strong)', color: 'var(--cm-text)' }}
          >
            Résumé ↓
          </a>
        </div>
      </div>

      <div
        className="relative z-10 grid grid-cols-2 border-t lg:grid-cols-4"
        style={{ borderColor: 'var(--cm-border)' }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="px-6 py-6 sm:px-8 lg:px-10"
            style={{
              borderColor: 'var(--cm-border)',
              borderLeftWidth: i % 2 === 0 ? 0 : '1px',
              borderTopWidth: i >= 2 ? '1px' : 0,
            }}
          >
            <div
              className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em]"
              style={{ color: 'var(--cm-text-faint)' }}
            >
              {stat.label}
            </div>
            <div className="font-mono text-lg font-semibold sm:text-xl" style={{ color: i === 0 ? 'var(--cm-accent)' : 'var(--cm-text)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
