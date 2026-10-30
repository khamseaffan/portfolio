import Link from 'next/link';

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block border-t border-[var(--ed-line)] py-6 last:border-b">
      <article>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-[var(--ed-line)] px-2 py-0.5 text-[11px] text-[var(--ed-faint)]">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <h2 className="mt-3 font-display text-2xl tracking-tight">{post.title}</h2>
        {post.excerpt && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ed-muted)]">{post.excerpt}</p>}
        <p className="mt-3 text-xs text-[var(--ed-faint)]">
          <time dateTime={post.createdAt}>{formattedDate}</time>
          <span className="mx-2">·</span>
          {post._count.likes} {post._count.likes === 1 ? 'like' : 'likes'}
          <span className="mx-2">·</span>
          {post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}
        </p>
      </article>
    </Link>
  );
}
