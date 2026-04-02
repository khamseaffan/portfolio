import { redirect, notFound } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PostEditor from '@/components/admin/PostEditor';

export default async function EditPostPage({ params }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    notFound();
  }

  return (
    <AdminShell>
      <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
        Edit Post
      </h1>
      <PostEditor post={JSON.parse(JSON.stringify(post))} />
    </AdminShell>
  );
}
