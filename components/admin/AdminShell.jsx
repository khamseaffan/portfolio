'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HiOutlineDocumentText,
  HiOutlinePlusCircle,
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineChip,
  HiOutlineUserGroup,
} from 'react-icons/hi';

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const blogNav = [
    { href: '/admin', label: 'Posts', icon: HiOutlineDocumentText },
    { href: '/admin/posts/new', label: 'New Post', icon: HiOutlinePlusCircle },
  ];

  const portfolioNav = [
    { href: '/admin/portfolio/profile', label: 'Profile', icon: HiOutlineUser },
    { href: '/admin/portfolio/experiences', label: 'Experience', icon: HiOutlineBriefcase },
    { href: '/admin/portfolio/projects', label: 'Projects', icon: HiOutlineCode },
    { href: '/admin/portfolio/education', label: 'Education', icon: HiOutlineAcademicCap },
    { href: '/admin/portfolio/certifications', label: 'Certs', icon: HiOutlineBadgeCheck },
    { href: '/admin/portfolio/skills', label: 'Skills', icon: HiOutlineChip },
    { href: '/admin/portfolio/leadership', label: 'Leadership', icon: HiOutlineUserGroup },
  ];

  function NavLink({ item }) {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={{
          background: isActive ? 'var(--glass-bg-hover)' : 'transparent',
          color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
        }}
      >
        <item.icon className="w-4 h-4" />
        {item.label}
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header
        className="sticky top-0 z-50 px-4 py-3"
        style={{
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>
              Admin
            </span>
            <nav className="flex items-center gap-1">
              {blogNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
              <span className="mx-1 text-xs" style={{ color: 'var(--glass-border)' }}>|</span>
              {portfolioNav.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <HiOutlineHome className="w-4 h-4" />
              Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <HiOutlineLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
