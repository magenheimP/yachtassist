import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fuelPriceFormatter, getLatestFuelPrice } from "@/lib/fuelPrice";

// public/fuel-icon.png is a transparent cut-out of resources/fuel-icon-vector.jpg,
// used as a mask so the pump takes the brand colour from bg-* classes.
const fuelIconMask: CSSProperties = {
  maskImage: "url(/fuel-icon.png)",
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
};

// Always-visible fuel prices in the header. It renders on every page, so the
// admin fuel price action revalidates the whole [locale] layout on save.
export async function FuelPriceBadge({ className }: { className?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("FuelPrice");
  const nav = await getTranslations("Nav");
  const fuelPrice = await getLatestFuelPrice();

  const linkClass = `group flex shrink-0 items-center gap-2 rounded-xl border border-transparent px-1.5 py-1 transition-colors hover:border-cyan-300 hover:bg-cyan-50 sm:gap-2.5 sm:border-border-soft sm:px-3 sm:py-1.5 on-photo:hover:border-white/40 on-photo:hover:bg-white/10 on-photo:sm:border-white/25 ${className ?? ""}`;
  // The pump makes way for the menu button on narrow phones.
  const icon = (
    <span
      aria-hidden
      className="h-7 w-7 shrink-0 bg-cyan-600 max-[399px]:hidden on-photo:bg-cyan-300"
      style={fuelIconMask}
    />
  );

  if (!fuelPrice) {
    return (
      <Link href="/fuel-price" className={linkClass}>
        {icon}
        <span className="text-sm font-medium text-ink-soft group-hover:text-ink on-photo:text-white/85 on-photo:group-hover:text-white">
          {nav("fuelPrice")}
        </span>
      </Link>
    );
  }

  const formatter = fuelPriceFormatter(locale, fuelPrice.currency);
  const retail = formatter.format(Number(fuelPrice.retailPrice));
  const dutyFree = formatter.format(Number(fuelPrice.dutyFreePrice));
  const updated = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(fuelPrice.createdAt);
  const label = t("badgeLabel", { retail, dutyFree, updated });

  return (
    <Link
      href="/fuel-price"
      aria-label={label}
      title={label}
      className={linkClass}
    >
      {icon}
      <span className="grid grid-cols-[auto_auto] items-baseline gap-x-2 text-xs leading-tight">
        <span className="text-ink-soft on-photo:text-white/75">
          {t("badgeRetail")}
        </span>
        <span className="text-right font-semibold text-ink tabular-nums on-photo:text-white">
          {retail}
        </span>
        <span className="text-cyan-700 on-photo:text-cyan-200">
          {t("badgeDutyFree")}
        </span>
        <span className="text-right font-semibold text-navy-900 tabular-nums on-photo:text-white">
          {dutyFree}
        </span>
      </span>
    </Link>
  );
}
