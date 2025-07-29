import React, { useState, useRef, useEffect } from 'react';
import { 
  HiAcademicCap, 
  HiCalendar, 
  HiLocationMarker,
  HiStar,
  HiSparkles
} from 'react-icons/hi';
import educationData from '../data/education.json';
import { getImageURL } from '../utils';

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
      className="relative bg-gradient-to-br from-gray-100 via-white to-gray-100 py-8 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background blur effects - Subtle colors */}
      <div className="absolute top-[-40px] sm:top-[-60px] left-[-10vw] sm:left-[-8vw] w-[60vw] sm:w-[50vw] h-[25vh] sm:h-[35vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-blue-200/20 blur-[60px] sm:blur-[80px] rounded-full" />
      <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-[-10vw] sm:right-[-8vw] w-[55vw] sm:w-[45vw] h-[30vh] sm:h-[40vh] min-w-[220px] sm:min-w-[280px] min-h-[220px] sm:min-h-[280px] bg-purple-200/20 blur-[60px] sm:blur-[70px] rounded-full" />
      
      <div className="relative z-10">
        
        {/* Header with improved contrast */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Education
          </h2>
          <p className="text-gray-700 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Academic foundation in computer science and engineering
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile: Stacked cards, Desktop: 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {educationData.map((edu, idx) => (
              <div key={idx} className="w-full">
                <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-white shadow-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-blue-300 p-5 sm:p-6 md:p-8 overflow-hidden">
                  
                  {/* Card background gradient - subtle */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    
                    {/* Header with logo and degree */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-5 sm:mb-6">
                      
                      {/* Institution Logo */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-md border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300">
                          <img
                            src={getImageURL(edu.imageSrc)}
                            alt={`Logo of ${edu.institution}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          {/* Image Fallback */}
                          <div 
                            className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-xl md:text-2xl"
                            style={{ display: 'none' }}
                          >
                            {edu.institution.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                          </div>
                        </div>
                        
                        {/* Graduation cap with modern icon */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                          <HiAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                      
                      {/* Education Details */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-lg sm:text-lg md:text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-base sm:text-sm md:text-lg font-semibold text-gray-800 mb-2 sm:mb-2">
                          {edu.fieldOfStudy}
                        </p>
                        <p className="text-xs sm:text-base md:text-sm font-medium text-gray-600 mb-4 sm:mb-4">
                          {edu.institution}
                        </p>

                        {/* Graduation details */}
                        <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-full border border-blue-300 group-hover:bg-blue-200 transition-colors duration-300">
                            <HiCalendar className="w-4 h-4 text-blue-700" />
                            <span className="text-xs font-semibold text-blue-800">{edu.startYear} - {edu.graduationYear}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full border border-green-300 group-hover:bg-green-200 transition-colors duration-300">
                            <HiStar className="w-4 h-4 text-green-700" />
                            <span className="text-xs font-semibold text-green-800">GPA {edu.gpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 bg-gray-100 rounded-xl group-hover:bg-blue-50 transition-all duration-300 border border-gray-300 group-hover:border-blue-300">
                        <HiLocationMarker className="w-4 h-4 text-blue-700 flex-shrink-0" />
                        <span className="text-xs font-medium text-gray-800 group-hover:text-blue-800 transition-colors duration-300">
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border-2 border-gray-300 hover:shadow-xl hover:scale-105 hover:border-blue-400 transition-all duration-300 group">
              <HiAcademicCap className="w-6 h-6 text-blue-700 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                Recent NYU Graduate - Class of 2025
              </span>
              <HiSparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}