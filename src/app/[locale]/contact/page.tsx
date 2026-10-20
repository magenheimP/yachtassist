import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <div>
      <PageHeader kicker="Get in touch" title={t("title")} intro={t("intro")} />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-border-soft bg-white p-8">
          <p className="text-sm font-semibold tracking-wide text-ink-soft uppercase">
            {t("emailLabel")}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block text-2xl font-medium tracking-tight text-cyan-700 hover:text-cyan-600"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-soft">{t("correctionsNote")}</p>
      </div>
    </div>
  );
}
