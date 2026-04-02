import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';

/**
 * Creates GET (list) and POST (create) handlers for a portfolio section.
 */
export function createListHandlers(modelName, requiredFields, dataMapper) {
  async function GET() {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await prisma[modelName].findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(items);
  }

  async function POST(request) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    for (const field of requiredFields) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const count = await prisma[modelName].count();
    const data = dataMapper(body, count);

    const item = await prisma[modelName].create({ data });
    return NextResponse.json(item, { status: 201 });
  }

  return { GET, POST };
}

/**
 * Creates PUT (update) and DELETE handlers for a portfolio section item.
 */
export function createItemHandlers(modelName, requiredFields, dataMapper) {
  async function PUT(request, { params }) {
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

    for (const field of requiredFields) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    try {
      const item = await prisma[modelName].update({
        where: { id },
        data: dataMapper(body),
      });
      return NextResponse.json(item);
    } catch (e) {
      if (e.code === 'P2025') {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      throw e;
    }
  }

  async function DELETE(request, { params }) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    try {
      await prisma[modelName].delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (e) {
      if (e.code === 'P2025') {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      throw e;
    }
  }

  return { PUT, DELETE };
}

/**
 * Creates a PATCH handler for reordering items.
 */
export function createReorderHandler(modelName) {
  async function PATCH(request) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { orderedIds } = body;
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: 'orderedIds array required' }, { status: 400 });
    }

    await Promise.all(
      orderedIds.map((id, index) =>
        prisma[modelName].update({ where: { id }, data: { sortOrder: index } })
      )
    );

    return NextResponse.json({ success: true });
  }

  return { PATCH };
}
