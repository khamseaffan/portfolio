'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-9 h-9 flex items-center justify-center rounded-md border
                 transition-colors duration-200 hover:opacity-80
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cm-accent)] focus-visible:ring-offset-2 ${className}`}
      style={{ borderColor: 'var(--cm-border)', color: 'var(--cm-text-muted)' }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <HiSun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
      ) : (
        <HiMoon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
