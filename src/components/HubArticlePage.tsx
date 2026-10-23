import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { type ArticleSlug, getArticle } from "@/lib/articles";
import { ArticleBody } from "@/components/ArticleBody";
import { InfoIcon } from "@/components/icons";

// Heading, intro and content column shared by every Montenegro Guide tab.
export function HubPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-4xl font-normal tracking-tight text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
      {children}
    </article>
  );
}

// A tab backed by an admin-editable article (see src/lib/articles.ts).
export async function HubArticlePage({
  locale,
  slug,
  namespace,
}: {
  locale: string;
  slug: ArticleSlug;
  namespace: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const article = await getArticle(slug, locale);

  return (
    <HubPage title={article?.title ?? t("title")} intro={t("intro")}>
      {article && (
        <div className="mt-10 border-t border-border-soft pt-10">
          <ArticleBody body={article.body} />
        </div>
      )}
    </HubPage>
  );
}

// A tab marked `soon` in src/lib/hub.ts: heading, intro and a "coming soon"
// note. Use hubPageMetadata(locale, namespace, { soon: true }) with it.
export async function HubSoonPage({
  locale,
  namespace,
}: {
  locale: string;
  namespace: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const hub = await getTranslations("Hub");

  return (
    <HubPage title={t("title")} intro={t("intro")}>
      <p className="mt-10 flex gap-3 rounded-2xl bg-surface-alt px-5 py-4 text-sm leading-relaxed text-ink-soft">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
        <span>{hub("soonNote")}</span>
      </p>
    </HubPage>
  );
}

export async function hubPageMetadata(
  locale: string,
  namespace: string,
  { soon = false }: { soon?: boolean } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
    // Placeholders stay out of search results until they have content.
    ...(soon && { robots: { index: false } }),
  };
}
