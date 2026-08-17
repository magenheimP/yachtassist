import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLatestFuelPrice } from "@/lib/fuelPrice";

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

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: fuelPrice?.currency ?? "EUR",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg text-black/70 dark:text-white/70">
        {t("intro")}
      </p>

      {fuelPrice ? (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-black/10 p-6 dark:border-white/10">
              <p className="text-sm font-medium text-black/60 dark:text-white/60">
                {t("retailLabel")}
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatter.format(Number(fuelPrice.retailPrice))}
              </p>
              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                {t("perLiter")}
              </p>
            </div>
            <div className="rounded-lg border border-black/10 p-6 dark:border-white/10">
              <p className="text-sm font-medium text-black/60 dark:text-white/60">
                {t("dutyFreeLabel")}
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {formatter.format(Number(fuelPrice.dutyFreePrice))}
              </p>
              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                {t("perLiter")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-black/50 dark:text-white/50">
            {t("lastUpdated")}: {dateFormatter.format(fuelPrice.createdAt)}
          </p>
        </>
      ) : (
        <p className="mt-8 text-black/60 dark:text-white/60">
          {t("noData")}
        </p>
      )}
    </div>
  );
}
