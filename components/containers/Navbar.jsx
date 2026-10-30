'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from '@/components/portfolio/ThemeToggle';

const sections = [
  { id: 'summary', label: 'About' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech-stack', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'certification', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
  { id: 'blog', label: 'Blog', href: '/blog' },
];

export default function Navbar({ resumeUrl = '/resume.pdf' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const ids = sections.filter((section) => !section.href).map((section) => section.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 96 && rect.bottom >= 96) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = (event, section) => {
    event.preventDefault();
    setMenuOpen(false);

    if (section.href) {
      window.location.href = section.href;
      return;
    }

    if (!isHome) {
      window.location.href = `/#${section.id}`;
      return;
    }

    const el = document.getElementById(section.id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cm-accent)] focus-visible:ring-offset-2'

  return (
    <nav className="sticky top-0 z-40 rounded-t-[28px] border-b border-[var(--ed-line)] bg-[var(--ed-panel)]">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-12">
        <a
          href="#summary"
          onClick={(event) => handleLinkClick(event, { id: 'summary' })}
          className="shrink-0 text-sm font-medium tracking-tight"
        >
          Affan Khamse
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {sections.map((section) => {
            const active = activeSection === section.id;
            return (
              <li key={section.id}>
                <a
                  href={section.href || `#${section.id}`}
                  onClick={(event) => handleLinkClick(event, section)}
                  className="whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] transition-colors"
                  style={{ color: active ? 'var(--ed-text)' : 'var(--ed-faint)' }}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a href={resumeUrl} download className="hidden text-[13px] text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline sm:inline">
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ed-line-strong)] xl:hidden"
          >
            {menuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-b border-[var(--ed-line)] bg-[var(--ed-panel)] px-5 py-4 sm:px-8 xl:hidden">
          <ul className="flex flex-col">
            {sections.map((section) => {
              const active = activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={section.href || `#${section.id}`}
                    onClick={(event) => handleLinkClick(event, section)}
                    className="block py-2.5 text-base"
                    style={{ color: active ? 'var(--ed-text)' : 'var(--ed-muted)' }}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a href={resumeUrl} download className="mt-3 inline-block text-sm text-[var(--ed-text)] underline-offset-4 hover:underline sm:hidden">
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
