'use client';

export default function Experience({ items = [] }) {
  return (
    <section id="experience" className="relative bg-[var(--cm-bg)] text-[var(--cm-text)]">
      {items.map((item, i) => (
        <ExperienceEntry key={item.organization} item={item} index={i} total={items.length} />
      ))}
    </section>
  );
}

function ExperienceEntry({ item, index, total }) {
  const num = String(index + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');
  const Diagram = item.diagram === 'centh' ? CenthDiagram : item.diagram === 'novum' ? NovumDiagram : null;
  const highlights = item.highlights?.length
    ? item.highlights
    : item.experiences.slice(0, 4).map((e) => ({ title: null, detail: e }));

  return (
    <div
      className="border-t px-6 py-16 sm:px-10 lg:px-24 lg:py-24"
      style={{ borderColor: 'var(--cm-border)' }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-5">
          <div
            className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: 'var(--cm-accent)' }}
          >
            <span className="inline-block h-px w-5" style={{ background: 'var(--cm-accent)' }} />
            Experience — {num} / {totalStr}
          </div>
          <h3 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {item.role}
          </h3>
          <div className="font-mono text-sm" style={{ color: 'var(--cm-text-muted)' }}>
            {item.organization} · {item.startDate} – {item.endDate}
          </div>
          {item.tagline && (
            <p className="text-[15.5px] leading-relaxed" style={{ color: 'var(--cm-text-muted)' }}>
              {item.tagline}
            </p>
          )}

          <div className="mt-1 flex flex-col gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-5 flex-shrink-0 font-mono text-sm font-semibold"
                  style={{ color: 'var(--cm-accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  {h.title && <div className="text-[14.5px] font-semibold">{h.title}</div>}
                  <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--cm-text-muted)' }}>
                    {h.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {item.companyNote && (
            <div
              className="mt-2 border-l-2 py-1 pl-4 text-[13.5px] italic leading-relaxed"
              style={{ borderColor: 'var(--cm-accent)', color: 'var(--cm-text-muted)' }}
            >
              {item.companyNote}
            </div>
          )}

          {item.techStack?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
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
        </div>

        <div
          className="relative rounded-2xl border p-7 sm:p-9"
          style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
        >
          <CornerBrackets />
          {item.stat && <StatBlock stat={item.stat} />}
          {Diagram && (
            <>
              <div className="my-6 h-px" style={{ background: 'var(--cm-border)' }} />
              <Diagram />
            </>
          )}
          {!Diagram && !item.stat && (
            <div className="font-mono text-sm" style={{ color: 'var(--cm-text-faint)' }}>
              {item.impact}
            </div>
          )}
        </div>
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
        <div className="relative h-[70px] min-w-[130px] flex-shrink-0 sm:min-w-[150px]">
          <div
            className="animate-cm-num-a absolute left-0 top-0 font-mono text-4xl font-semibold sm:text-5xl"
            style={{ color: 'var(--cm-text)' }}
          >
            {stat.before}
          </div>
          <div
            className="animate-cm-num-b absolute left-0 top-0 font-mono text-4xl font-semibold sm:text-5xl"
            style={{ color: 'var(--cm-accent)' }}
          >
            {stat.after}
          </div>
        </div>
        <div
          className="animate-cm-badge rounded-full border px-2.5 py-1 font-mono text-xs font-semibold"
          style={{ color: 'var(--cm-verify)', background: 'var(--cm-verify-soft)', borderColor: 'var(--cm-verify)' }}
        >
          {stat.badge}
        </div>
      </div>
      {stat.docGrid ? (
        <div className="mt-3.5 flex max-w-[152px] flex-wrap gap-[5px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="animate-cm-doc-mark h-3.5 w-3.5 rounded"
              style={{
                border: '1px solid var(--cm-border-strong)',
                animationDelay: `${(i * 0.09).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-3.5 h-1 overflow-hidden rounded-full" style={{ background: 'var(--cm-bg-elev-2)' }}>
          <div className="animate-cm-bar h-full rounded-full" style={{ background: 'var(--cm-accent)' }} />
        </div>
      )}
    </div>
  );
}

function NovumDiagram() {
  const s = 'var(--cm-border-strong)';
  const accent = 'var(--cm-accent)';
  const verify = 'var(--cm-verify)';
  const elev2 = 'var(--cm-bg-elev-2)';
  const text = 'var(--cm-text)';
  return (
    <div>
      <svg viewBox="0 0 780 230" className="h-auto w-full overflow-visible">
        <path pathLength="100" d="M100,110 C165,110 165,30 230,30" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />
        <path pathLength="100" d="M100,110 L230,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />
        <path pathLength="100" d="M100,110 C165,110 165,190 230,190" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />

        <path pathLength="100" d="M340,30 C400,30 400,110 460,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />
        <path pathLength="100" d="M340,110 L460,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />
        <path pathLength="100" d="M340,190 C400,190 400,110 460,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />

        <path pathLength="100" d="M590,110 L650,110" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-final" />

        <rect x="10" y="90" width="90" height="40" rx="8" fill={elev2} stroke={s} />
        <text x="55" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Query</text>

        <rect x="230" y="10" width="110" height="40" rx="8" fill={elev2} stroke={s} />
        <text x="285" y="34" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Retrieve A</text>
        <rect x="230" y="90" width="110" height="40" rx="8" fill={elev2} stroke={s} />
        <text x="285" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Retrieve B</text>
        <rect x="230" y="170" width="110" height="40" rx="8" fill={elev2} stroke={s} />
        <text x="285" y="194" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Retrieve C</text>

        <rect className="animate-cm-node-a" x="460" y="90" width="130" height="40" rx="8" fill={elev2} stroke={accent} />
        <text className="animate-cm-node-a" x="525" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>Rerank + Compress</text>

        <rect className="animate-cm-node-b" x="650" y="90" width="100" height="40" rx="8" fill={elev2} stroke={verify} />
        <text className="animate-cm-node-b" x="700" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Response</text>

        <g className="animate-cm-check">
          <circle cx="760" cy="90" r="11" fill="var(--cm-verify-soft)" stroke={verify} />
          <path d="M755,90 L759,94 L766,86" fill="none" stroke={verify} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--cm-text-faint)' }}>
        Retrieval pipeline — parallelized
      </div>
    </div>
  );
}

function CenthDiagram() {
  const s = 'var(--cm-border-strong)';
  const accent = 'var(--cm-accent)';
  const verify = 'var(--cm-verify)';
  const elev2 = 'var(--cm-bg-elev-2)';
  const text = 'var(--cm-text)';
  const faint = 'var(--cm-text-faint)';
  return (
    <div>
      <svg viewBox="0 0 830 230" className="h-auto w-full overflow-visible">
        <path pathLength="100" d="M110,110 C185,110 185,50 250,50" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />
        <path pathLength="100" d="M110,110 C185,110 185,170 250,170" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />

        <path pathLength="100" d="M420,50 C460,50 460,110 500,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />
        <path pathLength="100" d="M420,170 C460,170 460,110 500,110" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />

        <path pathLength="100" d="M660,110 L690,110" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-final" />

        <rect x="10" y="90" width="100" height="40" rx="8" fill={elev2} stroke={s} />
        <text x="60" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={text}>Doc Queue</text>

        <rect x="250" y="28" width="170" height="44" rx="8" fill={elev2} stroke={s} />
        <text x="335" y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill={text}>Claude Haiku</text>
        <text x="335" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill={faint}>LLM Check</text>

        <rect x="250" y="148" width="170" height="44" rx="8" fill={elev2} stroke={s} />
        <text x="335" y="166" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill={text}>Mistral</text>
        <text x="335" y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill={faint}>OCR</text>

        <rect className="animate-cm-node-a" x="500" y="90" width="160" height="40" rx="8" fill={elev2} stroke={accent} />
        <text className="animate-cm-node-a" x="580" y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>Merge + Decision</text>

        <rect className="animate-cm-node-b" x="690" y="90" width="110" height="40" rx="8" fill={elev2} stroke={verify} />
        <text className="animate-cm-node-b" x="745" y="106" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill={text}>Recruiter</text>
        <text className="animate-cm-node-b" x="745" y="120" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill={text}>Handoff</text>

        <g className="animate-cm-check">
          <circle cx="810" cy="90" r="11" fill="var(--cm-verify-soft)" stroke={verify} />
          <path d="M805,90 L809,94 L816,86" fill="none" stroke={verify} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: 'var(--cm-text-faint)' }}>
        Verification pipeline — Haiku + Mistral, parallel
      </div>
    </div>
  );
}
