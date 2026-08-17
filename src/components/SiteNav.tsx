import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteNav() {
  const t = useTranslations("Nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/guide", label: t("guide") },
    { href: "/procedures", label: t("procedures") },
    { href: "/laws", label: t("laws") },
    { href: "/fuel-price", label: t("fuelPrice") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Yacht Assist Montenegro
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links
            .filter((l) => l.href !== "/")
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
