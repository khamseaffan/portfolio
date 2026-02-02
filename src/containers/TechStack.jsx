import { useState, useEffect, useMemo } from 'react';
import { HiPlay, HiPause, HiViewGrid, HiStar } from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  FilterBadge,
  ProgressBar,
} from '../components';
import { getImageURL } from '../utils';
import skills from '../data/skills.json';

const CATEGORY_ICONS = {
  'Programming Languages': '💻',
  'Frontend Development': '🎨',
  'Backend Development': '⚙️',
  'Cloud & DevOps': '☁️',
  'Database Management': '🗄️',
  'Tools & Methodologies': '🛠️',
  'Testing & Debugging': '🔧',
};

const CATEGORY_COLORS = {
  'Programming Languages': 'from-blue-500 to-purple-600',
  'Frontend Development': 'from-pink-500 to-rose-600',
  'Backend Development': 'from-green-500 to-emerald-600',
  'Cloud & DevOps': 'from-cyan-500 to-blue-600',
  'Database Management': 'from-orange-500 to-red-600',
  'Tools & Methodologies': 'from-gray-500 to-slate-600',
  'Testing & Debugging': 'from-yellow-500 to-orange-600',
};

const FEATURED_SKILLS_MAP = {
  'Programming Languages': 'Python',
  'Frontend Development': 'React',
  'Backend Development': 'FastAPI',
  'Cloud & DevOps': 'AWS',
  'Database Management': 'PostgreSQL',
  'Tools & Methodologies': 'Git',
  'Testing & Debugging': 'PyTest',
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [featuredSkill, setFeaturedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mobileView, setMobileView] = useState('grid');
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  // Memoize categorized skills
  const categorized = useMemo(() => {
    return skills.reduce((acc, skill) => {
      (acc[skill.category] ||= []).push(skill);
      return acc;
    }, {});
  }, []);

  const categories = useMemo(() => Object.keys(categorized), [categorized]);
  const currentCategoryName = categories[activeCategory];
  const filteredSkills = useMemo(
    () => categorized[currentCategoryName] || [],
    [activeCategory, categorized, currentCategoryName]
  );

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [categories.length, isAutoPlaying, isVisible]);

  // Featured skills for different categories
  const featuredSkills = useMemo(() => {
    const featuredTitle = FEATURED_SKILLS_MAP[currentCategoryName];
    return skills.find((s) => s.title === featuredTitle) || filteredSkills[0];
  }, [currentCategoryName, filteredSkills]);

  // Update featured skill when category changes
  useEffect(() => {
    if (featuredSkills) {
      setFeaturedSkill(featuredSkills);
    }
  }, [featuredSkills]);

  const getCategoryIcon = (category) => CATEGORY_ICONS[category] || '📋';
  const getCategoryColor = (category) =>
    CATEGORY_COLORS[category] || 'from-gray-400 to-gray-600';

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleSkillClick = (skill) => {
    setFeaturedSkill(skill);
    setMobileView('featured');
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <Section ref={sectionRef} id="tech-stack" className="py-8 sm:py-12">
      <SectionHeader
        title="My Tech Stack"
        subtitle="Technologies and tools I use to build scalable, modern applications"
      />

      {/* Auto-play Controls */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        <GlassCard hover={true} padding="px-4 sm:px-6 py-2.5 sm:py-3" className="inline-block rounded-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                isAutoPlaying
                  ? 'bg-green-400 animate-pulse shadow-lg shadow-green-500/50'
                  : 'bg-gray-400'
              }`}
            />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 drop-shadow-sm whitespace-nowrap">
              {isAutoPlaying ? 'Auto-showcase' : 'Manual mode'}
            </span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-1 rounded-full hover:bg-white/30 dark:hover:bg-slate-700/30 transition-colors duration-300 flex-shrink-0"
              title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            >
              {isAutoPlaying ? (
                <HiPause className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-gray-300 drop-shadow-sm" />
              ) : (
                <HiPlay className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-gray-300 drop-shadow-sm" />
              )}
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Category Progress Bar */}
      <div className="max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate drop-shadow-sm">
            {currentCategoryName}
          </span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 drop-shadow-sm">
            {activeCategory + 1} / {categories.length}
          </span>
        </div>
        <div className="relative w-full h-2 bg-white/20 dark:bg-slate-700/30 backdrop-blur-xl rounded-full overflow-hidden border border-white/30 dark:border-slate-600/30 shadow-lg">
          <div
            className={`h-full bg-gradient-to-r ${getCategoryColor(
              currentCategoryName
            )} transition-all duration-500 rounded-full`}
            style={{
              width: `${((activeCategory + 1) / categories.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 px-2">
        {categories.map((category, index) => (
          <FilterBadge
            key={category}
            active={activeCategory === index}
            onClick={() => handleCategoryClick(index)}
            className={activeCategory === index ? `bg-gradient-to-r ${getCategoryColor(category)}` : ''}
          >
            <span className="flex items-center gap-1">
              <span className="text-xs sm:text-sm">{getCategoryIcon(category)}</span>
              <span className="hidden sm:inline text-xs">{category.split(' ')[0]}</span>
            </span>
          </FilterBadge>
        ))}
      </div>

      {/* Mobile View Toggle */}
      <div className="block lg:hidden mb-6">
        <div className="flex justify-center gap-2">
          <MobileViewButton
            active={mobileView === 'grid'}
            onClick={() => setMobileView('grid')}
            icon={<HiViewGrid className="w-4 h-4" />}
            label="Grid"
          />
          {featuredSkill && (
            <MobileViewButton
              active={mobileView === 'featured'}
              onClick={() => setMobileView('featured')}
              icon={<HiStar className="w-4 h-4" />}
              label="Featured"
            />
          )}
        </div>
      </div>

      {/* Featured Skill Spotlight */}
      {featuredSkill && (
        <div className={`mb-12 sm:mb-16 ${mobileView === 'grid' ? 'hidden lg:block' : ''}`}>
          <FeaturedSkillCard
            skill={featuredSkill}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
          />
        </div>
      )}

      {/* Skills Grid */}
      <div className={`mb-12 sm:mb-16 ${mobileView === 'featured' ? 'hidden lg:block' : ''}`}>
        <div className="text-center mb-6 sm:mb-8">
          <GlassCard
            hover={true}
            padding="p-4"
            className="max-w-xl mx-auto rounded-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-title font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2 sm:gap-3 drop-shadow-sm">
              <span className="text-2xl sm:text-3xl">{getCategoryIcon(currentCategoryName)}</span>
              <span className="truncate">{currentCategoryName}</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base drop-shadow-sm">
              {filteredSkills.length} skills in this category
            </p>
          </GlassCard>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <SkillCard
              key={`${skill.title}-${idx}`}
              skill={skill}
              isActive={featuredSkill?.title === skill.title}
              isHovered={hoveredSkill === skill.title}
              onHover={() => setHoveredSkill(skill.title)}
              onLeave={() => setHoveredSkill(null)}
              onClick={() => handleSkillClick(skill)}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <GlassCard hover={true} padding="px-4 sm:px-6 py-2.5 sm:py-3" className="inline-block rounded-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 drop-shadow-sm whitespace-nowrap">
              {skills.length}+ technologies across {categories.length} categories
            </span>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

/**
 * MobileViewButton - Toggle button for mobile view modes
 */
function MobileViewButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 overflow-hidden ${
        active ? 'scale-105' : 'hover:scale-105'
      }`}
    >
      <div
        className={`absolute inset-0 backdrop-blur-xl border-2 shadow-lg transition-all duration-500 rounded-lg ${
          active
            ? 'bg-orange-500/30 dark:bg-orange-600/30 border-orange-400/50 dark:border-orange-500/40'
            : 'bg-white/20 dark:bg-slate-800/40 border-white/30 dark:border-slate-600/40 group-hover:bg-white/30 dark:group-hover:bg-slate-700/50 group-hover:border-white/50 dark:group-hover:border-slate-500/50'
        }`}
      />
      <span
        className={`relative z-10 flex items-center gap-1 drop-shadow-sm ${
          active
            ? 'text-orange-900 dark:text-orange-100'
            : 'text-gray-800 dark:text-gray-200'
        }`}
      >
        {icon}
        {label}
      </span>
    </button>
  );
}

/**
 * FeaturedSkillCard - Large featured skill display
 */
function FeaturedSkillCard({ skill, getCategoryIcon, getCategoryColor }) {
  return (
    <GlassCard padding="p-4 sm:p-8" className="max-w-4xl sm:max-w-5xl mx-auto rounded-2xl sm:rounded-3xl">
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
        {/* Featured Skill Icon */}
        <div className="relative">
          <div
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getCategoryColor(
              skill.category
            )} p-1.5 sm:p-2 shadow-xl border-2 border-white/40 dark:border-slate-600/40`}
          >
            <div className="w-full h-full bg-white/90 dark:bg-slate-800/90 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <SkillIcon skill={skill} size="large" />
            </div>
          </div>

          {/* Pulsing ring effect */}
          <div
            className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getCategoryColor(
              skill.category
            )} opacity-20 animate-ping`}
          />
        </div>

        {/* Featured Skill Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-2xl sm:text-4xl font-title font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
              {skill.title}
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">{getCategoryIcon(skill.category)}</span>
              <span className="text-base sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                {skill.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl rounded-full border-2 border-white/40 dark:border-slate-600/40 shadow-lg">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 drop-shadow-sm">
                Currently using in projects
              </span>
            </div>

            <div
              className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${getCategoryColor(
                skill.category
              )} backdrop-blur-xl rounded-full shadow-lg border-2 border-white/30`}
            >
              <span className="text-white font-bold text-xs sm:text-sm drop-shadow-sm">
                Expert Level
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/**
 * SkillCard - Individual skill card in the grid
 */
