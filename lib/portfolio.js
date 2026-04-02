import { prisma } from '@/lib/prisma';

/**
 * Fetches all portfolio data from the database.
 * Falls back to empty defaults if no data exists yet.
 */
export async function getPortfolioData() {
  const [profile, experiences, projects, education, certifications, skills, leadership] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.project.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.education.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.certification.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }] }),
      prisma.leadership.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);

  return {
    profile: profile || {
      name: 'Affan Khamse',
      greeting: "Hello, I'm",
      bio: '',
      imageSrc: 'summary/summaryImage.jpeg',
      roles: ['Software Engineer'],
      highlights: ['Backend Expert'],
      availableForHire: true,
      resumeUrl: '/resume.pdf',
    },
    experiences,
    projects,
    education,
    certifications,
    skills,
    leadership,
  };
}
