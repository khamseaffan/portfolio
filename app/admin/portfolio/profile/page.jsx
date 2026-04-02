import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import ProfileEditor from '@/components/admin/ProfileEditor';

export default async function AdminProfilePage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');

  const profile = await prisma.profile.findFirst();
  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Profile & Summary
      </h1>
      <ProfileEditor profile={profile ? JSON.parse(JSON.stringify(profile)) : null} />
    </AdminShell>
  );
}
