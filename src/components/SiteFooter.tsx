import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteLogo } from "@/components/SiteLogo";
import { HUB_SECTIONS } from "@/lib/hub";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const hub = useTranslations("Hub");
  const year = new Date().getFullYear();

  const links = [
    ...HUB_SECTIONS.filter((section) => !section.soon).map((section) => ({
      href: section.href,
      label: hub(`${section.key}Tab`),
    })),
    { href: "/fuel-price", label: nav("fuelPrice") },
    { href: "/about", label: nav("about") },
    { href: "/contact", label: nav("contact") },
  ];

  return (
    <footer className="mt-auto bg-navy-900 text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <SiteLogo className="text-white" accentClassName="text-cyan-400" />
            <p className="mt-4 text-sm leading-relaxed">{t("tagline")}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          &copy; {year} Yacht Assist Montenegro. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
