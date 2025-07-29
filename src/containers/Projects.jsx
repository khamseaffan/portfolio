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
      className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-bg text-text font-body py-8 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* background blobs */}
      <div className="absolute top-[-60px] left-[-10vw] w-[60vw] h-[30vh] bg-accent/10 blur-[80px] rounded-full" />
      <div className="absolute bottom-[-60px] right-[-10vw] w-[55vw] h-[40vh] bg-primary/10 blur-[70px] rounded-full" />

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-header font-semibold text-center uppercase tracking-wide mb-4 text-primary">
          Featured Projects
        </h2>
        <p className="text-center text-secondary mb-12 max-w-xl mx-auto text-sm sm:text-base px-2">
          A showcase of full-stack applications and innovative solutions I’ve built
        </p>

        {/* category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={handleFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-gray-200 font-bold border-2 text-black shadow-lg scale-105'
                  : 'bg-white text-text border border-gray-300 hover:border-black hover:shadow-md hover:scale-105'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          {/* MOBILE */}
          <div className="lg:hidden space-y-4 mb-12">
            {filtered.map((proj, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* header */}
                <div
                  onClick={handleMobileClick(i)}
                  className="p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
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
                  <div className="px-3 pb-3 border-t border-gray-100 space-y-3">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* tech stack */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-600 mb-2">
                        TECH STACK
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {proj.skills?.map((s, ii) => (
                          <span
                            key={ii}
                            className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20"
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
                          className={`flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r ${proj.color} text-white rounded-lg font-medium text-xs transition-all duration-300 hover:shadow-md`}
                        >
                          Live Demo
                        </a>
                      )}
                      {proj.source && (
                        <a
                          href={proj.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-xs transition-all duration-300 hover:bg-gray-200"
                        >
                          Source
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
              <div className="group relative h-[650px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

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
                      className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${filtered[active].color} backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20`}
                    >
                      {filtered[active].status}
                    </div>
                    {/* impact */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-white/20">
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
                            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20 transition-all duration-300 group-hover:bg-gray-500 group-hover:text-white"
                          >
                            {s}
                          </span>
                        ))}
                      {filtered[active].skills?.length > 6 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
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
                          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${filtered[active].color} text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:scale-105`}
                        >
                          Live Demo
                        </a>
                      )}
                      {filtered[active].source && (
                        <a
                          href={filtered[active].source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-200 hover:shadow-md hover:-translate-y-1 group-hover:scale-105"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
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

                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-3xl" />
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
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border shadow-sm ${
                    active === i
                      ? 'bg-white border-primary/30 scale-105 shadow-lg'
                      : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {active !== i && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
