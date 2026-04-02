import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import AdminPostList from '@/components/admin/AdminPostList';

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { likes: true, comments: true } },
    },
  });

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
          All Posts
        </h1>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </span>
      </div>
      <AdminPostList posts={JSON.parse(JSON.stringify(posts))} />
    </AdminShell>
  );
}
