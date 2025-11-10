import { 
  HiMail, 
  HiDownload,
  HiSparkles
} from 'react-icons/hi'
import { 
  FaLinkedin, 
  FaGithub 
} from 'react-icons/fa'
import Typewriter from '../utility/Typewriter/Typewriter'
import { getImageURL } from '../utils';

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Cloud & AI Engineer'
]

export default function Summary() {
  return (
    <section
      id="summary"
      className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-[10%] pt-20 sm:pt-24 pb-8 overflow-hidden"
    >
      {/* Enhanced Background decorative elements - Apple style liquid glass with more vibrant colors */}
      <div className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-gradient-to-br from-blue-400 to-cyan-300 opacity-60 blur-[100px] sm:blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-gradient-to-br from-purple-400 to-pink-300 opacity-60 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 opacity-30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Additional vibrant blobs for glass effect visibility */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-400 opacity-40 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-400 opacity-40 blur-[120px] rounded-full" />
      
      {/* Floating glass panels for depth - more visible */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl rotate-12 opacity-70 animate-float" />
      <div className="absolute bottom-32 left-8 w-24 h-24 bg-white/30 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-xl -rotate-12 opacity-60 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Column: Profile Image + Buttons - Prominent Glass Card */}
        <div className="relative flex-shrink-0 w-full flex flex-col items-center lg:items-start lg:justify-end lg:w-2/5 gap-6 sm:gap-8">
          
          {/* Profile Image - Prominent Glassmorphic Card */}
          <div className="flex justify-center lg:justify-start w-full">
            <div className="relative group p-6 rounded-[30%] bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500">
              {/* Subtle gradient overlay for glass depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-[30%] pointer-events-none" />
              
              {/* Image container */}
              <div className="relative z-10">
                <img
                  className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] rounded-[20%] shadow-2xl animate-floating hover:scale-105 transition-all ease-in-out duration-500"
                  src={getImageURL('summary/summaryImage.jpeg')}
                  alt="Affan Khamse - Software Engineer"
                  loading="lazy"
                  fetchpriority="low"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback for image loading error */}
                <div 
                  className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] aspect-square rounded-[20%] shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl sm:text-7xl font-bold text-white"
                  style={{ display: 'none' }}
                >
                  AK
                </div>
              </div>
              
              {/* Glass reflection effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-[30%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            </div>
          </div>

          {/* Call-to-Action Section - Glassmorphic */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full max-w-[360px]">

            {/* Download Resume Button - Glass Effect */}
            <a
              href="/resume.pdf"
              download
              className="group relative w-full font-medium text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-center overflow-hidden transition-all duration-500 active:scale-95"
            >
              {/* Glass background with blue tint */}
              <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xl rounded-full border-2 border-blue-500/50 shadow-xl group-hover:bg-blue-600/90 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/50 to-blue-400/0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Resume
              </span>
            </a>

            {/* Social Media Icons - Glass Effect */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">

              {/* Email - Glass Button */}
              <a
                href="mailto:khamseaffan@gmail.com"
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 active:scale-95"
                aria-label="Send email to Affan Khamse"
                title="Send me an email"
              >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border-2 border-white/30 shadow-lg group-hover:bg-white/30 group-hover:border-white/50 group-hover:shadow-xl group-hover:shadow-white/20 transition-all duration-500" />
                <HiMail className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-gray-800 group-hover:text-gray-900 transition-colors duration-300" />
              </a>

              {/* LinkedIn - Glass Button */}
              <a
                href="https://www.linkedin.com/in/affan-khamse/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 active:scale-95"
                aria-label="Connect on LinkedIn"
              >
                <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xl rounded-full border-2 border-blue-500/50 shadow-lg group-hover:bg-blue-600/90 group-hover:border-blue-400/70 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500" />
                <FaLinkedin className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>

              {/* GitHub - Glass Button */}
              <a
                href="https://github.com/khamseaffan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 active:scale-95"
                aria-label="View GitHub profile"
              >
                <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl rounded-full border-2 border-gray-700/50 shadow-lg group-hover:bg-gray-800/90 group-hover:border-gray-600/70 group-hover:shadow-xl group-hover:shadow-gray-700/50 transition-all duration-500" />
                <FaGithub className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
            </div>

            {/* Status Indicator - Prominent Glass Effect */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-full mt-2 px-4 py-2.5 rounded-full bg-white/40 backdrop-blur-2xl border-2 border-white/50 shadow-xl">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-xs sm:text-sx font-semibold text-gray-900 drop-shadow-sm">
                Available for hire • Actively pursuing Software roles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Content Section - Prominent Glassmorphic */}
        <div className="flex flex-col items-center lg:items-start gap-5 sm:gap-6 z-20 text-center lg:text-left lg:flex-1">
          
          {/* Main Heading - Prominent Glass Container */}
          <div className="relative group p-6 rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
            <div className="relative">
              <h1 className="text-gray-700 text-lg sm:text-xl md:text-2xl font-medium leading-tight drop-shadow-sm">
                Hello, I'm
              </h1>
              <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mt-1 drop-shadow-md">
                Affan Khamse
              </h2>
            </div>
          </div>

          {/* Typewriter Component - Prominent Glass Badge */}
          <div className="relative px-6 py-3 rounded-full bg-blue-500/30 backdrop-blur-2xl border-2 border-blue-400/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
            <div className="min-h-[1.5rem] sm:min-h-[2rem] flex items-center text-blue-700">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-sm">
                <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
              </span>
            </div>
          </div>

          {/* Description - Prominent Glass Card */}
          <div className="relative p-6 rounded-3xl bg-white/30 backdrop-blur-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
            <p className="relative text-sm sm:text-base md:text-lg text-gray-900 max-w-full sm:max-w-xl lg:max-w-lg leading-relaxed drop-shadow-sm font-medium">
              From mentoring 50+ NYU students to architecting microservices that never sleep - I build backend systems that scale and AI solutions that actually work in production. Currently making phone calls smarter, one API at a time.
            </p>
          </div>

          {/* Quick highlights - Prominent Glass Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center lg:justify-start">
            {/* Backend Expert - Glass Badge */}
            <div className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-500 hover:scale-110 hover:-translate-y-1">
              <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-2xl border-2 border-blue-400/50 shadow-lg group-hover:bg-blue-500/40 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 rounded-full" />
              <HiSparkles className="relative z-10 w-4 h-4 text-blue-700 group-hover:text-blue-800 transition-colors duration-300 drop-shadow-sm" />
              <span className="relative z-10 text-xs sm:text-sm font-semibold text-blue-900 drop-shadow-sm">Backend Expert</span>
            </div>
            
            {/* AI/ML Engineer - Glass Badge */}
            <div className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-500 hover:scale-110 hover:-translate-y-1">
              <div className="absolute inset-0 bg-purple-500/30 backdrop-blur-2xl border-2 border-purple-400/50 shadow-lg group-hover:bg-purple-500/40 group-hover:border-purple-400/70 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 rounded-full" />
              <HiSparkles className="relative z-10 w-4 h-4 text-purple-700 group-hover:text-purple-800 transition-colors duration-300 drop-shadow-sm" />
              <span className="relative z-10 text-xs sm:text-sm font-semibold text-purple-900 drop-shadow-sm">AI/ML Engineer</span>
            </div>
            
            {/* Cloud Architect - Glass Badge */}
            <div className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-500 hover:scale-110 hover:-translate-y-1">
              <div className="absolute inset-0 bg-green-500/30 backdrop-blur-2xl border-2 border-green-400/50 shadow-lg group-hover:bg-green-500/40 group-hover:border-green-400/70 group-hover:shadow-2xl group-hover:shadow-green-500/30 transition-all duration-500 rounded-full" />
              <HiSparkles className="relative z-10 w-4 h-4 text-green-700 group-hover:text-green-800 transition-colors duration-300 drop-shadow-sm" />
              <span className="relative z-10 text-xs sm:text-sm font-semibold text-green-900 drop-shadow-sm">Cloud Architect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}