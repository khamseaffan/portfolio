import { useState, useEffect } from 'react'
import { getImageURL } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('summary')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 80)

      const sections = ['summary', 'education', 'experience', 'projects', 'certification', 'tech-stack', 'contact']
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('nav')) {
        setMenuOpen(false)
      }
    }
    
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    
    const element = document.getElementById(targetId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const sections = [
    { id: 'summary', label: 'About', shortLabel: 'About' },
    { id: 'education', label: 'Education', shortLabel: 'Edu' },
    { id: 'experience', label: 'Experience', shortLabel: 'Exp' },
    { id: 'projects', label: 'Projects', shortLabel: 'Work' },
    { id: 'certification', label: 'Certifications', shortLabel: 'Certs' },
    { id: 'tech-stack', label: 'Skills', shortLabel: 'Skills' },
    { id: 'contact', label: 'Let\'s Talk!', shortLabel: 'Contact' }
  ]

  const socialLinks = [
    {
      icon: 'linkedinIcon.png',
      url: 'https://www.linkedin.com/in/affan-khamse/',
      label: 'LinkedIn',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: 'githubIcon.png', 
      url: 'https://github.com/khamseaffan',
      label: 'GitHub',
      hoverColor: 'hover:bg-gray-800'
    }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/98 shadow-xl border-b border-gray-300' 
          : 'backdrop-blur-xl bg-white/95 shadow-lg border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        
        {/* Logo - Responsive sizing */}
        <a
          href="#summary"
          onClick={(e) => handleLinkClick(e, 'summary')}
          className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
        >
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-primary to-accent border-2 border-gray-400 rounded-xl flex items-center justify-center text-black font-bold text-base sm:text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              AK
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform scale-150 blur-lg"></div>
          </div>
          <div className="hidden xs:block sm:block">
            <h1 className="text-lg sm:text-xl font-header font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
              Affan Khamse
            </h1>
            <p className="text-xs text-gray-600 group-hover:text-primary transition-colors duration-300">
              Software Engineer
            </p>
          </div>
        </a>

        {/* Desktop Menu - Improved responsiveness */}
        <div className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`relative px-3 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap ${
                    activeSection === id
                      ? 'text-gray-800 bg-primary font-bold shadow-lg border-2 border-primary'
                      : 'text-gray-600 hover:text-gray-800 hover:shadow-sm hover:border-2 hover:border-gray-500 border-transparent'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Enhanced Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-800 to-transparent"></div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon, url, label, hoverColor }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-400 border-2 border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg ${hoverColor} hover:border-transparent`}
              >
                <img
                  src={getImageURL(`contact/${icon}`)}
                  alt={label}
                  className="w-5 h-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-xs"
                  style={{ display: 'none' }}
                >
                  {label.charAt(0)}
                </div>
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2.5 bg-primary text-black rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1 hover:scale-105 border border-primary hover:border-accent whitespace-nowrap"
          >
            Resume
          </a>
        </div>

        {/* Tablet Menu - Compact version */}
        <div className="hidden lg:flex xl:hidden items-center gap-4">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(({ id, shortLabel }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`relative px-2 py-2 text-xs font-medium transition-all duration-300 rounded-lg ${
                    activeSection === id
                      ? 'text-gray-800 bg-primary font-bold shadow-lg border-2 border-primary'
                      : 'text-gray-600 hover:text-gray-800 hover:shadow-sm hover:border-2 hover:border-gray-500 border-transparent'
                  }`}
                  title={sections.find(s => s.id === id)?.label}
                >
                  {shortLabel}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            download
            className="px-3 py-2 bg-primary text-black rounded-xl font-semibold text-xs transition-all duration-300 hover:bg-gray-200 hover:shadow-lg border border-primary"
          >
            CV
          </a>
        </div>

        {/* Mobile Menu Button - Enhanced touch target */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition-all duration-300 active:scale-95"
        >
          <FontAwesomeIcon 
            icon={menuOpen ? faTimes : faBars} 
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Mobile Menu - Enhanced for touch */}
      <div
        className={`lg:hidden fixed top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-gray-300 shadow-2xl transition-all duration-300 transform origin-top ${
          menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
        style={{ 
          maxHeight: menuOpen ? 'calc(100vh - 80px)' : '0',
          overflowY: 'auto'
        }}
      >
        <div className="px-4 sm:px-6 py-6">
          
          {/* Mobile Navigation - Enhanced touch targets */}
          <ul className="space-y-2 mb-8">
            {sections.map(({ id, label }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`block px-4 py-4 rounded-xl font-medium text-base transition-all duration-300 active:scale-95 ${
                    activeSection === id
                      ? 'bg-primary text-black shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary active:bg-gray-200'
                  }`}
                  style={{
                    animationDelay: menuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    {activeSection === id && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Actions - Better touch targets */}
          <div className="space-y-4 pt-4 border-t border-gray-300">
            
            {/* Resume Button - Full width on mobile */}
            <a
              href="/resume.pdf"
              download
              className="block w-full px-4 py-4 bg-primary text-black text-center rounded-xl font-semibold text-base transition-all duration-300 hover:bg-gray-200 hover:shadow-lg border border-primary active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </div>
            </a>

            {/* Social Links - Enhanced for mobile */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map(({ icon, url, label, hoverColor }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center justify-center gap-3 px-4 py-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-base font-medium text-gray-700 transition-all duration-300 ${hoverColor} hover:text-white hover:border-transparent hover:shadow-md active:scale-95`}
                >
                  <img
                    src={getImageURL(`contact/${icon}`)}
                    alt={label}
                    className="w-5 h-5 opacity-80 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-xs"
                    style={{ display: 'none' }}
                  >
                    {label.charAt(0)}
                  </div>
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Quick Contact */}
            <a
              href="mailto:khamseaffan@gmail.com"
              className="block w-full px-4 py-4 bg-white border-2 border-gray-300 text-gray-700 text-center rounded-xl font-medium text-base transition-all duration-300 hover:bg-gray-50 hover:border-primary hover:text-primary active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Quick Email
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay - Enhanced */}
      {menuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}