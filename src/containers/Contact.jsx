import React, { useState, useRef, useEffect } from 'react';
import { getImageURL } from '../utils';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [mobileView, setMobileView] = useState('featured'); // 'featured' or 'grid'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: 'contact/emailIcon.png',
      label: 'Email',
      value: 'khamseaffan@gmail.com',
      href: 'mailto:khamseaffan@gmail.com',
      description: 'Drop me a line anytime',
      color: 'from-red-500 to-red-600', // Gmail red
      response: 'Usually respond within 24 hours',
      action: 'Send Email'
    },
    {
      icon: 'contact/linkedinIcon.png',
      label: 'LinkedIn',
      value: 'linkedin.com/in/affan-khamse',
      href: 'https://www.linkedin.com/in/affan-khamse/',
      description: 'Let\'s connect professionally',
      color: 'from-blue-600 to-blue-700', // LinkedIn blue
      response: 'Active daily, quick to connect',
      action: 'View Profile'
    },
    {
      icon: 'contact/githubIcon.png',
      label: 'GitHub',
      value: 'github.com/khamseaffan',
      href: 'https://github.com/khamseaffan',
      description: 'Check out my code',
      color: 'from-gray-800 to-gray-900', // GitHub dark
      response: 'Latest projects and contributions',
      action: 'Browse Code'
    }
  ];

  // Auto-cycle through contact methods
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveContact(prev => (prev + 1) % contactInfo.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [contactInfo.length, isVisible]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('khamseaffan@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.log('Copy failed');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Hi Affan,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`);
    window.location.href = `mailto:khamseaffan@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleContactClick = (index) => {
    setActiveContact(index);
    setMobileView('featured');
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-br from-secondary via-gray-800 to-gray-900 text-white font-body overflow-hidden"
    >
      {/* Enhanced Background decorative elements  */}
      <div className="absolute top-[-60px] sm:top-[-100px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[40vh] sm:h-[50vh] min-w-[300px] sm:min-w-[400px] min-h-[250px] sm:min-h-[300px] bg-primary/20 blur-[80px] sm:blur-[100px] rounded-full" />
      <div className="absolute bottom-[-50px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[60vw] sm:w-[50vw] h-[35vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-accent/15 blur-[60px] sm:blur-[80px] rounded-full" />
      
      {/* Additional floating elements  */}
      <div className="absolute top-1/3 right-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-2000" />
      
      <div className="relative z-10">
        
        {/* Main Contact Section */}
        <div className="px-4 py-12 sm:px-6 sm:py-24 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Enhanced Header  with better typography */}
            <div className="text-center mb-8 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 mb-4 sm:mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-300">
                  Available for opportunities
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-header font-bold mb-3 sm:mb-6 text-white">
                Let's Build Something Amazing
              </h2>
              <p className="text-sm sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
                Ready to discuss your next project? I'm excited to collaborate on innovative solutions.
              </p>
            </div>

            {/* Mobile Tab Navigation - Improved styling */}
            <div className="block lg:hidden mb-6">
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setMobileView('featured')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    mobileView === 'featured'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setMobileView('grid')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    mobileView === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  All Methods
                </button>
              </div>
            </div>

            {/* MOBILE GRID VIEW - Compact contact cards */}
            <div className={`lg:hidden mb-8 ${mobileView === 'featured' ? 'hidden' : 'block'}`}>
              <div className="space-y-3">
                {contactInfo.map((contact, idx) => (
                  <div
                    key={`mobile-contact-${idx}`}
                    className="bg-white/8 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/12"
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3 mb-3">
                        {/* Compact Contact Icon with brand colors */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-sm`}>
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
                          <div 
                            className="w-5 h-5 text-white font-bold text-xs flex items-center justify-center"
                            style={{ display: contact.icon ? 'none' : 'flex' }}
                          >
                            {contact.label.charAt(0)}
                          </div>
                        </div>
                        
                        {/* Compact Contact Info - Left aligned */}
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-semibold text-white text-sm mb-0.5">
                            {contact.label}
                          </h3>
                          <p className="text-xs text-gray-400 mb-1">
                            {contact.description}
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full" />
                            <span className="text-xs text-green-400">
                              {contact.response}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Compact Contact Value */}
                      <div className="mb-3">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                          <a
                            href={contact.href}
                            target={contact.label !== 'Email' ? '_blank' : undefined}
                            rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                            className="text-white hover:text-accent transition-colors duration-300 font-mono text-xs break-all"
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>

                      {/* Compact Action Buttons */}
                      <div className="flex gap-2">
                        <a
                          href={contact.href}
                          target={contact.label !== 'Email' ? '_blank' : undefined}
                          rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r ${contact.color} text-white rounded-lg font-medium text-xs transition-all duration-300 hover:shadow-md`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {contact.action}
                        </a>

                        {contact.label === 'Email' && (
                          <button
                            onClick={handleCopyEmail}
                            className="flex items-center justify-center px-3 py-2 bg-white/10 text-white rounded-lg font-medium text-xs transition-all duration-300 hover:bg-white/20"
                          >
                            {copiedEmail ? (
                              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP LAYOUT + MOBILE FEATURED VIEW */}
            <div className={`grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16 ${mobileView === 'grid' ? 'hidden lg:grid' : ''}`}>
              
              {/* Featured Contact Method - Improved mobile layout */}
              <div className="lg:col-span-2">
                <div className="group relative min-h-[280px] sm:h-[400px] bg-white/8 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/12 hover:border-white/20">
                  
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${contactInfo[activeContact].color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl sm:rounded-3xl`} />
                  
                  <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col justify-between">
                    
                    {/* Header - Better mobile layout */}
                    <div className="flex items-start gap-4 mb-4 sm:mb-8">
                      <div className="relative">
                        <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl bg-gradient-to-br ${contactInfo[activeContact].color} flex items-center justify-center shadow-lg`}>
                          {contactInfo[activeContact].icon ? (
                            <img
                              src={getImageURL(contactInfo[activeContact].icon)}
                              alt={`${contactInfo[activeContact].label} icon`}
                              className="w-6 h-6 sm:w-10 sm:h-10 object-contain filter brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="w-6 h-6 sm:w-10 sm:h-10 text-white font-bold text-sm flex items-center justify-center"
                            style={{ display: contactInfo[activeContact].icon ? 'none' : 'flex' }}
                          >
                            {contactInfo[activeContact].label.charAt(0)}
                          </div>
                        </div>
                        
                        {/* Compact pulsing indicator */}
                        <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r ${contactInfo[activeContact].color} rounded-full flex items-center justify-center animate-pulse shadow-md`}>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                        </div>
                      </div>
                      
                      {/* Left-aligned content with compact mobile sizing */}
                      <div className="text-left flex-1">
                        <h3 className="text-lg sm:text-3xl font-title font-bold text-white group-hover:text-accent transition-colors duration-300 mb-1 sm:mb-2">
                          {contactInfo[activeContact].label}
                        </h3>
                        <p className="text-sm sm:text-lg text-gray-300 mb-2 sm:mb-4">
                          {contactInfo[activeContact].description}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-300 font-medium">
                            {contactInfo[activeContact].response}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Contact Value */}
                    <div className="mb-4 sm:mb-8">
                      <div className="p-2.5 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                        <a
                          href={contactInfo[activeContact].href}
                          target={contactInfo[activeContact].label !== 'Email' ? '_blank' : undefined}
                          rel={contactInfo[activeContact].label !== 'Email' ? 'noopener noreferrer' : undefined}
                          className="text-white hover:text-accent transition-colors duration-300 break-all font-mono text-xs sm:text-lg"
                        >
                          {contactInfo[activeContact].value}
                        </a>
                      </div>
                    </div>

                    {/* Compact Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <a
                        href={contactInfo[activeContact].href}
                        target={contactInfo[activeContact].label !== 'Email' ? '_blank' : undefined}
                        rel={contactInfo[activeContact].label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r ${contactInfo[activeContact].color} text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:scale-105`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {contactInfo[activeContact].action}
                      </a>

                      {contactInfo[activeContact].label === 'Email' && (
                        <button
                          onClick={handleCopyEmail}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/10 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-white/20 hover:shadow-md"
                        >
                          {copiedEmail ? (
                            <>
                              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Email
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <div 
                        className={`h-full bg-gradient-to-r ${contactInfo[activeContact].color} transition-all duration-500 rounded-r-full`}
                        style={{ width: `${((activeContact + 1) / contactInfo.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-xl sm:rounded-tr-3xl"></div>
                </div>
              </div>

              {/* Contact Navigator - Hidden on mobile */}
              <div className="hidden lg:block space-y-3">
                <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Contact Methods
                </h3>

                {contactInfo.map((contact, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleContactClick(idx)}
                    className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                      activeContact === idx 
                        ? 'bg-white/12 border-white/20 scale-105 shadow-lg' 
                        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {activeContact !== idx && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                    )}
                    
                    <div className="relative z-10 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-sm`}>
                        {contact.icon ? (
                          <img 
                            src={getImageURL(contact.icon)} 
                            alt={contact.label} 
                            className="w-5 h-5 object-contain filter brightness-0 invert"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-5 h-5 text-white font-bold text-xs flex items-center justify-center"
                          style={{ display: contact.icon ? 'none' : 'flex' }}
                        >
                          {contact.label.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-semibold text-white group-hover:text-accent transition-colors duration-300 truncate text-sm">
                          {contact.label}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">{contact.description}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">{contact.response}</span>
                        </div>
                      </div>
                    </div>

                    {activeContact === idx && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${contact.color} rounded-full`} />
                    )}
                  </div>
                ))}

                {/* Quick Actions */}
                <div className="mt-4 space-y-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="block text-center p-2.5 bg-white/5 rounded-lg border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:bg-white/8 hover:border-white/15"
                  >
                    📄 Download Resume
                  </a>
                  
                  <a
                    href="#summary"
                    className="block text-center p-2.5 bg-white/5 rounded-lg border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:bg-white/8 hover:border-white/15"
                  >
                    ⬆️ Back to Top
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Contact Navigation Pills - Only visible when in featured view */}
            <div className={`lg:hidden mb-6 ${mobileView === 'grid' ? 'hidden' : 'block'}`}>
              <div className="flex justify-center gap-1 overflow-x-auto pb-1">
                {contactInfo.map((contact, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleContactClick(idx)}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-300 ${
                      activeContact === idx
                        ? `bg-gradient-to-r ${contact.color} shadow-md scale-110`
                        : 'bg-white/10 border border-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {contact.icon ? (
                        <img 
                          src={getImageURL(contact.icon)} 
                          alt={contact.label}
                          className="w-4 h-4 object-contain filter brightness-0 invert"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-4 h-4 text-white font-bold text-xs flex items-center justify-center"
                        style={{ display: contact.icon ? 'none' : 'flex' }}
                      >
                        {contact.label.charAt(0)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom  */}
        <div className="border-t border-white/10 px-4 py-4 sm:px-6 sm:py-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4">
              © 2025 Affan Khamse. Built with React & Tailwind CSS
            </p>
            <p className="text-gray-500 text-xs">
              Portfolio crafted with modern design principles and interactive experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}