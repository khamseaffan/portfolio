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
      className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Enhanced Background decorative elements - Apple style liquid glass */}
      <div className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-gradient-to-br from-blue-400 to-cyan-300 opacity-60 blur-[100px] sm:blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-gradient-to-br from-purple-400 to-pink-300 opacity-60 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 opacity-30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Additional vibrant blobs for glass effect visibility */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-400 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-400 opacity-40 blur-[120px] rounded-full" />
      
      {/* Floating glass panels for depth - more visible */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl rotate-12 opacity-70 animate-float" />
      <div className="absolute bottom-32 left-8 w-24 h-24 bg-white/30 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-xl -rotate-12 opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section - Glass Container */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="mb-4 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white/40 backdrop-blur-2xl rounded-full border-2 border-white/50 shadow-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 drop-shadow-sm">
                  Available for opportunities
                </span>
              </div>
            </div>
            
            <div className="relative group p-6 rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-gray-900 drop-shadow-sm">
                  Looking for a Problem Solver?
                </h2>
                <p className="text-sm sm:text-xl text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                  I'm excited to collaborate on innovative solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation - Glass Buttons */}
          <div className="block lg:hidden mb-6">
            <div className="flex bg-white/20 backdrop-blur-xl rounded-lg p-1 border-2 border-white/30 shadow-lg">
              <button
                onClick={() => setMobileView('featured')}
                className={`group relative flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-500 overflow-hidden ${
                  mobileView === 'featured'
                    ? 'scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {mobileView === 'featured' ? (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/50 shadow-lg group-hover:shadow-xl transition-all duration-500 rounded-md" />
                ) : (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-md" />
                )}
                <span className={`relative z-10 ${mobileView === 'featured' ? 'text-gray-900 font-bold drop-shadow-sm' : 'text-gray-700 drop-shadow-sm'}`}>
                  Featured
                </span>
              </button>
              <button
                onClick={() => setMobileView('grid')}
                className={`group relative flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-500 overflow-hidden ${
                  mobileView === 'grid'
                    ? 'scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {mobileView === 'grid' ? (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/50 shadow-lg group-hover:shadow-xl transition-all duration-500 rounded-md" />
                ) : (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-md" />
                )}
                <span className={`relative z-10 ${mobileView === 'grid' ? 'text-gray-900 font-bold drop-shadow-sm' : 'text-gray-700 drop-shadow-sm'}`}>
                  All Methods
                </span>
              </button>
            </div>
          </div>

          {/* MOBILE GRID VIEW - Glass Cards */}
          <div className={`lg:hidden mb-8 ${mobileView === 'featured' ? 'hidden' : 'block'}`}>
            <div className="space-y-3">
              {contactInfo.map((contact, idx) => (
                <div
                  key={`mobile-contact-${idx}`}
                  className="bg-white/30 backdrop-blur-2xl rounded-xl border-2 border-white/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/60"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Contact Icon with brand colors - Glass Effect */}
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

                    {/* Contact Value with improved readability - Glass Container */}
                    <div className="mb-3">
                      <div className="p-2 bg-white/30 backdrop-blur-xl rounded-lg border-2 border-white/40 shadow-lg">
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

                    {/* Action Buttons with brand colors - Glass Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={contact.href}
                        target={contact.label !== 'Email' ? '_blank' : undefined}
                        rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`group/btn relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                        <svg className="relative z-10 w-3 h-3 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="relative z-10 text-white drop-shadow-sm">{contact.action}</span>
                      </a>

                      {contact.label === 'Email' && (
                        <button
                          onClick={handleCopyEmail}
                          className="group/btn relative flex items-center justify-center px-3 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg group-hover/btn:bg-white/40 group-hover/btn:border-white/60 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
                          {copiedEmail ? (
                            <svg className="relative z-10 w-3 h-3 text-green-600 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="relative z-10 w-3 h-3 text-gray-800 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            {/* Featured Contact Method - Glass Card */}
            <div className="lg:col-span-2">
              <div className={`group relative min-h-[280px] sm:h-[400px] bg-white/40 backdrop-blur-2xl rounded-xl sm:rounded-3xl border-2 border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/60`}>
                
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl sm:rounded-3xl pointer-events-none`} />
                
                <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col justify-between">
                  
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4 sm:mb-8">
                    <div className="relative">
                      <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl ${contactInfo[activeContact].iconBgColor} backdrop-blur-xl flex items-center justify-center shadow-lg border-2 border-white/30`}>
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

                  {/* Contact Value with better contrast - Glass Container */}
                  <div className="mb-4 sm:mb-8">
                    <div className="p-2.5 sm:p-4 bg-white/30 backdrop-blur-xl rounded-lg border-2 border-white/40 shadow-lg">
                      <a
                        href={contactInfo[activeContact].href}
                        target={contactInfo[activeContact].label !== 'Email' ? '_blank' : undefined}
                        rel={contactInfo[activeContact].label !== 'Email' ? 'noopener noreferrer' : undefined}
                        className={`${contactInfo[activeContact].textColor} ${contactInfo[activeContact].hoverTextColor} transition-colors duration-300 break-all font-mono text-xs sm:text-lg font-medium drop-shadow-sm`}
                      >
                        {contactInfo[activeContact].value}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons - Glass Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <a
                      href={contactInfo[activeContact].href}
                      target={contactInfo[activeContact].label !== 'Email' ? '_blank' : undefined}
                      rel={contactInfo[activeContact].label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className={`group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${contactInfo[activeContact].color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                      <svg className="relative z-10 w-4 h-4 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="relative z-10 text-white drop-shadow-sm">{contactInfo[activeContact].action}</span>
                    </a>

                    {contactInfo[activeContact].label === 'Email' && (
                      <button
                        onClick={handleCopyEmail}
                        className="group/btn relative flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg group-hover/btn:bg-white/40 group-hover/btn:border-white/60 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
                        {copiedEmail ? (
                          <>
                            <svg className="relative z-10 w-4 h-4 text-green-600 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="relative z-10 font-semibold text-gray-900 drop-shadow-sm">Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="relative z-10 w-4 h-4 text-gray-800 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="relative z-10 text-gray-800 drop-shadow-sm">Copy Email</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 backdrop-blur-xl">
                    <div 
                      className={`h-full bg-gradient-to-r ${contactInfo[activeContact].color} transition-all duration-500 rounded-r-full`}
                      style={{ width: `${((activeContact + 1) / contactInfo.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Navigator - Glass Cards */}
            <div className="hidden lg:block space-y-3">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 drop-shadow-sm">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                All Methods
              </h3>

              {contactInfo.map((contact, idx) => (
                <div
                  key={idx}
                  onClick={() => handleContactClick(idx)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    activeContact === idx 
                      ? 'scale-105' 
                      : 'hover:-translate-y-0.5'
                  }`}
                >
                  {activeContact === idx ? (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-lg rounded-xl" />
                  ) : (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border-2 border-white/40 shadow-md group-hover:bg-white/35 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-xl" />
                  )}
                  {activeContact !== idx && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${contact.iconBgColor} backdrop-blur-xl flex items-center justify-center shadow-lg border-2 border-white/30`}>
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

              {/* Quick Actions - Glass Buttons */}
              <div className="mt-4 space-y-2">
                <a
                  href="/resume.pdf"
                  download
                  className="group relative block text-center p-2.5 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border-2 border-white/40 shadow-lg group-hover:bg-white/40 group-hover:border-white/60 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                  <span className="relative z-10 text-gray-800 drop-shadow-sm">📄 Download Resume</span>
                </a>
                
                <a
                  href="#summary"
                  className="group relative block text-center p-2.5 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border-2 border-white/40 shadow-lg group-hover:bg-white/40 group-hover:border-white/60 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                  <span className="relative z-10 text-gray-800 drop-shadow-sm">⬆️ Back to Top</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Contact Navigation Pills - Glass Buttons */}
          <div className={`lg:hidden mb-6 ${mobileView === 'grid' ? 'hidden' : 'block'}`}>
            <div className="flex justify-center gap-1 overflow-x-auto pb-1">
              {contactInfo.map((contact, idx) => (
                <button
                  key={idx}
                  onClick={() => handleContactClick(idx)}
                  className={`group relative flex-shrink-0 w-10 h-10 rounded-lg transition-all duration-500 overflow-hidden ${
                    activeContact === idx
                      ? 'scale-110'
                      : 'hover:scale-105'
                  }`}
                >
                  {activeContact === idx ? (
                    <div className={`absolute inset-0 ${contact.iconBgColor} backdrop-blur-xl border-2 border-white/30 shadow-lg rounded-lg`} />
                  ) : (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-lg" />
                  )}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {contact.icon ? (
                      <img 
                        src={getImageURL(contact.icon)} 
                        alt={contact.label}
                        className={`w-4 h-4 object-contain filter ${
                          activeContact === idx ? 'brightness-0 invert' : ''
                        } drop-shadow-sm`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-4 h-4 font-bold text-xs flex items-center justify-center drop-shadow-sm ${
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

        {/* Footer Bottom - Glass Container */}
        <div className="border-t-2 border-white/30 px-4 py-4 sm:py-8 mt-12 bg-white/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-800 text-xs sm:text-sm mb-2 sm:mb-4 font-medium drop-shadow-sm">
              © 2025 Affan Khamse. Built with React & Tailwind CSS
            </p>
            <p className="text-gray-700 text-xs drop-shadow-sm">
              Portfolio crafted with modern design principles and interactive experiences
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}