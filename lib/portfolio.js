import profile from '@/data/profile.json';
import experiences from '@/data/work_experience.json';
import projects from '@/data/projects.json';
import education from '@/data/education.json';
import certificationsRaw from '@/data/certificates.json';
import skills from '@/data/skills.json';
import leadership from '@/data/leadership.json';

const certifications = certificationsRaw.map(({ certificate_link, issued_by, ...rest }) => ({
  ...rest,
  certificateLink: certificate_link,
  issuedBy: issued_by,
}));

/**
 * Returns all portfolio content. Content is static, checked into the repo
 * under data/*.json, and bundled at build time — no database round trip.
 */
export function getPortfolioData() {
  return { profile, experiences, projects, education, certifications, skills, leadership };
}
