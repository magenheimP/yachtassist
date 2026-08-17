import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticle } from "@/lib/articles";
import { ArticleBody } from "@/components/ArticleBody";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/laws">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Laws" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function LawsPage({
  params,
}: PageProps<"/[locale]/laws">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Laws");
  const article = await getArticle("laws", locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        {article?.title ?? t("title")}
      </h1>
      <p className="mt-3 text-lg text-black/70 dark:text-white/70">
        {t("intro")}
      </p>
      <div className="mt-8">
        {article ? (
          <ArticleBody body={article.body} />
        ) : (
          <p className="text-black/60 dark:text-white/60">{t("intro")}</p>
        )}
      </div>
    </div>
  );
}
