import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PortfolioListEditor from '@/components/admin/PortfolioListEditor';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Certificate Name' },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'issuedBy', label: 'Issued By', type: 'text', required: true, placeholder: 'Coursera, CodePath...' },
  { name: 'date', label: 'Date', type: 'text', required: true, placeholder: '2024' },
  { name: 'skills', label: 'Skills', type: 'tags', placeholder: 'Python, Data Science' },
  { name: 'certificateLink', label: 'Certificate URL', type: 'url', placeholder: 'https://...' },
  { name: 'imageSrc', label: 'Certificate Image', type: 'image', folder: 'certificates' },
];

export default async function AdminCertificationsPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const items = await prisma.certification.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Certifications
      </h1>
      <PortfolioListEditor
        apiPath="/api/admin/portfolio/certifications"
        initialItems={JSON.parse(JSON.stringify(items))}
        fields={fields}
        displayFields={[
          { key: 'title' },
          { keys: ['issuedBy', 'date'], join: ' | ' },
        ]}
      />
    </AdminShell>
  );
}
