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

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
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
  ]

  const socialLinks = [
    {
      Icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/affan-khamse/',
      hoverBg: 'hover:bg-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      Icon: FaGithub,
      url: 'https://github.com/khamseaffan',
      hoverBg: 'hover:bg-gray-800',
      iconColor: 'text-gray-800'
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
          onClick={e => handleLinkClick(e, 'summary')}
          className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
        >
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              AK
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform scale-150 blur-lg" />
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

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={e => handleLinkClick(e, s.id)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition duration-300 whitespace-nowrap ${
                    activeSection === s.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
          <div className="flex items-center gap-3">
            {socialLinks.map(({ Icon, url, hoverBg, iconColor }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 border-2 border-gray-200 transition duration-300 hover:scale-110 hover:shadow-lg ${hoverBg}`}
              >
                <Icon className={`w-5 h-5 ${iconColor} transition duration-300 group-hover:text-white`} />
              </a>
            ))}
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl transition duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <HiDownload className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Tablet */}
        <div className="hidden lg:flex xl:hidden items-center gap-4">
          <ul className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {sections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={e => handleLinkClick(e, s.id)}
                  className={`px-2 py-2 text-xs font-medium rounded-lg transition duration-300 ${
                    activeSection === s.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  title={s.label}
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download
            className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl transition duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            CV
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 border-2 border-gray-200 hover:bg-gray-200 transition duration-300 active:scale-95"
        >
          {menuOpen ? (
            <HiX className="w-6 h-6 text-gray-800 rotate-180 transition-transform duration-300" />
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
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={e => handleLinkClick(e, s.id)}
                  className={`block px-3 py-3 text-sm font-medium rounded-xl transition duration-300 ${
                    activeSection === s.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{s.label}</span>
                    {activeSection === s.id && <HiCheckCircle className="w-5 h-5" />}
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download
            className="block w-full px-3 py-3 text-sm font-semibold text-center bg-blue-600 text-white rounded-xl transition duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2">
              <HiDownload className="w-5 h-5" />
              Download Resume
            </div>
          </a>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {socialLinks.map(({ Icon, url, hoverBg, iconColor }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium bg-gray-100 border-2 border-gray-200 rounded-xl transition duration-300 ${hoverBg}`}
              >
                <Icon className={`w-5 h-5 ${iconColor} transition duration-300`} />
                <span>{url.includes('linkedin') ? 'LinkedIn' : 'GitHub'}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay closes menu */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}
    </nav>
  )
}
