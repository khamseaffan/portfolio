import { useState } from 'react'
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
      className="relative min-h-[90vh] bg-gradient-to-br from-gray-100 via-white to-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-[10%] pt-20 sm:pt-24 pb-8 overflow-hidden"
    >
      {/* Background decorative elements - subtle */}
      <div className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-blue-200/30 blur-[80px] sm:blur-[100px]" />
      <div className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-purple-200/30 blur-[80px] sm:blur-[100px]" />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Column: Profile Image + Buttons */}
        <div className="relative flex-shrink-0 w-full flex flex-col items-center lg:items-start lg:justify-end lg:w-2/5 gap-6 sm:gap-8">
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start w-full">
            <img
              className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] rounded-[20%] border-4 border-gray-300 shadow-xl animate-floating hover:scale-105 transition-transform ease-in-out duration-300 z-10"
              src={getImageURL('summary/summaryImage.jpeg')}
              alt="Affan Khamse - Software Engineer"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback for image loading error */}
            <div 
              className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] aspect-square rounded-[20%] border-4 border-gray-300 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl sm:text-7xl font-bold text-white"
              style={{ display: 'none' }}
            >
              AK
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full max-w-[360px]">

            <a
              href="/resume.pdf"
              download
              className="w-full font-medium text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Resume
              </span>
            </a>


            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">

              <a
                href="mailto:khamseaffan@gmail.com"
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                aria-label="Send email to Affan Khamse"
                title="Send me an email"
              >
                <HiMail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/affan-khamse/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              <a
                href="https://github.com/khamseaffan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gray-800 text-white rounded-full transition-all duration-300 hover:bg-gray-900 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                aria-label="View GitHub profile"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* Status Indicator  */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-full mt-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Available for hire • Actively pursuing Software roles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Content Section */}
        <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-5 z-20 text-center lg:text-left lg:flex-1">
          
          {/* Main Heading */}
          <div>
            <h1 className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium leading-tight">
              Hello, I'm
            </h1>
            <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mt-1">
              Affan Khamse
            </h2>
          </div>

          {/* Typewriter Component */}
          <div className="min-h-[1.5rem] sm:min-h-[2rem] flex items-center text-blue-600">
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-full sm:max-w-xl lg:max-w-lg leading-relaxed mt-2">
            From mentoring 50+ NYU students to architecting microservices that never sleep - I build backend systems that scale and AI solutions that actually work in production. Currently making phone calls smarter, one API at a time.
          </p>

          {/* Quick highlights */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center lg:justify-start">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
              <HiSparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-blue-700">Backend Expert</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-200">
              <HiSparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs sm:text-sm font-medium text-purple-700">AI/ML Engineer</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
              <HiSparkles className="w-4 h-4 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-green-700">Cloud Architect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}