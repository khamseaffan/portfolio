'use client';

const STATUS_COLOR = {
  'In Progress': 'var(--cm-accent)',
  Live: 'var(--cm-verify)',
};

function splitTitle(title = '') {
  const match = title.match(/^(.*?)\s+[-–]\s+(.*)$/);
  if (match) return { name: match[1], subtitle: match[2] };
  return { name: title, subtitle: null };
}

export default function Projects({ items = [] }) {
  const flagship = items.filter((p) => p.featured);
  const rest = items.filter((p) => !p.featured);

  return (
    <section
      id="projects"
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
            Personal Projects
          </div>

          <h2 className="mt-3.5 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[46px]">
            What I build on my own clock.
          </h2>

          <p
            className="mt-3.5 max-w-2xl text-[15.5px] leading-relaxed sm:text-base"
            style={{ color: 'var(--cm-text-muted)' }}
          >
            Independent systems built end to end — from an AI-native commerce platform to the
            infrastructure fixes most tutorials skip.
          </p>

          {flagship.length > 0 && (
            <div className="mt-11 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-7">
              {flagship.map((project) => (
                <FlagshipCard key={project.title} project={project} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-14">
              <div
                className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]"
                style={{ color: 'var(--cm-text-faint)' }}
              >
                <span className="inline-block h-px w-4" style={{ background: 'var(--cm-text-faint)' }} />
                Also Shipped
              </div>
              <div
                className="grid grid-cols-1 gap-x-8 gap-y-8 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4"
                style={{ borderColor: 'var(--cm-border)' }}
              >
                {rest.map((project) => (
                  <QuietProject key={project.title} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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

function FlagshipCard({ project }) {
  const { name, subtitle } = splitTitle(project.title);
  const statusColor = STATUS_COLOR[project.status] || 'var(--cm-text-faint)';
  const isPulsing = Boolean(STATUS_COLOR[project.status]);

  return (
    <div
      className="relative flex flex-col gap-5 rounded-2xl border p-6 sm:p-8"
      style={{ background: 'var(--cm-bg-elev)', borderColor: 'var(--cm-border)' }}
    >
      <CornerBrackets />

      <div className="flex items-center gap-2">
        <span
          className={`inline-block h-[7px] w-[7px] rounded-full ${isPulsing ? 'animate-cm-trace' : ''}`}
          style={{ background: statusColor }}
        />
        <span
          className="font-mono text-[10.5px] uppercase tracking-[0.1em]"
          style={{ color: statusColor }}
        >
          {project.status}
        </span>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold sm:text-2xl">{name}</h3>
        {subtitle && (
          <div className="mt-1 font-mono text-[11.5px]" style={{ color: 'var(--cm-text-faint)' }}>
            {subtitle}
          </div>
        )}
      </div>

      <p className="text-[13.5px] leading-relaxed sm:text-sm" style={{ color: 'var(--cm-text-muted)' }}>
        {project.description}
      </p>

      {project.metric && (
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono text-3xl font-semibold sm:text-[32px]"
            style={{ color: 'var(--cm-accent)' }}
          >
            {project.metric.value}
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.06em]"
            style={{ color: 'var(--cm-text-faint)' }}
          >
            {project.metric.label}
          </span>
        </div>
      )}

      {project.stat && <StatBlock stat={project.stat} />}

      {project.diagram === 'stoca' && (
        <>
          <div className="h-px" style={{ background: 'var(--cm-border)' }} />
          <StocaDiagram />
        </>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {project.skills?.map((skill) => (
          <span
            key={skill}
            className="rounded-full border px-3 py-1 font-mono text-[10.5px]"
            style={{ borderColor: 'var(--cm-border-strong)', color: 'var(--cm-text-muted)' }}
          >
            {skill}
          </span>
        ))}
      </div>

      {(project.demo || project.source) && (
        <div className="flex items-center gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--cm-accent)' }}
            >
              Live Demo ↗
            </a>
          )}
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--cm-text-muted)' }}
            >
              Source ↗
            </a>
          )}
        </div>
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
      <div className="mt-3.5 h-1 overflow-hidden rounded-full" style={{ background: 'var(--cm-bg-elev-2)' }}>
        <div className="animate-cm-bar h-full rounded-full" style={{ background: 'var(--cm-accent)' }} />
      </div>
    </div>
  );
}

function StocaDiagram() {
  const border = 'var(--cm-border-strong)';
  const accent = 'var(--cm-accent)';
  const verify = 'var(--cm-verify)';
  const elev2 = 'var(--cm-bg-elev-2)';
  const text = 'var(--cm-text)';

  return (
    <div>
      <div
        className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.08em]"
        style={{ color: 'var(--cm-text-faint)' }}
      >
        Shelf-photo enrichment pipeline
      </div>
      <svg viewBox="0 0 660 70" className="h-auto w-full overflow-visible">
        <path pathLength="100" d="M100,35 L150,35" fill="none" stroke={border} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-branch" />
        <path pathLength="100" d="M270,35 L320,35" fill="none" stroke={border} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-converge" />
        <path pathLength="100" d="M450,35 L500,35" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="100" className="animate-cm-final" />

        <rect x="0" y="14" width="100" height="42" rx="8" fill={elev2} stroke={border} />
        <text x="50" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>Shelf Photo</text>

        <rect className="animate-cm-node-a" x="150" y="14" width="120" height="42" rx="8" fill={elev2} stroke={accent} />
        <text className="animate-cm-node-a" x="210" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>Claude Vision</text>

        <rect className="animate-cm-node-b" x="320" y="14" width="130" height="42" rx="8" fill={elev2} stroke={verify} />
        <text className="animate-cm-node-b" x="385" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>pgvector Match</text>

        <rect x="500" y="14" width="115" height="42" rx="8" fill={elev2} stroke={accent} />
        <text x="557" y="39" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={text}>Pexels Enrich</text>

        <g className="animate-cm-check">
          <circle cx="644" cy="35" r="11" fill="var(--cm-verify-soft)" stroke={verify} />
          <path d="M639,35 L643,39 L650,31" fill="none" stroke={verify} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div
        className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.08em]"
        style={{ color: 'var(--cm-text-faint)' }}
      >
        Autonomous enrichment — photo to catalog, no manual entry
      </div>
    </div>
  );
}

function QuietProject({ project }) {
  const { name } = splitTitle(project.title);

  return (
    <div>
      <h4 className="text-[15px] font-semibold">{name}</h4>
      <p
        className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed"
        style={{ color: 'var(--cm-text-muted)' }}
      >
        {project.description}
      </p>
      {project.skills?.length > 0 && (
        <div className="mt-2.5 font-mono text-[10px]" style={{ color: 'var(--cm-text-faint)' }}>
          {project.skills.slice(0, 4).join(' · ')}
        </div>
      )}
      {(project.demo || project.source) && (
        <div className="mt-2.5 flex items-center gap-3 font-mono text-[10.5px]">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cm-accent)' }}>
              Demo ↗
            </a>
          )}
          {project.source && (
            <a href={project.source} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cm-text-faint)' }}>
              Source ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
