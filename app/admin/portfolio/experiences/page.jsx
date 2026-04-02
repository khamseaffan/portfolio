import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Software Engineer' },
  { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Company Name' },
  { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'New York, USA' },
  { name: 'startDate', label: 'Start Date', type: 'text', required: true, placeholder: 'Jun, 2025' },
  { name: 'endDate', label: 'End Date', type: 'text', required: true, placeholder: 'Present' },
  { name: 'experiences', label: 'Bullet Points', type: 'list' },
  { name: 'techStack', label: 'Tech Stack', type: 'tags', placeholder: 'AWS, Python, Docker' },
  { name: 'impact', label: 'Impact', type: 'text', placeholder: 'Under 1.5s latency' },
  { name: 'imageSrc', label: 'Logo Image Path', type: 'text', placeholder: '/api/placeholder/80/80' },
  { name: 'color', label: 'Gradient Color', type: 'text', default: 'from-blue-500 to-cyan-400', placeholder: 'from-blue-500 to-cyan-400' },
];

export default async function AdminExperiencesPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.experience.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Work Experience
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/experiences"
        initialItems={JSON.parse(JSON.stringify(items))}
        fields={fields}
        displayFields={[
          { keys: ['role', 'organization'], join: ' @ ' },
          { keys: ['startDate', 'endDate', 'location'], join: ' | ' },
        ]}
      />
    </AdminShell>
  );
}
