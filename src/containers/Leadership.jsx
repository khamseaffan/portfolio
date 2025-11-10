import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  HiCheckCircle, 
  HiLocationMarker, 
  HiChevronDown,
  HiMenuAlt2,
  HiSparkles,
  HiBadgeCheck,
  HiClock
} from 'react-icons/hi';
import leadership from '../data/leadership.json';
import { getImageURL } from '../utils';

export default function Leadership() {
  // Memoize enhanced leadership to prevent re-computation on every render
  const enhancedLeadership = useMemo(() => leadership, []);
  const [activeCard, setActiveCard] = useState(0);
  const [mobileExpandedCard, setMobileExpandedCard] = useState(null);
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

  // Desktop click handler
  const handleDesktopCardClick = useMemo(() => 
    (idx) => () => setActiveCard(idx), 
    []
  );

  // Mobile click handler with toggle functionality
  const handleMobileCardClick = useMemo(() => 
    (idx) => () => setMobileExpandedCard(prev => prev === idx ? null : idx), 
    []
  );

  return (
    <section
      ref={sectionRef}
      id="leadership"
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
      
      <div className="relative z-10">
        {/* Header Section - Glass Container */}
        <div className="mb-8 sm:mb-12">
          <div className="relative group p-6 rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl font-header font-semibold uppercase tracking-wide mb-3 text-primary drop-shadow-sm">
                Leadership & Activities
              </h2>
              <p className="text-secondary text-sm sm:text-base drop-shadow-sm">
                Teaching, mentoring, and building technical communities
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* MOBILE LAYOUT - Fixed spacing */}
          <div className="lg:hidden space-y-3 mb-12">
            {enhancedLeadership.map((item, idx) => (
              <div
                key={`mobile-${idx}`}
                className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-white/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/60"
              >
                {/* Mobile Card Header - Compact spacing */}
                <div 
                  onClick={handleMobileCardClick(idx)}
                  className="p-3 cursor-pointer hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    {/* Organization Logo - Smaller */}
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                      <div className={`w-full h-full bg-gradient-to-br ${item.color} p-0.5`}>
                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                          {item.imageSrc && item.imageSrc !== '/api/placeholder/80/80' ? (
                            <img 
                              src={getImageURL(item.imageSrc)} 
                              alt={item.organization}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="w-5 h-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs"
                            style={{ display: item.imageSrc && item.imageSrc !== '/api/placeholder/80/80' ? 'none' : 'flex' }}
                          >
                            {item.organization.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Role Info - Compact layout */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary text-sm leading-tight mb-1 truncate">
                        {item.role}
                      </h3>
                      <p className="text-xs text-gray-600 truncate font-medium">{item.organization}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <HiClock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium">{item.startDate} - {item.endDate}</span>
                        {item.endDate === 'Present' && (
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      mobileExpandedCard === idx ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>

                {/* Mobile Card Expandable Content */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  mobileExpandedCard === idx ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-3 pb-3 border-t border-white/30 bg-white/20 backdrop-blur-xl">
                    <div className="pt-3 space-y-3">
                      
                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <HiCheckCircle className="w-4 h-4 text-green-600" />
                          Key Contributions
                        </h4>
                        
                        <div className="space-y-2">
                          {item.experiences.map((exp, i) => (
                            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <span className="text-white text-xs font-bold">{i + 1}</span>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed flex-1">
                                {exp}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="pt-2 border-t border-white/30">
                        <h5 className="text-xs font-semibold text-gray-700 mb-2 drop-shadow-sm">SKILLS</h5>
                        <div className="flex flex-wrap gap-1">
                          {item.techStack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-primary/20 backdrop-blur-xl text-primary rounded-md text-xs font-medium border border-primary/30 drop-shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP LAYOUT - Theater Style */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Main Leadership Display */}
            <div className="lg:col-span-2">
              <div className="group relative h-[600px] bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-2 border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/60">
                
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
                
                {/* Active Leadership Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {/* Organization logo */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white/40 bg-white/30 backdrop-blur-xl group-hover:border-white/60 transition-all duration-500">
                          <div className={`w-full h-full bg-gradient-to-br ${enhancedLeadership[activeCard].color} p-1`}>
                            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                              {enhancedLeadership[activeCard].imageSrc && enhancedLeadership[activeCard].imageSrc !== '/api/placeholder/80/80' ? (
                                <img 
                                  src={getImageURL(enhancedLeadership[activeCard].imageSrc)} 
                                  alt={enhancedLeadership[activeCard].organization}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div 
                                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                                style={{ display: enhancedLeadership[activeCard].imageSrc && enhancedLeadership[activeCard].imageSrc !== '/api/placeholder/80/80' ? 'none' : 'flex' }}
                              >
                                {enhancedLeadership[activeCard].organization.charAt(0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                          {enhancedLeadership[activeCard].role}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                          <p className="text-base font-semibold text-secondary">
                            {enhancedLeadership[activeCard].organization}
                          </p>
                          {enhancedLeadership[activeCard].location && (
                            <>
                              <span className="hidden sm:block text-gray-500">•</span>
                              <div className="flex items-center gap-1 text-gray-600">
                                <HiLocationMarker className="w-3 h-3" />
                                <span className="text-xs font-medium">{enhancedLeadership[activeCard].location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className={`px-3 py-1.5 bg-gradient-to-r ${enhancedLeadership[activeCard].color} rounded-full shadow-md`}>
                      <span className="text-white font-bold text-xs">{enhancedLeadership[activeCard].impact}</span>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-primary/20 backdrop-blur-xl rounded-xl border-2 border-primary/30 shadow-lg">
                      <HiClock className="w-4 h-4 text-primary drop-shadow-sm" />
                      <span className="text-xs font-semibold text-primary drop-shadow-sm">
                        {`${enhancedLeadership[activeCard].startDate} - ${enhancedLeadership[activeCard].endDate}`}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="flex-1 space-y-4">
                    <h4 className="text-base font-semibold text-secondary mb-3 flex items-center gap-2 drop-shadow-sm">
                      <HiCheckCircle className="w-4 h-4 text-green-600" />
                      Key Contributions
                    </h4>
                    
                    <div className="space-y-3">
                      {enhancedLeadership[activeCard].experiences.map((exp, i) => (
                        <div key={i} className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/20 backdrop-blur-xl transition-all duration-500 border-2 border-white/30 hover:border-white/50 hover:shadow-lg">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${enhancedLeadership[activeCard].color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}>
                            <span className="text-white text-xs font-bold drop-shadow-sm">{i + 1}</span>
                          </div>
                          <p className="text-sm text-secondary leading-relaxed group-hover/item:text-primary transition-colors duration-300 flex-1 drop-shadow-sm">
                            {exp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 drop-shadow-sm">SKILLS</h5>
                    <div className="flex flex-wrap gap-2">
                      {enhancedLeadership[activeCard].techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/20 backdrop-blur-xl text-primary rounded-md text-xs font-medium border border-primary/30 transition-all duration-500 group-hover:bg-primary/30 group-hover:border-primary/50 drop-shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 backdrop-blur-xl">
                  <div 
                    className={`h-full bg-gradient-to-r ${enhancedLeadership[activeCard].color} transition-all duration-500 rounded-r-full`}
                    style={{ width: `${((activeCard + 1) / enhancedLeadership.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Leadership Navigator */}
            <div className="space-y-3">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary drop-shadow-sm">
                <HiMenuAlt2 className="w-5 h-5 text-accent" />
                Leadership Timeline
              </h3>

              {enhancedLeadership.map((item, idx) => (
                <div
                  key={`leader-${idx}`}
                  onClick={handleDesktopCardClick(idx)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    activeCard === idx 
                      ? 'scale-105' 
                      : 'hover:-translate-y-0.5'
                  }`}
                >
                  {activeCard === idx ? (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-lg rounded-2xl" />
                  ) : (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border-2 border-white/40 shadow-md group-hover:bg-white/35 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-2xl" />
                  )}
                  {activeCard !== idx && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-sm`}>
                      <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                        {item.imageSrc && item.imageSrc !== '/api/placeholder/80/80' ? (
                          <img 
                            src={getImageURL(item.imageSrc)} 
                            alt={item.organization} 
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-5 h-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs"
                          style={{ display: item.imageSrc && item.imageSrc !== '/api/placeholder/80/80' ? 'none' : 'flex' }}
                        >
                          {item.organization.charAt(0)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 truncate text-sm">
                        {item.role}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">{item.organization}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{item.startDate} - {item.endDate}</span>
                        {item.endDate === 'Present' && (
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>

                  {activeCard === idx && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} rounded-full`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

