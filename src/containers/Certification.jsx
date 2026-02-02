import { useState, useMemo } from 'react';
import { HiChevronDown, HiStar, HiBadgeCheck } from 'react-icons/hi';

import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  Section,
  SectionHeader,
  GlassCard,
  GlassCardNavigator,
  TechBadge,
  StatusBadge,
  FilterBadge,
  ProgressBar,
} from '../components';
import { getImageURL } from '../utils';
import certificates from '../data/certificates.json';

const CERT_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-green-500 to-emerald-400',
  'from-orange-500 to-red-400',
  'from-indigo-500 to-purple-400',
  'from-teal-500 to-green-400',
];

const CERT_CATEGORIES = [
  'Technical Skills',
  'Data Science',
  'Development Tools',
  'Design & UX',
  'Cloud Computing',
  'Security',
];

const enhanceCertificatesData = (rawCertificates) =>
  rawCertificates.map((cert, idx) => ({
    ...cert,
    color: CERT_COLORS[idx % CERT_COLORS.length],
    category: CERT_CATEGORIES[idx % CERT_CATEGORIES.length],
    id: `cert-${idx}`,
  }));

export default function Certification() {
  const enhancedCertificates = useMemo(
    () => enhanceCertificatesData(certificates),
    []
  );
  const [activeCert, setActiveCert] = useState(0);
  const [mobileExpandedCert, setMobileExpandedCert] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Design & UX');
  const { ref: sectionRef } = useIntersectionObserver();

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(enhancedCertificates.map((c) => c.category))];
    return cats;
  }, [enhancedCertificates]);

  // Filter certificates based on category
  const filteredCertificates = useMemo(
    () =>
      filterCategory === 'all'
        ? enhancedCertificates
        : enhancedCertificates.filter((c) => c.category === filterCategory),
    [enhancedCertificates, filterCategory]
  );

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
    setActiveCert(0);
    setMobileExpandedCert(null);
  };

  const currentCert = filteredCertificates[activeCert];

  return (
    <Section ref={sectionRef} id="certification" className="py-8 sm:py-12">
      <SectionHeader
        title="Certifications"
        subtitle="Professional credentials that show my commitment to growing every day"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 px-2">
        {categories.map((cat) => (
          <FilterBadge
            key={cat}
            active={filterCategory === cat}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat === 'all' ? 'All Certs' : cat}
          </FilterBadge>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4 mb-12">
          {filteredCertificates.map((cert, idx) => (
            <MobileCertCard
              key={cert.id}
              cert={cert}
              isOpen={mobileExpandedCert === idx}
              onToggle={() =>
                setMobileExpandedCert((prev) => (prev === idx ? null : idx))
              }
            />
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-8">
          {/* Main Display */}
          <div className="lg:col-span-2">
            <CertDisplay
              cert={currentCert}
              active={activeCert}
              total={filteredCertificates.length}
            />
          </div>

          {/* Navigator */}
          <div className="space-y-3">
            <h3 className="text-lg font-title font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white drop-shadow-sm">
              <HiStar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Learning Journey
            </h3>

            {filteredCertificates.map((cert, idx) => (
              <GlassCardNavigator
                key={cert.id}
                active={activeCert === idx}
                onClick={() => setActiveCert(idx)}
                color={cert.color}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-sm`}
                  >
                    <HiStar className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {cert.issued_by}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {cert.date}
                      </span>
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCardNavigator>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <GlassCard
            hover={true}
            padding="px-4 sm:px-6 py-2.5 sm:py-3"
            className="inline-flex items-center gap-2 rounded-full"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 drop-shadow-sm">
              Continuously expanding my skillset
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

/**
 * CertDisplay - Main certificate detail card for desktop
 */
function CertDisplay({ cert, active, total }) {
  if (!cert) return null;

  return (
    <GlassCard padding="p-0" className="h-[600px] overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        {/* Certificate Image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <CertImage cert={cert} size="large" />

          {/* Issuer Badge */}
          <StatusBadge variant="glass" className="absolute top-4 left-4">
            {cert.issued_by}
          </StatusBadge>

          {/* Date Badge */}
          <StatusBadge color={cert.color} className="absolute top-4 right-4">
            {cert.date}
          </StatusBadge>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          <h3 className="text-2xl font-title font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-snug">
            {cert.title}
          </h3>

          {/* Issuer and Category */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <HiBadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {cert.issued_by}
              </span>
            </div>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="text-gray-700 dark:text-gray-300">{cert.category}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
            {cert.description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2">
            {cert.skills?.map((skill, idx) => (
              <TechBadge key={idx}>{skill}</TechBadge>
            ))}
          </div>

          {/* View Certificate Button */}
          {cert.certificate_link && (
            <div className="pt-4">
              <a
                href={cert.certificate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${cert.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`}
                />
                <HiBadgeCheck className="relative z-10 w-4 h-4 text-white drop-shadow-sm" />
                <span className="relative z-10 text-white drop-shadow-sm">
                  View Certificate
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar current={active} total={total} color={cert.color} />
      </div>
    </GlassCard>
  );
}

/**
 * CertImage - Certificate image with gradient fallback
 */
function CertImage({ cert, size = 'small' }) {
  const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
  const iconSize = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';

  if (cert.imageSrc) {
    return (
      <>
        <img
          src={getImageURL(cert.imageSrc)}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className={`w-full h-full bg-gradient-to-br ${cert.color} flex items-center justify-center`}
          style={{ display: 'none' }}
        >
          <CertFallbackIcon cert={cert} iconSize={iconSize} />
        </div>
      </>
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${cert.color} flex items-center justify-center`}
    >
      <CertFallbackIcon cert={cert} iconSize={iconSize} />
    </div>
  );
}

/**
 * CertFallbackIcon - Fallback star icon with category label
 */
function CertFallbackIcon({ cert, iconSize = 'w-12 h-12' }) {
  return (
    <div className="text-center text-white">
      <HiStar className={`${iconSize} mx-auto mb-2 opacity-80`} />
      <div className="text-xs opacity-90 font-medium">{cert.category}</div>
    </div>
  );
}

/**
 * MobileCertCard - Expandable certificate card for mobile view
 */
function MobileCertCard({ cert, isOpen, onToggle }) {
  return (
    <GlassCard padding="p-0" className="overflow-hidden">
      {/* Header */}
      <div
        onClick={onToggle}
        className="cursor-pointer hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors duration-200"
      >
        {/* Certificate Preview */}
        <div className="relative h-32 overflow-hidden">
          <CertImage cert={cert} size="small" />

          {/* Badges */}
          <StatusBadge variant="glass" className="absolute top-2 left-2 text-xs px-2 py-1">
            {cert.issued_by}
          </StatusBadge>
          <StatusBadge color={cert.color} className="absolute top-2 right-2 text-xs px-2 py-1">
            {cert.date}
          </StatusBadge>
        </div>

        {/* Certificate Info */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1 truncate">
                {cert.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {cert.issued_by} • {cert.category}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {cert.date}
                </span>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Certified
                </span>
              </div>
            </div>

            <HiChevronDown
              className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0 ml-3 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 border-t border-white/30 dark:border-slate-600/30 bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl">
          <div className="pt-4 space-y-4">
            {/* Description */}
            <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed drop-shadow-sm">
              {cert.description}
            </p>

            {/* Skills Tags */}
            <div>
              <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 drop-shadow-sm">
                SKILLS COVERED
              </h5>
              <div className="flex flex-wrap gap-1">
                {cert.skills?.map((skill, idx) => (
                  <TechBadge key={idx}>{skill}</TechBadge>
                ))}
              </div>
            </div>

            {/* View Certificate Button */}
            {cert.certificate_link && (
              <div className="pt-2">
                <a
                  href={cert.certificate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-xs transition-all duration-500 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${cert.color} backdrop-blur-xl border border-white/30 shadow-lg group-hover/btn:shadow-xl transition-all duration-500 rounded-lg`}
                  />
                  <HiBadgeCheck className="relative z-10 w-3 h-3 text-white drop-shadow-sm" />
                  <span className="relative z-10 text-white drop-shadow-sm">
                    View Certificate
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
