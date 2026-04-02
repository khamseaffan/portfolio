import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getIpHash } from '@/lib/ip';

// GET /api/posts/[slug] - Get a single published post
export async function GET(request, { params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      _count: { select: { likes: true, comments: true } },
    },
  });

  if (!post || !post.published) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const ipHash = await getIpHash();
  const existingLike = await prisma.like.findUnique({
    where: { postId_ipHash: { postId: post.id, ipHash } },
  });

  return NextResponse.json({
    post,
    likeCount: post._count.likes,
    commentCount: post._count.comments,
    hasLiked: !!existingLike,
  });
}
