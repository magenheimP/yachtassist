import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg text-black/70 dark:text-white/70">
        {t("intro")}
      </p>

      <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
        <p className="text-sm font-medium text-black/60 dark:text-white/60">
          {t("emailLabel")}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 block text-lg font-medium underline underline-offset-2 hover:no-underline"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <p className="mt-6 text-sm text-black/60 dark:text-white/60">
        {t("correctionsNote")}
      </p>
    </div>
  );
}
