import { forwardRef } from 'react';

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
      {hasGradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
      )}
      <div className={innerClasses}>{children}</div>
    </div>
  );
});

export default GlassCard;

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
      {active ? (
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-800/50 backdrop-blur-2xl border-2 border-white/60 dark:border-slate-500/50 shadow-lg rounded-2xl" />
      ) : (
        <div className="absolute inset-0 bg-white/30 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/40 dark:border-slate-600/40 shadow-md group-hover:bg-white/35 dark:group-hover:bg-slate-800/50 group-hover:border-white/50 dark:group-hover:border-slate-500/50 group-hover:shadow-xl transition-all duration-500 rounded-2xl" />
      )}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      )}
      {active && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${color} rounded-full`} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
