import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khamseaffan.com';

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  });

  const blogEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    ...blogEntries,
  ];
}
