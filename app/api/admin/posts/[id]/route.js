import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

// PUT /api/admin/posts/[id] - Update a post
export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
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

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug.trim())) {
    return NextResponse.json(
      { error: 'Slug must be lowercase alphanumeric with hyphens only' },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: { id },
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

    return NextResponse.json(post);
  } catch (e) {
    if (e.code === 'P2025') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    if (e.code === 'P2002') {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    throw e;
  }
}

// DELETE /api/admin/posts/[id] - Delete a post
export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === 'P2025') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    throw e;
  }
}
