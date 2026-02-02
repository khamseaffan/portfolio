/**
 * ProgressBar - Timeline progress indicator bar
 * Used at the bottom of main display cards
 */
export default function ProgressBar({
  current,
  total,
  color = 'from-blue-500 to-cyan-400',
  className = '',
}) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0 h-1
        bg-white/20 dark:bg-slate-700/30 backdrop-blur-xl
        ${className}
      `}
    >
      <div
        className={`h-full bg-gradient-to-r ${color} transition-all duration-500 rounded-r-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
