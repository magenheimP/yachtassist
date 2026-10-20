import { prisma } from "@/lib/prisma";

// The old "guide" (Checklist) and "laws" summary articles are no longer shown
// anywhere; their rows are left in the database (and in prisma/seed.ts) so
// the text can be reused.
export const ARTICLE_SLUGS = ["procedures"] as const;
export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

export async function getArticle(slug: ArticleSlug, locale: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug_locale: { slug, locale } },
    });
  } catch {
    // DB not reachable yet (e.g. local dev before DATABASE_URL is set).
    return null;
  }
}

export async function upsertArticle(
  slug: ArticleSlug,
  locale: string,
  data: { title: string; body: string },
) {
  return prisma.article.upsert({
    where: { slug_locale: { slug, locale } },
    create: { slug, locale, ...data },
    update: data,
  });
}
