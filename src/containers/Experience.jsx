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
import history from '../data/work_experience.json';
import { getImageURL } from '../utils';

export default function Experience() {
  // Memoize enhanced history to prevent re-computation on every render
  const enhancedHistory = useMemo(() => history, []);
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

  // Desktop click handler (unchanged)
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
      id="experience"
      className="relative bg-gradient-to-br from-bg via-gray-300 to-bg text-text font-body py-8 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-[-40px] sm:top-[-60px] left-[-10vw] sm:left-[-8vw] w-[60vw] sm:w-[50vw] h-[25vh] sm:h-[35vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-accent/10 blur-[60px] sm:blur-[80px] rounded-full" />
      <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-[-10vw] sm:right-[-8vw] w-[55vw] sm:w-[45vw] h-[30vh] sm:h-[40vh] min-w-[220px] sm:min-w-[280px] min-h-[220px] sm:min-h-[280px] bg-primary/10 blur-[60px] sm:blur-[70px] rounded-full" />
      
      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-header font-semibold text-center uppercase tracking-wide mb-3 sm:mb-4 text-primary">
          Professional Experience
        </h2>
        <p className="text-center text-secondary mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base px-2">
          Building scalable solutions and driving innovation across diverse tech stacks
        </p>

        {/* Status Badge */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 backdrop-blur-sm rounded-full border border-green-500/30">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-gray-800">
              Currently Engineering at Novum AI
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* MOBILE LAYOUT - Fixed spacing */}
          <div className="lg:hidden space-y-3 mb-12">
            {enhancedHistory.map((item, idx) => (
              <div
                key={`mobile-${idx}`}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Mobile Card Header - Compact spacing */}
                <div 
                  onClick={handleMobileCardClick(idx)}
                  className="p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Company Logo - Smaller */}
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
                            className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs"
                            style={{ display: item.imageSrc && item.imageSrc !== '/api/placeholder/80/80' ? 'none' : 'flex' }}
                          >
                            {item.organization.charAt(0)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Info - Compact layout */}
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

                    {/* Impact Badge - Compact */}
                    {/* <div className={`px-2 py-1 bg-gradient-to-r ${item.color} rounded-full shadow-sm flex-shrink-0`}>
                      <span className="text-white font-bold text-xs">{item.impact}</span>
                    </div> */}

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
                  <div className="px-3 pb-3 border-t border-gray-100">
                    <div className="pt-3 space-y-3">
                      
                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <HiCheckCircle className="w-4 h-4 text-green-600" />
                          Key Achievements
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
                      <div className="pt-2 border-t border-gray-100">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">TECH STACK</h5>
                        <div className="flex flex-wrap gap-1">
                          {item.techStack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium border border-primary/20">
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

          {/* DESKTOP LAYOUT - Theater Style (unchanged) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Main Experience Display */}
            <div className="lg:col-span-2">
              <div className="group relative h-[600px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20">
                
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                {/* Active Experience Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {/* Company logo */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border border-gray-100 group-hover:border-primary/30 transition-all duration-300">
                          <div className={`w-full h-full bg-gradient-to-br ${enhancedHistory[activeCard].color} p-1`}>
                            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                              {enhancedHistory[activeCard].imageSrc && enhancedHistory[activeCard].imageSrc !== '/api/placeholder/80/80' ? (
                                <img 
                                  src={getImageURL(enhancedHistory[activeCard].imageSrc)} 
                                  alt={enhancedHistory[activeCard].organization}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div 
                                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                                style={{ display: enhancedHistory[activeCard].imageSrc && enhancedHistory[activeCard].imageSrc !== '/api/placeholder/80/80' ? 'none' : 'flex' }}
                              >
                                {enhancedHistory[activeCard].organization.charAt(0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                          {enhancedHistory[activeCard].role}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                          <p className="text-base font-semibold text-secondary">
                            {enhancedHistory[activeCard].organization}
                          </p>
                          {enhancedHistory[activeCard].location && (
                            <>
                              <span className="hidden sm:block text-gray-500">•</span>
                              <div className="flex items-center gap-1 text-gray-600">
                                <HiLocationMarker className="w-3 h-3" />
                                <span className="text-xs font-medium">{enhancedHistory[activeCard].location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className={`px-3 py-1.5 bg-gradient-to-r ${enhancedHistory[activeCard].color} rounded-full shadow-md`}>
                      <span className="text-white font-bold text-xs">{enhancedHistory[activeCard].impact}</span>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-xl border border-primary/20">
                      <HiClock className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">
                        {`${enhancedHistory[activeCard].startDate} - ${enhancedHistory[activeCard].endDate}`}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="flex-1 space-y-4">
                    <h4 className="text-base font-semibold text-secondary mb-3 flex items-center gap-2">
                      <HiCheckCircle className="w-4 h-4 text-green-600" />
                      Key Achievements
                    </h4>
                    
                    <div className="space-y-3">
                      {enhancedHistory[activeCard].experiences.map((exp, i) => (
                        <div key={i} className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:shadow-sm">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${enhancedHistory[activeCard].color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-sm text-secondary leading-relaxed group-hover/item:text-primary transition-colors duration-300 flex-1">
                            {exp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-xs font-semibold text-gray-600 mb-2">TECH STACK</h5>
                    <div className="flex flex-wrap gap-2">
                      {enhancedHistory[activeCard].techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div 
                    className={`h-full bg-gradient-to-r ${enhancedHistory[activeCard].color} transition-all duration-500 rounded-r-full`}
                    style={{ width: `${((activeCard + 1) / enhancedHistory.length) * 100}%` }}
                  />
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl"></div>
              </div>
            </div>

            {/* Experience Navigator */}
            <div className="space-y-3">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary">
                <HiMenuAlt2 className="w-5 h-5 text-accent" />
                Experience Timeline
              </h3>

              {enhancedHistory.map((item, idx) => (
                <div
                  key={`exp-${idx}`}
                  onClick={handleDesktopCardClick(idx)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border shadow-sm ${
                    activeCard === idx 
                      ? 'bg-white border-primary/30 scale-105 shadow-lg' 
                      : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {activeCard !== idx && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
                          className="w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs"
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

          {/* Bottom section */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              { value: enhancedHistory.length, label: "Positions", color: "text-primary" },
              { value: enhancedHistory.filter(h => h.endDate === 'Present').length, label: "Current", color: "text-accent" },
              { value: new Set(enhancedHistory.map(h => h.organization)).size, label: "Companies", color: "text-primary" },
              { value: "3+", label: "Years Exp", color: "text-accent" }
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
        </div>
      </div>
    </section>
  );
}