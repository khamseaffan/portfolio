import Link from 'next/link';

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="relative rounded-3xl backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 bg-white/30 dark:bg-slate-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-2xl hover:-translate-y-1 hover:border-white/60 dark:hover:border-slate-500/50 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={post.createdAt}>{formattedDate}</time>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {post._count.likes}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              {post._count.comments}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
