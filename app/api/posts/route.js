import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/posts - List published posts
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const tag = searchParams.get('tag');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 20);
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

  return NextResponse.json({
    posts,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  });
}
