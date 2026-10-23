import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PortAgentList } from "@/components/PortAgentList";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/port-agents">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PortAgents" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function PortAgentsPage({
  params,
}: PageProps<"/[locale]/port-agents">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PortAgents");

  return (
    <div>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <PortAgentList />

        <p className="mt-14 border-l-2 border-cyan-500 pl-4 text-sm text-ink-soft">
          {t.rich("listingNote", {
            contact: (chunks) => (
              <Link
                href="/contact"
                className="font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-600"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </div>
  );
}