function SkillCard({
  skill,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
}) {
  return (
    <div
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <GlassCard
        hover={true}
        padding="p-3 sm:p-6"
        className={`cursor-pointer ${
          isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105' : ''
        }`}
      >
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          {/* Skill Icon */}
          <div className="relative w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl rounded-lg border-2 border-white/40 dark:border-slate-600/40 shadow-lg group-hover:border-white/60 dark:group-hover:border-slate-500/50 transition-all duration-500" />
            <div className="relative z-10">
              <SkillIcon skill={skill} size="small" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
          </div>

          {/* Skill Name */}
          <h4 className="text-xs sm:text-sm font-bold text-center text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight drop-shadow-sm">
            {skill.title}
          </h4>
        </div>
      </GlassCard>

      {/* Tooltip - Desktop only */}
      {isHovered && (
        <div className="hidden sm:block absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gray-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            <div className="font-semibold">{skill.title}</div>
            <div className="text-gray-300 dark:text-gray-400">Click to feature</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-slate-700" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * SkillIcon - Skill image with fallback
 */
function SkillIcon({ skill, size = 'small' }) {
  const sizeClasses = {
    small: 'w-6 h-6 sm:w-12 sm:h-12',
    large: 'w-12 h-12 sm:w-20 sm:h-20',
  };

  const fallbackSizeClasses = {
    small: 'w-6 h-6 sm:w-12 sm:h-12 text-xs sm:text-sm',
    large: 'w-12 h-12 sm:w-20 sm:h-20 text-lg sm:text-2xl',
  };

  if (skill.imageSrc) {
    return (
      <>
        <img
          src={getImageURL(skill.imageSrc)}
          alt={skill.title}
          className={`${sizeClasses[size]} object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className={`${fallbackSizeClasses[size]} bg-gradient-to-br from-gray-400 to-gray-600 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold`}
          style={{ display: 'none' }}
        >
          {skill.title.charAt(0)}
        </div>
      </>
    );
  }

  return (
    <div
      className={`${fallbackSizeClasses[size]} bg-gradient-to-br from-gray-400 to-gray-600 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold`}
    >
      {skill.title.charAt(0)}
    </div>
  );
}
