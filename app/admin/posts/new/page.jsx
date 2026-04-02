import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';

export default async function NewPostPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        New Post
      </h1>
      <PostEditor />
    </AdminShell>
  );
}
