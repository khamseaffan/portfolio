/**
 * Badge - Reusable badge/pill component with multiple variants
 */

/**
 * TechBadge - For displaying tech stack items
 */
export function TechBadge({ children, className = '' }) {
  return (
    <span
      className={`
        px-2 py-1 bg-primary/20 backdrop-blur-xl text-primary
        rounded-md text-xs font-medium border border-primary/30
        transition-all duration-500
        group-hover:bg-primary/30 group-hover:border-primary/50
        drop-shadow-sm
        ${className}
      `}
    >
      {children}
    </span>
  );
}

/**
 * StatusBadge - For displaying status (Live, Complete, In Progress)
 */
export function StatusBadge({
  children,
  color = 'from-blue-500 to-cyan-400',
  variant = 'gradient', // 'gradient' | 'glass'
  className = '',
}) {
  if (variant === 'glass') {
    return (
      <span
        className={`
          px-3 py-1 bg-white/40 dark:bg-slate-700/50 backdrop-blur-xl
          rounded-full text-xs font-medium text-primary
          border-2 border-white/50 dark:border-slate-600/40 shadow-lg
          ${className}
        `}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`
        px-3 py-1.5 bg-gradient-to-r ${color} backdrop-blur-xl
        rounded-full text-xs font-bold text-white
        border-2 border-white/30 shadow-md
        ${className}
      `}
    >
      {children}
    </span>
  );
}

/**
 * FilterBadge - For category filter buttons
 */
export function FilterBadge({
  children,
  active = false,
  onClick,
  className = '',
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-500 overflow-hidden
        ${active ? 'scale-105' : 'hover:scale-105'}
        ${className}
      `}
    >
      {/* Background */}
      {active ? (
        <div className="absolute inset-0 bg-blue-500/30 dark:bg-blue-600/30 backdrop-blur-2xl border-2 border-blue-400/50 dark:border-blue-500/40 shadow-lg group-hover:bg-blue-500/40 dark:group-hover:bg-blue-600/40 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 rounded-full" />
      ) : (
        <div className="absolute inset-0 bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border-2 border-white/30 dark:border-slate-600/40 shadow-md group-hover:bg-white/30 dark:group-hover:bg-slate-700/50 group-hover:border-white/50 dark:group-hover:border-slate-500/50 group-hover:shadow-xl transition-all duration-500 rounded-full" />
      )}

      <span
        className={`
          relative z-10 drop-shadow-sm
          ${active ? 'font-bold text-blue-900 dark:text-blue-100' : 'text-gray-800 dark:text-gray-200'}
        `}
      >
        {children}
      </span>
    </button>
  );
}

/**
 * InfoBadge - For displaying info with icon (dates, locations, etc.)
 */
export function InfoBadge({
  children,
  icon: Icon,
  color = 'blue', // 'blue' | 'green' | 'purple' | 'gray'
  className = '',
}) {
  const colorClasses = {
    blue: 'bg-blue-500/30 dark:bg-blue-600/30 border-blue-400/50 dark:border-blue-500/40 text-blue-800 dark:text-blue-100',
    green: 'bg-green-500/30 dark:bg-green-600/30 border-green-400/50 dark:border-green-500/40 text-green-800 dark:text-green-100',
    purple: 'bg-purple-500/30 dark:bg-purple-600/30 border-purple-400/50 dark:border-purple-500/40 text-purple-800 dark:text-purple-100',
    gray: 'bg-white/30 dark:bg-slate-700/40 border-white/40 dark:border-slate-600/40 text-gray-800 dark:text-gray-200',
  };

  const iconColorClasses = {
    blue: 'text-blue-700 dark:text-blue-300',
    green: 'text-green-700 dark:text-green-300',
    purple: 'text-purple-700 dark:text-purple-300',
    gray: 'text-gray-700 dark:text-gray-300',
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5
        backdrop-blur-xl rounded-full border-2 shadow-lg
        group-hover:shadow-xl transition-all duration-500
        ${colorClasses[color]}
        ${className}
      `}
    >
      {Icon && <Icon className={`w-4 h-4 drop-shadow-sm ${iconColorClasses[color]}`} />}
      <span className="text-xs font-semibold drop-shadow-sm">{children}</span>
    </div>
  );
}

/**
 * HighlightBadge - For highlighted badges with hover effects (like skill tags in Summary)
 */
export function HighlightBadge({
  children,
  icon: Icon,
  color = 'blue', // 'blue' | 'purple' | 'green'
  className = '',
}) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/30 dark:bg-blue-600/30',
      bgHover: 'group-hover:bg-blue-500/40 dark:group-hover:bg-blue-600/40',
      border: 'border-blue-400/50 dark:border-blue-500/40',
      borderHover: 'group-hover:border-blue-400/70',
      shadow: 'group-hover:shadow-blue-500/30',
      icon: 'text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200',
      text: 'text-blue-900 dark:text-blue-100',
    },
    purple: {
      bg: 'bg-purple-500/30 dark:bg-purple-600/30',
      bgHover: 'group-hover:bg-purple-500/40 dark:group-hover:bg-purple-600/40',
      border: 'border-purple-400/50 dark:border-purple-500/40',
      borderHover: 'group-hover:border-purple-400/70',
      shadow: 'group-hover:shadow-purple-500/30',
      icon: 'text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200',
      text: 'text-purple-900 dark:text-purple-100',
    },
    green: {
      bg: 'bg-green-500/30 dark:bg-green-600/30',
      bgHover: 'group-hover:bg-green-500/40 dark:group-hover:bg-green-600/40',
      border: 'border-green-400/50 dark:border-green-500/40',
      borderHover: 'group-hover:border-green-400/70',
      shadow: 'group-hover:shadow-green-500/30',
      icon: 'text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200',
      text: 'text-green-900 dark:text-green-100',
    },
  };

  const c = colorClasses[color];

  return (
    <div
      className={`
        group relative flex items-center gap-1.5 px-4 py-2 rounded-full
        transition-all duration-500 hover:scale-110 hover:-translate-y-1
        ${className}
      `}
    >
      <div
        className={`
          absolute inset-0 ${c.bg} backdrop-blur-2xl border-2 ${c.border}
          shadow-lg ${c.bgHover} ${c.borderHover} group-hover:shadow-2xl ${c.shadow}
          transition-all duration-500 rounded-full
        `}
      />
      {Icon && (
        <Icon
          className={`relative z-10 w-4 h-4 transition-colors duration-300 drop-shadow-sm ${c.icon}`}
        />
      )}
      <span className={`relative z-10 text-xs sm:text-sm font-semibold drop-shadow-sm ${c.text}`}>
        {children}
      </span>
    </div>
  );
}
