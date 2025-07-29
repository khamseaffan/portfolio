import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { getImageURL } from '../utils'
import Typewriter from '../utility/Typewriter/Typewriter'

const roles = [
  ' Software Engineer',
  ' Full-Stack Developer',
  ' Cloud & AI Engineer'
]

export default function Summary() {
  return (
    <section
      id="summary"
      className="relative min-h-[90vh] bg-gradient-to-br from-bg via-gray-300 to-bg flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-[10%] pt-8 sm:pt-4 pb-8 bg-bg text-text font-body overflow-hidden"
    >
      {/* Background blurs - Responsive sizing */}
      {/* <div className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-[#8d99ae]/70 blur-[80px] sm:blur-[100px]" />
      <div className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-[#8d99ae]/70 blur-[80px] sm:blur-[100px]" /> */}

      {/* Main Content Container - Original side-by-side layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Column: Profile Image + Buttons */}
        <div className="relative flex-shrink-0 w-full flex flex-col items-center lg:items-start lg:justify-end lg:w-2/5 gap-6 sm:gap-8">
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start w-full">
            <img
              className="w-64 sm:w-80 md:w-96 lg:w-full max-w-[320px] sm:max-w-[400px] rounded-[20%] border-4 border-secondary shadow-lg sm:shadow-xl animate-floating hover:scale-105 transition-transform ease-in-out duration-300 z-10"
              src={getImageURL('summary/summaryImage.jpeg')}
              alt="Affan Khamse - Software Engineer"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback for image loading error */}
            <div 
              className="w-64 sm:w-80 md:w-96 lg:w-full max-w-[320px] sm:max-w-[320px] aspect-square rounded-[20%] border-4 border-secondary shadow-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl sm:text-8xl font-bold text-bg"
              style={{ display: 'none' }}
            >
              AK
            </div>
          </div>

          {/* Call-to-Action Section - Moved under image */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 w-full max-w-[400px]">

            {/* Primary CTA - Resume Download */}
            <a
              href="/resume.pdf"
              download
              className="w-full font-header text-base sm:text-md font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-bg border border-secondary hover:bg-[#f2f7fd] hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume/CV
              </span>
            </a>

            {/* Secondary Actions Row */}
            <div className="flex items-center justify-center lg:justify-center gap-4 sm:gap-6 w-full">
              
              {/* Email Button */}
              <a
                href="mailto:khamseaffan@gmail.com"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 font-header text-lg sm:text-xl rounded-full border border-secondary bg-primary text-bg hover:bg-[#f2f7fd] hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95"
                aria-label="Send email to Affan Khamse"
                title="Send me an email"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>

              {/* Social Links */}
              <a
                href="https://www.linkedin.com/in/affan-khamse/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                aria-label="Connect on LinkedIn"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://github.com/khamseaffan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 text-white rounded-full transition-all duration-300 hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1 active:scale-95"
                aria-label="View GitHub profile"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-full">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-bold text-primary">
                Available for hire - Actively pursuing Software roles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Content Section */}
        <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 z-20 text-center lg:text-left lg:flex-1">
          
          {/* Main Heading - Responsive typography */}
          <h1 className="text-gray-700 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-header font-bold text-secondary leading-tight">
            Hello, I&apos;m
            <span className="block text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-primary mt-1 sm:mt-2">
              Affan Khamse
            </span>
          </h1>

          {/* Typewriter Component - Responsive container */}
          <div className="min-h-[1rem] sm:min-h-[1.5rem] md:min-h-[2rem] flex items-center">
            <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
          </div>

          {/* Description - Responsive text sizing and max-width */}
          <p className="text-base sm:text-md md:text-lg lg:text-xl text-text max-w-full sm:max-w-xl lg:max-w-lg leading-relaxed">
            From mentoring 50+ NYU students to architecting microservices that never sleep - I build backend systems that scale and AI solutions that actually work in production. Currently making phone calls smarter, one API at a time.
          </p>
        </div>
      </div>
    </section>
  )
}