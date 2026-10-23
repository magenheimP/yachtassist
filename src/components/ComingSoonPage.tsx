import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { HUB_HOME } from "@/lib/hub";

// A header page that's announced but not built yet (Community, Port Agents):
// title, intro and pointers to what already exists. Kept out of search
// results and the sitemap until it has content.
export async function ComingSoonPage({
  locale,
  namespace,
}: {
  locale: string;
  namespace: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const soon = await getTranslations("ComingSoon");
  const link =
    "font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-600";

  return (
    <div>
      <PageHeader kicker={soon("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="border-l-2 border-cyan-500 pl-4 text-ink-soft">
          {soon.rich("note", {
            guide: (chunks) => (
              <Link href={HUB_HOME} className={link}>
                {chunks}
              </Link>
            ),
            contractors: (chunks) => (
              <Link href="/contractors" className={link}>
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </div>
  );
}

export async function comingSoonMetadata(
  locale: string,
  namespace: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  return {
    title: t("title"),
    description: t("intro"),
    robots: { index: false },
  };
}
