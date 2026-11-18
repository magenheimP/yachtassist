"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SoonPill } from "@/components/HubTabs";
import { HUB_SECTIONS } from "@/lib/hub";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";

// Header navigation below lg (phones, tablets): a menu button that opens a
// panel under the header with the same top-level items as the desktop header.
// Montenegro Guide expands in place to list its sections (collapsed each time
// the menu opens). Closes on picking a link, Escape, focus leaving, or tapping
// outside. The panel positions against the sticky header (HeaderShell) and
// scrolls if it's taller than the screen.
export function MobileMenu({
  links,
}: {
  links: readonly { href: string; label: string }[];
}) {
  const nav = useTranslations("Nav");
  const hub = useTranslations("Hub");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const guideId = useId();
  const inHub = HUB_SECTIONS.some((section) => section.href === pathname);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const item = (active: boolean) =>
    `flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-medium transition-colors ${
      active
        ? "bg-surface-alt text-cyan-700 on-photo:bg-white/10 on-photo:text-cyan-300"
        : "text-ink hover:bg-surface-alt on-photo:text-white on-photo:hover:bg-white/10"
    }`;

  return (
    <div
      ref={rootRef}
      className="lg:hidden"
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
        aria-label={open ? nav("closeMenu") : nav("menu")}
        onClick={() => {
          setOpen((o) => !o);
          setGuideOpen(false);
        }}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-alt on-photo:text-white on-photo:hover:bg-white/10"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      <div
        id={menuId}
        hidden={!open}
        // 100% is the header's height here, so the panel never runs past the
        // bottom of the screen.
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-b border-border-soft bg-white shadow-xl shadow-navy-900/10 on-photo:border-white/15 on-photo:bg-navy-900/90 on-photo:backdrop-blur-xl"
      >
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-8">
          <ul>
            <li>
              <button
                type="button"
                aria-expanded={guideOpen}
                aria-controls={guideId}
                onClick={() => setGuideOpen((o) => !o)}
                className={`${item(inHub)} w-full text-left`}
              >
                {nav("guide")}
                <ChevronDownIcon
                  className={`ml-auto h-4 w-4 shrink-0 transition-transform ${guideOpen ? "rotate-180" : ""}`}
                />
              </button>
              <ul
                id={guideId}
                hidden={!guideOpen}
                className="mb-1 ml-3 border-l border-border-soft pl-2 on-photo:border-white/15"
              >
                {HUB_SECTIONS.map((section) => {
                  const active = pathname === section.href;
                  return (
                    <li key={section.href}>
                      <Link
                        href={section.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={item(active)}
                      >
                        <section.icon className="h-5 w-5 shrink-0 text-cyan-600 on-photo:text-cyan-300" />
                        <span className="min-w-0">
                          {hub(`${section.key}Tab`)}
                        </span>
                        {section.soon && <SoonPill label={hub("soon")} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={item(active)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
