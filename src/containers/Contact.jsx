import { useState, useEffect } from 'react';
import { getImageURL } from '../utils';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  GlassCardNavigator,
} from '../components';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [mobileView, setMobileView] = useState('featured');
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  const contactInfo = [
    {
      icon: 'contact/emailIcon.png',
      label: 'Email',
      value: 'khamseaffan@gmail.com',
      href: 'mailto:khamseaffan@gmail.com',
      description: 'Drop me a line anytime',
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600 dark:text-red-400',
      hoverTextColor: 'hover:text-red-700 dark:hover:text-red-300',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      hoverBgColor: 'hover:bg-red-100 dark:hover:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800/50',
      iconBgColor: 'bg-red-500',
      response: 'Usually respond within 24 hours',
      action: 'Send Email',
    },
    {
      icon: 'contact/linkedinIcon.png',
      label: 'LinkedIn',
      value: 'linkedin.com/in/affan-khamse',
      href: 'https://www.linkedin.com/in/affan-khamse/',
      description: "Let's connect professionally",
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-700 dark:text-blue-400',
      hoverTextColor: 'hover:text-blue-800 dark:hover:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      hoverBgColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800/50',
      iconBgColor: 'bg-blue-600',
      response: 'Active daily, quick to connect',
      action: 'View Profile',
    },
    {
      icon: 'contact/githubIcon.png',
      label: 'GitHub',
      value: 'github.com/khamseaffan',
      href: 'https://github.com/khamseaffan',
      description: 'Check out my code',
      color: 'from-gray-800 to-gray-900',
      textColor: 'text-gray-800 dark:text-gray-300',
      hoverTextColor: 'hover:text-gray-900 dark:hover:text-gray-200',
      bgColor: 'bg-gray-100 dark:bg-gray-800/40',
      hoverBgColor: 'hover:bg-gray-200 dark:hover:bg-gray-700/40',
      borderColor: 'border-gray-300 dark:border-gray-600/50',
      iconBgColor: 'bg-gray-800',
      response: 'Latest projects and contributions',
      action: 'Browse Code',
    },
  ];

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % contactInfo.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [contactInfo.length, isVisible]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('khamseaffan@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Copy failed
    }
  };

  const handleContactClick = (index) => {
    setActiveContact(index);
    setMobileView('featured');
  };

  const current = contactInfo[activeContact];

  return (
    <Section ref={sectionRef} id="contact" className="py-8 sm:py-12 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-full border-2 border-white/50 dark:border-slate-600/40 shadow-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 drop-shadow-sm">
              Available for opportunities
            </span>
          </div>
        </div>

        <SectionHeader
          title="Looking for a Problem Solver?"
          subtitle="I'm excited to collaborate on innovative solutions."
        />

        {/* Mobile Tab Navigation */}
        <div className="block lg:hidden mb-6">
          <div className="flex bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl rounded-lg p-1 border-2 border-white/30 dark:border-slate-600/40 shadow-lg">
            <button
              onClick={() => setMobileView('featured')}
              className={`group relative flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-500 overflow-hidden ${
                mobileView === 'featured' ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {mobileView === 'featured' ? (
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-700/50 backdrop-blur-2xl border-2 border-white/50 dark:border-slate-500/50 shadow-lg rounded-md" />
              ) : (
                <div className="absolute inset-0 bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border-2 border-white/30 dark:border-slate-600/40 shadow-md group-hover:bg-white/30 dark:group-hover:bg-slate-700/50 group-hover:border-white/50 rounded-md transition-all duration-500" />
              )}
              <span className={`relative z-10 ${mobileView === 'featured' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'} drop-shadow-sm`}>
                Featured
              </span>
            </button>
            <button
              onClick={() => setMobileView('grid')}
              className={`group relative flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-500 overflow-hidden ${
                mobileView === 'grid' ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {mobileView === 'grid' ? (
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-700/50 backdrop-blur-2xl border-2 border-white/50 dark:border-slate-500/50 shadow-lg rounded-md" />
              ) : (
                <div className="absolute inset-0 bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border-2 border-white/30 dark:border-slate-600/40 shadow-md group-hover:bg-white/30 dark:group-hover:bg-slate-700/50 group-hover:border-white/50 rounded-md transition-all duration-500" />
              )}
              <span className={`relative z-10 ${mobileView === 'grid' ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300'} drop-shadow-sm`}>
                All Methods
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Grid View */}
        <div className={`lg:hidden mb-8 ${mobileView === 'featured' ? 'hidden' : 'block'}`}>
          <div className="space-y-3">
            {contactInfo.map((contact, idx) => (
              <GlassCard key={`mobile-contact-${idx}`} padding="p-4" className="rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${contact.iconBgColor} backdrop-blur-xl flex items-center justify-center shadow-lg border-2 border-white/30`}>
                    {contact.icon ? (
                      <img
                        src={getImageURL(contact.icon)}
                        alt={`${contact.label} icon`}
                        className="w-5 h-5 object-contain filter brightness-0 invert"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-5 h-5 text-white font-bold text-xs flex items-center justify-center" style={{ display: contact.icon ? 'none' : 'flex' }}>
                      {contact.label.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className={`font-semibold ${contact.textColor} text-sm mb-0.5`}>{contact.label}</h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">{contact.description}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                      <span className="text-xs text-green-700 dark:text-green-400 font-medium">{contact.response}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="p-2 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl rounded-lg border-2 border-white/40 dark:border-slate-600/40 shadow-lg">
                    <a
                      href={contact.href}
                      target={contact.label !== 'Email' ? '_blank' : undefined}
                      rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className={`${contact.textColor} ${contact.hoverTextColor} transition-colors duration-300 font-mono text-xs break-all font-medium drop-shadow-sm`}
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={contact.href}
                    target={contact.label !== 'Email' ? '_blank' : undefined}
                    rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="group/btn relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                    <svg className="relative z-10 w-3 h-3 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="relative z-10 text-white drop-shadow-sm">{contact.action}</span>
                  </a>
                  {contact.label === 'Email' && (
                    <button onClick={handleCopyEmail} className="group/btn relative flex items-center justify-center px-3 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl border border-white/40 dark:border-slate-600/40 shadow-lg group-hover/btn:bg-white/40 group-hover/btn:border-white/60 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
                      {copiedEmail ? (
                        <svg className="relative z-10 w-3 h-3 text-green-600 dark:text-green-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="relative z-10 w-3 h-3 text-gray-800 dark:text-gray-200 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Desktop + Mobile Featured: main card + navigator */}
        <div className={`grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16 ${mobileView === 'grid' ? 'hidden lg:grid' : ''}`}>
          <div className="lg:col-span-2">
            <GlassCard height="min-h-[280px] sm:h-[400px]" padding="p-4 sm:p-8" className="rounded-xl sm:rounded-3xl">
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-start gap-4 mb-4 sm:mb-8">
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl ${current.iconBgColor} backdrop-blur-xl flex items-center justify-center shadow-lg border-2 border-white/30`}>
                      {current.icon ? (
                        <img
                          src={getImageURL(current.icon)}
                          alt={`${current.label} icon`}
                          className="w-6 h-6 sm:w-10 sm:h-10 object-contain filter brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-6 h-6 sm:w-10 sm:h-10 text-white font-bold text-sm flex items-center justify-center" style={{ display: current.icon ? 'none' : 'flex' }}>
                        {current.label.charAt(0)}
                      </div>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 ${current.iconBgColor} rounded-full flex items-center justify-center animate-pulse shadow-md`}>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className={`text-lg sm:text-3xl font-bold ${current.textColor} transition-colors duration-300 mb-1 sm:mb-2`}>{current.label}</h3>
                    <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-2 sm:mb-4">{current.description}</p>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 dark:text-green-400 font-medium">{current.response}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 sm:mb-8">
                  <div className="p-2.5 sm:p-4 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl rounded-lg border-2 border-white/40 dark:border-slate-600/40 shadow-lg">
                    <a
                      href={current.href}
                      target={current.label !== 'Email' ? '_blank' : undefined}
                      rel={current.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className={`${current.textColor} ${current.hoverTextColor} transition-colors duration-300 break-all font-mono text-xs sm:text-lg font-medium drop-shadow-sm`}
                    >
                      {current.value}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <a
                    href={current.href}
                    target={current.label !== 'Email' ? '_blank' : undefined}
                    rel={current.label !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${current.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                    <svg className="relative z-10 w-4 h-4 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="relative z-10 text-white drop-shadow-sm">{current.action}</span>
                  </a>
                  {current.label === 'Email' && (
                    <button onClick={handleCopyEmail} className="group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl border border-white/40 dark:border-slate-600/40 shadow-lg group-hover/btn:bg-white/40 group-hover/btn:border-white/60 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
                      {copiedEmail ? (
                        <>
                          <svg className="relative z-10 w-4 h-4 text-green-600 dark:text-green-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="relative z-10 font-semibold text-gray-900 dark:text-white drop-shadow-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="relative z-10 w-4 h-4 text-gray-800 dark:text-gray-200 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="relative z-10 text-gray-800 dark:text-gray-200 drop-shadow-sm">Copy Email</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 dark:bg-slate-700/30 backdrop-blur-xl rounded-b-xl sm:rounded-b-3xl">
                  <div className={`h-full bg-gradient-to-r ${current.color} transition-all duration-500 rounded-r-full`} style={{ width: `${((activeContact + 1) / contactInfo.length) * 100}%` }} />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="hidden lg:block space-y-3">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white drop-shadow-sm">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              All Methods
            </h3>
            {contactInfo.map((contact, idx) => (
              <GlassCardNavigator key={idx} active={activeContact === idx} onClick={() => handleContactClick(idx)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${contact.iconBgColor} backdrop-blur-xl flex items-center justify-center shadow-lg border-2 border-white/30`}>
                    {contact.icon ? (
                      <img src={getImageURL(contact.icon)} alt={contact.label} className="w-5 h-5 object-contain filter brightness-0 invert" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    ) : null}
                    <div className="w-5 h-5 text-white font-bold text-xs flex items-center justify-center" style={{ display: contact.icon ? 'none' : 'flex' }}>{contact.label.charAt(0)}</div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className={`font-semibold ${contact.textColor} transition-colors duration-300 truncate text-sm`}>{contact.label}</h4>
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{contact.description}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{contact.response}</span>
                    </div>
                  </div>
                </div>
                {activeContact === idx && <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${contact.color} rounded-full`} />}
              </GlassCardNavigator>
            ))}
            <div className="mt-4 space-y-2">
              <a href="/resume.pdf" download className="group relative block text-center p-2.5 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl border-2 border-white/40 dark:border-slate-600/40 shadow-lg group-hover:bg-white/40 group-hover:border-white/60 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                <span className="relative z-10 text-gray-800 dark:text-gray-200 drop-shadow-sm">Download Resume</span>
              </a>
              <a href="#summary" className="group relative block text-center p-2.5 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl border-2 border-white/40 dark:border-slate-600/40 shadow-lg group-hover:bg-white/40 group-hover:border-white/60 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                <span className="relative z-10 text-gray-800 dark:text-gray-200 drop-shadow-sm">Back to Top</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile contact pills */}
        <div className={`lg:hidden mb-6 ${mobileView === 'grid' ? 'hidden' : 'block'}`}>
          <div className="flex justify-center gap-1 overflow-x-auto pb-1">
            {contactInfo.map((contact, idx) => (
              <button
                key={idx}
                onClick={() => handleContactClick(idx)}
                className={`group relative flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-500 overflow-hidden ${activeContact === idx ? 'scale-110' : 'hover:scale-105'}`}
              >
                {activeContact === idx ? (
                  <div className={`absolute inset-0 ${contact.iconBgColor} backdrop-blur-xl border-2 border-white/30 shadow-lg rounded-lg`} />
                ) : (
                  <div className="absolute inset-0 bg-white/20 dark:bg-slate-800/40 backdrop-blur-xl border-2 border-white/30 dark:border-slate-600/40 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-lg" />
                )}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  {contact.icon ? (
                    <img src={getImageURL(contact.icon)} alt={contact.label} className={`w-4 h-4 object-contain filter ${activeContact === idx ? 'brightness-0 invert' : ''} drop-shadow-sm`} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  ) : null}
                  <div className={`w-4 h-4 font-bold text-xs flex items-center justify-center drop-shadow-sm ${activeContact === idx ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} style={{ display: contact.icon ? 'none' : 'flex' }}>{contact.label.charAt(0)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-white/30 dark:border-slate-600/30 px-4 py-4 sm:py-8 mt-12 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm mb-2 sm:mb-4 font-medium drop-shadow-sm">
            © 2025 Affan Khamse. Built with React & Tailwind CSS
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-xs drop-shadow-sm">
            Portfolio crafted with modern design principles and interactive experiences
          </p>
        </div>
      </div>
    </Section>
  );
}
