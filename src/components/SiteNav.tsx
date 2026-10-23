import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HubMenu } from "@/components/HubMenu";
import { FuelPriceBadge } from "@/components/FuelPriceBadge";
import { HeaderShell } from "@/components/HeaderShell";
import { NavLink } from "@/components/NavLink";
import { SiteLogo } from "@/components/SiteLogo";

export function SiteNav() {
  const t = useTranslations("Nav");

  // After the Montenegro Guide dropdown. Contact is in the footer.
  const links = [
    { href: "/contractors", label: t("contractors") },
    { href: "/community", label: t("community") },
    { href: "/port-agents", label: t("portAgents") },
  ] as const;

  // Small uppercase links; the current page turns cyan (NavLink, HubMenu).
  const navItem =
    "whitespace-nowrap font-medium tracking-[0.08em] uppercase transition-colors hover:text-cyan-700 on-photo:hover:text-cyan-300";

  return (
    <HeaderShell>
      <nav className="mx-auto flex w-full max-w-[90rem] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-8 lg:px-10 lg:py-6">
        <Link href="/" className="shrink-0" aria-label="Yacht Assist Montenegro">
          <SiteLogo
            className="text-ink on-photo:text-white"
            accentClassName="text-cyan-600 on-photo:text-cyan-300"
          />
        </Link>
        <ul className="ml-auto hidden items-center gap-6 text-[13px] text-ink lg:flex xl:gap-9 on-photo:text-white">
          <li>
            <HubMenu triggerClassName={navItem} />
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className={navItem}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <FuelPriceBadge className="ml-auto lg:ml-4 xl:ml-8" />
      </nav>
      <ul className="flex items-center gap-6 overflow-x-auto border-t border-border-soft/70 px-4 py-2.5 text-xs text-ink sm:px-8 lg:hidden on-photo:border-white/15 on-photo:text-white">
        <li className="shrink-0">
          <HubMenu triggerClassName={navItem} />
        </li>
        {links.map((link) => (
          <li key={link.href} className="shrink-0">
            <NavLink href={link.href} className={navItem}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </HeaderShell>
  );
}
