'use client';

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  HiMenu,
  HiX,
  HiDownload,
  HiCheckCircle,
} from 'react-icons/hi'
import {
  FaLinkedin,
  FaGithub
} from 'react-icons/fa'
import ThemeToggle from '@/components/portfolio/ThemeToggle'

export default function Navbar({ resumeUrl = '/resume.pdf' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('summary')
  const pathname = usePathname()
  const isHome = pathname === '/'

  // track scroll to highlight links
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      const sections = [
        'summary','education','experience',
        'projects','leadership','certification','tech-stack','contact'
      ]
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 120 && r.bottom >= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset'
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen(o => !o)

  const handleLinkClick = (e, section) => {
    e.preventDefault()
    setMenuOpen(false)

    // If section has a dedicated href (like /blog), navigate there
    if (section.href) {
      window.location.href = section.href
      return
    }

    // If not on homepage, navigate to homepage with hash
    if (!isHome) {
      window.location.href = `/#${section.id}`
      return
    }

    // On homepage, smooth scroll to section
    const el = document.getElementById(section.id)
    if (!el) return
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: 'smooth'
    })
  }

  const sections = [
    { id: 'summary',     label: 'About',         short: 'About' },
    { id: 'education',   label: 'Education',     short: 'Edu'   },
    { id: 'experience',  label: 'Experience',    short: 'Exp'   },
    { id: 'projects',    label: 'Projects',      short: 'Work'  },
    { id: 'leadership',  label: 'Leadership',    short: 'Lead'  },
    { id: 'certification', label: 'Certifications', short: 'Certs' },
    { id: 'tech-stack',  label: 'Skills',        short: 'Skills'},
    { id: 'contact',     label: "Let's Talk!",   short: 'Contact' },
    { id: 'blog',        label: 'Blog',          short: 'Blog', href: '/blog' },
  ]

  const socialLinks = [
    { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/affan-khamse/' },
    { Icon: FaGithub, url: 'https://github.com/khamseaffan' },
  ]

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cm-accent)] focus-visible:ring-offset-2'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] border-b font-body transition-colors duration-300"
      style={{
        background: scrolled ? 'var(--cm-bg)' : 'color-mix(in oklab, var(--cm-bg) 92%, transparent)',
        borderColor: 'var(--cm-border)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5">
        {/* Logo */}
        <a
          href="#summary"
          onClick={e => handleLinkClick(e, { id: 'summary' })}
          className={`group flex flex-shrink-0 flex-col items-start justify-center gap-0.5 rounded-md leading-none ${focusRing}`}
          style={{ color: 'var(--cm-text)' }}
        >
          <span
            className="font-mono text-xs uppercase leading-none tracking-[0.14em]"
            style={{ color: 'var(--cm-text)' }}
          >
            Affan Khamse
          </span>
          <span
            className="hidden font-mono text-[9.5px] uppercase leading-none tracking-[0.1em] sm:block"
            style={{ color: 'var(--cm-text-faint)' }}
          >
            AI Engineer
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-1">
            {sections.map(s => {
              const active = activeSection === s.id
              return (
                <li key={s.id}>
                  <a
                    href={s.href || `#${s.id}`}
                    onClick={e => handleLinkClick(e, s)}
                    className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wide rounded-md whitespace-nowrap transition-colors duration-200 ${focusRing}`}
                    style={{
                      color: active ? 'var(--cm-accent)' : 'var(--cm-text-muted)',
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="w-px h-6" style={{ background: 'var(--cm-border)' }} />
          <div className="flex items-center gap-1.5">
            {socialLinks.map(({ Icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors duration-200 hover:opacity-80 ${focusRing}`}
                style={{ borderColor: 'var(--cm-border)', color: 'var(--cm-text-muted)' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <ThemeToggle />
          </div>
          <a
            href={resumeUrl}
            download
            className={`flex items-center gap-1.5 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wide rounded-md transition-opacity duration-200 hover:opacity-90 ${focusRing}`}
            style={{ background: 'var(--cm-accent)', color: 'var(--cm-on-accent)' }}
          >
            <HiDownload className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Tablet */}
        <div className="hidden lg:flex xl:hidden items-center gap-3">
          <ul className="flex items-center gap-0.5">
            {sections.map(s => {
              const active = activeSection === s.id
              return (
                <li key={s.id}>
                  <a
                    href={s.href || `#${s.id}`}
                    onClick={e => handleLinkClick(e, s)}
                    className={`px-2 py-2 font-mono text-[10.5px] uppercase tracking-wide rounded-md transition-colors duration-200 ${focusRing}`}
                    style={{ color: active ? 'var(--cm-accent)' : 'var(--cm-text-muted)' }}
                    title={s.label}
                  >
                    {s.short}
                  </a>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
          <a
            href={resumeUrl}
            download
            className={`px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide rounded-md transition-opacity duration-200 hover:opacity-90 ${focusRing}`}
            style={{ background: 'var(--cm-accent)', color: 'var(--cm-on-accent)' }}
          >
            CV
          </a>
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors duration-200 active:scale-95 ${focusRing}`}
            style={{ borderColor: 'var(--cm-border)', color: 'var(--cm-text)' }}
          >
            {menuOpen ? (
              <HiX className="w-6 h-6 transition-transform duration-300" />
            ) : (
              <HiMenu className="w-6 h-6 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-full left-0 right-0 border-b transition-all duration-300 transform origin-top ${
          menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{
          maxHeight: menuOpen ? 'calc(100vh - 80px)' : '0',
          overflowY: 'auto',
          background: 'var(--cm-bg)',
          borderColor: 'var(--cm-border)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="px-4 sm:px-6 py-6">
          <ul className="space-y-1 mb-6">
            {sections.map((s) => {
              const active = activeSection === s.id
              return (
                <li key={s.id}>
                  <a
                    href={s.href || `#${s.id}`}
                    onClick={e => handleLinkClick(e, s)}
                    className={`block px-3 py-3 font-mono text-sm rounded-md transition-colors duration-200 ${focusRing}`}
                    style={{
                      color: active ? 'var(--cm-accent)' : 'var(--cm-text)',
                      background: active ? 'var(--cm-accent-soft)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s.label}</span>
                      {active && <HiCheckCircle className="w-5 h-5" />}
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href={resumeUrl}
            download
            className={`block w-full px-3 py-3 font-mono text-sm font-semibold text-center rounded-md transition-opacity duration-200 hover:opacity-90 ${focusRing}`}
            style={{ background: 'var(--cm-accent)', color: 'var(--cm-on-accent)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <HiDownload className="w-5 h-5" />
              Download Resume
            </div>
          </a>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {socialLinks.map(({ Icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-3 py-3 font-mono text-sm rounded-md border transition-colors duration-200 ${focusRing}`}
                style={{ borderColor: 'var(--cm-border)', color: 'var(--cm-text)' }}
              >
                <Icon className="w-5 h-5" />
                <span>{url.includes('linkedin') ? 'LinkedIn' : 'GitHub'}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay closes menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[99] transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
          onClick={toggleMenu}
        />
      )}
    </nav>
  )
}
