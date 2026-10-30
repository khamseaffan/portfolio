'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border
                 transition-opacity duration-200 hover:opacity-70
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ed-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ed-panel)] ${className}`}
      style={{ borderColor: 'var(--ed-line-strong)', color: 'var(--ed-text)' }}
      aria-label="Toggle color theme"
    >
      <HiSun className="hidden h-4 w-4 dark:block" />
      <HiMoon className="h-4 w-4 dark:hidden" />
    </button>
  );
}
