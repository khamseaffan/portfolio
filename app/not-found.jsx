import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="text-center">
        <h1
          className="text-7xl font-bold mb-2"
          style={{ color: 'var(--color-primary)' }}
        >
          404
        </h1>
        <p
          className="text-lg mb-6"
          style={{ color: 'var(--text-body)' }}
        >
          Page not found
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--color-primary)' }}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: 'var(--text-body)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
