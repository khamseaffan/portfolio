import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-10 h-10 flex items-center justify-center rounded-xl
                 bg-gray-100 dark:bg-slate-800/50
                 border-2 border-gray-200 dark:border-slate-600/30
                 shadow-md hover:shadow-lg
                 transition-all duration-300 hover:scale-110 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <HiSun className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-180" />
      ) : (
        <HiMoon className="w-5 h-5 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
