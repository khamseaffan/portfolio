import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getImageURL } from '../utils';
import projects from '../data/projects.json'; 

const enhanceProjectsData = (rawProjects) => {
  const colors = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400", 
    "from-green-500 to-emerald-400",
    "from-orange-500 to-red-400",
    "from-indigo-500 to-purple-400",
    "from-teal-500 to-green-400"
  ];

  return rawProjects.map((project, idx) => ({
    ...project,
    color: colors[idx] || "from-gray-500 to-slate-400",
    category: project.category || "Full Stack",
    impact: project.impact || "High Impact",
    status: project.status || "Complete"
  }));
};

export default function Projects() {
  const enhancedProjects = useMemo(() => enhanceProjectsData(projects), []);
  const [activeProject, setActiveProject] = useState(0);
  const [mobileExpandedProject, setMobileExpandedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
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
    const cats = ['all', ...new Set(enhancedProjects.map(p => p.category))];
    return cats;
  }, [enhancedProjects]);

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    return filterCategory === 'all' 
      ? enhancedProjects 
      : enhancedProjects.filter(p => p.category === filterCategory);
  }, [enhancedProjects, filterCategory]);

  // Desktop click handlers (unchanged)
  const handleDesktopProjectClick = useMemo(() => 
    (idx) => () => setActiveProject(idx), 
    []
  );

  // Mobile click handler with toggle functionality
  const handleMobileProjectClick = useMemo(() => 
    (idx) => () => setMobileExpandedProject(prev => prev === idx ? null : idx), 
    []
  );

  const handleCategoryClick = useMemo(() => 
    (category) => () => {
      setFilterCategory(category);
      setActiveProject(0);
      setMobileExpandedProject(null);
    }, 
    []
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-bg text-text font-body py-12 sm:py-12 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background decorative elements  */}
      <div className="absolute top-[-40px] sm:top-[-60px] left-[-10vw] sm:left-[-8vw] w-[60vw] sm:w-[50vw] h-[25vh] sm:h-[35vh] min-w-[250px] sm:min-w-[300px] min-h-[200px] sm:min-h-[250px] bg-accent/10 blur-[60px] sm:blur-[80px] rounded-full" />
      <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-[-10vw] sm:right-[-8vw] w-[55vw] sm:w-[45vw] h-[30vh] sm:h-[40vh] min-w-[220px] sm:min-w-[280px] min-h-[220px] sm:min-h-[280px] bg-primary/10 blur-[60px] sm:blur-[70px] rounded-full" />
      
      <div className="relative z-10">
        {/* Header  */}
        <h2 className="text-2xl sm:text-3xl font-header font-semibold text-center uppercase tracking-wide mb-3 sm:mb-4 text-primary">
          Featured Projects
        </h2>
        <p className="text-center text-secondary mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base px-2">
          A showcase of full-stack applications and innovative solutions I've built
        </p>

        {/* Category Filter  */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={handleCategoryClick(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filterCategory === category
                  ? 'bg-gray-200 font-bold border-2 text-black shadow-lg scale-105 sm:scale-110'
                  : 'bg-white text-text border border-gray-300 hover:border-black hover:shadow-md hover:scale-105'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* MOBILE LAYOUT - Project Cards (visible only on mobile) */}
          <div className="lg:hidden space-y-4 mb-12">
            {filteredProjects.map((project, idx) => (
              <div
                key={`mobile-proj-${idx}`}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Mobile Project Header - Always Visible */}
                <div 
                  onClick={handleMobileProjectClick(idx)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Project Image/Preview */}
                  <div className="relative h-32 overflow-hidden">
                    {project.imageSrc && project.imageSrc !== 'projects/project.png' ? (
                      <img
                        src={getImageURL(project.imageSrc)}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}
                      style={{ 
                        display: project.imageSrc && project.imageSrc !== 'projects/project.png' ? 'none' : 'flex' 
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold mb-1">
                          {project.title.charAt(0)}
                        </div>
                        <div className="text-xs opacity-90">
                          {project.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status and Impact badges */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <div className={`px-2 py-1 bg-gradient-to-r ${project.color} backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-white/20">
                        {project.impact}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight mb-1 truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{project.category}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'Live' ? 'bg-green-400 animate-pulse' :
                            project.status === 'In Progress' ? 'bg-yellow-400 animate-pulse' :
                            'bg-blue-400'
                          }`} />
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div className="flex-shrink-0 ml-3">
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            mobileExpandedProject === idx ? 'rotate-180' : ''
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

                {/* Mobile Project Expandable Content */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  mobileExpandedProject === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      
                      {/* Full Description */}
                      <div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Skills Tags */}
                      <div>
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">TECH STACK</h5>
                        <div className="flex flex-wrap gap-1">
                          {project.skills?.map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${project.color} text-white rounded-lg font-medium text-xs transition-all duration-300 hover:shadow-md`}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                        
                        {project.source && (
                          <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-xs transition-all duration-300 hover:bg-gray-200"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP LAYOUT - Theater Style (unchanged, hidden on mobile) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Main Project Display */}
            <div className="lg:col-span-2">
              <div className="group relative h-[650px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20">
                
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                {/* Active Project Content */}
                <div className="relative z-10 h-full flex flex-col">
                  
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    {filteredProjects[activeProject]?.imageSrc && 
                     filteredProjects[activeProject]?.imageSrc !== 'projects/project.png' ? (
                      <img
                        src={getImageURL(filteredProjects[activeProject].imageSrc)}
                        alt={filteredProjects[activeProject]?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${filteredProjects[activeProject]?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center`}
                      style={{ 
                        display: filteredProjects[activeProject]?.imageSrc && 
                                 filteredProjects[activeProject]?.imageSrc !== 'projects/project.png' ? 'none' : 'flex' 
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="text-4xl font-bold mb-2">
                          {filteredProjects[activeProject]?.title.charAt(0)}
                        </div>
                        <div className="text-sm opacity-90">
                          {filteredProjects[activeProject]?.category}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Project status indicator */}
                    <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${filteredProjects[activeProject]?.color} backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20`}>
                      {filteredProjects[activeProject]?.status}
                    </div>

                    {/* Impact badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-white/20">
                      {filteredProjects[activeProject]?.impact}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6 space-y-4">
                    
                    {/* Title */}
                    <h3 className="text-2xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                      {filteredProjects[activeProject]?.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-text leading-relaxed flex-1">
                      {filteredProjects[activeProject]?.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {filteredProjects[activeProject]?.skills?.slice(0, 6).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                      {(filteredProjects[activeProject]?.skills?.length || 0) > 6 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                          +{(filteredProjects[activeProject]?.skills?.length || 0) - 6}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                      {filteredProjects[activeProject]?.demo && (
                        <a
                          href={filteredProjects[activeProject].demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${filteredProjects[activeProject].color} text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:scale-105`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      
                      {filteredProjects[activeProject]?.source && (
                        <a
                          href={filteredProjects[activeProject].source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md hover:-translate-y-1 group-hover:scale-105"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <div 
                      className={`h-full bg-gradient-to-r ${filteredProjects[activeProject]?.color} transition-all duration-500 rounded-r-full`}
                      style={{ width: `${((activeProject + 1) / filteredProjects.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl"></div>
              </div>
            </div>

            {/* Projects Navigator */}
            <div className="space-y-3">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Project Portfolio
              </h3>

              {filteredProjects.map((project, idx) => (
                <div
                  key={`proj-${idx}`}
                  onClick={handleDesktopProjectClick(idx)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border shadow-sm ${
                    activeProject === idx 
                      ? 'bg-white border-primary/30 scale-105 shadow-lg' 
                      : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {activeProject !== idx && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                      {project.title.charAt(0)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-primary group-hover:text-accent transition-colors duration-300 truncate text-sm">
                        {project.title}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">{project.category}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{project.impact}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          project.status === 'Live' ? 'bg-green-400 animate-pulse' :
                          project.status === 'In Progress' ? 'bg-yellow-400 animate-pulse' :
                          'bg-blue-400'
                        }`} />
                      </div>
                    </div>
                  </div>

                  {activeProject === idx && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${project.color} rounded-full`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row  */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              { value: enhancedProjects.length, label: "Projects", color: "text-primary" },
              { value: enhancedProjects.filter(p => p.demo).length, label: "Live Demos", color: "text-accent" },
              { value: categories.length - 1, label: "Categories", color: "text-primary" },
              { value: enhancedProjects.filter(p => p.status === 'Live').length, label: "Production", color: "text-accent" }
            ].map((stat, idx) => (
              <div key={idx} className="group relative text-center p-4 sm:p-6 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-secondary font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}