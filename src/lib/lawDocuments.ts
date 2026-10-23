// Downloadable legal texts on the Laws tab, grouped by topic. One entry per
// document, with a file per language. The PDFs live in public/documents/
// (originals in resources/documents/).
//
// To add a document: copy the PDF into public/documents/ with a lowercase,
// hyphenated name, add an entry to the right category here, and add its
// title and description under Laws.documents.items.<key> in the messages.
// `bytes` and `pages` are shown on the button, so update them if you replace
// a file.
//
// To add a category: add it here (in page order) with a title and
// description under Laws.documents.categories.<key>.
type LawDocumentFile = {
  // "en" = English, "cnr" = Montenegrin (ISO 639-3), "mul" = both in one
  // file.
  lang: "en" | "cnr" | "mul";
  href: `/documents/${string}.pdf`;
  pages: number;
  bytes: number;
};

type LawDocument = {
  key: string;
  files: LawDocumentFile[];
};

type LawCategory = {
  key: string;
  documents: LawDocument[];
};

export const LAW_CATEGORIES: LawCategory[] = [
  {
    key: "yachts",
    documents: [
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
        key: "maritimeSafety",
        files: [
          {
            lang: "cnr",
            href: "/documents/zakon-o-sigurnosti-pomorske-plovidbe.pdf",
            pages: 132,
            bytes: 1270431,
          },
        ],
      },
    ],
  },
  {
    key: "border",
    documents: [
      {
        key: "borderControl",
        files: [
          {
            lang: "cnr",
            href: "/documents/zakon-o-granicnoj-kontroli.pdf",
            pages: 19,
            bytes: 126333,
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
      {
        key: "foreignExchange",
        files: [
          {
            lang: "cnr",
            href: "/documents/zakon-o-tekucim-i-kapitalnim-poslovima.pdf",
            pages: 7,
            bytes: 127622,
          },
        ],
      },
    ],
  },
  {
    key: "customs",
    documents: [
      {
        key: "temporaryAdmission",
        files: [
          {
            lang: "mul",
            href: "/documents/konvencija-o-privremenom-uvozu.pdf",
            pages: 155,
            bytes: 2229602,
          },
        ],
      },
      {
        key: "shipSupplies",
        files: [
          {
            lang: "cnr",
            href: "/documents/pravilnik-o-snabdijevanju-prevoznih-sredstava.pdf",
            pages: 5,
            bytes: 44276,
          },
        ],
      },
      {
        key: "customsProcedures",
        files: [
          {
            lang: "cnr",
            href: "/documents/uredba-o-carinskim-postupcima.pdf",
            pages: 166,
            bytes: 1225242,
          },
        ],
      },
      {
        key: "customsService",
        files: [
          {
            lang: "cnr",
            href: "/documents/zakon-o-carinskoj-sluzbi.pdf",
            pages: 32,
            bytes: 275910,
          },
        ],
      },
    ],
  },
  {
    key: "taxes",
    documents: [
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
        key: "vatLaw",
        files: [
          {
            lang: "cnr",
            href: "/documents/zakon-o-pdv.pdf",
            pages: 30,
            bytes: 340319,
          },
        ],
      },
      {
        key: "vatRulebook",
        files: [
          {
            lang: "cnr",
            href: "/documents/pravilnik-o-primjeni-zakona-o-pdv.pdf",
            pages: 41,
            bytes: 935877,
          },
        ],
      },
    ],
  },
];
