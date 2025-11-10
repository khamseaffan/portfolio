import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getImageURL } from '../utils';
import skills from '../data/skills.json'; 

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0); // Now using index instead of string
  const [featuredSkill, setFeaturedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileView, setMobileView] = useState('grid'); // 'grid' or 'featured'
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Memoize categorized skills
  const categorized = useMemo(() => {
    return skills.reduce((acc, skill) => {
      (acc[skill.category] ||= []).push(skill);
      return acc;
    }, {});
  }, []);

  const categories = useMemo(() => Object.keys(categorized), [categorized]);
  
  const currentCategoryName = categories[activeCategory];
  const filteredSkills = useMemo(() => {
    return categorized[currentCategoryName] || [];
  }, [activeCategory, categorized, currentCategoryName]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % categories.length);
    }, 4000); // Change category every 4 seconds

    return () => clearInterval(interval);
  }, [categories.length, isAutoPlaying, isVisible]);

  // Featured skills for different categories
  const featuredSkills = useMemo(() => {
    const featured = {
      'Programming Languages': skills.find(s => s.title === 'Python'),
      'Frontend Development': skills.find(s => s.title === 'React'),
      'Backend Development': skills.find(s => s.title === 'FastAPI'),
      'Cloud & DevOps': skills.find(s => s.title === 'AWS'),
      'Database Management': skills.find(s => s.title === 'PostgreSQL'),
      'Tools & Methodologies': skills.find(s => s.title === 'Git'),
      'Testing & Debugging': skills.find(s => s.title === 'PyTest')
    };
    return featured[currentCategoryName] || filteredSkills[0];
  }, [currentCategoryName, filteredSkills]);

  // Update featured skill when category changes
  useEffect(() => {
    if (featuredSkills) {
      setFeaturedSkill(featuredSkills);
    }
  }, [featuredSkills]);

  const getCategoryIcon = (category) => {
    const icons = {
      'Programming Languages': '💻',
      'Frontend Development': '🎨',
      'Backend Development': '⚙️',
      'Cloud & DevOps': '☁️',
      'Database Management': '🗄️',
      'Tools & Methodologies': '🛠️',
      'Testing & Debugging': '🔧'
    };
    return icons[category] || '📋';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Programming Languages': 'from-blue-500 to-purple-600',
      'Frontend Development': 'from-pink-500 to-rose-600',
      'Backend Development': 'from-green-500 to-emerald-600',
      'Cloud & DevOps': 'from-cyan-500 to-blue-600',
      'Database Management': 'from-orange-500 to-red-600',
      'Tools & Methodologies': 'from-gray-500 to-slate-600',
      'Testing & Debugging': 'from-yellow-500 to-orange-600'
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

  // Memoize click handlers
  const handleCategoryClick = useMemo(() => 
    (index) => () => {
      setActiveCategory(index);
      setIsAutoPlaying(false);
      // Resume auto-play after 10 seconds
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }, 
    []
  );

  const handleSkillClick = useMemo(() => 
    (skill) => () => {
      setFeaturedSkill(skill);
      setMobileView('featured');
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 8000);
    }, 
    []
  );

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
     <section
      ref={sectionRef}
      id="tech-stack"
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
                My Tech Stack
              </h2>
              <p className="text-secondary text-sm sm:text-base drop-shadow-sm">
                Technologies and tools I use to build scalable, modern applications
              </p>
            </div>
          </div>
        </div>

          {/* Auto-play Status and Controls - Glass Badge */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/40 backdrop-blur-2xl rounded-full shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-500">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse shadow-lg shadow-green-500/50' : 'bg-gray-400'}`} />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 drop-shadow-sm">
                {isAutoPlaying ? 'Auto-showcase' : 'Manual mode'}
              </span>
              <button
                onClick={toggleAutoPlay}
                className="ml-1 sm:ml-2 p-1 rounded-full hover:bg-white/30 transition-colors duration-300"
                title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
              >
                {isAutoPlaying ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Category Progress Bar - Glass Container */}
          <div className="max-w-xs sm:max-w-md mx-auto mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-medium text-secondary truncate drop-shadow-sm">
                {currentCategoryName}
              </span>
              <span className="text-xs sm:text-sm text-gray-600 drop-shadow-sm">
                {activeCategory + 1} / {categories.length}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 backdrop-blur-xl rounded-full overflow-hidden border border-white/30 shadow-lg">
              <div 
                className={`h-full bg-gradient-to-r ${getCategoryColor(currentCategoryName)} transition-all duration-500 rounded-full`}
                style={{ width: `${((activeCategory + 1) / categories.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Category Navigation Pills - Glass Badges */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 px-2">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={handleCategoryClick(index)}
                className={`group relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-500 overflow-hidden ${
                  activeCategory === index
                    ? 'scale-105 sm:scale-110'
                    : 'hover:scale-105'
                }`}
              >
                {/* Active background */}
                {activeCategory === index ? (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)} backdrop-blur-2xl border-2 border-white/30 shadow-lg group-hover:shadow-xl transition-all duration-500 rounded-full`} />
                ) : (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-full" />
                )}
                
                <span className={`relative flex items-center gap-1 ${activeCategory === index ? 'text-white drop-shadow-sm' : 'text-text drop-shadow-sm'}`}>
                  <span className="text-xs sm:text-sm">{getCategoryIcon(category)}</span>
                  <span className="hidden sm:inline text-xs">{category.split(' ')[0]}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Mobile View Toggle - Glass Buttons */}
          <div className="block lg:hidden mb-6">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setMobileView('grid')}
                className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 overflow-hidden ${
                  mobileView === 'grid'
                    ? 'scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {mobileView === 'grid' ? (
                  <div className="absolute inset-0 bg-orange-500/30 backdrop-blur-xl border-2 border-orange-400/50 shadow-lg group-hover:bg-orange-500/40 group-hover:border-orange-400/70 transition-all duration-500 rounded-lg" />
                ) : (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-lg" />
                )}
                <span className={`relative z-10 flex items-center gap-1 ${mobileView === 'grid' ? 'text-orange-900 drop-shadow-sm' : 'text-gray-800 drop-shadow-sm'}`}>
                  <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid
                </span>
              </button>
              {featuredSkill && (
                <button
                  onClick={() => setMobileView('featured')}
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 overflow-hidden ${
                    mobileView === 'featured'
                      ? 'scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  {mobileView === 'featured' ? (
                    <div className="absolute inset-0 bg-orange-500/30 backdrop-blur-xl border-2 border-orange-400/50 shadow-lg group-hover:bg-orange-500/40 group-hover:border-orange-400/70 transition-all duration-500 rounded-lg" />
                  ) : (
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500 rounded-lg" />
                  )}
                  <span className={`relative z-10 flex items-center gap-1 ${mobileView === 'featured' ? 'text-orange-900 drop-shadow-sm' : 'text-gray-600 drop-shadow-sm'}`}>
                    <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </span>
                </button>
              )}
            </div>
          </div>
        

        {/* Featured Skill Spotlight - Desktop always visible, Mobile conditional */}
        {featuredSkill && (
          <div className={`mb-12 sm:mb-16 ${mobileView === 'grid' ? 'hidden lg:block' : ''}`}>
            <div className="group relative max-w-4xl sm:max-w-5xl mx-auto bg-white/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-2 border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/60">
              
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl sm:rounded-3xl pointer-events-none" />
              
              <div className="relative z-10 p-4 sm:p-8">
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
                  
                  {/* Featured Skill Icon  */}
                  <div className="relative">
                    <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getCategoryColor(featuredSkill.category)} p-1.5 sm:p-2 shadow-xl border-2 border-white/40 bg-white/30 backdrop-blur-xl`}>
                      <div className="w-full h-full bg-white/90 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        {featuredSkill.imageSrc ? (
                          <img
                            src={getImageURL(featuredSkill.imageSrc)}
                            alt={featuredSkill.title}
                            className="w-12 h-12 sm:w-20 sm:h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-2xl"
                          style={{ display: featuredSkill.imageSrc ? 'none' : 'flex' }}
                        >
                          {featuredSkill.title.charAt(0)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Pulsing ring effect */}
                    <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${getCategoryColor(featuredSkill.category)} opacity-20 animate-ping`} />
                  </div>
                  
                  {/* Featured Skill Info  */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-2xl sm:text-4xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                        {featuredSkill.title}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-xl sm:text-2xl">{getCategoryIcon(featuredSkill.category)}</span>
                        <span className="text-base sm:text-xl font-medium text-secondary">{featuredSkill.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/30 backdrop-blur-xl rounded-full border-2 border-white/40 shadow-lg">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                        <span className="text-xs sm:text-sm font-medium text-gray-800 drop-shadow-sm">Currently using in projects</span>
                      </div>
                      
                      <div className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${getCategoryColor(featuredSkill.category)} backdrop-blur-xl rounded-full shadow-lg border-2 border-white/30`}>
                        <span className="text-white font-bold text-xs sm:text-sm drop-shadow-sm">Expert Level</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Current Category Skills Grid */}
        <div className={`mb-12 sm:mb-16 ${mobileView === 'featured' ? 'hidden lg:block' : ''}`}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative group p-4 rounded-2xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-title font-bold text-primary mb-2 flex items-center justify-center gap-2 sm:gap-3 drop-shadow-sm">
                  <span className="text-2xl sm:text-3xl">{getCategoryIcon(currentCategoryName)}</span>
                  <span className="truncate">{currentCategoryName}</span>
                </h3>
                <p className="text-secondary text-sm sm:text-base drop-shadow-sm">
                  {filteredSkills.length} skills in this category
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: 3 columns, Desktop: responsive grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-3 sm:gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={`${skill.title}-${idx}`}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skill.title)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={handleSkillClick(skill)}
              >
                <div className={`relative bg-white/30 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl border-2 border-white/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-3 hover:border-white/60 overflow-hidden cursor-pointer ${
                  featuredSkill?.title === skill.title ? 'ring-2 sm:ring-2 ring-primary scale-105' : ''
                }`}>
                  
                  {/* Card background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center space-y-2 sm:space-y-3">
                    
                    {/* Skill Icon  */}
                    <div className="relative w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-lg border-2 border-white/40 shadow-lg group-hover:border-white/60 transition-all duration-500" />
                      <div className="relative z-10">
                        {skill.imageSrc ? (
                          <img
                            src={getImageURL(skill.imageSrc)}
                            alt={skill.title}
                            className="w-6 h-6 sm:w-12 sm:h-12 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                          style={{ display: skill.imageSrc ? 'none' : 'flex' }}
                        >
                          {skill.title.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Glowing effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    </div>

                    {/* Skill Name  */}
                    <h4 className="text-xs sm:text-sm font-bold text-center text-text group-hover:text-primary transition-colors duration-300 leading-tight drop-shadow-sm">
                      {skill.title}
                    </h4>
                  </div>
                  
                  {/* Skill level indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 backdrop-blur-xl rounded-b-xl sm:rounded-b-2xl overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} w-0 group-hover:w-full transition-all duration-700 delay-300`} />
                  </div>
                </div>

                {/* Enhanced Tooltip - Hidden on mobile */}
                {hoveredSkill === skill.title && (
                  <div className="hidden sm:block absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      <div className="font-semibold">{skill.title}</div>
                      <div className="text-gray-300">Click to feature</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA - Glass Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/40 backdrop-blur-2xl rounded-full shadow-xl border-2 border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse shadow-lg shadow-primary/50" />
            <span className="text-xs sm:text-sm font-semibold text-gray-900 drop-shadow-sm">
              {skills.length}+ technologies across {categories.length} categories
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}