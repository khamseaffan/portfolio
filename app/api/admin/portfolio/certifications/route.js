import { createListHandlers, createReorderHandler } from '@/lib/admin-crud';

const required = ['title', 'description', 'issuedBy', 'date'];

const mapper = (body, sortOrder) => ({
  title: body.title.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  description: body.description.trim(),
  skills: Array.isArray(body.skills) ? body.skills.filter(Boolean) : [],
  certificateLink: body.certificateLink?.trim() || null,
  issuedBy: body.issuedBy.trim(),
  date: body.date.trim(),
  ...(sortOrder !== undefined && { sortOrder }),
});

const { GET, POST } = createListHandlers('certification', required, mapper);
const { PATCH } = createReorderHandler('certification');

export { GET, POST, PATCH };
