import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-black/60 dark:text-white/60 sm:px-6">
        <p>{t("tagline")}</p>
        <p className="mt-1">
          &copy; {year} Yacht Assist Montenegro. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
