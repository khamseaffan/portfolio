import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'institution', label: 'Institution', type: 'text', required: true, placeholder: 'University Name' },
  { name: 'degree', label: 'Degree', type: 'text', required: true, placeholder: 'Master of Science' },
  { name: 'fieldOfStudy', label: 'Field of Study', type: 'text', required: true, placeholder: 'Computer Science' },
  { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'New York, NY, USA' },
  { name: 'startYear', label: 'Start Year', type: 'number', required: true, placeholder: '2023' },
  { name: 'graduationYear', label: 'Graduation Year', type: 'number', required: true, placeholder: '2025' },
  { name: 'gpa', label: 'GPA', type: 'text', placeholder: '3.8/4.0' },
  { name: 'imageSrc', label: 'Logo Image Path', type: 'text', placeholder: 'education/nyu.png' },
];

export default async function AdminEducationPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.education.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Education
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/education"
        initialItems={JSON.parse(JSON.stringify(items))}
        fields={fields}
        displayFields={[
          { keys: ['degree', 'fieldOfStudy'], join: ' in ' },
          { keys: ['institution', 'startYear', 'graduationYear'], join: ' | ' },
        ]}
      />
    </AdminShell>
  );
}
