import { getTranslations, setRequestLocale } from "next-intl/server";
import { HubPager } from "@/components/HubPager";
import { HubTabs } from "@/components/HubTabs";

// The Montenegro Guide tabs share one panel: a common header with tabs, and
// previous / next links at the bottom. Each tab keeps its own URL (and
// metadata) so it stays indexable and the cross-links inside article bodies
// keep working.
export default async function HubLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hub");

  return (
    <div>
      <div className="border-b border-border-soft bg-surface-alt">
        <div className="mx-auto max-w-3xl px-6 py-6 sm:py-10">
          <p className="text-xs font-semibold tracking-[0.14em] text-cyan-600 uppercase sm:text-sm sm:tracking-[0.2em]">
            {t("kicker")}
          </p>
          <HubTabs className="mt-4 sm:mt-6" />
        </div>
      </div>
      {children}
      <HubPager />
    </div>
  );
}
