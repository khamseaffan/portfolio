import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Teaching Assistant' },
  { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'New York University' },
  { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'New York, NY' },
  { name: 'startDate', label: 'Start Date', type: 'text', required: true, placeholder: 'Jan, 2024' },
  { name: 'endDate', label: 'End Date', type: 'text', required: true, placeholder: 'May, 2025' },
  { name: 'experiences', label: 'Bullet Points', type: 'list' },
  { name: 'techStack', label: 'Skills / Tech', type: 'tags', placeholder: 'C++, Java, Mentorship' },
  { name: 'impact', label: 'Impact', type: 'text', placeholder: '50+ students mentored' },
  { name: 'imageSrc', label: 'Logo Image Path', type: 'text', placeholder: 'history/nyu.png' },
  { name: 'color', label: 'Gradient Color', type: 'text', default: 'from-purple-500 to-blue-400', placeholder: 'from-purple-500 to-blue-400' },
];

export default async function AdminLeadershipPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.leadership.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Leadership & Activities
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/leadership"
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
