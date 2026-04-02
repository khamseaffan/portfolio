import { createItemHandlers } from '@/lib/admin-crud';

const required = ['title', 'category'];

const mapper = (body) => ({
  title: body.title.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  category: body.category.trim(),
});

export const { PUT, DELETE } = createItemHandlers('skill', required, mapper);
