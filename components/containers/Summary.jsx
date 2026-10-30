'use client';

import { useState } from 'react';

const defaultStats = [
  { label: 'Primary sources verified', value: '50+' },
  { label: 'Per verification', value: '5 min → 30 s' },
  { label: 'Pilot users on the extension', value: '12' },
  { label: 'Suggestion latency at Novum', value: '3.4s to 1.5s' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/khamseaffan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/affan-khamse/' },
  { label: 'Email', href: 'mailto:khamseaffan@gmail.com' },
];

export default function Summary({ profile }) {
  const name = profile?.name || 'Affan Khamse';
  const role = profile?.roles?.[0] || 'AI Engineer';
  const tagline = profile?.tagline || profile?.bio || '';
  const stats = profile?.stats?.length ? profile.stats : defaultStats;
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  return (
    <section id="summary" aria-label={`${name}, ${role}`} className="scroll-mt-20 px-5 pb-12 pt-8 sm:px-8 lg:px-12 lg:pb-16 lg:pt-10">
      <div className="flex items-start gap-5 sm:gap-8">
        <div className="min-w-0 flex-1">
          <h1 className="font-display tracking-[-0.035em]">
            <span className="block text-[clamp(2.7rem,6.4vw,4.8rem)] leading-[0.9]">{name}</span>
            <span className="mt-2 block text-[clamp(2.7rem,6.4vw,4.8rem)] leading-[0.9]">{role}</span>
          </h1>

          {tagline && (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ed-muted)] sm:text-base">{tagline}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline"
              >
                {link.label}
              </a>
            ))}
            <a href={resumeUrl} download className="text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
              Resume
            </a>
            <a href="#projects" className="text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
              Projects
            </a>
          </div>
        </div>

        <Portrait src={profile?.imageSrc} name={name} />
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--ed-line)] pt-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs text-[var(--ed-faint)]">{stat.label}</dt>
            <dd className="mt-1 font-display text-2xl tracking-tight sm:text-[1.7rem]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Portrait({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--ed-photo)] sm:h-56 sm:w-40 lg:h-[300px] lg:w-[210px]">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover object-top grayscale"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center font-display text-3xl text-[var(--ed-faint)]">{initials}</div>
      )}
    </div>
  );
}
