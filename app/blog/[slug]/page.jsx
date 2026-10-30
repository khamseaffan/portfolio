import { notFound } from 'next/navigation';
import Link from 'next/link';
import 'highlight.js/styles/github-dark.css';
import { prisma } from '@/lib/prisma';
import { getIpHash } from '@/lib/ip';
import Navbar from '@/components/containers/Navbar';
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
    <div className="relative min-h-screen bg-[var(--ed-canvas)] font-body text-[var(--ed-text)]">
      <div className="relative mx-auto max-w-[1120px] px-3 py-4 sm:px-5 sm:py-8 lg:py-10">
        <div className="rounded-[28px] border border-[var(--ed-line)] bg-[var(--ed-panel)]">
          <Navbar />
          <main className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <Link href="/blog" className="text-sm text-[var(--ed-muted)] underline-offset-4 hover:text-[var(--ed-text)] hover:underline">
              Blog
            </Link>

            {post.tags.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-[var(--ed-line)] px-2 py-0.5 text-[11px] text-[var(--ed-faint)] hover:text-[var(--ed-text)]"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-3 text-sm text-[var(--ed-faint)]">
              <time dateTime={post.createdAt}>{formattedDate}</time>
              <span className="mx-2">·</span>
              {post._count.likes} {post._count.likes === 1 ? 'like' : 'likes'}
              <span className="mx-2">·</span>
              {post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}
            </p>

            <div className="mt-10 max-w-3xl border-t border-[var(--ed-line)] pt-8">
              <PostContent content={post.content} />
            </div>

            <div className="mt-10">
              <LikeButton slug={post.slug} initialLiked={!!hasLiked} initialCount={post._count.likes} />
            </div>

            <div className="mt-12 max-w-3xl border-t border-[var(--ed-line)] pt-8">
              <CommentSection slug={post.slug} initialComments={post.comments} totalComments={post._count.comments} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
