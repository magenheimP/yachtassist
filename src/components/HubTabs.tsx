"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { HUB_SECTIONS } from "@/lib/hub";

export function SoonPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-cyan-50 px-1.5 py-0.5 text-[10px] leading-none font-semibold tracking-wide text-cyan-700 uppercase">
      {label}
    </span>
  );
}

// Pill tabs: one scrolling row on phones, wrapping onto more rows from sm up
// so every section stays visible however long the names get. ("Soon" shows in
// the header menu only; the placeholder pages say it themselves.)
export function HubTabs({ className }: { className?: string }) {
  const t = useTranslations("Hub");
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);

  // On phones, scroll the row so the current tab is in view.
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (list && current) {
      list.scrollLeft =
        current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
    }
  }, [pathname]);

  return (
    <nav aria-label={t("tabsLabel")} className={className}>
      <ul
        ref={listRef}
        className="relative flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible"
      >
        {HUB_SECTIONS.map((section) => {
          const active = pathname === section.href;
          return (
            <li key={section.href} className="shrink-0">
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "border-cyan-600 bg-cyan-600 text-white"
                    : "border-border-soft bg-white text-ink-soft hover:border-cyan-300 hover:text-ink"
                }`}
              >
                {/* Icons only from sm up, to fit more tabs on a phone. */}
                <section.icon
                  className={`hidden h-4 w-4 sm:block ${active ? "" : "text-cyan-600"}`}
                />
                {t(`${section.key}Tab`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
