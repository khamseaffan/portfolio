'use client';

import { useState } from 'react';

export default function LikeButton({ slug, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    // Optimistic update
    setLiked(!liked);
    setCount((c) => (liked ? c - 1 : c + 1));

    try {
      const res = await fetch(`/api/posts/${slug}/like`, {
        method: liked ? 'DELETE' : 'POST',
      });

      if (!res.ok) {
        // Revert on error
        setLiked(liked);
        setCount((c) => (liked ? c + 1 : c - 1));
      } else {
        const data = await res.json();
        setLiked(data.liked);
        setCount(data.likeCount);
      }
    } catch {
      // Revert on error
      setLiked(liked);
      setCount((c) => (liked ? c + 1 : c - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden ${
        liked ? 'scale-105' : 'hover:scale-105'
      }`}
    >
      <div
        className={`absolute inset-0 backdrop-blur-2xl border-2 shadow-lg transition-all duration-500 rounded-full ${
          liked
            ? 'bg-red-500/30 dark:bg-red-600/30 border-red-400/50 dark:border-red-500/40'
            : 'bg-white/30 dark:bg-slate-800/40 border-white/50 dark:border-slate-600/40 group-hover:bg-white/40 dark:group-hover:bg-slate-700/50 group-hover:shadow-xl'
        }`}
      />
      <svg
        className={`relative z-10 w-5 h-5 transition-all duration-300 ${
          liked
            ? 'text-red-600 dark:text-red-400 fill-current'
            : 'text-gray-600 dark:text-gray-400 group-hover:text-red-500'
        } ${loading ? 'animate-pulse' : ''}`}
        viewBox="0 0 20 20"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={liked ? 0 : 1.5}
      >
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
      <span
        className={`relative z-10 font-semibold ${
          liked
            ? 'text-red-700 dark:text-red-300'
            : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {count} {count === 1 ? 'Like' : 'Likes'}
      </span>
    </button>
  );
}
