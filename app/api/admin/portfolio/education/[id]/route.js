import { createItemHandlers } from '@/lib/admin-crud';

const required = ['institution', 'degree', 'fieldOfStudy', 'location', 'startYear', 'graduationYear'];

const mapper = (body) => ({
  institution: body.institution.trim(),
  degree: body.degree.trim(),
  fieldOfStudy: body.fieldOfStudy.trim(),
  location: body.location.trim(),
  imageSrc: (body.imageSrc || '').trim(),
  startYear: parseInt(body.startYear, 10),
  graduationYear: parseInt(body.graduationYear, 10),
  gpa: (body.gpa || '').trim(),
});

export const { PUT, DELETE } = createItemHandlers('education', required, mapper);
