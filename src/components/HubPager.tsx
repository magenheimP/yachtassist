"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { HUB_SECTIONS } from "@/lib/hub";

// Previous / next links under each Montenegro Guide tab, so the guide can be
// read in order without scrolling back up to the tabs. Skips `soon` tabs.
export function HubPager() {
  const t = useTranslations("Hub");
  const pathname = usePathname();
  const index = HUB_SECTIONS.findIndex((section) => section.href === pathname);
  if (index === -1) return null;

  const previous = HUB_SECTIONS.slice(0, index).findLast((s) => !s.soon);
  const next = HUB_SECTIONS.slice(index + 1).find((s) => !s.soon);
  const card =
    "flex flex-col gap-1 rounded-2xl border border-border-soft bg-white px-5 py-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50";

  return (
    <nav
      aria-label={t("pagerLabel")}
      className="mx-auto max-w-3xl px-6 pb-12 sm:pb-16"
    >
      <div className="grid gap-3 border-t border-border-soft pt-8 sm:grid-cols-2">
        {previous && (
          <Link href={previous.href} className={card}>
            <span className="text-xs font-semibold tracking-[0.12em] text-cyan-600 uppercase">
              &larr; {t("previous")}
            </span>
            <span className="font-medium text-ink">
              {t(`${previous.key}Tab`)}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={next.href}
            className={`${card} text-right sm:col-start-2`}
          >
            <span className="text-xs font-semibold tracking-[0.12em] text-cyan-600 uppercase">
              {t("next")} &rarr;
            </span>
            <span className="font-medium text-ink">{t(`${next.key}Tab`)}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
