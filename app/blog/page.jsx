import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, AI, and building things that work.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || '1', 10);
  const tag = params?.tag || null;
  const limit = 10;
  const skip = (page - 1) * limit;

  const where = {
    published: true,
    ...(tag ? { tags: { has: tag } } : {}),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        _count: { select: { likes: true, comments: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  // Get all unique tags for filtering
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    select: { tags: true },
  });
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-[-60px] left-[-15vw] w-[70vw] h-[30vh] bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-15vw] w-[50vw] h-[30vh] bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
          >
            &larr; Back to Portfolio
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts on software engineering, AI, and building things that work.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/blog"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                !tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/30 dark:bg-slate-800/40 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50 border border-white/40 dark:border-slate-600/40'
              }`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  tag === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/30 dark:bg-slate-800/40 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50 border border-white/40 dark:border-slate-600/40'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-3xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-xl border-2 border-white/50 dark:border-slate-600/40">
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No posts yet
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check back soon for new content!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}`}
                className="px-4 py-2 rounded-lg bg-white/30 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600/40 text-sm font-medium hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
              >
                Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}`}
                className="px-4 py-2 rounded-lg bg-white/30 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-600/40 text-sm font-medium hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
