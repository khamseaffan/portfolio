import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

// GET /api/admin/portfolio/profile
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

// PUT /api/admin/portfolio/profile - Create or update
export async function PUT(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, greeting, bio, imageSrc, roles, highlights, availableForHire, resumeUrl } = body;

  if (!name?.trim() || !bio?.trim()) {
    return NextResponse.json({ error: 'Name and bio are required' }, { status: 400 });
  }

  const existing = await prisma.profile.findFirst();
  const data = {
    name: name.trim(),
    greeting: (greeting || "Hello, I'm").trim(),
    bio: bio.trim(),
    imageSrc: (imageSrc || '').trim(),
    roles: Array.isArray(roles) ? roles.filter(Boolean) : [],
    highlights: Array.isArray(highlights) ? highlights.filter(Boolean) : [],
    availableForHire: !!availableForHire,
    resumeUrl: resumeUrl?.trim() || null,
  };

  const profile = existing
    ? await prisma.profile.update({ where: { id: existing.id }, data })
    : await prisma.profile.create({ data });

  return NextResponse.json(profile);
}
