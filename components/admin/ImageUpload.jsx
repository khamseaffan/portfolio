'use client';

import { useState } from 'react';
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';

/**
 * Image upload component for admin forms.
 * Uploads to /api/admin/portfolio/upload, returns the Supabase public URL.
 *
 * @param {string} value - Current image URL
 * @param {Function} onChange - Called with new URL after upload
 * @param {string} folder - Storage subfolder (e.g., 'skills', 'projects')
 */
export default function ImageUpload({ value, onChange, folder = 'general' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/admin/portfolio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Upload failed');
        return;
      }

      const { url } = await res.json();
      onChange(url);
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
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value.startsWith('http') ? value : `/images/${value}`}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-lg border"
            style={{ borderColor: 'var(--glass-border)' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
          >
            <HiOutlineX className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload button + manual URL input */}
      <div className="flex items-center gap-2">
        <label
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-body)',
          }}
        >
          <HiOutlinePhotograph className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-lg text-xs outline-none"
          style={inputStyle}
          placeholder="Paste image URL"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
