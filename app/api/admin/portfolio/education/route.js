import { createListHandlers, createReorderHandler } from '@/lib/admin-crud';

const required = ['institution', 'degree', 'fieldOfStudy', 'location', 'startYear', 'graduationYear'];

const mapper = (body, sortOrder) => ({
  institution: body.institution.trim(),
  degree: body.degree.trim(),
  fieldOfStudy: body.fieldOfStudy.trim(),
  location: body.location.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  startYear: parseInt(body.startYear, 10),
  graduationYear: parseInt(body.graduationYear, 10),
  gpa: (body.gpa || '').trim(),
  ...(sortOrder !== undefined && { sortOrder }),
});

const { GET, POST } = createListHandlers('education', required, mapper);
const { PATCH } = createReorderHandler('education');

export { GET, POST, PATCH };
