// Downloadable legal texts listed under "Official documents" on the Laws tab.
// One entry per law, with a file per language. The PDFs live in
// public/documents/ (originals in resources/documents/).
//
// To add a document: copy the PDF into public/documents/ with a lowercase,
// hyphenated name, add an entry here, and add its title and description
// under Laws.documents.items.<key> in the messages. `bytes` and `pages` are
// shown on the button, so update them if you replace a file.
type LawDocumentFile = {
  // "en" = English, "cnr" = Montenegrin (ISO 639-3).
  lang: "en" | "cnr";
  href: `/documents/${string}.pdf`;
  pages: number;
  bytes: number;
};

type LawDocument = {
  key: string;
  files: LawDocumentFile[];
};

export const LAW_DOCUMENTS: LawDocument[] = [
  {
    key: "lawOnYachts",
    files: [
      {
        lang: "en",
        href: "/documents/law-on-yachts.pdf",
        pages: 16,
        bytes: 399016,
      },
      {
        lang: "cnr",
        href: "/documents/zakon-o-jahtama.pdf",
        pages: 14,
        bytes: 5036807,
      },
    ],
  },
  {
    key: "touristTax",
    files: [
      {
        lang: "cnr",
        href: "/documents/uredba-boravisna-taksa-plovni-objekti.pdf",
        pages: 3,
        bytes: 220471,
      },
    ],
  },
  {
    key: "visaRegime",
    files: [
      {
        lang: "en",
        href: "/documents/decree-on-visa-regime-2026.pdf",
        pages: 4,
        bytes: 114420,
      },
    ],
  },
];
