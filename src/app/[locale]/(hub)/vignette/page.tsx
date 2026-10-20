import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HubPage, hubPageMetadata } from "@/components/HubArticlePage";
import { TouristTaxCalculator } from "@/components/TouristTaxCalculator";
import { VignetteCalculator } from "@/components/VignetteCalculator";
import { InfoIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/vignette">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Vignette");
}

export default async function VignettePage({
  params,
}: PageProps<"/[locale]/vignette">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Vignette");

  return (
    <HubPage title={t("title")} intro={t("intro")}>
      {/* Two calculators side by side on wide screens, breaking out of the
          text column; stacked below lg. */}
      <div className="mt-10 lg:-mx-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <VignetteCalculator />
          <TouristTaxCalculator />
        </div>
        <p className="mt-6 flex gap-3 rounded-2xl bg-surface-alt px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
          <span>
            {t.rich("sourceNote", {
              laws: (chunks) => (
                <Link
                  href="/laws"
                  className="font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-600"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </p>
      </div>
    </HubPage>
  );
}
