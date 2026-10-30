import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/containers/Navbar';
import PostCard from '@/components/blog/PostCard';

export const metadata = {
  title: 'Blog',
  description: 'Notes on production AI systems, retrieval, and the work behind them.',
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

  const [posts, totalCount, allPosts] = await Promise.all([
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
    prisma.post.findMany({
      where: { published: true },
      select: { tags: true },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

  return (
    <div className="relative min-h-screen bg-[var(--ed-canvas)] font-body text-[var(--ed-text)]">
      <div className="relative mx-auto max-w-[1120px] px-3 py-4 sm:px-5 sm:py-8 lg:py-10">
        <div className="rounded-[28px] border border-[var(--ed-line)] bg-[var(--ed-panel)]">
          <Navbar />
          <main className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <h1 className="font-display text-6xl leading-none tracking-[-0.04em] sm:text-7xl">Blog</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--ed-muted)]">
              Notes on production AI systems, retrieval, and the work behind them.
            </p>

            {allTags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 text-sm">
                <Link href="/blog" className={!tag ? 'text-[var(--ed-text)]' : 'text-[var(--ed-faint)] hover:text-[var(--ed-text)]'}>
                  All
                </Link>
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className={tag === t ? 'text-[var(--ed-text)]' : 'text-[var(--ed-faint)] hover:text-[var(--ed-text)]'}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            )}

            {posts.length === 0 ? (
              <p className="mt-12 text-sm text-[var(--ed-muted)]">No posts yet.</p>
            ) : (
              <div className="mt-10">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center gap-4 text-sm text-[var(--ed-muted)]">
                {page > 1 && (
                  <Link href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}`} className="underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
                    Previous
                  </Link>
                )}
                <span className="text-[var(--ed-faint)]">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}`} className="underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
                    Next
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
