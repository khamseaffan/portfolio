import GlassCard from './GlassCard';

/**
 * SectionHeader - Reusable section title with glass container
 * @param {string} title - Main heading text
 * @param {string} subtitle - Optional subtitle text
 * @param {boolean} centered - Center align content (default: true)
 * @param {boolean} uppercase - Uppercase title (default: false)
 * @param {string} className - Additional container classes
 */
export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  uppercase = false,
  className = '',
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''}`}>
      <GlassCard
        hover={true}
        padding="p-6"
        className={`max-w-2xl ${centered ? 'mx-auto' : ''} ${className}`}
      >
        <div className={centered ? 'text-center' : ''}>
          <h2
            className={`
              text-2xl sm:text-3xl font-header font-semibold
              ${uppercase ? 'uppercase tracking-wide' : ''}
              mb-3 text-primary drop-shadow-sm
            `}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-secondary dark:text-gray-400 text-sm sm:text-base drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
