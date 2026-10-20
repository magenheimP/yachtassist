import { getTranslations, setRequestLocale } from "next-intl/server";
import { HubTabs } from "@/components/HubTabs";

// Guide, Procedures and Laws share one panel: a common header with tabs.
// Each tab keeps its own URL (and metadata) so it stays indexable and the
// cross-links inside article bodies keep working.
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
        <div className="mx-auto max-w-3xl px-6 pt-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-600 uppercase">
            {t("kicker")}
          </p>
          <HubTabs className="mt-6" />
        </div>
      </div>
      {children}
    </div>
  );
}
