import {
  HiAcademicCap,
  HiCalendar,
  HiLocationMarker,
  HiStar,
  HiSparkles
} from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  ImageWithFallback,
  InfoBadge
} from '../components';

import educationData from '../data/education.json';

export default function Education() {
  const { ref: sectionRef } = useIntersectionObserver();

  return (
    <Section ref={sectionRef} id="education" className="py-8 sm:py-16 md:py-20">
      <SectionHeader
        title="Education"
        subtitle="Academic foundation in computer science and engineering"
      />

      <div className="max-w-7xl mx-auto">
        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {educationData.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} />
          ))}
        </div>

        {/* Graduate Badge */}
        <div className="text-center">
          <GlassCard
            hover={true}
            padding="px-6 py-3"
            className="inline-flex items-center gap-3 rounded-full"
          >
            <HiAcademicCap className="w-6 h-6 text-blue-700 dark:text-blue-400 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 drop-shadow-sm">
              Recent NYU Graduate - Class of 2025
            </span>
            <HiSparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse drop-shadow-sm" />
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

/**
 * EducationCard - Individual education entry card
 */
function EducationCard({ edu }) {
  return (
    <GlassCard padding="p-5 sm:p-6 md:p-8" className="h-full">
      <div className="h-full flex flex-col">
        {/* Header with logo and degree */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-5 sm:mb-6">
          {/* Institution Logo */}
          <div className="relative flex-shrink-0">
            <ImageWithFallback
              src={edu.imageSrc}
              alt={`Logo of ${edu.institution}`}
              size="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24"
              rounded="rounded-2xl"
            />

            {/* Graduation cap hover icon */}
            <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 shadow-lg">
              <HiAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>

          {/* Education Details */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h3 className="text-lg sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
              {edu.degree}
            </h3>
            <p className="text-base sm:text-sm md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {edu.fieldOfStudy}
            </p>
            <p className="text-xs sm:text-base md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
              {edu.institution}
            </p>

            {/* Graduation details badges */}
            <div className="flex flex-row items-center justify-center sm:justify-start gap-2">
              <InfoBadge icon={HiCalendar} color="blue">
                {edu.startYear} - {edu.graduationYear}
              </InfoBadge>
              <InfoBadge icon={HiStar} color="green">
                GPA {edu.gpa}
              </InfoBadge>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-auto">
          <InfoBadge icon={HiLocationMarker} color="gray" className="w-full justify-center sm:justify-start">
            {edu.location}
          </InfoBadge>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-200/30 dark:from-blue-600/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-purple-200/30 dark:from-purple-600/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
    </GlassCard>
  );
}
