import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div>
      <PageHeader kicker="Who we are" title={t("title")} />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-lg leading-relaxed text-ink-soft">{t("body")}</p>
        <p className="mt-8 border-l-2 border-cyan-500 pl-4 text-sm text-ink-soft">
          {t("verificationNote")}
        </p>
      </div>
    </div>
  );
}
