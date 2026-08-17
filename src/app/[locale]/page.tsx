import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const cards = [
    {
      href: "/guide" as const,
      title: t("guideTitle"),
      description: t("guideDescription"),
    },
    {
      href: "/procedures" as const,
      title: t("proceduresTitle"),
      description: t("proceduresDescription"),
    },
    {
      href: "/laws" as const,
      title: t("lawsTitle"),
      description: t("lawsDescription"),
    },
    {
      href: "/fuel-price" as const,
      title: t("fuelPriceTitle"),
      description: t("fuelPriceDescription"),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-4 text-lg text-black/70 dark:text-white/70">
          {t("heroSubtitle")}
        </p>
        <Link
          href="/guide"
          className="mt-6 inline-block rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800"
        >
          {t("heroCta")}
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
          {t("sectionsHeading")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-lg border border-black/10 p-5 transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
            >
              <h3 className="font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-xl">
        <NewsletterSignup />
      </section>
    </div>
  );
}
