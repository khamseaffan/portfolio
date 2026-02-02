import { forwardRef } from 'react';
import BackgroundBlobs from './BackgroundBlobs';

/**
 * Section - Wrapper component for page sections with consistent styling
 * @param {string} id - Section ID for navigation
 * @param {string} className - Additional classes
 * @param {string} blobVariant - BackgroundBlobs variant ('full' | 'minimal' | 'none')
 * @param {React.ReactNode} children
 */
const Section = forwardRef(function Section(
  {
    id,
    children,
    className = '',
    blobVariant = 'full',
    ...props
  },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`
        relative
        bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
        dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900
        py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24
        overflow-hidden transition-colors duration-300
        ${className}
      `}
      {...props}
    >
      <BackgroundBlobs variant={blobVariant} />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </section>
  );
});

export default Section;
