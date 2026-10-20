import { notFound } from "next/navigation";
import { ARTICLE_SLUGS, type ArticleSlug, getArticle } from "@/lib/articles";
import { ArticleForm } from "./ArticleForm";

export default async function AdminArticlePage({
  params,
}: PageProps<"/admin/articles/[slug]">) {
  const { slug } = await params;

  if (!ARTICLE_SLUGS.includes(slug as ArticleSlug)) {
    notFound();
  }

  const article = await getArticle(slug as ArticleSlug, "en");

  return (
    <div className="rounded-2xl border border-border-soft bg-white p-6">
      <h2 className="text-lg font-semibold text-ink">
        Edit: {slug}
      </h2>
      <ArticleForm
        slug={slug}
        title={article?.title ?? ""}
        body={article?.body ?? ""}
      />
    </div>
  );
}
