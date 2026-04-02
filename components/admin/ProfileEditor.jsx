'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileEditor({ profile }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: profile?.name || '',
    greeting: profile?.greeting || "Hello, I'm",
    bio: profile?.bio || '',
    imageSrc: profile?.imageSrc || '',
    roles: profile?.roles?.join(', ') || '',
    highlights: profile?.highlights?.join(', ') || '',
    availableForHire: profile?.availableForHire ?? true,
    resumeUrl: profile?.resumeUrl || '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSave() {
    setError('');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/portfolio/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          roles: form.roles.split(',').map((r) => r.trim()).filter(Boolean),
          highlights: form.highlights.split(',').map((h) => h.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        return;
      }
      router.refresh();
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  async function handleResumeUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/portfolio/resume', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Upload failed');
        return;
      }

      const { resumeUrl } = await res.json();
      update('resumeUrl', resumeUrl);
      router.refresh();
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  const inputStyle = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-body)',
  };

  return (
    <div
      className="p-6 rounded-xl space-y-5"
      style={{ background: 'var(--glass-bg-strong)', border: '1px solid var(--glass-border)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Name *</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Greeting</label>
          <input type="text" value={form.greeting} onChange={(e) => update('greeting', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Bio *</label>
        <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-y" style={inputStyle} />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Profile Image Path</label>
        <input type="text" value={form.imageSrc} onChange={(e) => update('imageSrc', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle}
          placeholder="summary/summaryImage.jpeg" />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Roles (comma separated, shown in typewriter)</label>
        <input type="text" value={form.roles} onChange={(e) => update('roles', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle}
          placeholder="Software Engineer, Full-Stack Developer" />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Highlights (comma separated, badge pills)</label>
        <input type="text" value={form.highlights} onChange={(e) => update('highlights', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle}
          placeholder="Backend Expert, AI/ML Engineer, Cloud Architect" />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.availableForHire}
          onChange={(e) => update('availableForHire', e.target.checked)}
          className="w-4 h-4 rounded accent-[var(--color-primary)]" />
        <span className="text-sm" style={{ color: 'var(--text-body)' }}>Available for hire</span>
      </label>

      {/* Resume Upload */}
      <div>
        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Resume PDF</label>
        <div className="flex items-center gap-3">
          <label
            className="px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer disabled:opacity-50"
            style={{ background: 'var(--color-primary)' }}
          >
            {uploading ? 'Uploading...' : 'Upload New Resume'}
            <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" disabled={uploading} />
          </label>
          {form.resumeUrl && (
            <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs underline" style={{ color: 'var(--color-primary)' }}>
              View current
            </a>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
        style={{ background: 'var(--color-primary)' }}>
        {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  );
}
