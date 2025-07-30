import { useState, useEffect } from 'react'
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
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
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
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuOpen && !e.target.closest('nav')) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('click', onClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', onClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      const navbarHeight = 80
      const pos = element.offsetTop - navbarHeight
      window.scrollTo({ top: pos, behavior: 'smooth' })
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
      Icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/affan-khamse/',
      label: 'LinkedIn',
      hoverColor: 'hover:bg-blue-600',
      iconColor: 'text-blue-600',
      hoverIconColor: 'group-hover:text-white'
    },
    {
      Icon: FaGithub, 
      url: 'https://github.com/khamseaffan',
      label: 'GitHub',
      hoverColor: 'hover:bg-gray-800',
      iconColor: 'text-gray-800',
      hoverIconColor: 'group-hover:text-white'
    }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/95 shadow-xl border-b border-gray-300' 
          : 'backdrop-blur-xl bg-white/90 shadow-lg border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3">
        
        {/* Logo */}
        <a
          href="#summary"
          onClick={(e) => handleLinkClick(e, 'summary')}
          className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
        >
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              AK
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform scale-150 blur-lg"></div>
          </div>
          <div className="hidden xs:block sm:block">
            <h1 className="text-lg sm:text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              Affan Khamse
            </h1>
            <p className="text-xs text-gray-600 font-medium group-hover:text-blue-600 transition-colors duration-300">
              Software Engineer
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`relative px-3 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg whitespace-nowrap ${
                    activeSection === id
                      ? 'text-white bg-blue-600 font-semibold shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ Icon, url, label, hoverColor, iconColor, hoverIconColor }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 border-2 border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-lg ${hoverColor} hover:border-transparent`}
              >
                <Icon className={`w-5 h-5 ${iconColor} transition-all duration-300 ${hoverIconColor}`} />
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
          >
            <HiDownload className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Tablet Menu */}
        <div className="hidden lg:flex xl:hidden items-center gap-4">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(({ id, shortLabel }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`relative px-2 py-2 text-xs font-medium transition-all duration-300 rounded-lg ${
                    activeSection === id
                      ? 'text-white bg-blue-600 font-semibold shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
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
            className="px-3 py-2 bg-blue-600 text-white rounded-xl font-semibold text-xs transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition-all duration-300 active:scale-95"
        >
          {menuOpen ? (
            <HiX className="w-6 h-6 text-gray-800 transition-transform duration-300 rotate-180" />
          ) : (
            <HiMenu className="w-6 h-6 text-gray-800 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
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
          <ul className="space-y-1 mb-6">
            {sections.map(({ id, label }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`block px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 active:scale-95 ${
                    activeSection === id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600 active:bg-gray-200'
                  }`}
                  style={{ animationDelay: menuOpen ? `${index * 50}ms` : '0ms' }}
                >
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    {activeSection === id && <HiCheckCircle className="w-5 h-5" />}
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            download
            className="block w-full px-3 py-3 bg-blue-600 text-white text-center rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <HiDownload className="w-5 h-5" />
              Download Resume
            </div>
          </a>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {socialLinks.map(({ Icon, url, label, hoverColor, iconColor }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group flex items-center justify-center gap-2 px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-sm font-medium transition-all duration-300 ${hoverColor} hover:text-white hover:border-transparent hover:shadow-md active:scale-95`}
              >
                <Icon className={`w-5 h-5 ${iconColor} transition-all duration-300 group-hover:text-white`} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}
