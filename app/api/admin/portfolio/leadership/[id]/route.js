import { createItemHandlers } from '@/lib/admin-crud';

const required = ['role', 'organization', 'location', 'startDate', 'endDate'];

const mapper = (body) => ({
  role: body.role.trim(),
  organization: body.organization.trim(),
  location: body.location.trim(),
  startDate: body.startDate.trim(),
  endDate: body.endDate.trim(),
  experiences: Array.isArray(body.experiences) ? body.experiences.filter(Boolean) : [],
  imageSrc: (body.imageSrc || '').trim(),
  techStack: Array.isArray(body.techStack) ? body.techStack.filter(Boolean) : [],
  impact: (body.impact || '').trim(),
  color: (body.color || 'from-purple-500 to-blue-400').trim(),
});

export const { PUT, DELETE } = createItemHandlers('leadership', required, mapper);
