'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function AdminPostList({ posts }) {
  const router = useRouter();

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    }
  }

  if (posts.length === 0) {
    return (
      <div
        className="text-center py-16 rounded-2xl"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          No posts yet
        </p>
        <Link
          href="/admin/posts/new"
          className="inline-block px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 rounded-xl transition-colors"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium truncate" style={{ color: 'var(--text-heading)' }}>
                {post.title}
              </h3>
              {post.published ? (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <HiOutlineEye className="w-3 h-3" /> Published
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <HiOutlineEyeOff className="w-3 h-3" /> Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>/{post.slug}</span>
              <span>{post._count.likes} likes</span>
              <span>{post._count.comments} comments</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              title="Edit"
            >
              <HiOutlinePencil className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </Link>
            <button
              onClick={() => handleDelete(post.id, post.title)}
              className="p-2 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete"
            >
              <HiOutlineTrash className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
