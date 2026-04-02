'use client';

import { useState } from 'react';

export default function CommentSection({ slug, initialComments, totalComments }) {
  const [comments, setComments] = useState(initialComments);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim() || 'Anonymous',
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to post comment');
        return;
      }

      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setContent('');
      setAuthor('');
    } catch {
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative rounded-2xl backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 bg-white/30 dark:bg-slate-800/40 p-5 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-2xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-lg bg-white/40 dark:bg-slate-700/40 border border-white/50 dark:border-slate-600/40 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
            <textarea
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              rows={3}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/40 dark:bg-slate-700/40 border border-white/50 dark:border-slate-600/40 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {content.length}/1000
              </span>
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="group relative px-5 py-2 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xl border border-blue-500/50 shadow-lg group-hover:bg-blue-600/90 group-hover:shadow-xl transition-all duration-500 rounded-lg" />
                <span className="relative z-10 text-white">
                  {submitting ? 'Posting...' : 'Post Comment'}
                </span>
              </button>
            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            )}
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="relative rounded-2xl backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 bg-white/30 dark:bg-slate-800/40 p-5 shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {(comment.author || 'A').charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {comment.author || 'Anonymous'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
