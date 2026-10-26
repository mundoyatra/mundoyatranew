import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Resizes an already-optimized Unsplash/Pexels CDN image URL (which already has
// its own ?w=&q= params) down to a smaller width for thumbnail-sized contexts,
// so the same stored URL isn't served at full hero resolution everywhere it's used.
export function resizeImageUrl(url, width) {
  if (!url) return url;
  if (/([?&])w=\d+/.test(url)) {
    return url.replace(/([?&])w=\d+/, `$1w=${width}`);
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}`;
}
