import { createItemHandlers } from '@/lib/admin-crud';

const required = ['title', 'description', 'issuedBy', 'date'];

const mapper = (body) => ({
  title: body.title.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  description: body.description.trim(),
  skills: Array.isArray(body.skills) ? body.skills.filter(Boolean) : [],
  certificateLink: body.certificateLink?.trim() || null,
  issuedBy: body.issuedBy.trim(),
  date: body.date.trim(),
});

export const { PUT, DELETE } = createItemHandlers('certification', required, mapper);
