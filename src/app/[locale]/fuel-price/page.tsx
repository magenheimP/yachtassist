import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fuelPriceFormatter, getLatestFuelPrice } from "@/lib/fuelPrice";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/fuel-price">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FuelPrice" });
  return {
    title: t("title"),
    description: t("intro"),
    openGraph: { title: t("title"), description: t("intro") },
  };
}

export default async function FuelPricePage({
  params,
}: PageProps<"/[locale]/fuel-price">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("FuelPrice");
  const fuelPrice = await getLatestFuelPrice();

  const formatter = fuelPriceFormatter(locale, fuelPrice?.currency ?? "EUR");

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div>
      <PageHeader kicker="Updated weekly" title={t("title")} intro={t("intro")} />

      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        {fuelPrice ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border-soft bg-white p-8">
                <p className="text-sm font-semibold tracking-wide text-ink-soft uppercase">
                  {t("retailLabel")}
                </p>
                <p className="mt-3 text-4xl font-normal tracking-tight text-ink">
                  {formatter.format(Number(fuelPrice.retailPrice))}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{t("perLiter")}</p>
              </div>
              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-8">
                <p className="text-sm font-semibold tracking-wide text-cyan-700 uppercase">
                  {t("dutyFreeLabel")}
                </p>
                <p className="mt-3 text-4xl font-normal tracking-tight text-navy-900">
                  {formatter.format(Number(fuelPrice.dutyFreePrice))}
                </p>
                <p className="mt-1 text-sm text-cyan-700">{t("perLiter")}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              {t("lastUpdated")}: {dateFormatter.format(fuelPrice.createdAt)}
            </p>
          </>
        ) : (
          <p className="text-ink-soft">{t("noData")}</p>
        )}
      </div>
    </div>
  );
}
