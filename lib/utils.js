export const getImageURL = (path) => {
  if (!path) return '';
  // Already a full URL (Supabase Storage or external)
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Local fallback
  return `/images/${path}`;
};
