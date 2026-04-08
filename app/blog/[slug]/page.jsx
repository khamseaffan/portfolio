import { notFound } from 'next/navigation';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';
import { prisma } from '@/lib/prisma';
import { getIpHash } from '@/lib/ip';
import PostContent from '@/components/blog/PostContent';
import LikeButton from '@/components/blog/LikeButton';
import CommentSection from '@/components/blog/CommentSection';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, coverImageUrl: true },
  });

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt || `Read "${post.title}" on Affan Khamse's blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      _count: { select: { likes: true, comments: true } },
      comments: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!post || !post.published) notFound();

  const ipHash = await getIpHash();
  const hasLiked = await prisma.like.findUnique({
    where: { postId_ipHash: { postId: post.id, ipHash } },
  });

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-[-60px] left-[-15vw] w-[70vw] h-[30vh] bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-15vw] w-[50vw] h-[30vh] bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 opacity-50 dark:opacity-30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
          >
            &larr; Back to Blog
          </Link>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={post.createdAt}>{formattedDate}</time>
            <span>{post._count.likes} likes</span>
            <span>{post._count.comments} comments</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative rounded-3xl backdrop-blur-2xl border-2 border-white/50 dark:border-slate-600/40 bg-white/30 dark:bg-slate-800/40 p-6 sm:p-10 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
          <div className="relative z-10">
            <PostContent content={post.content} />
          </div>
        </div>

        {/* Like Button */}
        <div className="my-8 flex justify-center">
          <LikeButton
            slug={post.slug}
            initialLiked={!!hasLiked}
            initialCount={post._count.likes}
          />
        </div>

        {/* Comments */}
        <CommentSection
          slug={post.slug}
          initialComments={post.comments}
          totalComments={post._count.comments}
        />
      </div>
    </div>
  );
}
