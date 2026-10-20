// Resolves the canonical site URL for metadata, OG tags, and the sitemap.
// Vercel sets VERCEL_URL automatically on every deploy (including previews),
// so this works out of the box before a custom domain is chosen (see
// CLAUDE.md §8). Set NEXT_PUBLIC_SITE_URL once a domain is picked to pin it.
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
