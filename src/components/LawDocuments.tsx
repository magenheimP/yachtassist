import { getLocale, getTranslations } from "next-intl/server";
import { LAW_CATEGORIES } from "@/lib/lawDocuments";
import { DocumentIcon, DownloadIcon, InfoIcon } from "@/components/icons";

function formatFileSize(bytes: number, locale: string) {
  const megabytes = bytes >= 1_000_000;
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: megabytes ? "megabyte" : "kilobyte",
    maximumFractionDigits: megabytes ? 1 : 0,
  }).format(megabytes ? bytes / 1_000_000 : bytes / 1000);
}

// A note on which version is binding, links to each topic, then the
// documents of each topic.
export async function LawDocuments() {
  const locale = await getLocale();
  const t = await getTranslations("Laws.documents");

  return (
    <div className="mt-10 border-t border-border-soft pt-10">
      <p className="flex gap-3 rounded-2xl bg-surface-alt px-5 py-4 text-sm leading-relaxed text-ink-soft">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
        <span>{t("note")}</span>
      </p>

      <nav aria-label={t("topicsLabel")} className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {LAW_CATEGORIES.map((category) => (
            <li key={category.key}>
              <a
                href={`#laws-${category.key}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-white px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-cyan-300 hover:text-ink"
              >
                {t(`categories.${category.key}.title`)}
                <span className="text-xs opacity-70">
                  {category.documents.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
        {LAW_CATEGORIES.map((category) => (
          <section
            key={category.key}
            id={`laws-${category.key}`}
            aria-labelledby={`laws-${category.key}-title`}
            className="scroll-mt-28"
          >
            <h2
              id={`laws-${category.key}-title`}
              className="border-l-2 border-cyan-500 pl-4 text-2xl font-medium tracking-tight text-ink"
            >
              {t(`categories.${category.key}.title`)}
            </h2>
            <p className="mt-2 pl-[18px] text-sm text-ink-soft">
              {t(`categories.${category.key}.description`)}
            </p>

            <ul className="mt-6 space-y-4">
              {category.documents.map((doc) => (
                <li
                  key={doc.key}
                  className="flex gap-4 rounded-2xl border border-border-soft bg-white p-5 sm:p-6"
                >
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 sm:flex">
                    <DocumentIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-ink">
                      {t(`items.${doc.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {t(`items.${doc.key}.description`)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {doc.files.map((file) => (
                        // Plain <a>, not the i18n Link: these are static
                        // files, not locale-prefixed routes.
                        <a
                          key={file.href}
                          href={file.href}
                          hrefLang={file.lang}
                          type="application/pdf"
                          download
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-2 text-sm font-medium whitespace-nowrap text-cyan-800 transition-colors hover:border-cyan-300 hover:bg-cyan-100"
                        >
                          <DownloadIcon className="h-4 w-4 shrink-0" />
                          {t(`languages.${file.lang}`)}
                          <span className="font-normal text-cyan-700/80">
                            {/* "PDF" and the page count only where there's
                                room for them. */}
                            <span className="hidden sm:inline">PDF · </span>
                            {formatFileSize(file.bytes, locale)}
                            <span className="hidden sm:inline">
                              {" "}
                              · {t("pages", { count: file.pages })}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
