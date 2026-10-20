"use client";

import { usePathname } from "@/i18n/navigation";

// Renders its children everywhere except the home page, which is a single
// full-screen hero with no scrolling.
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? null : children;
}
