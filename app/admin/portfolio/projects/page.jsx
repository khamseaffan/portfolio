import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Project Name' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'skills', label: 'Skills / Tech', type: 'tags', placeholder: 'React, Python, AWS' },
  { name: 'category', label: 'Categories', type: 'tags', placeholder: 'Full Stack, AI/ML' },
  { name: 'demo', label: 'Demo URL', type: 'url', placeholder: 'https://...' },
  { name: 'source', label: 'Source URL', type: 'url', placeholder: 'https://github.com/...' },
  { name: 'impact', label: 'Impact', type: 'text', placeholder: '30% faster' },
  { name: 'status', label: 'Status', type: 'select', options: ['Complete', 'In Progress', 'Live'] },
  { name: 'imageSrc', label: 'Project Image', type: 'image', folder: 'projects' },
];

export default async function AdminProjectsPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.project.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Projects
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/projects"
        initialItems={JSON.parse(JSON.stringify(items))}
        fields={fields}
        displayFields={[
          { key: 'title' },
          { keys: ['status'], join: ' | ' },
        ]}
      />
    </AdminShell>
  );
}
