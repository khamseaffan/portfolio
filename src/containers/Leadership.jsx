import { useState, useMemo } from 'react';
import {
  HiCheckCircle,
  HiLocationMarker,
  HiChevronDown,
  HiMenuAlt2,
  HiClock,
} from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  GlassCardNavigator,
  TechBadge,
  StatusBadge,
  InfoBadge,
  ProgressBar,
  LogoIcon,
} from '../components';
import { getImageURL } from '../utils';
import leadership from '../data/leadership.json';

export default function Leadership() {
  const [activeCard, setActiveCard] = useState(0);
  const [mobileExpandedCard, setMobileExpandedCard] = useState(null);
  const { ref: sectionRef } = useIntersectionObserver();

  const currentLeader = leadership[activeCard];

  return (
    <Section ref={sectionRef} id="leadership" className="py-8 sm:py-12">
      <SectionHeader
        title="Leadership & Activities"
        subtitle="Teaching, mentoring, and building technical communities"
      />

      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-3 mb-12">
          {leadership.map((item, idx) => (
            <MobileLeadershipCard
              key={idx}
              item={item}
              isOpen={mobileExpandedCard === idx}
              onToggle={() =>
                setMobileExpandedCard((prev) => (prev === idx ? null : idx))
              }
            />
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Display */}
          <div className="lg:col-span-2">
            <LeadershipDisplay
              item={currentLeader}
              active={activeCard}
              total={leadership.length}
            />
          </div>

          {/* Navigator */}
          <div className="space-y-3">
            <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white drop-shadow-sm">
              <HiMenuAlt2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Leadership Timeline
            </h3>

            {leadership.map((item, idx) => (
              <GlassCardNavigator
                key={idx}
                active={activeCard === idx}
                onClick={() => setActiveCard(idx)}
                color={item.color}
              >
                <div className="flex items-center gap-3">
                  <LogoIcon
                    imageSrc={item.imageSrc}
                    name={item.organization}
                    color={item.color}
                    size="w-10 h-10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
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
 * LeadershipDisplay - Main leadership detail card for desktop
 */
function LeadershipDisplay({ item, active, total }) {
  if (!item) return null;

  return (
    <GlassCard padding="p-0" className="h-[600px] overflow-hidden">
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <LogoIcon
              imageSrc={item.imageSrc}
              name={item.organization}
              color={item.color}
              size="w-16 h-16"
              iconSize="w-10 h-10"
            />

            <div>
              <h3 className="text-xl font-title font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-1">
                {item.role}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {item.organization}
                </p>
                {item.location && (
                  <>
                    <span className="hidden sm:block text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <HiLocationMarker className="w-3 h-3" />
                      <span className="text-xs font-medium">{item.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Impact Badge */}
          <StatusBadge color={item.color}>{item.impact}</StatusBadge>
        </div>

        {/* Date Badge */}
        <div className="mb-4">
          <InfoBadge icon={HiClock} color="blue">
            {item.startDate} - {item.endDate}
          </InfoBadge>
        </div>

        {/* Achievements */}
        <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin">
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2 drop-shadow-sm sticky top-0 bg-transparent">
            <HiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            Key Contributions
          </h4>

          <div className="space-y-3">
            {item.experiences.map((exp, i) => (
              <div
                key={i}
                className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700/30 backdrop-blur-xl transition-all duration-500 border-2 border-white/30 dark:border-slate-600/30 hover:border-white/50 dark:hover:border-slate-500/40 hover:shadow-lg"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}
                >
                  <span className="text-white text-xs font-bold drop-shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300 flex-1 drop-shadow-sm">
                  {exp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-4 pt-4 border-t border-white/30 dark:border-slate-600/30">
          <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 drop-shadow-sm">
            SKILLS
          </h5>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map((tech, i) => (
              <TechBadge key={i}>{tech}</TechBadge>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar current={active} total={total} color={item.color} />
    </GlassCard>
  );
}

/**
 * MobileLeadershipCard - Expandable leadership card for mobile view
 */
function MobileLeadershipCard({ item, isOpen, onToggle }) {
  return (
    <GlassCard padding="p-0" className="overflow-hidden">
      {/* Header */}
      <div
        onClick={onToggle}
        className="p-3 cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <LogoIcon
            imageSrc={item.imageSrc}
            name={item.organization}
            color={item.color}
            size="w-10 h-10"
            iconSize="w-5 h-5"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1 truncate">
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
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 pb-3 border-t border-white/30 dark:border-slate-600/30 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl">
          <div className="pt-3 space-y-3">
            {/* Achievements */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
                <HiCheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                Key Contributions
              </h4>

              <div className="space-y-2">
                {item.experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-700/50"
                  >
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
                SKILLS
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
