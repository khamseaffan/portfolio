import { createListHandlers, createReorderHandler } from '@/lib/admin-crud';

const required = ['title', 'description'];

const mapper = (body, sortOrder) => ({
  title: body.title.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  description: body.description.trim(),
  skills: Array.isArray(body.skills) ? body.skills.filter(Boolean) : [],
  demo: body.demo?.trim() || null,
  source: body.source?.trim() || null,
  category: Array.isArray(body.category) ? body.category.filter(Boolean) : [],
  impact: (body.impact || '').trim(),
  status: (body.status || 'Complete').trim(),
  ...(sortOrder !== undefined && { sortOrder }),
});

const { GET, POST } = createListHandlers('project', required, mapper);
const { PATCH } = createReorderHandler('project');

export { GET, POST, PATCH };
