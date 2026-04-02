'use client';

import { HiMail, HiDownload, HiSparkles, HiCalendar } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Typewriter from '@/components/portfolio/Typewriter';
import { getImageURL } from '@/lib/utils';
import { Section } from '@/components/portfolio';

const defaultRoles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Cloud & AI Engineer',
];

export default function Summary({ profile }) {
  const name = profile?.name || 'Affan Khamse';
  const greeting = profile?.greeting || "Hello, I'm";
  const bio = profile?.bio || '';
  const imageSrc = profile?.imageSrc || 'summary/summaryImage.jpeg';
  const roles = profile?.roles?.length ? profile.roles : defaultRoles;
  const highlights = profile?.highlights || ['Backend Expert', 'AI/ML Engineer', 'Cloud Architect'];
  const availableForHire = profile?.availableForHire ?? true;
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';
  return (
    <Section
      id="summary"
      className="min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-[10%] pt-20 sm:pt-24 pb-8"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
        <div className="relative flex-shrink-0 w-full flex flex-col items-center lg:items-start lg:justify-end lg:w-2/5 gap-6 sm:gap-8">
          <div className="flex justify-center lg:justify-start w-full">
            <div className="relative group p-6 rounded-[30%] bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/60 dark:border-slate-600/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent rounded-[30%] pointer-events-none" />
              <div className="relative z-10">
                <img
                  className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] rounded-[20%] shadow-2xl hover:scale-105 transition-transform ease-in-out duration-500"
                  src={getImageURL(imageSrc)}
                  alt={`${name} - Software Engineer`}
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-56 sm:w-72 md:w-80 lg:w-full max-w-[280px] sm:max-w-[360px] aspect-square rounded-[20%] shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-5xl sm:text-7xl font-bold text-white"
                  style={{ display: 'none' }}
                >
                  AK
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/20 rounded-[30%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 w-full max-w-[360px]">
            <a
              href={resumeUrl}
              download
              className="group relative w-full font-medium text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-center overflow-hidden transition-all duration-500 active:scale-95"
            >
              <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xl rounded-full border-2 border-blue-500/50 shadow-xl group-hover:bg-blue-600/90 group-hover:border-blue-400/70 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/50 to-blue-400/0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Resume
              </span>
            </a>

            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <a
                href="mailto:khamseaffan@gmail.com"
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 active:scale-95"
                aria-label="Send email to Affan Khamse"
                title="Send me an email"
              >
                <div className="absolute inset-0 bg-white/20 dark:bg-slate-700/40 backdrop-blur-xl rounded-full border-2 border-white/30 dark:border-slate-600/40 shadow-lg group-hover:bg-white/30 dark:group-hover:bg-slate-700/60 group-hover:border-white/50 dark:group-hover:border-slate-500/50 group-hover:shadow-xl transition-all duration-500" />
                <HiMail className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
              </a>
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
              <a
                href="https://calendly.com/khamseaffan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-500 active:scale-95"
                aria-label="Schedule a call"
                title="Schedule a call"
              >
                <div className="absolute inset-0 bg-teal-600/80 backdrop-blur-xl rounded-full border-2 border-teal-500/50 shadow-lg group-hover:bg-teal-600/90 group-hover:border-teal-400/70 group-hover:shadow-xl group-hover:shadow-teal-500/50 transition-all duration-500" />
                <HiCalendar className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </a>
            </div>

            {availableForHire && (
              <div className="flex items-center justify-center lg:justify-start gap-2 w-full mt-2 px-4 py-2.5 rounded-full bg-white/40 dark:bg-slate-800/50 backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 shadow-xl">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 drop-shadow-sm">
                  Available for hire
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-5 sm:gap-6 z-20 text-center lg:text-left lg:flex-1">
          <div className="relative group p-6 rounded-3xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
            <div className="relative">
              <h1 className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl font-medium leading-tight drop-shadow-sm">
                {greeting}
              </h1>
              <h2 className="text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mt-1 drop-shadow-md">
                {name}
              </h2>
            </div>
          </div>

          <div className="relative px-6 py-3 rounded-full bg-blue-500/30 dark:bg-blue-600/30 backdrop-blur-2xl border-2 border-blue-400/50 dark:border-blue-500/40 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
            <div className="min-h-[1.5rem] sm:min-h-[2rem] flex items-center text-blue-700 dark:text-blue-300">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-sm">
                <Typewriter texts={roles} typingSpeed={100} pauseTime={1500} />
              </span>
            </div>
          </div>

          <div className="relative p-6 rounded-3xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
            <p className="relative text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 max-w-full sm:max-w-xl lg:max-w-lg leading-relaxed drop-shadow-sm font-medium">
              {bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center lg:justify-start">
            {highlights.map((label, i) => {
              const colorSets = [
                { bg: 'bg-blue-500/30 dark:bg-blue-600/30', border: 'border-blue-400/50 dark:border-blue-500/40', hoverBg: 'group-hover:bg-blue-500/40 dark:group-hover:bg-blue-600/40', hoverBorder: 'group-hover:border-blue-400/70', shadow: 'group-hover:shadow-blue-500/30', icon: 'text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200', text: 'text-blue-900 dark:text-blue-100' },
                { bg: 'bg-purple-500/30 dark:bg-purple-600/30', border: 'border-purple-400/50 dark:border-purple-500/40', hoverBg: 'group-hover:bg-purple-500/40 dark:group-hover:bg-purple-600/40', hoverBorder: 'group-hover:border-purple-400/70', shadow: 'group-hover:shadow-purple-500/30', icon: 'text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200', text: 'text-purple-900 dark:text-purple-100' },
                { bg: 'bg-green-500/30 dark:bg-green-600/30', border: 'border-green-400/50 dark:border-green-500/40', hoverBg: 'group-hover:bg-green-500/40 dark:group-hover:bg-green-600/40', hoverBorder: 'group-hover:border-green-400/70', shadow: 'group-hover:shadow-green-500/30', icon: 'text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200', text: 'text-green-900 dark:text-green-100' },
                { bg: 'bg-amber-500/30 dark:bg-amber-600/30', border: 'border-amber-400/50 dark:border-amber-500/40', hoverBg: 'group-hover:bg-amber-500/40 dark:group-hover:bg-amber-600/40', hoverBorder: 'group-hover:border-amber-400/70', shadow: 'group-hover:shadow-amber-500/30', icon: 'text-amber-700 dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200', text: 'text-amber-900 dark:text-amber-100' },
                { bg: 'bg-rose-500/30 dark:bg-rose-600/30', border: 'border-rose-400/50 dark:border-rose-500/40', hoverBg: 'group-hover:bg-rose-500/40 dark:group-hover:bg-rose-600/40', hoverBorder: 'group-hover:border-rose-400/70', shadow: 'group-hover:shadow-rose-500/30', icon: 'text-rose-700 dark:text-rose-300 group-hover:text-rose-800 dark:group-hover:text-rose-200', text: 'text-rose-900 dark:text-rose-100' },
                { bg: 'bg-cyan-500/30 dark:bg-cyan-600/30', border: 'border-cyan-400/50 dark:border-cyan-500/40', hoverBg: 'group-hover:bg-cyan-500/40 dark:group-hover:bg-cyan-600/40', hoverBorder: 'group-hover:border-cyan-400/70', shadow: 'group-hover:shadow-cyan-500/30', icon: 'text-cyan-700 dark:text-cyan-300 group-hover:text-cyan-800 dark:group-hover:text-cyan-200', text: 'text-cyan-900 dark:text-cyan-100' },
              ];
              const c = colorSets[i % colorSets.length];
              return (
                <div key={i} className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                  <div className={`absolute inset-0 ${c.bg} backdrop-blur-2xl border-2 ${c.border} shadow-lg ${c.hoverBg} ${c.hoverBorder} group-hover:shadow-2xl ${c.shadow} transition-all duration-500 rounded-full`} />
                  <HiSparkles className={`relative z-10 w-4 h-4 ${c.icon} transition-colors duration-300 drop-shadow-sm`} />
                  <span className={`relative z-10 text-xs sm:text-sm font-semibold ${c.text} drop-shadow-sm`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
