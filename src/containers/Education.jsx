import React, { useState, useRef, useEffect } from 'react';
import educationData from '../data/education.json'
import { getImageURL } from '../utils'

export default function Education() {
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

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative bg-gradient-to-br from-bg via-gray-300 to-bg text-text font-body py-4 sm:py-10 md:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background blur effects - Responsive sizing */}
      <div className="absolute top-[-40px] sm:top-[-60px] left-[-10vw] sm:left-[-8vw] w-[60vw] sm:w-[50vw] h-[25vh] sm:h-[35vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-primary/10 blur-[60px] sm:blur-[80px] rounded-full" />
      <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-[-10vw] sm:right-[-8vw] w-[55vw] sm:w-[45vw] h-[30vh] sm:h-[40vh] min-w-[220px] sm:min-w-[280px] min-h-[220px] sm:min-h-[280px] bg-accent/10 blur-[60px] sm:blur-[70px] rounded-full" />
      
      <div className="relative z-10">
        
        {/* Header - Enhanced mobile typography */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header font-semibold text-center text-primary uppercase tracking-wide mb-3 sm:mb-4">
            Education
          </h2>
          <p className="text-center text-secondary mb-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Academic foundation in computer science and engineering
          </p>
        </div>

        {/* Education Cards - Enhanced mobile layout */}
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile: Stacked cards, Desktop: 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {educationData.map((edu, idx) => (
              <div key={idx} className="w-full">
                <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-primary/20 p-5 sm:p-6 md:p-8 overflow-hidden">
                  
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    
                    {/* Header with logo and degree - Improved mobile layout */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-5 sm:mb-6">
                      
                      {/* Institution Logo - Enhanced mobile sizing */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md border-2 border-gray-100 group-hover:border-primary/20 transition-all duration-300">
                          <img
                            src={getImageURL(edu.imageSrc)}
                            alt={`Logo of ${edu.institution}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Enhanced fallback */}
                          <div 
                            className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-bg font-bold text-xl sm:text-xl md:text-2xl"
                            style={{ display: 'none' }}
                          >
                            {edu.institution.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                          </div>
                        </div>
                        
                        {/* Graduation cap - Enhanced animation */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Education Details - Optimized for mobile */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-lg sm:text-lg md:text-xl font-title font-bold text-primary leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-base sm:text-sm md:text-lg font-semibold text-text mb-2 sm:mb-2">
                          {edu.fieldOfStudy}
                        </p>
                        <p className="text-xs sm:text-base md:text-sm font-medium text-secondary mb-4 sm:mb-4">
                          {edu.institution}
                        </p>

                        {/* Graduation details */}
                        <div className="flex flex-row sm:flex-row items-center sm:items-start gap-2 sm:gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-primary">Class of {edu.graduationYear}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-semibold text-accent">GPA {edu.gpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location - Enhanced styling */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300 border border-gray-200 group-hover:border-primary/20">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-primary group-hover:text-accent transition-colors duration-300">
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced decorative elements */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced bottom section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <div className="w-6 h-6 text-primary flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors duration-300">
                Recent NYU Graduate - Class of 2025
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}