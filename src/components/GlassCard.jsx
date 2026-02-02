import { forwardRef } from 'react';

/**
 * GlassCard - Reusable glassmorphism card container
 * @param {string} className - Additional classes to merge
 * @param {boolean} hover - Enable hover effects (default: true)
 * @param {boolean} active - Active state styling
 * @param {string} height - Fixed height (e.g., 'h-[600px]') or 'auto'
 * @param {string} padding - Padding size (default: 'p-6')
 * @param {boolean} hasGradientOverlay - Show gradient overlay (default: true)
 * @param {React.ReactNode} children
 */
const GlassCard = forwardRef(function GlassCard(
  {
    children,
    className = '',
    hover = true,
    active = false,
    height = 'auto',
    padding = 'p-6',
    hasGradientOverlay = true,
    flexCol = false,
    onClick,
    ...props
  },
  ref
) {
  const baseClasses = `
    relative rounded-3xl backdrop-blur-2xl
    border-2 transition-all duration-500 overflow-hidden
    ${height !== 'auto' ? height : ''}
    ${padding}
  `;

  const stateClasses = active
    ? 'bg-white/40 dark:bg-slate-800/50 border-white/60 dark:border-slate-500/50 shadow-lg scale-105'
    : `
      bg-white/30 dark:bg-slate-800/40
      border-white/50 dark:border-slate-600/40
      shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      ${hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-white/60 dark:hover:border-slate-500/50' : ''}
    `;

  const cursorClass = onClick ? 'cursor-pointer' : '';
  const innerClasses = `relative z-10 h-full ${flexCol ? 'flex flex-col' : ''}`;

  return (
    <div
      ref={ref}
      className={`group ${baseClasses} ${stateClasses} ${cursorClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Gradient overlay for glass depth */}
      {hasGradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
      )}

      {/* Content */}
      <div className={innerClasses}>{children}</div>
    </div>
  );
});

export default GlassCard;

/**
 * GlassCardNavigator - Specialized card for sidebar navigator items
 */
export function GlassCardNavigator({
  children,
  active = false,
  color = 'from-blue-500 to-cyan-400',
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden
        ${active ? 'scale-105' : 'hover:-translate-y-0.5'}
        ${className}
      `}
    >
      {/* Background */}
      {active ? (
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-800/50 backdrop-blur-2xl border-2 border-white/60 dark:border-slate-500/50 shadow-lg rounded-2xl" />
      ) : (
        <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/40 dark:border-slate-600/40 shadow-md group-hover:bg-white/35 dark:group-hover:bg-slate-800/50 group-hover:border-white/50 dark:group-hover:border-slate-500/50 group-hover:shadow-xl transition-all duration-500 rounded-2xl" />
      )}

      {/* Hover gradient overlay */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      )}

      {/* Active indicator bar */}
      {active && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${color} rounded-full`} />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
