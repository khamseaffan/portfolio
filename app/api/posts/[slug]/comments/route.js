import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getIpHash } from '@/lib/ip';
import { checkRateLimit } from '@/lib/rate-limit';

// GET /api/posts/[slug]/comments - List comments
export async function GET(request, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;
  const skip = (page - 1) * limit;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const [comments, totalCount] = await Promise.all([
    prisma.comment.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        author: true,
        content: true,
        createdAt: true,
      },
    }),
    prisma.comment.count({ where: { postId: post.id } }),
  ]);

  return NextResponse.json({
    comments,
    totalPages: Math.ceil(totalCount / limit),
  });
}

// POST /api/posts/[slug]/comments - Add a comment
export async function POST(request, { params }) {
  const { slug } = await params;
  const ipHash = await getIpHash();

  if (!checkRateLimit(`comment:${ipHash}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many comments. Please wait before posting again.' },
      { status: 429 }
    );
  }

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { author, content } = body;

  // Validate content
  const trimmedContent = (content || '').trim();
  if (!trimmedContent || trimmedContent.length > 1000) {
    return NextResponse.json(
      { error: 'Comment must be between 1 and 1000 characters' },
      { status: 400 }
    );
  }

  // Validate author
  const trimmedAuthor = (author || '').trim().slice(0, 50) || 'Anonymous';

  // Basic link spam check: reject if more than 3 URLs
  const urlCount = (trimmedContent.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) {
    return NextResponse.json({ error: 'Too many links in comment' }, { status: 400 });
  }

  // Strip HTML tags
  const sanitizedContent = trimmedContent.replace(/<[^>]*>/g, '');

  const comment = await prisma.comment.create({
    data: {
      postId: post.id,
      author: trimmedAuthor,
      content: sanitizedContent,
      ipHash,
    },
    select: {
      id: true,
      author: true,
      content: true,
      createdAt: true,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
