import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getIpHash } from '@/lib/ip';
import { checkRateLimit } from '@/lib/rate-limit';

// POST /api/posts/[slug]/like - Like a post
export async function POST(request, { params }) {
  const { slug } = await params;
  const ipHash = await getIpHash();

  if (!checkRateLimit(`like:${ipHash}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
  }

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  try {
    await prisma.like.create({
      data: { postId: post.id, ipHash },
    });
  } catch (e) {
    // Unique constraint violation - already liked
    if (e.code === 'P2002') {
      const likeCount = await prisma.like.count({ where: { postId: post.id } });
      return NextResponse.json({ liked: true, likeCount });
    }
    throw e;
  }

  const likeCount = await prisma.like.count({ where: { postId: post.id } });
  return NextResponse.json({ liked: true, likeCount });
}

// DELETE /api/posts/[slug]/like - Unlike a post
export async function DELETE(request, { params }) {
  const { slug } = await params;
  const ipHash = await getIpHash();

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  await prisma.like.deleteMany({
    where: { postId: post.id, ipHash },
  });

  const likeCount = await prisma.like.count({ where: { postId: post.id } });
  return NextResponse.json({ liked: false, likeCount });
}
