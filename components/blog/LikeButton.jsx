'use client';

import { useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

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
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--ed-line-strong)] px-4 py-2 text-sm text-[var(--ed-text)] transition-opacity hover:opacity-70 disabled:opacity-50"
    >
      {liked ? <HiHeart className="h-4 w-4" /> : <HiOutlineHeart className="h-4 w-4" />}
      {count} {count === 1 ? 'like' : 'likes'}
    </button>
  );
}
