import React, { useState, useRef, useEffect, useMemo } from 'react'
import { HiChevronDown, HiMenuAlt2 } from 'react-icons/hi'
import { getImageURL } from '../utils'
import projects from '../data/projects.json'

const enhanceProjectsData = (rawProjects) => {
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-green-500 to-emerald-400',
    'from-orange-500 to-red-400',
    'from-indigo-500 to-purple-400',
    'from-teal-500 to-green-400'
  ]

  return rawProjects.map((project, idx) => ({
    ...project,
    color: colors[idx] || 'from-gray-500 to-slate-400',
    category: project.category || 'Full Stack',
    impact: project.impact || 'High Impact',
    status: project.status || 'Complete'
  }))
}

export default function Projects() {
  const enhanced = useMemo(() => enhanceProjectsData(projects), [])
  const [active, setActive] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(null)
  const [filter, setFilter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // intersection observer for reveal-on-scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // build category list
  const categories = useMemo(() => {
    const cats = new Set(enhanced.flatMap(p =>
      Array.isArray(p.category) ? p.category : [p.category]
    ))
    return ['all', ...cats]
  }, [enhanced])

  // filter projects
  const filtered = useMemo(
    () =>
      filter === 'all'
        ? enhanced
        : enhanced.filter(p => {
            const cats = Array.isArray(p.category)
              ? p.category
              : [p.category]
            return cats.includes(filter)
          }),
    [enhanced, filter]
  )

  const handleDesktopClick = useMemo(
    () => idx => () => setActive(idx),
    []
  )
  const handleMobileClick = useMemo(
    () => idx => () =>
      setMobileOpen(prev => (prev === idx ? null : idx)),
    []
  )
  const handleFilter = useMemo(
    () => cat => () => {
      setFilter(cat)
      setActive(0)
      setMobileOpen(null)
    },
    []
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-text font-body py-8 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
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
                Featured Projects
              </h2>
              <p className="text-secondary text-sm sm:text-base drop-shadow-sm">
                A showcase of full-stack applications and innovative solutions I've built
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter - Glass Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={handleFilter(cat)}
              className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 overflow-hidden ${
                filter === cat
                  ? 'scale-105'
                  : 'hover:scale-105'
              }`}
            >
              {filter === cat ? (
                <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-2xl border-2 border-blue-400/50 shadow-lg group-hover:bg-blue-500/40 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 rounded-full" />
              ) : (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-2 border-white/30 shadow-md group-hover:bg-white/30 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-full" />
              )}
              <span className={`relative z-10 ${filter === cat ? 'font-bold text-blue-900 drop-shadow-sm' : 'text-text drop-shadow-sm'}`}>
                {cat === 'all' ? 'All Projects' : cat}
              </span>
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          {/* MOBILE */}
          <div className="lg:hidden space-y-4 mb-12">
            {filtered.map((proj, i) => (
              <div
                key={i}
                className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-white/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/60"
              >
                {/* header */}
                <div
                  onClick={handleMobileClick(i)}
                  className="p-3 cursor-pointer hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    {/* thumbnail */}
                    <div
                      className={`w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br ${proj.color} flex items-center justify-center`}
                    >
                      {proj.imageSrc &&
                      proj.imageSrc !== 'projects/project.png' ? (
                        <img
                          src={getImageURL(proj.imageSrc)}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xl">
                          {proj.title.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* title & snippet */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary text-sm truncate">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {proj.description}
                      </p>
                    </div>

                    <HiChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        mobileOpen === i ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* expandable */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    mobileOpen === i
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-3 pb-3 border-t border-white/30 space-y-3 bg-white/20 backdrop-blur-xl">
                    <p className="text-xs text-gray-800 leading-relaxed drop-shadow-sm">
                      {proj.description}
                    </p>

                    {/* tech stack */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2 drop-shadow-sm">
                        TECH STACK
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {proj.skills?.map((s, ii) => (
                          <span
                            key={ii}
                            className="px-2 py-0.5 text-xs font-medium bg-primary/20 backdrop-blur-xl text-primary rounded-md border border-primary/30 drop-shadow-sm"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* links */}
                    <div className="flex items-center gap-2">
                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${proj.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover:shadow-xl transition-all duration-500 rounded-lg`} />
                          <span className="relative z-10 text-white drop-shadow-sm">Live Demo</span>
                        </a>
                      )}
                      {proj.source && (
                        <a
                          href={proj.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg group-hover:bg-white/40 group-hover:border-white/60 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                          <span className="relative z-10 text-gray-800 drop-shadow-sm">Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            {/* main display */}
            <div className="lg:col-span-2">
              <div className="group relative h-[650px] bg-white/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-2 border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-white/60">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* image or gradient */}
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    {filtered[active]?.imageSrc &&
                    filtered[active].imageSrc !== 'projects/project.png' ? (
                      <img
                        src={getImageURL(filtered[active].imageSrc)}
                        alt={filtered[active].title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${filtered[active].color} flex items-center justify-center`}
                      >
                        <span className="text-4xl font-bold text-white">
                          {filtered[active].title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* status badge */}
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${filtered[active].color} backdrop-blur-xl rounded-full text-xs font-medium text-white border-2 border-white/30 shadow-lg`}
                    >
                      {filtered[active].status}
                    </div>
                    {/* impact */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/40 backdrop-blur-xl rounded-full text-xs font-medium text-primary border-2 border-white/50 shadow-lg">
                      {filtered[active].impact}
                    </div>
                  </div>

                  {/* content */}
                  <div className="flex-1 flex flex-col p-6 space-y-4">
                    <h3 className="text-2xl font-title font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {filtered[active].title}
                    </h3>
                    <p className="text-sm text-text leading-relaxed flex-1">
                      {filtered[active].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {filtered[active].skills
                        ?.slice(0, 6)
                        .map((s, ii) => (
                          <span
                            key={ii}
                            className="px-2 py-1 text-xs font-medium bg-primary/20 backdrop-blur-xl text-primary rounded-md border border-primary/30 transition-all duration-500 group-hover:bg-primary/30 group-hover:border-primary/50 drop-shadow-sm"
                          >
                            {s}
                          </span>
                        ))}
                      {filtered[active].skills?.length > 6 && (
                        <span className="px-2 py-1 text-xs font-medium bg-white/30 backdrop-blur-xl text-gray-800 rounded-md border border-white/40 drop-shadow-sm">
                          +{filtered[active].skills.length - 6}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      {filtered[active].demo && (
                        <a
                          href={filtered[active].demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${filtered[active].color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`} />
                          <span className="relative z-10 text-white drop-shadow-sm">Live Demo</span>
                        </a>
                      )}
                      {filtered[active].source && (
                        <a
                          href={filtered[active].source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg group-hover/btn:bg-white/40 group-hover/btn:border-white/60 group-hover/btn:shadow-xl transition-all duration-500 rounded-lg" />
                          <span className="relative z-10 text-gray-800 drop-shadow-sm">Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 backdrop-blur-xl">
                    <div
                      className={`h-full bg-gradient-to-r ${filtered[active].color} transition-all duration-500 rounded-r-full`}
                      style={{
                        width: `${
                          ((active + 1) / filtered.length) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* navigator */}
            <div className="space-y-3">
              <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-primary">
                <HiMenuAlt2 className="w-5 h-5 text-accent" />
                Project Portfolio
              </h3>
              {filtered.map((proj, i) => (
                <div
                  key={i}
                  onClick={handleDesktopClick(i)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden ${
                    active === i
                      ? 'scale-105'
                      : 'hover:-translate-y-0.5'
                  }`}
                >
                  {active === i ? (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-lg rounded-2xl" />
                  ) : (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl border-2 border-white/40 shadow-md group-hover:bg-white/35 group-hover:border-white/50 group-hover:shadow-xl transition-all duration-500 rounded-2xl" />
                  )}
                  {active !== i && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${proj.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                    >
                      {proj.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-primary truncate text-sm">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">
                        {proj.category}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">
                          {proj.impact}
                        </span>
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            proj.status === 'Live'
                              ? 'bg-green-400 animate-pulse'
                              : proj.status === 'In Progress'
                              ? 'bg-yellow-400 animate-pulse'
                              : 'bg-blue-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  {active === i && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${proj.color} rounded-full`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
