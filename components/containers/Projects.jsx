'use client';

import { useState } from 'react';
import { getImageURL } from '@/lib/utils';

function splitTitle(title = '') {
  const match = title.match(/^(.*?)\s+[-–]\s+(.*)$/);
  if (match) return { name: match[1], subtitle: match[2] };
  return { name: title, subtitle: null };
}

function figureFor(project) {
  if (project.metric) return { value: project.metric.value, label: project.metric.label };
  if (project.stat) return { value: `${project.stat.before} → ${project.stat.after}`, label: project.stat.label };
  return null;
}

export default function Projects({ items = [] }) {
  const initial = Math.max(0, items.findIndex((project) => project.featured));
  const [index, setIndex] = useState(initial);

  if (!items.length) return null;

  const count = items.length;
  const current = items[index] || items[0];
  const prev = items[(index - 1 + count) % count];
  const next = items[(index + 1) % count];
  const hasNeighbors = count > 1;

  const go = (step) => setIndex((value) => (value + step + count) % count);

  return (
    <section id="projects" aria-roledescription="carousel" className="scroll-mt-20 border-t border-[var(--ed-line)] py-12 lg:py-16">
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Projects</h2>
        {hasNeighbors && (
          <div className="flex gap-2">
            <ArrowButton label="Previous project" direction="prev" onClick={() => go(-1)} />
            <ArrowButton label="Next project" direction="next" onClick={() => go(1)} />
          </div>
        )}
      </div>

      <div className={`mt-8 grid items-stretch px-4 sm:px-6 ${hasNeighbors ? 'sm:grid-cols-[1fr_minmax(0,36rem)_1fr] sm:gap-4' : ''}`}>
        {hasNeighbors && (
          <div className="relative hidden overflow-hidden sm:block">
            <button type="button" onClick={() => go(-1)} aria-label={`Show ${prev.title}`} className="absolute inset-y-0 left-0 w-[240%] text-left opacity-80 transition-opacity hover:opacity-100">
              <PeekCard project={prev} align="left" />
            </button>
          </div>
        )}
        <ProjectCard project={current} />
        {hasNeighbors && (
          <div className="relative hidden overflow-hidden sm:block">
            <button type="button" onClick={() => go(1)} aria-label={`Show ${next.title}`} className="absolute inset-y-0 right-0 w-[240%] text-right opacity-80 transition-opacity hover:opacity-100">
              <PeekCard project={next} align="right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function PeekCard({ project, align }) {
  const { name } = splitTitle(project.title);
  const [failed, setFailed] = useState(!project.imageSrc);
  const showImage = Boolean(project.imageSrc) && !failed;
  const end = align === 'right';

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--ed-line)] bg-[var(--ed-photo)]">
      {showImage ? (
        <img
          src={getImageURL(project.imageSrc)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`flex h-full items-end p-5 ${end ? 'justify-end' : ''}`}>
          <span className="font-display text-4xl tracking-tight text-[var(--ed-muted)]">{name}</span>
        </div>
      )}
      {showImage && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="font-display text-lg tracking-tight text-white">{name}</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const { name, subtitle } = splitTitle(project.title);
  const figure = figureFor(project);
  const skills = (project.skills || []).slice(0, 5).join(' / ');

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--ed-line)] bg-[var(--ed-raise)] text-left">
      {project.imageSrc ? <ProjectMedia key={project.title} project={project} name={name} /> : null}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {project.status && <p className="text-xs text-[var(--ed-faint)]">{project.status}</p>}
        <div>
          <h3 className="font-display text-xl tracking-tight sm:text-2xl">{name}</h3>
          {subtitle && <p className="mt-1 text-sm text-[var(--ed-faint)]">{subtitle}</p>}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ed-muted)]">{project.description}</p>
        {figure && (
          <p className="font-display text-xl tracking-tight">
            {figure.value}
            {figure.label && <span className="ml-2 font-body text-xs font-normal text-[var(--ed-faint)]">{figure.label}</span>}
          </p>
        )}
        {skills && <p className="text-xs leading-relaxed text-[var(--ed-faint)]">{skills}</p>}
        {(project.demo || project.source) && (
          <div className="mt-auto flex gap-4 pt-1 text-sm">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                Live
              </a>
            )}
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectMedia({ project, name }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] bg-[var(--ed-photo)]">
      {!failed ? (
        <img
          src={getImageURL(project.imageSrc)}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full items-end p-5">
          <span className="font-display text-4xl tracking-tight text-[var(--ed-muted)]">{name}</span>
        </div>
      )}
    </div>
  );
}

function ArrowButton({ label, direction, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ed-line-strong)] text-[var(--ed-text)] transition-opacity hover:opacity-70"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {direction === 'prev' ? (
          <path d="M13 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
