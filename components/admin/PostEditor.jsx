'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function PostEditor({ post }) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [published, setPublished] = useState(post?.published || false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Auto-generate slug only when creating new post and slug hasn't been manually edited
    if (!isEditing && slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      title,
      slug,
      content,
      excerpt,
      coverImageUrl: coverImageUrl || null,
      published,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = isEditing ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-body)',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
          placeholder="Post title"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
          placeholder="post-url-slug"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg text-sm outline-none resize-y"
          style={inputStyle}
          placeholder="Brief description for post cards"
        />
      </div>

      {/* Cover Image URL */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Cover Image URL (optional)
        </label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
          placeholder="https://..."
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
          placeholder="react, nextjs, tutorial"
        />
      </div>

      {/* Markdown Editor */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-body)' }}>
          Content (Markdown)
        </label>
        <div data-color-mode="auto">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={400}
            preview="live"
          />
        </div>
      </div>

      {/* Published toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 rounded accent-[var(--color-primary)]"
        />
        <span className="text-sm" style={{ color: 'var(--text-body)' }}>
          Publish immediately
        </span>
      </label>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
          style={{ background: 'var(--color-primary)' }}
        >
          {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg text-sm transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
