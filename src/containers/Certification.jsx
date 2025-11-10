import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getImageURL } from '../utils';
import certificates from '../data/certificates.json'; 

const enhanceCertificatesData = (rawCertificates) => {
  const colors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400", 
    "from-green-500 to-emerald-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-purple-400",
    "from-teal-500 to-green-400"
  ];

  const categories = [
    "Technical Skills",
    "Data Science",
    "Development Tools",
    "Design & UX",
    "Cloud Computing",
    "Security"
  ];

  return rawCertificates.map((cert, idx) => ({
    ...cert,
    color: colors[idx] || "from-gray-500 to-slate-400",
    category: categories[idx] || "Professional Development",
    id: `cert-${idx}`
  }));
};

export default function Certification() {
  const enhancedCertificates = useMemo(() => enhanceCertificatesData(certificates), []);
  const [activeCert, setActiveCert] = useState(0);
  const [mobileExpandedCert, setMobileExpandedCert] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Design & UX');
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(enhancedCertificates.map(c => c.category))];
    return cats;
  }, [enhancedCertificates]);

  // Filter certificates based on category
  const filteredCertificates = useMemo(() => {
    return filterCategory === 'all' 
      ? enhancedCertificates 
      : enhancedCertificates.filter(c => c.category === filterCategory);
  }, [enhancedCertificates, filterCategory]);

  // Desktop click handlers (unchanged)
  const handleDesktopCertClick = useMemo(() => 
    (idx) => () => setActiveCert(idx), 
    []
  );

  // Mobile click handler with toggle functionality
  const handleMobileCertClick = useMemo(() => 
    (idx) => () => setMobileExpandedCert(prev => prev === idx ? null : idx), 
    []
  );

  const handleCategoryClick = useMemo(() => 
    (category) => () => {
      setFilterCategory(category);
      setActiveCert(0);
      setMobileExpandedCert(null);
    }, 
    []
  );

  return (
    <section
      ref={sectionRef}
      id="certification"
      className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-text font-body py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Glass Container */}
        <div className="mb-8 sm:mb-12">
          <div className="relative group p-6 rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl font-header font-semibold uppercase tracking-wide mb-3 text-primary drop-shadow-sm">
                Certifications
              </h2>
              <p className="text-secondary text-sm sm:text-base drop-shadow-sm">
                Professional credentials that show my commitment to growing every day
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter - Glass Badges */}
         <div className="flex flex-wrap justify-center gap-2 mb-12 px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat)
                setActiveCert(0)
                setMobileOpen(null)
              }}
              className={`group relative px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 overflow-hidden ${
                filterCategory === cat
                  ? 'scale-105'
                  : 'hover:scale-105'
              }`}
            >
              {filterCategory === cat ? (
                <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-2xl border-2 border-blue-400/50 shadow-lg group-hover:bg-blue-500/40 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 rounded-full" />
              ) : (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-full" />
              )}
              <span className={`relative z-10 ${filterCategory === cat ? 'font-bold text-blue-900 drop-shadow-sm' : 'text-text drop-shadow-sm'}`}>
                {cat === 'all' ? 'All Certs' : cat}
              </span>
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* MOBILE LAYOUT - Certificate Cards (visible only on mobile) */}
          <div className="lg:hidden space-y-4 mb-12">
            {filteredCertificates.map((cert, idx) => (
              <div
                key={`mobile-cert-${idx}`}
                className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-white/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/60"
              >
                {/* Mobile Certificate Header - Always Visible */}
                <div 
                  onClick={handleMobileCertClick(idx)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Certificate Badge/Preview */}
                  <div className="relative h-32 overflow-hidden">
                    {cert.imageSrc ? (
                      <img
                        src={getImageURL(cert.imageSrc)}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${cert.color} flex items-center justify-center`}
                      style={{ 
                        display: cert.imageSrc ? 'none' : 'flex' 
                      }}
                    >
                      <div className="text-center text-white">
                        <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="text-xs opacity-90 font-medium">
                          {cert.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2">
                      <div className="px-2 py-1 bg-white/40 backdrop-blur-xl rounded-full text-xs font-medium text-primary border-2 border-white/50 shadow-lg">
                        {cert.issued_by}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className={`px-2 py-1 bg-gradient-to-r ${cert.color} backdrop-blur-xl rounded-full text-xs font-medium text-white border-2 border-white/30 shadow-lg`}>
                        {cert.date}
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight mb-1 truncate">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {cert.issued_by} • {cert.category}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{cert.date}</span>
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          <span className="text-xs text-green-600 font-medium">Certified</span>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="flex-shrink-0 ml-3">
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            mobileExpandedCert === idx ? 'rotate-180' : ''
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Certificate Expandable Content */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  mobileExpandedCert === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 border-t border-white/30 bg-white/20 backdrop-blur-xl">
                    <div className="pt-4 space-y-4">
                      
                      {/* Description */}
                      <div>
                        <p className="text-xs text-gray-800 leading-relaxed drop-shadow-sm">
                          {cert.description}
                        </p>
                      </div>

                      {/* Skills Tags */}
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 mb-2 drop-shadow-sm">SKILLS COVERED</h5>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills?.map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className="px-2 py-0.5 text-xs font-medium bg-primary/20 backdrop-blur-xl text-primary rounded-full border border-primary/30 drop-shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Certificate Button */}
                      {cert.certificate_link && (
                        <div className="pt-2">
                          <a
                            href={cert.certificate_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover:shadow-xl transition-all duration-500 rounded-lg`} />
                            <svg className="relative z-10 w-3 h-3 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="relative z-10 text-white drop-shadow-sm">View Certificate</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP LAYOUT - Theater Style (unchanged, hidden on mobile) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-8">
            
            {/* Main Certificate Display */}
            <div className="lg:col-span-2">
              <div className="group relative h-[600px] bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-2 border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/60">
                
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
                
                {/* Active Certificate Content */}
                <div className="relative z-10 h-full flex flex-col">
                  
                  {/* Certificate Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    {filteredCertificates[activeCert]?.imageSrc ? (
                      <img
                        src={getImageURL(filteredCertificates[activeCert].imageSrc)}
                        alt={filteredCertificates[activeCert]?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${filteredCertificates[activeCert]?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center`}
                      style={{ 
                        display: filteredCertificates[activeCert]?.imageSrc ? 'none' : 'flex' 
                      }}
                    >
                      <div className="text-center text-white">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="text-sm opacity-90 font-medium">
                          {filteredCertificates[activeCert]?.category}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Issued by badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/40 backdrop-blur-xl rounded-full text-xs font-medium text-primary border-2 border-white/50 shadow-lg">
                      {filteredCertificates[activeCert]?.issued_by}
                    </div>

                    {/* Date badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${filteredCertificates[activeCert]?.color} backdrop-blur-xl rounded-full text-xs font-medium text-white border-2 border-white/30 shadow-lg`}>
                      {filteredCertificates[activeCert]?.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6 space-y-4">
                    
                    {/* Title */}
                    <h3 className="text-2xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                      {filteredCertificates[activeCert]?.title}
                    </h3>
                    
                    {/* Issuer and Category */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-primary">{filteredCertificates[activeCert]?.issued_by}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-secondary">{filteredCertificates[activeCert]?.category}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-text leading-relaxed flex-1">
                      {filteredCertificates[activeCert]?.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {filteredCertificates[activeCert]?.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-primary/20 backdrop-blur-xl text-primary rounded-full border border-primary/30 transition-all duration-500 group-hover:bg-primary/30 group-hover:border-primary/50 drop-shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    {filteredCertificates[activeCert]?.certificate_link && (
                      <div className="pt-4">
                        <a
                          href={filteredCertificates[activeCert].certificate_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${filteredCertificates[activeCert].color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                          <svg className="relative z-10 w-4 h-4 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="relative z-10 text-white drop-shadow-sm">View Certificate</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 backdrop-blur-xl">
                    <div 
                      className={`h-full bg-gradient-to-r ${filteredCertificates[activeCert]?.color} transition-all duration-500 rounded-r-full`}
                      style={{ width: `${((activeCert + 1) / filteredCertificates.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates Navigator */}
            <div className="space-y-3">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary drop-shadow-sm">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Learning Journey
              </h3>

              {filteredCertificates.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  onClick={handleDesktopCertClick(idx)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    activeCert === idx 
                      ? 'scale-105' 
                      : 'hover:-translate-y-0.5'
                  }`}
                >
                  {activeCert === idx ? (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-lg rounded-2xl" />
                  ) : (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border-2 border-white/40 shadow-md group-hover:bg-white/35 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-2xl" />
                  )}
                  {activeCert !== idx && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-sm`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 truncate text-sm">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">{cert.issued_by}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{cert.date}</span>
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-xs text-gray-500">{cert.category}</span>
                      </div>
                    </div>
                  </div>

                  {activeCert === idx && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cert.color} rounded-full`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row  */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              { value: enhancedCertificates.length, label: "Certificates", color: "text-primary" },
              { value: categories.length - 1, label: "Categories", color: "text-accent" },
              { value: enhancedCertificates.filter(c => c.date?.includes("2024")).length, label: "This Year", color: "text-primary" },
              { value: new Set(enhancedCertificates.map(c => c.issued_by)).size, label: "Institutions", color: "text-accent" }
            ].map((stat, idx) => (
              <div key={idx} className="group relative text-center p-4 sm:p-6 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-secondary font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Bottom CTA section - Glass Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/40 backdrop-blur-2xl rounded-full shadow-xl border-2 border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <span className="text-xs sm:text-sm font-semibold text-gray-900 drop-shadow-sm">
                Continuously expanding my skillset
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse shadow-lg shadow-primary/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}