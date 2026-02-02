import { useState, useMemo } from 'react';
import {
  HiCheckCircle,
  HiLocationMarker,
  HiChevronDown,
  HiMenuAlt2,
  HiClock
} from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  GlassCardNavigator,
  LogoIcon,
  TechBadge,
  StatusBadge,
  InfoBadge,
  ProgressBar
} from '../components';

import history from '../data/work_experience.json';

export default function Experience() {
  const enhancedHistory = useMemo(() => history, []);
  const [activeCard, setActiveCard] = useState(0);
  const [mobileExpandedCard, setMobileExpandedCard] = useState(null);
  const { ref: sectionRef } = useIntersectionObserver();

  const handleDesktopCardClick = useMemo(
    () => (idx) => () => setActiveCard(idx),
    []
  );

  const handleMobileCardClick = useMemo(
    () => (idx) => () => setMobileExpandedCard((prev) => (prev === idx ? null : idx)),
    []
  );

  const activeItem = enhancedHistory[activeCard];

  return (
    <Section ref={sectionRef} id="experience">
      <SectionHeader
        title="Professional Experience"
        subtitle="Building scalable solutions and driving innovation across diverse tech stacks"
        uppercase
      />

      <div className="max-w-7xl mx-auto">
        {/* MOBILE LAYOUT */}
        <div className="lg:hidden space-y-3 mb-12">
          {enhancedHistory.map((item, idx) => (
            <MobileExperienceCard
              key={`mobile-${idx}`}
              item={item}
              isExpanded={mobileExpandedCard === idx}
              onClick={handleMobileCardClick(idx)}
            />
          ))}
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Experience Display */}
          <div className="lg:col-span-2">
            <GlassCard height="h-[600px]" padding="p-0" flexCol>
              {/* Header - fixed */}
              <div className="p-6 flex items-start justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <LogoIcon
                    src={activeItem.imageSrc}
                    alt={activeItem.organization}
                    color={activeItem.color}
                    size="w-16 h-16"
                  />

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {activeItem.role}
                      </h3>
                      <InfoBadge icon={HiClock} color="blue">
                        {activeItem.startDate} - {activeItem.endDate}
                      </InfoBadge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-1">
                      <p className="text-base font-semibold text-secondary dark:text-gray-300">
                        {activeItem.organization}
                      </p>
                      {activeItem.location && (
                        <>
                          <span className="hidden sm:block text-gray-500 dark:text-gray-400">•</span>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <HiLocationMarker className="w-3 h-3" />
                            <span className="text-xs font-medium">{activeItem.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <StatusBadge color={activeItem.color}>{activeItem.impact}</StatusBadge>
              </div>

              {/* Middle: scrollable achievements + fixed tech stack at bottom */}
              <div className="flex-1 min-h-0 flex flex-col">
                {/* Key Achievements - scrollable */}
                <div className="flex-1 min-h-0 px-6 overflow-y-auto overflow-x-hidden scrollbar-thin">
                  <h4 className="text-base font-semibold text-secondary dark:text-gray-400 mb-3 flex items-center gap-2 drop-shadow-sm sticky top-0 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl py-2 -mt-px z-10">
                    <HiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                    Key Achievements
                  </h4>
                  <div className="space-y-3 pb-4">
                    {activeItem.experiences.map((exp, i) => (
                      <div
                        key={i}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700/30 backdrop-blur-xl transition-all duration-500 border-2 border-white/30 dark:border-slate-600/30 hover:border-white/50 dark:hover:border-slate-500/40 hover:shadow-lg"
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-r ${activeItem.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}
                        >
                          <span className="text-white text-xs font-bold drop-shadow-sm">{i + 1}</span>
                        </div>
                        <p className="text-sm text-secondary dark:text-gray-300 leading-relaxed group-hover/item:text-primary transition-colors duration-300 flex-1 drop-shadow-sm">
                          {exp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack - fixed at bottom of card, outside scroll */}
                <div className="flex-shrink-0 px-6 pt-4 pb-3 border-t border-white/30 dark:border-slate-600/30">
                  <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 drop-shadow-sm">
                    TECH STACK
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.techStack.map((tech, i) => (
                      <TechBadge key={i}>{tech}</TechBadge>
                    ))}
                  </div>
                </div>
              </div>

              <ProgressBar current={activeCard} total={enhancedHistory.length} color={activeItem.color} />
            </GlassCard>
          </div>

          {/* Experience Navigator */}
          <div className="space-y-3">
            <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary drop-shadow-sm">
              <HiMenuAlt2 className="w-5 h-5 text-accent" />
              Experience Timeline
            </h3>

            {enhancedHistory.map((item, idx) => (
              <GlassCardNavigator
                key={`exp-${idx}`}
                active={activeCard === idx}
                color={item.color}
                onClick={handleDesktopCardClick(idx)}
              >
                <div className="flex items-center gap-3">
                  <LogoIcon src={item.imageSrc} alt={item.organization} color={item.color} />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 truncate text-sm">
                      {item.role}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {item.organization}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.startDate} - {item.endDate}
                      </span>
                      {item.endDate === 'Present' && (
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      )}
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
 * MobileExperienceCard - Expandable card for mobile view
 */
function MobileExperienceCard({ item, isExpanded, onClick }) {
  return (
    <GlassCard padding="p-0" hover={true}>
      {/* Header - clickable */}
      <div onClick={onClick} className="p-3 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <LogoIcon src={item.imageSrc} alt={item.organization} color={item.color} />

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-primary text-sm leading-tight mb-1 truncate">
              {item.role}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate font-medium">
              {item.organization}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <HiClock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {item.startDate} - {item.endDate}
              </span>
              {item.endDate === 'Present' && (
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          </div>

          <HiChevronDown
            className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 pb-3 border-t border-white/30 dark:border-slate-600/30 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl">
          <div className="pt-3 space-y-3">
            {/* Achievements */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <HiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                Key Achievements
              </h4>

              <div className="space-y-2">
                {item.experiences.map((exp, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-2 border-t border-white/30 dark:border-slate-600/30">
              <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 drop-shadow-sm">
                TECH STACK
              </h5>
              <div className="flex flex-wrap gap-1">
                {item.techStack.map((tech, i) => (
                  <TechBadge key={i}>{tech}</TechBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
