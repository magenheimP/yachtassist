import { prisma } from "@/lib/prisma";
import { CLEARANCE_IN } from "@/content/clearanceIn";
import { CLEARANCE_OUT } from "@/content/clearanceOut";
import { DUTY_FREE_FUEL } from "@/content/dutyFreeFuel";
import { ENTERING_MONTENEGRO } from "@/content/enteringMontenegro";

// Articles whose text is edited in /admin: the Montenegro Guide tabs, plus
// the duty-free fuel guide on the Fuel Price page. Each has built-in English
// text in src/content/, shown until the admin saves a version; from then on
// the saved version (database) is shown instead.
//
// The old "guide", "laws" and "procedures" (the previous Clearance tab)
// articles are no longer shown anywhere; their rows are left in the database
// (and prisma/seed.ts) so the text can be reused.
export const ARTICLE_SLUGS = [
  "entering-montenegro",
  "clearance-in",
  "clearance-out",
  "duty-free-fuel",
] as const;
export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

const BUILT_IN: Record<ArticleSlug, { title: string; body: string }> = {
  "entering-montenegro": ENTERING_MONTENEGRO,
  "clearance-in": CLEARANCE_IN,
  "clearance-out": CLEARANCE_OUT,
  "duty-free-fuel": DUTY_FREE_FUEL,
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
