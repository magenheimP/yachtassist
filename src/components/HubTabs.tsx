"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { HUB_SECTIONS } from "@/lib/hub";
import { Dropdown } from "@/components/Dropdown";

export function SoonPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-cyan-50 px-1.5 py-0.5 text-[10px] leading-none font-semibold tracking-wide text-cyan-700 uppercase">
      {label}
    </span>
  );
}

// The Montenegro Guide's section switcher. On phones, one dropdown showing
// the current section (picking another goes straight there); from
// sm up, pill tabs that wrap onto more rows so every section stays visible.
// ("Soon" shows in the header menus only; the placeholder pages say it.)
export function HubTabs({ className }: { className?: string }) {
  const t = useTranslations("Hub");
  const pathname = usePathname();
  const router = useRouter();
  const current = HUB_SECTIONS.find((section) => section.href === pathname);

  return (
    <nav aria-label={t("tabsLabel")} className={className}>
      <Dropdown
        label={t("tabsLabel")}
        value={current?.href ?? ""}
        onChange={(href) => router.push(href)}
        options={HUB_SECTIONS.map((section) => ({
          value: section.href,
          label:
            t(`${section.key}Tab`) + (section.soon ? ` (${t("soon")})` : ""),
          icon: section.icon,
        }))}
        className="sm:hidden"
        buttonClassName="rounded-xl border border-border-soft bg-white px-4 py-3 text-[15px] font-semibold text-ink focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 focus:outline-none"
      />

      <ul className="hidden flex-wrap gap-2 sm:flex">
        {HUB_SECTIONS.map((section) => {
          const active = pathname === section.href;
          return (
            <li key={section.href}>
              <Link
                href={section.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "border-cyan-600 bg-cyan-600 text-white"
                    : "border-border-soft bg-white text-ink-soft hover:border-cyan-300 hover:text-ink"
                }`}
              >
                <section.icon
                  className={`h-4 w-4 ${active ? "" : "text-cyan-600"}`}
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
