"use client";

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

export function HubTabs({ className }: { className?: string }) {
  const t = useTranslations("Hub");
  const pathname = usePathname();

  return (
    <nav aria-label={t("tabsLabel")} className={`-mb-px ${className ?? ""}`}>
      <ul className="flex gap-6 overflow-x-auto sm:gap-8">
        {HUB_SECTIONS.map((section) => {
          const active = pathname === section.href;
          return (
            <li key={section.href} className="shrink-0">
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  active
                    ? "border-cyan-500 text-ink"
                    : "border-transparent text-ink-soft hover:border-cyan-300 hover:text-ink"
                }`}
              >
                {/* Icons only from sm up, so all tabs fit on a phone. */}
                <section.icon
                  className={`hidden h-4 w-4 sm:block ${active ? "text-cyan-600" : ""}`}
                />
                {t(`${section.key}Tab`)}
                {section.soon && <SoonPill label={t("soon")} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
