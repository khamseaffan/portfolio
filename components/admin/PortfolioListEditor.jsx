'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineX } from 'react-icons/hi';

/**
 * Generic list editor for portfolio sections.
 * @param {Object} props
 * @param {string} props.apiPath - e.g. '/api/admin/portfolio/experiences'
 * @param {Array} props.initialItems - Serialized items from server
 * @param {Array} props.fields - Field definitions: [{ name, label, type, required, placeholder, options }]
 *   type: 'text' | 'textarea' | 'url' | 'number' | 'tags' | 'list' | 'select'
 * @param {Array} props.displayFields - [{ key, label?, join? }] controls what shows in list view.
 *   First entry renders as title, second as subtitle. Values that are arrays are joined with separator.
 */
export default function PortfolioListEditor({ apiPath, initialItems, fields, displayFields }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null); // null | 'new' | item.id
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function getEmptyForm() {
    const empty = {};
    for (const f of fields) {
      if (f.type === 'tags' || f.type === 'list') empty[f.name] = [];
      else if (f.type === 'number') empty[f.name] = 0;
      else empty[f.name] = f.default || '';
    }
    return empty;
  }

  function startNew() {
    setEditing('new');
    setForm(getEmptyForm());
    setError('');
  }

  function startEdit(item) {
    setEditing(item.id);
    const f = {};
    for (const field of fields) {
      f[field.name] = item[field.name] ?? (field.type === 'tags' || field.type === 'list' ? [] : '');
    }
    setForm(f);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setForm({});
    setError('');
  }

  async function handleSave() {
    setError('');
    setSaving(true);

    const isNew = editing === 'new';
    const url = isNew ? apiPath : `${apiPath}/${editing}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        return;
      }

      cancel();
      router.refresh();
      // Refetch items
      const listRes = await fetch(apiPath);
      if (listRes.ok) setItems(await listRes.json());
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return;

    const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
      router.refresh();
    }
  }

  async function handleReorder(index, direction) {
    const newItems = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;

    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setItems(newItems);

    await fetch(apiPath, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: newItems.map((i) => i.id) }),
    });
  }

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function renderField(field) {
    const val = form[field.name];
    const inputStyle = {
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      color: 'var(--text-body)',
    };

    if (field.type === 'textarea') {
      return (
        <textarea
          value={val}
          onChange={(e) => updateField(field.name, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-y"
          style={inputStyle}
          placeholder={field.placeholder}
        />
      );
    }

    if (field.type === 'tags') {
      return (
        <input
          type="text"
          value={Array.isArray(val) ? val.join(', ') : val}
          onChange={(e) =>
            updateField(
              field.name,
              e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
            )
          }
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
          placeholder={field.placeholder || 'Comma separated'}
        />
      );
    }

    if (field.type === 'list') {
      const listVal = Array.isArray(val) ? val : [];
      return (
        <div className="space-y-2">
          {listVal.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...listVal];
                  updated[i] = e.target.value;
                  updateField(field.name, updated);
                }}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => updateField(field.name, listVal.filter((_, j) => j !== i))}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <HiOutlineX className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => updateField(field.name, [...listVal, ''])}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ color: 'var(--color-primary)', background: 'var(--glass-bg)' }}
          >
            + Add item
          </button>
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <select
          value={val}
          onChange={(e) => updateField(field.name, e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={inputStyle}
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
        value={val}
        onChange={(e) => updateField(field.name, field.type === 'number' ? parseInt(e.target.value, 10) || 0 : e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
        style={inputStyle}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <div>
      {/* Edit / New form */}
      {editing && (
        <div
          className="mb-6 p-5 rounded-xl space-y-4"
          style={{ background: 'var(--glass-bg-strong)', border: '1px solid var(--glass-border)' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
            {editing === 'new' ? 'Add New' : 'Edit'}
          </h3>

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                {field.label}{field.required && ' *'}
              </label>
              {renderField(field)}
            </div>
          ))}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
              style={{ background: 'var(--color-primary)' }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancel} className="px-4 py-2 rounded-lg text-sm" style={{ color: 'var(--text-muted)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add button */}
      {!editing && (
        <button
          onClick={startNew}
          className="mb-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          <HiOutlinePlus className="w-4 h-4" /> Add New
        </button>
      )}

      {/* List */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleReorder(index, -1)}
                disabled={index === 0}
                className="p-1 rounded disabled:opacity-20"
              >
                <HiOutlineArrowUp className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              </button>
              <button
                onClick={() => handleReorder(index, 1)}
                disabled={index === items.length - 1}
                className="p-1 rounded disabled:opacity-20"
              >
                <HiOutlineArrowDown className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              {displayFields && displayFields.length > 0 && (
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
                    {displayFields[0].keys
                      ? displayFields[0].keys.map((k) => item[k]).filter(Boolean).join(displayFields[0].join || ' ')
                      : item[displayFields[0].key] || ''}
                  </div>
                  {displayFields[1] && (
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {displayFields[1].keys
                        ? displayFields[1].keys.map((k) => item[k]).filter(Boolean).join(displayFields[1].join || ' | ')
                        : item[displayFields[1].key] || ''}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(item)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                <HiOutlinePencil className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <HiOutlineTrash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && !editing && (
          <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>
            No items yet
          </p>
        )}
      </div>
    </div>
  );
}
