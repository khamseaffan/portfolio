import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');

function loadJSON(filename) {
  return JSON.parse(readFileSync(join(dataDir, filename), 'utf-8'));
}

// Use DIRECT_URL for seeding — the pooled connection (DATABASE_URL) uses PgBouncer
// in transaction mode which doesn't work with the pg driver's extended protocol
const pool = new Pool({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding portfolio data...');

  // Profile
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: 'Affan Khamse',
      greeting: "Hello, I'm",
      bio: "From mentoring 50+ NYU students to architecting microservices that never sleep - I build backend systems that scale and AI solutions that actually work in production. Currently making phone calls smarter, one API at a time.",
      imageSrc: 'summary/summaryImage.jpeg',
      roles: ['Software Engineer', 'Full-Stack Developer', 'Cloud & AI Engineer'],
      highlights: ['Backend Expert', 'AI/ML Engineer', 'Cloud Architect'],
      availableForHire: true,
      resumeUrl: '/resume.pdf',
    },
  });
  console.log('  ✓ Profile');

  // Experiences
  await prisma.experience.deleteMany();
  const experiences = loadJSON('work_experience.json');
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    await prisma.experience.create({
      data: {
        role: exp.role,
        organization: exp.organization,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        experiences: exp.experiences,
        imageSrc: exp.imageSrc || '',
        techStack: exp.techStack || [],
        impact: exp.impact || '',
        color: exp.color || 'from-blue-500 to-cyan-400',
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${experiences.length} Experiences`);

  // Projects
  await prisma.project.deleteMany();
  const projects = loadJSON('projects.json');
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    await prisma.project.create({
      data: {
        title: proj.title,
        imageSrc: proj.imageSrc || '',
        description: proj.description,
        skills: proj.skills || [],
        demo: proj.demo || null,
        source: proj.source || null,
        category: proj.category || [],
        impact: proj.impact || '',
        status: proj.status || 'Complete',
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${projects.length} Projects`);

  // Education
  await prisma.education.deleteMany();
  const education = loadJSON('education.json');
  for (let i = 0; i < education.length; i++) {
    const edu = education[i];
    await prisma.education.create({
      data: {
        institution: edu.institution,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        location: edu.location,
        imageSrc: edu.imageSrc || '',
        startYear: edu.startYear,
        graduationYear: edu.graduationYear,
        gpa: edu.gpa || '',
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${education.length} Education`);

  // Certifications
  await prisma.certification.deleteMany();
  const certs = loadJSON('certificates.json');
  for (let i = 0; i < certs.length; i++) {
    const cert = certs[i];
    await prisma.certification.create({
      data: {
        title: cert.title,
        imageSrc: cert.imageSrc || '',
        description: cert.description,
        skills: cert.skills || [],
        certificateLink: cert.certificate_link || null,
        issuedBy: cert.issued_by,
        date: cert.date,
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${certs.length} Certifications`);

  // Skills
  await prisma.skill.deleteMany();
  const skills = loadJSON('skills.json');
  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    await prisma.skill.create({
      data: {
        title: skill.title,
        imageSrc: skill.imageSrc || '',
        category: skill.category,
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${skills.length} Skills`);

  // Leadership
  await prisma.leadership.deleteMany();
  const leadership = loadJSON('leadership.json');
  for (let i = 0; i < leadership.length; i++) {
    const lead = leadership[i];
    await prisma.leadership.create({
      data: {
        role: lead.role,
        organization: lead.organization,
        location: lead.location,
        startDate: lead.startDate,
        endDate: lead.endDate,
        experiences: lead.experiences,
        imageSrc: lead.imageSrc || '',
        techStack: lead.techStack || [],
        impact: lead.impact || '',
        color: lead.color || 'from-purple-500 to-blue-400',
        sortOrder: i,
      },
    });
  }
  console.log(`  ✓ ${leadership.length} Leadership`);

  console.log('\nSeed complete!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
