/**
 * BackgroundBlobs - Animated liquid glass background decorations
 * Optimized for performance - uses CSS will-change and reduced animations
 */
export default function BackgroundBlobs({ variant = 'full' }) {
  if (variant === 'none') return null;

  // Use minimal variant for better performance between sections
  if (variant === 'minimal') {
    return (
      <>
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 pointer-events-none"
          style={{ willChange: 'opacity' }}
        />
      </>
    );
  }

  return (
    <>
      {/* Main blobs - reduced blur for performance, no animation */}
      <div
        className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      <div
        className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-500 dark:to-purple-500 opacity-25 dark:opacity-15 blur-3xl rounded-full pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* Additional static blobs for depth - only on full variant */}
      {variant === 'full' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-400 dark:from-cyan-500 dark:to-blue-600 opacity-30 dark:opacity-20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-400 dark:from-pink-500 dark:to-purple-600 opacity-30 dark:opacity-20 blur-3xl rounded-full pointer-events-none" />
        </>
      )}

      {/* Floating glass panels - simplified, no animation for performance */}
      {variant === 'full' && (
        <>
          <div className="absolute top-20 right-10 w-32 h-32 bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-slate-600/20 shadow-xl rotate-12 opacity-50 pointer-events-none" />
          <div className="absolute bottom-32 left-8 w-24 h-24 bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-600/20 shadow-lg -rotate-12 opacity-40 pointer-events-none" />
        </>
      )}
    </>
  );
}
