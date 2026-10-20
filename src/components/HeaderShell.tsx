"use client";

import { usePathname } from "@/i18n/navigation";

// The sticky site header. On the home page it is fully transparent over the
// full-screen background photo (a dark fade at the top of the photo keeps it
// legible); data-on-photo switches its contents to light text through the
// `on-photo:` variant (see globals.css).
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";

  return (
    <header
      data-on-photo={isHome || undefined}
      className={`sticky top-0 z-40 border-b ${
        isHome
          ? "border-transparent"
          : "border-border-soft/70 bg-white/90 backdrop-blur"
      }`}
    >
      {children}
    </header>
  );
}
