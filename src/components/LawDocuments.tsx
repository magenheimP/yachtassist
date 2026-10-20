import { getLocale, getTranslations } from "next-intl/server";
import { LAW_DOCUMENTS } from "@/lib/lawDocuments";
import { DocumentIcon, DownloadIcon } from "@/components/icons";

function formatFileSize(bytes: number, locale: string) {
  const megabytes = bytes >= 1_000_000;
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: megabytes ? "megabyte" : "kilobyte",
    maximumFractionDigits: megabytes ? 1 : 0,
  }).format(megabytes ? bytes / 1_000_000 : bytes / 1000);
}

export async function LawDocuments() {
  const locale = await getLocale();
  const t = await getTranslations("Laws.documents");

  return (
    <section
      aria-labelledby="law-documents"
      className="mt-10 border-t border-border-soft pt-10"
    >
      <h2
        id="law-documents"
        className="border-l-2 border-cyan-500 pl-4 text-2xl font-medium tracking-tight text-ink"
      >
        {t("heading")}
      </h2>
      <p className="mt-4 leading-relaxed text-ink-soft">{t("intro")}</p>

      <ul className="mt-6 space-y-4">
        {LAW_DOCUMENTS.map((doc) => (
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
                  // Plain <a>, not the i18n Link: these are static files,
                  // not locale-prefixed routes.
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
                      PDF · {formatFileSize(file.bytes, locale)}
                      {/* Page count only where there's room for it. */}
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
  );
}
