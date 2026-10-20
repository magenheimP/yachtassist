"use client";

import { Link, usePathname } from "@/i18n/navigation";

// Header link that marks the current page (aria-current + accent colour).
export function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? "text-cyan-700 on-photo:text-cyan-300" : ""}`}
    >
      {children}
    </Link>
  );
}
