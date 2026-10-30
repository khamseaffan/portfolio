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
      <h2 className="font-display text-3xl tracking-tight">Comments</h2>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name, optional"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={50}
            className="w-full rounded-lg border border-[var(--ed-line)] bg-[var(--ed-raise)] px-3 py-2 text-sm text-[var(--ed-text)] outline-none placeholder:text-[var(--ed-faint)]"
          />
          <textarea
            placeholder="Write a comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={3}
            required
            className="w-full resize-none rounded-lg border border-[var(--ed-line)] bg-[var(--ed-raise)] px-3 py-2 text-sm text-[var(--ed-text)] outline-none placeholder:text-[var(--ed-faint)]"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ed-faint)]">{content.length}/1000</span>
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="rounded-full border border-[var(--ed-line-strong)] px-4 py-2 text-sm disabled:opacity-50"
            >
              {submitting ? 'Posting' : 'Post comment'}
            </button>
          </div>
          {error && <p className="text-sm text-[var(--ed-muted)]">{error}</p>}
        </div>
      </form>

      <div className="mt-8 flex max-w-xl flex-col">
        {comments.map((comment) => (
          <div key={comment.id} className="border-t border-[var(--ed-line)] py-4">
            <p className="text-sm">
              <span className="font-medium">{comment.author || 'Anonymous'}</span>
              <span className="ml-2 text-xs text-[var(--ed-faint)]">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--ed-muted)]">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
