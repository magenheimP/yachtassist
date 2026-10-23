"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { HUB_SECTIONS } from "@/lib/hub";
import { ChevronDownIcon } from "@/components/icons";

export function SoonPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-cyan-50 px-1.5 py-0.5 text-[10px] leading-none font-semibold tracking-wide text-cyan-700 uppercase">
      {label}
    </span>
  );
}

// The Montenegro Guide's section switcher. On phones, one dropdown (a native
// select, so the phone's own picker opens) showing the current section; from
// sm up, pill tabs that wrap onto more rows so every section stays visible.
// ("Soon" shows in the header menus only; the placeholder pages say it.)
export function HubTabs({ className }: { className?: string }) {
  const t = useTranslations("Hub");
  const pathname = usePathname();
  const router = useRouter();
  const current = HUB_SECTIONS.find((section) => section.href === pathname);

  return (
    <nav aria-label={t("tabsLabel")} className={className}>
      <div className="relative sm:hidden">
        {current && (
          <current.icon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-cyan-600" />
        )}
        <select
          aria-label={t("tabsLabel")}
          value={current?.href ?? ""}
          onChange={(event) => router.push(event.target.value)}
          className="w-full appearance-none rounded-xl border border-border-soft bg-white py-3 pr-11 pl-12 text-[15px] font-semibold text-ink focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 focus:outline-none"
        >
          {HUB_SECTIONS.map((section) => (
            <option key={section.href} value={section.href}>
              {t(`${section.key}Tab`) + (section.soon ? ` (${t("soon")})` : "")}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-soft" />
      </div>

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
