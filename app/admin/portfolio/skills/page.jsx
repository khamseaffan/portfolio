import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'title', label: 'Skill Name', type: 'text', required: true, placeholder: 'Python' },
  { name: 'category', label: 'Category', type: 'select', required: true, options: [
    'Programming Languages',
    'Frontend Development',
    'Backend Development',
    'Cloud & DevOps',
    'Database Management',
    'Tools & Methodologies',
    'Testing & Debugging',
  ]},
  { name: 'imageSrc', label: 'Icon Image Path', type: 'text', placeholder: 'skills/python.png' },
];

export default async function AdminSkillsPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Skills / Tech Stack
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/skills"
        initialItems={JSON.parse(JSON.stringify(items))}
        fields={fields}
        displayFields={[
          { key: 'title' },
          { key: 'category' },
        ]}
      />
    </AdminShell>
  );
}
