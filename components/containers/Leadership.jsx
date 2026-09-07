'use client';

export default function Leadership({ items = [] }) {
  return (
    <section
      id="leadership"
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
            Leadership
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Invested in other people.
          </h2>
          <p className="max-w-xl text-[15.5px] leading-relaxed" style={{ color: 'var(--cm-text-muted)' }}>
            Teaching, building, and organizing outside the day job.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <LeadershipCard key={item.organization} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({ item }) {
  return (
    <div
      className="relative flex flex-col gap-5 rounded-2xl border p-7 sm:p-8"
      style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
    >
      <div
        className="absolute left-3.5 top-3.5 h-3 w-3 border-l-[1.5px] border-t-[1.5px] opacity-60"
        style={{ borderColor: 'var(--cm-accent)' }}
      />

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl font-bold leading-tight">{item.role}</h3>
        <div className="font-mono text-xs" style={{ color: 'var(--cm-text-faint)' }}>
          {item.organization} · {item.location} · {item.startDate} – {item.endDate}
        </div>
      </div>

      {item.experiences?.length > 0 && (
        <div className="flex flex-col gap-3">
          {item.experiences.map((exp, i) => (
            <div key={i} className="flex gap-3.5">
              <div
                className="w-4 flex-shrink-0 font-mono text-xs font-semibold"
                style={{ color: 'var(--cm-accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--cm-text-muted)' }}>
                {exp}
              </div>
            </div>
          ))}
        </div>
      )}

      {item.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.techStack.map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 font-mono text-[11px]"
              style={{ borderColor: 'var(--cm-border)', color: 'var(--cm-text-faint)' }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {item.stat && (
        <>
          <div className="h-px" style={{ background: 'var(--cm-border)' }} />
          <StatBlock stat={item.stat} />
        </>
      )}
    </div>
  );
}

function StatBlock({ stat }) {
  return (
    <div>
      <div
        className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.08em]"
        style={{ color: 'var(--cm-text-faint)' }}
      >
        {stat.label}
      </div>
      <div className="flex h-[70px] items-center gap-4">
        <div className="relative h-[70px] min-w-[110px] flex-shrink-0">
          <div
            className="animate-cm-num-a absolute left-0 top-0 font-mono text-4xl font-semibold sm:text-[42px]"
            style={{ color: 'var(--cm-text)' }}
          >
            {stat.before}
          </div>
          <div
            className="animate-cm-num-b absolute left-0 top-0 font-mono text-4xl font-semibold sm:text-[42px]"
            style={{ color: 'var(--cm-accent)' }}
          >
            {stat.after}
          </div>
        </div>
        {stat.badge && (
          <div
            className="animate-cm-badge rounded-full border px-2.5 py-1 font-mono text-xs font-semibold"
            style={{ color: 'var(--cm-verify)', background: 'var(--cm-verify-soft)', borderColor: 'var(--cm-verify)' }}
          >
            {stat.badge}
          </div>
        )}
      </div>
      <div className="mt-3.5 h-1 overflow-hidden rounded-full" style={{ background: 'var(--cm-bg-elev-2)' }}>
        <div className="animate-cm-bar h-full rounded-full" style={{ background: 'var(--cm-accent)' }} />
      </div>
    </div>
  );
}
