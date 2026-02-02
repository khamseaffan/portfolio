import { getImageURL } from '../utils';

/**
 * ImageWithFallback - Image component with gradient fallback on error
 * @param {string} src - Image source path (will be processed through getImageURL)
 * @param {string} alt - Alt text for the image
 * @param {string} fallbackText - Text to show in fallback (usually initials)
 * @param {string} fallbackColor - Gradient color for fallback (default: 'from-blue-600 to-purple-600')
 * @param {string} size - Tailwind size class (e.g., 'w-16 h-16')
 * @param {string} rounded - Border radius class (default: 'rounded-2xl')
 * @param {string} className - Additional classes for the container
 * @param {string} imgClassName - Additional classes for the img element
 */
export default function ImageWithFallback({
  src,
  alt,
  fallbackText,
  fallbackColor = 'from-blue-600 to-purple-600',
  size = 'w-16 h-16',
  rounded = 'rounded-2xl',
  className = '',
  imgClassName = '',
}) {
  const textForFallback = fallbackText ?? alt ?? '';
  const displayFallback = textForFallback
    ? textForFallback
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <div
      className={`
        ${size} ${rounded} overflow-hidden shadow-md
        border-2 border-white/40 dark:border-slate-600/40
        bg-white/30 dark:bg-slate-700/40 backdrop-blur-xl
        group-hover:border-white/60 dark:group-hover:border-slate-500/50
        transition-all duration-500
        ${className}
      `}
    >
      {src ? (
        <img
          src={getImageURL(src)}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${imgClassName}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}

      {/* Gradient fallback */}
      <div
        className={`
          w-full h-full bg-gradient-to-br ${fallbackColor}
          flex items-center justify-center text-white font-bold
          ${size.includes('w-10') || size.includes('w-12') ? 'text-xs' : ''}
          ${size.includes('w-16') || size.includes('w-20') ? 'text-lg' : ''}
          ${size.includes('w-24') || size.includes('w-32') ? 'text-xl' : ''}
          ${size.includes('w-56') || size.includes('w-72') ? 'text-5xl' : ''}
        `}
        style={{ display: src ? 'none' : 'flex' }}
      >
        {displayFallback}
      </div>
    </div>
  );
}

/**
 * LogoIcon - Small logo/icon with gradient background and image
 * Commonly used in navigator sidebars and compact card headers
 * Accepts src/imageSrc and alt/name for compatibility with different containers.
 */
export function LogoIcon({
  src: srcProp,
  imageSrc,
  alt: altProp,
  name,
  fallbackText,
  color = 'from-blue-500 to-cyan-400',
  size = 'w-10 h-10',
  iconSize = 'w-5 h-5',
}) {
  const src = srcProp ?? imageSrc;
  const alt = altProp ?? name ?? '';
  const textForFallback = fallbackText ?? alt ?? '';
  const displayFallback = textForFallback
    ? textForFallback
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <div className={`${size} rounded-xl bg-gradient-to-br ${color} p-0.5 shadow-sm`}>
      <div className="w-full h-full bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center">
        {src && src !== '/api/placeholder/80/80' ? (
          <img
            src={getImageURL(src)}
            alt={alt}
            className={`${iconSize} object-contain`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={`${iconSize} bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs`}
          style={{
            display: src && src !== '/api/placeholder/80/80' ? 'none' : 'flex',
          }}
        >
          {displayFallback}
        </div>
      </div>
    </div>
  );
}
