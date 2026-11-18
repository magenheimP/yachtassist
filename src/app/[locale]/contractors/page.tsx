import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ContractorDirectory } from "@/components/ContractorDirectory";
import { InfoIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contractors">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contractors" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function ContractorsPage({
  params,
}: PageProps<"/[locale]/contractors">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contractors");

  return (
    <div>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <ContractorDirectory />

        <p className="mt-14 flex gap-3 rounded-2xl bg-surface-alt px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
          <span>{t("marinaNote")}</span>
        </p>
        <p className="mt-8 border-l-2 border-cyan-500 pl-4 text-sm text-ink-soft">
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
