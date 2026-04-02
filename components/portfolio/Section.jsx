import { forwardRef } from 'react';
import BackgroundBlobs from './BackgroundBlobs';

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
        overflow-hidden
        ${className}
      `}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      {...props}
    >
      <BackgroundBlobs variant={blobVariant} />
      <div className="relative z-10">{children}</div>
    </section>
  );
});

export default Section;
