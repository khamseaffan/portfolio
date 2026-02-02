import { useState, useMemo } from 'react';
import { HiChevronDown, HiMenuAlt2 } from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  GlassCardNavigator,
  TechBadge,
  StatusBadge,
  FilterBadge,
  ProgressBar,
} from '../components';
import { getImageURL } from '../utils';
import projects from '../data/projects.json';

const PROJECT_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-green-500 to-emerald-400',
  'from-orange-500 to-red-400',
  'from-indigo-500 to-purple-400',
  'from-teal-500 to-green-400',
];

const enhanceProjectsData = (rawProjects) =>
  rawProjects.map((project, idx) => ({
    ...project,
    color: PROJECT_COLORS[idx % PROJECT_COLORS.length],
    category: project.category || 'Full Stack',
    impact: project.impact || 'High Impact',
    status: project.status || 'Complete',
  }));

export default function Projects() {
  const enhanced = useMemo(() => enhanceProjectsData(projects), []);
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [filter, setFilter] = useState('all');
  const { ref: sectionRef } = useIntersectionObserver();

  // Build category list
  const categories = useMemo(() => {
    const cats = new Set(
      enhanced.flatMap((p) =>
        Array.isArray(p.category) ? p.category : [p.category]
      )
    );
    return ['all', ...cats];
  }, [enhanced]);

  // Filter projects
  const filtered = useMemo(
    () =>
      filter === 'all'
        ? enhanced
        : enhanced.filter((p) => {
            const cats = Array.isArray(p.category) ? p.category : [p.category];
            return cats.includes(filter);
          }),
    [enhanced, filter]
  );

  const handleFilter = (cat) => {
    setFilter(cat);
    setActive(0);
    setMobileOpen(null);
  };

  const currentProject = filtered[active];

  return (
    <Section ref={sectionRef} id="projects" className="py-8">
      <SectionHeader
        title="Featured Projects"
        subtitle="A showcase of full-stack applications and innovative solutions I've built"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-16 px-2">
        {categories.map((cat) => (
          <FilterBadge
            key={cat}
            active={filter === cat}
            onClick={() => handleFilter(cat)}
          >
            {cat === 'all' ? 'All Projects' : cat}
          </FilterBadge>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile View */}
        <div className="lg:hidden space-y-4 mb-12">
          {filtered.map((proj, i) => (
            <MobileProjectCard
              key={i}
              project={proj}
              isOpen={mobileOpen === i}
              onToggle={() => setMobileOpen((prev) => (prev === i ? null : i))}
            />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Display */}
          <div className="lg:col-span-2">
            <ProjectDisplay project={currentProject} active={active} total={filtered.length} />
          </div>

          {/* Navigator */}
          <div className="space-y-3">
            <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <HiMenuAlt2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Project Portfolio
            </h3>
            {filtered.map((proj, i) => (
              <GlassCardNavigator
                key={i}
                active={active === i}
                onClick={() => setActive(i)}
                color={proj.color}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${proj.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                  >
                    {proj.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {proj.category}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {proj.impact}
                      </span>
                      <StatusIndicator status={proj.status} />
                    </div>
                  </div>
                </div>
              </GlassCardNavigator>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * StatusIndicator - Small colored dot indicating project status
 */
function StatusIndicator({ status }) {
  const statusColors = {
    Live: 'bg-green-400 animate-pulse',
    'In Progress': 'bg-yellow-400 animate-pulse',
    Complete: 'bg-blue-400',
  };

  return (
    <div className={`w-1.5 h-1.5 rounded-full ${statusColors[status] || 'bg-blue-400'}`} />
  );
}

/**
 * ProjectDisplay - Main project detail card for desktop
 */
function ProjectDisplay({ project, active, total }) {
  if (!project) return null;

  return (
    <GlassCard padding="p-0" className="h-[650px] overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          {project.imageSrc && project.imageSrc !== 'projects/project.png' ? (
            <img
              src={getImageURL(project.imageSrc)}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}
            >
              <span className="text-4xl font-bold text-white">{project.title.charAt(0)}</span>
            </div>
          )}

          {/* Status Badge */}
          <StatusBadge color={project.color} className="absolute top-4 left-4">
            {project.status}
          </StatusBadge>

          {/* Impact Badge */}
          <StatusBadge variant="glass" className="absolute top-4 right-4">
            {project.impact}
          </StatusBadge>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          <h3 className="text-2xl font-title font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.skills?.slice(0, 6).map((skill, i) => (
              <TechBadge key={i}>{skill}</TechBadge>
            ))}
            {project.skills?.length > 6 && (
              <span className="px-2 py-1 text-xs font-medium bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl text-gray-800 dark:text-gray-200 rounded-md border border-white/40 dark:border-slate-600/40 drop-shadow-sm">
                +{project.skills.length - 6}
              </span>
            )}
          </div>

          {/* Action Links */}
          <ProjectLinks project={project} />
        </div>

        {/* Progress Bar */}
        <ProgressBar current={active} total={total} color={project.color} />
      </div>
    </GlassCard>
  );
}

/**
 * ProjectLinks - Demo and Source code buttons
 */
function ProjectLinks({ project, size = 'default' }) {
  const sizeClasses = size === 'small' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';

  return (
    <div className="flex items-center gap-3 pt-4">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/btn relative flex items-center gap-2 ${sizeClasses} rounded-lg font-medium transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r ${project.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`}
          />
          <span className="relative z-10 text-white drop-shadow-sm">Live Demo</span>
        </a>
      )}
      {project.source && (
        <a
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/btn relative flex items-center gap-2 ${sizeClasses} rounded-lg font-medium transition-all duration-500 hover:shadow-md hover:-translate-y-1 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl border border-white/40 dark:border-slate-600/40 shadow-lg group-hover/btn:bg-white/40 dark:group-hover/btn:bg-slate-600/50 group-hover/btn:border-white/60 dark:group-hover/btn:border-slate-500/50 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
          <span className="relative z-10 text-gray-800 dark:text-gray-200 drop-shadow-sm">
            {size === 'small' ? 'Source' : 'Source Code'}
          </span>
        </a>
      )}
    </div>
  );
}

/**
 * MobileProjectCard - Expandable project card for mobile view
 */
function MobileProjectCard({ project, isOpen, onToggle }) {
  return (
    <GlassCard padding="p-0" className="overflow-hidden">
      {/* Header */}
      <div
        onClick={onToggle}
        className="p-3 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          {/* Thumbnail */}
          <div
            className={`w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center`}
          >
            {project.imageSrc && project.imageSrc !== 'projects/project.png' ? (
              <img
                src={getImageURL(project.imageSrc)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-xl">{project.title.charAt(0)}</span>
            )}
          </div>

          {/* Title & Snippet */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">
              {project.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {project.description}
            </p>
          </div>

          <HiChevronDown
            className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 pb-3 border-t border-white/30 dark:border-slate-600/30 space-y-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl">
          <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed drop-shadow-sm pt-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div>
            <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 drop-shadow-sm">
              TECH STACK
            </h5>
            <div className="flex flex-wrap gap-1">
              {project.skills?.map((skill, i) => (
                <TechBadge key={i}>{skill}</TechBadge>
              ))}
            </div>
          </div>

          {/* Links */}
          <ProjectLinks project={project} size="small" />
        </div>
      </div>
    </GlassCard>
  );
}
