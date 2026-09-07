'use client';

const links = [
  {
    label: 'Email',
    value: 'khamseaffan@gmail.com',
    href: 'mailto:khamseaffan@gmail.com',
    external: false,
    icon: (
      <>
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.5 5l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/affan-khamse',
    href: 'https://linkedin.com/in/affan-khamse',
    external: true,
    icon: (
      <>
        <rect x="2" y="7" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="7" width="9" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/khamseaffan',
    href: 'https://github.com/khamseaffan',
    external: true,
    icon: (
      <path d="M7 5L2 10l5 5M13 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t bg-[var(--cm-bg)] text-[var(--cm-text)]"
      style={{ borderColor: 'var(--cm-border)' }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 360 360"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-64 w-64 opacity-60 sm:block"
      >
        <path
          d="M 360 260 L 260 260 L 260 160 L 160 160"
          fill="none"
          stroke="var(--cm-border-strong)"
          strokeWidth="1"
        />
        <path
          d="M 360 260 L 260 260 L 260 160 L 160 160"
          fill="none"
          stroke="var(--cm-accent)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          className="animate-cm-flow"
          opacity="0.6"
        />
        <circle cx="260" cy="260" r="3" fill="var(--cm-border-strong)" />
        <circle cx="160" cy="160" r="3" fill="var(--cm-accent)" className="animate-cm-trace" />
      </svg>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-7 px-6 py-20 sm:px-10 sm:py-28 lg:px-24 lg:py-32">
        <div
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]"
          style={{ color: 'var(--cm-accent)' }}
        >
          <span className="inline-block h-px w-6" style={{ background: 'var(--cm-accent)' }} />
          Get In Touch
        </div>

        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          Let&rsquo;s build something that holds up.
        </h2>

        <p className="max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--cm-text-muted)' }}>
          Open to AI engineering roles and collaborations. Reach out anytime.
        </p>

        <div className="flex items-center gap-2.5">
          <span
            className="animate-cm-trace inline-block h-[7px] w-[7px] rounded-full"
            style={{ background: 'var(--cm-verify)' }}
          />
          <span
            className="font-mono text-[11.5px] uppercase tracking-[0.08em]"
            style={{ color: 'var(--cm-verify)' }}
          >
            Open to opportunities · New York City
          </span>
        </div>

        <nav aria-label="Contact links" className="mt-2 flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3.5 rounded-lg border px-5 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: 'var(--cm-border-strong)',
                color: 'var(--cm-text)',
                '--tw-ring-color': 'var(--cm-accent)',
                '--tw-ring-offset-color': 'var(--cm-bg)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0 transition-colors group-hover:opacity-80"
                style={{ color: 'var(--cm-accent)' }}
              >
                {link.icon}
              </svg>
              <span className="flex flex-col gap-0.5">
                <span className="text-[14.5px] font-semibold">{link.label}</span>
                <span className="font-mono text-[11.5px]" style={{ color: 'var(--cm-text-faint)' }}>
                  {link.value}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div
        className="relative z-10 border-t px-6 py-6 sm:px-10 lg:px-24"
        style={{ borderColor: 'var(--cm-border)' }}
      >
        <p className="font-mono text-[11px]" style={{ color: 'var(--cm-text-faint)' }}>
          © {new Date().getFullYear()} Affan Khamse
        </p>
      </div>
    </section>
  );
}
