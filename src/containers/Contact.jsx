import React, { useState, useRef, useEffect } from 'react';
import {getImageURL}  from '../utils';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeContact, setActiveContact] = useState(0);
  const [mobileView, setMobileView] = useState('featured');
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
      color: 'from-red-500 to-red-600',
      // Enhanced colors for better contrast
      textColor: 'text-red-600',
      hoverTextColor: 'hover:text-red-700',
      bgColor: 'bg-red-50',
      hoverBgColor: 'hover:bg-red-100',
      borderColor: 'border-red-200',
      iconBgColor: 'bg-red-500',
      response: 'Usually respond within 24 hours',
      action: 'Send Email'
    },
    {
      icon: 'contact/linkedinIcon.png',
      label: 'LinkedIn',
      value: 'linkedin.com/in/affan-khamse',
      href: 'https://www.linkedin.com/in/affan-khamse/',
      description: 'Let\'s connect professionally',
      color: 'from-blue-600 to-blue-700',
      // LinkedIn brand colors with good contrast
      textColor: 'text-blue-700',
      hoverTextColor: 'hover:text-blue-800',
      bgColor: 'bg-blue-50',
      hoverBgColor: 'hover:bg-blue-100',
      borderColor: 'border-blue-200',
      iconBgColor: 'bg-blue-600',
      response: 'Active daily, quick to connect',
      action: 'View Profile'
    },
    {
      icon: 'contact/githubIcon.png',
      label: 'GitHub',
      value: 'github.com/khamseaffan',
      href: 'https://github.com/khamseaffan',
      description: 'Check out my code',
      color: 'from-gray-800 to-gray-900',
      // GitHub dark theme with proper contrast
      textColor: 'text-gray-800',
      hoverTextColor: 'hover:text-gray-900',
      bgColor: 'bg-gray-100',
      hoverBgColor: 'hover:bg-gray-200',
      borderColor: 'border-gray-300',
      iconBgColor: 'bg-gray-800',
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

  const handleContactClick = (index) => {
    setActiveContact(index);
    setMobileView('featured');
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900 py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background decorative elements with subtle colors */}
      <div className="absolute top-[-40px] sm:top-[-60px] left-[-10vw] sm:left-[-8vw] w-[60vw] sm:w-[50vw] h-[25vh] sm:h-[35vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-blue-200/20 blur-[60px] sm:blur-[80px] rounded-full" />
      <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-[-10vw] sm:right-[-8vw] w-[55vw] sm:w-[45vw] h-[30vh] sm:h-[40vh] min-w-[220px] sm:min-w-[280px] min-h-[220px] sm:min-h-[280px] bg-green-200/20 blur-[60px] sm:blur-[70px] rounded-full" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header with improved contrast */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 backdrop-blur-sm rounded-full border border-green-300 mb-4 sm:mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700">
                Available for opportunities
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-gray-900">
              Looking for a Problem Solver?
            </h2>
            <p className="text-sm sm:text-xl text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
              I'm excited to collaborate on innovative solutions.
            </p>
          </div>

          {/* Mobile Tab Navigation with better contrast */}
          <div className="block lg:hidden mb-6">
            <div className="flex bg-white rounded-lg p-1 border border-gray-300 shadow-sm">
              <button
                onClick={() => setMobileView('featured')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                  mobileView === 'featured'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setMobileView('grid')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                  mobileView === 'grid'
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All Methods
              </button>
            </div>
          </div>

          {/* MOBILE GRID VIEW with enhanced contrast */}
          <div className={`lg:hidden mb-8 ${mobileView === 'featured' ? 'hidden' : 'block'}`}>
            <div className="space-y-3">
              {contactInfo.map((contact, idx) => (
                <div
                  key={`mobile-contact-${idx}`}
                  className={`${contact.bgColor} backdrop-blur-sm rounded-xl border ${contact.borderColor} overflow-hidden transition-all duration-300 ${contact.hoverBgColor} hover:shadow-md`}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Contact Icon with brand colors */}
                      <div className={`w-10 h-10 rounded-lg ${contact.iconBgColor} flex items-center justify-center shadow-sm`}>
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
                      
                      {/* Contact Info with proper text contrast */}
                      <div className="flex-1 min-w-0 text-left">
                        <h3 className={`font-semibold ${contact.textColor} text-sm mb-0.5`}>
                          {contact.label}
                        </h3>
                        <p className="text-xs text-gray-700 mb-1">
                          {contact.description}
                        </p>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          <span className="text-xs text-green-700 font-medium">
                            {contact.response}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Value with improved readability */}
                    <div className="mb-3">
                      <div className="p-2 bg-white rounded-lg border border-gray-300">
                        <a
                          href={contact.href}
                          target={contact.label !== 'Email' ? '_blank' : undefined}
                          rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                          className={`${contact.textColor} ${contact.hoverTextColor} transition-colors duration-300 font-mono text-xs break-all font-medium`}
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>

                    {/* Action Buttons with brand colors */}
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
                          className="flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-xs transition-all duration-300 hover:bg-gray-300"
                        >
                          {copiedEmail ? (
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
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

          {/* DESKTOP LAYOUT + MOBILE FEATURED VIEW with enhanced styling */}
          <div className={`grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16 ${mobileView === 'grid' ? 'hidden lg:grid' : ''}`}>
            
            {/* Featured Contact Method */}
            <div className="lg:col-span-2">
              <div className={`group relative min-h-[280px] sm:h-[400px] ${contactInfo[activeContact].bgColor} backdrop-blur-xl rounded-xl sm:rounded-3xl border-2 ${contactInfo[activeContact].borderColor} overflow-hidden transition-all duration-300 ${contactInfo[activeContact].hoverBgColor} hover:shadow-xl`}>
                
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${contactInfo[activeContact].color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl sm:rounded-3xl`} />
                
                <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col justify-between">
                  
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4 sm:mb-8">
                    <div className="relative">
                      <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl ${contactInfo[activeContact].iconBgColor} flex items-center justify-center shadow-lg`}>
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
                      
                      {/* Pulsing indicator */}
                      <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 ${contactInfo[activeContact].iconBgColor} rounded-full flex items-center justify-center animate-pulse shadow-md`}>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                      </div>
                    </div>
                    
                    {/* Content with brand-colored text */}
                    <div className="text-left flex-1">
                      <h3 className={`text-lg sm:text-3xl font-bold ${contactInfo[activeContact].textColor} transition-colors duration-300 mb-1 sm:mb-2`}>
                        {contactInfo[activeContact].label}
                      </h3>
                      <p className="text-sm sm:text-lg text-gray-700 mb-2 sm:mb-4">
                        {contactInfo[activeContact].description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-700 font-medium">
                          {contactInfo[activeContact].response}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Value with better contrast */}
                  <div className="mb-4 sm:mb-8">
                    <div className="p-2.5 sm:p-4 bg-white rounded-lg border border-gray-300">
                      <a
                        href={contactInfo[activeContact].href}
                        target={contactInfo[activeContact].label !== 'Email' ? '_blank' : undefined}
                        rel={contactInfo[activeContact].label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`${contactInfo[activeContact].textColor} ${contactInfo[activeContact].hoverTextColor} transition-colors duration-300 break-all font-mono text-xs sm:text-lg font-medium`}
                      >
                        {contactInfo[activeContact].value}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                        className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-300 hover:shadow-md"
                      >
                        {copiedEmail ? (
                          <>
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Copied!</span>
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className={`h-full bg-gradient-to-r ${contactInfo[activeContact].color} transition-all duration-500 rounded-r-full`}
                      style={{ width: `${((activeContact + 1) / contactInfo.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Navigator with improved styling */}
            <div className="hidden lg:block space-y-3">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                All Methods
              </h3>

              {contactInfo.map((contact, idx) => (
                <div
                  key={idx}
                  onClick={() => handleContactClick(idx)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    activeContact === idx 
                      ? `${contact.bgColor} ${contact.borderColor} scale-105 shadow-lg` 
                      : `bg-white border-gray-200 hover:${contact.bgColor} hover:${contact.borderColor} hover:shadow-md hover:-translate-y-0.5`
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${contact.iconBgColor} flex items-center justify-center shadow-sm`}>
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
                      <h4 className={`font-semibold ${contact.textColor} transition-colors duration-300 truncate text-sm`}>
                        {contact.label}
                      </h4>
                      <p className="text-xs text-gray-700 truncate">{contact.description}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-gray-600 font-medium">{contact.response}</span>
                      </div>
                    </div>
                  </div>

                  {activeContact === idx && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${contact.color} rounded-full`} />
                  )}
                </div>
              ))}

              {/* Quick Actions with better contrast */}
              <div className="mt-4 space-y-2">
                <a
                  href="/resume.pdf"
                  download
                  className="block text-center p-2.5 bg-white rounded-lg border-2 border-gray-300 text-gray-800 font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  📄 Download Resume
                </a>
                
                <a
                  href="#summary"
                  className="block text-center p-2.5 bg-white rounded-lg border-2 border-gray-300 text-gray-800 font-medium text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  ⬆️ Back to Top
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Contact Navigation Pills with brand colors */}
          <div className={`lg:hidden mb-6 ${mobileView === 'grid' ? 'hidden' : 'block'}`}>
            <div className="flex justify-center gap-1 overflow-x-auto pb-1">
              {contactInfo.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleContactClick(idx)}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-300 ${
                    activeContact === idx
                      ? `${contact.iconBgColor} shadow-md scale-110`
                      : 'bg-gray-500 border-2 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {contact.icon ? (
                      <img 
                        src={getImageURL(contact.icon)} 
                        alt={contact.label}
                        className={`w-4 h-4 object-contain filter ${
                          activeContact === idx ? 'brightness-0 invert' : ''
                        }`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-4 h-4 font-bold text-xs flex items-center justify-center ${
                        activeContact === idx ? 'text-white' : 'text-gray-700'
                      }`}
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

        {/* Footer Bottom with proper contrast */}
        <div className="border-t-2 border-gray-300 px-4 py-4 sm:py-8 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-4 font-medium">
              © 2025 Affan Khamse. Built with React & Tailwind CSS
            </p>
            <p className="text-gray-600 text-xs">
              Portfolio crafted with modern design principles and interactive experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}