/**
 * BackgroundBlobs - Animated liquid glass background decorations
 * Used across all section containers for consistent visual style
 */
export default function BackgroundBlobs({ variant = 'full' }) {
  if (variant === 'none') return null;

  return (
    <>
      {/* Main animated blobs */}
      <div className="absolute top-[-60px] sm:top-[-80px] left-[-15vw] sm:left-[-10vw] w-[70vw] sm:w-[60vw] h-[30vh] sm:h-[40vh] min-w-[250px] sm:min-w-[300px] min-h-[250px] sm:min-h-[300px] bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 opacity-60 dark:opacity-40 blur-[100px] sm:blur-[120px] animate-pulse" />

      <div
        className="absolute bottom-[-60px] sm:bottom-[-80px] right-[-15vw] sm:right-[-10vw] w-[50vw] sm:w-[40vw] h-[30vh] sm:h-[40vh] min-w-[200px] sm:min-w-[300px] min-h-[200px] sm:min-h-[300px] bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 opacity-60 dark:opacity-40 blur-[100px] sm:blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-500 dark:to-purple-500 opacity-30 dark:opacity-20 blur-[150px] rounded-full animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* Additional static blobs for depth */}
      {variant === 'full' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-400 dark:from-cyan-500 dark:to-blue-600 opacity-40 dark:opacity-30 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-400 dark:from-pink-500 dark:to-purple-600 opacity-40 dark:opacity-30 blur-[120px] rounded-full" />
        </>
      )}

      {/* Floating glass panels */}
      {variant === 'full' && (
        <>
          <div className="absolute top-20 right-10 w-32 h-32 bg-white/30 dark:bg-slate-800/30 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-slate-600/30 shadow-2xl rotate-12 opacity-70 animate-float" />
          <div
            className="absolute bottom-32 left-8 w-24 h-24 bg-white/30 dark:bg-slate-800/30 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-slate-600/30 shadow-xl -rotate-12 opacity-60 animate-float"
            style={{ animationDelay: '1.5s' }}
          />
        </>
      )}
    </>
  );
}
