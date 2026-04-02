import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

// GET /api/admin/posts - List all posts (including drafts)
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { likes: true, comments: true } },
    },
  });

  return NextResponse.json(posts);
}

// POST /api/admin/posts - Create a new post
export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { title, slug, content, excerpt, coverImageUrl, published, tags } = body;

  if (!title?.trim() || !slug?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: 'Title, slug, and content are required' },
      { status: 400 }
    );
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug.trim())) {
    return NextResponse.json(
      { error: 'Slug must be lowercase alphanumeric with hyphens only' },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: (excerpt || '').trim(),
        coverImageUrl: coverImageUrl?.trim() || null,
        published: !!published,
        tags: Array.isArray(tags) ? tags.map((t) => t.trim()).filter(Boolean) : [],
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    if (e.code === 'P2002') {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    throw e;
  }
}
