import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  // Login page is public - don't check auth
  // Middleware handles the redirect for non-login admin pages,
  // but we also do a server-side check here for defense-in-depth
  return <>{children}</>;
}
