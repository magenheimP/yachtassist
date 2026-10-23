import { prisma } from "@/lib/prisma";
import { CLEARANCE_IN } from "@/content/clearanceIn";
import { ENTERING_MONTENEGRO } from "@/content/enteringMontenegro";

// Montenegro Guide tabs whose text is edited in /admin. Each has built-in
// English text in src/content/, shown until the admin saves a version; from
// then on the saved version (database) is shown instead.
//
// The old "guide", "laws" and "procedures" (the previous Clearance tab)
// articles are no longer shown anywhere; their rows are left in the database
// (and prisma/seed.ts) so the text can be reused.
export const ARTICLE_SLUGS = ["entering-montenegro", "clearance-in"] as const;
export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

const BUILT_IN: Record<ArticleSlug, { title: string; body: string }> = {
  "entering-montenegro": ENTERING_MONTENEGRO,
  "clearance-in": CLEARANCE_IN,
};

export async function getArticle(slug: ArticleSlug, locale: string) {
  try {
    const saved = await prisma.article.findUnique({
      where: { slug_locale: { slug, locale } },
    });
    if (saved) return saved;
  } catch {
    // DB not reachable: fall back to the built-in text.
  }
  return locale === "en" ? BUILT_IN[slug] : null;
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
