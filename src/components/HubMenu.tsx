"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SoonPill } from "@/components/HubTabs";
import { HUB_SECTIONS } from "@/lib/hub";
import { ChevronDownIcon } from "@/components/icons";

// Header dropdown for the Montenegro Guide panel. Click to open (works the
// same on touch and desktop); closes on outside click, Escape, focus leaving,
// or picking a section.
//
// Below lg (phones, tablets) the wrapper is deliberately not `relative`, so
// the menu positions against the sticky header and spans its width instead of
// being clipped by the horizontally scrolling link row it sits in.
export function HubMenu({ triggerClassName }: { triggerClassName?: string }) {
  const nav = useTranslations("Nav");
  const t = useTranslations("Hub");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const inHub = HUB_SECTIONS.some((section) => section.href === pathname);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="lg:relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 ${open || inHub ? "text-cyan-700 on-photo:text-cyan-300" : ""} ${triggerClassName ?? ""}`}
      >
        {nav("guide")}
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full right-4 left-4 z-50 mt-2 rounded-2xl border border-border-soft bg-white p-2 shadow-xl shadow-navy-900/10 lg:right-auto lg:left-0 lg:mt-5 lg:w-80 on-photo:border-white/15 on-photo:bg-navy-900/75 on-photo:shadow-black/30 on-photo:backdrop-blur-xl"
      >
        <ul>
          {HUB_SECTIONS.map((section) => {
            const active = pathname === section.href;
            return (
              <li key={section.href}>
                <Link
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-alt on-photo:hover:bg-white/10 ${
                    active ? "bg-surface-alt on-photo:bg-white/10" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 on-photo:bg-white/10 on-photo:text-cyan-300">
                    <section.icon className="h-4 w-4" />
                  </span>
                  <span>
                    {/* Same type as the header links: small, uppercase, tracked. */}
                    <span
                      className={`flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors group-hover:text-cyan-700 on-photo:group-hover:text-cyan-300 ${
                        active
                          ? "text-cyan-700 on-photo:text-cyan-300"
                          : "text-ink on-photo:text-white"
                      }`}
                    >
                      {t(`${section.key}Tab`)}
                      {section.soon && <SoonPill label={t("soon")} />}
                    </span>
                    <span className="mt-1 block text-xs leading-snug font-normal text-ink-soft on-photo:text-white/60">
                      {t(`${section.key}TabDescription`)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
