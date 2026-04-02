import { createListHandlers, createReorderHandler } from '@/lib/admin-crud';

const required = ['title', 'category'];

const mapper = (body, sortOrder) => ({
  title: body.title.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  category: body.category.trim(),
  ...(sortOrder !== undefined && { sortOrder }),
});

const { GET, POST } = createListHandlers('skill', required, mapper);
const { PATCH } = createReorderHandler('skill');

export { GET, POST, PATCH };
