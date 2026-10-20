"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  CONTRACTOR_CATEGORIES,
  contractorsIn,
  type Contractor,
  type ContractorCategory,
} from "@/lib/contractors";
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

const chip =
  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors";
const chipIdle =
  "border-border-soft bg-white text-ink-soft hover:border-cyan-300 hover:text-ink";
const chipActive = "border-cyan-600 bg-cyan-600 text-white";

const contactLink =
  "inline-flex min-w-0 items-start gap-2 text-cyan-700 wrap-anywhere hover:text-cyan-600";

// Category chips over the full list; picking one narrows the list to it.
// Everything is in the server-rendered HTML ("All" is the initial state).
export function ContractorDirectory() {
  const t = useTranslations("Contractors");
  const [active, setActive] = useState<ContractorCategory | null>(null);

  const shown = active ? [active] : CONTRACTOR_CATEGORIES;

  return (
    <div>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => setActive(null)}
          className={`${chip} ${active === null ? chipActive : chipIdle}`}
        >
          {t("all")}
        </button>
        {CONTRACTOR_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={`${chip} ${active === category ? chipActive : chipIdle}`}
          >
            {t(`categories.${category}.title`)}
            <span className="text-xs opacity-70">
              {contractorsIn(category).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-14">
        {shown.map((category) => (
          <section key={category} aria-labelledby={`contractors-${category}`}>
            <h2
              id={`contractors-${category}`}
              className="border-l-2 border-cyan-500 pl-4 text-2xl font-medium tracking-tight text-ink"
            >
              {t(`categories.${category}.title`)}
            </h2>
            <p className="mt-2 pl-[18px] text-sm text-ink-soft">
              {t(`categories.${category}.description`)}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {contractorsIn(category).map((contractor) => (
                <ContractorCard key={contractor.key} contractor={contractor} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ContractorCard({ contractor }: { contractor: Contractor }) {
  const t = useTranslations("Contractors.items");
  const { key, name, person, brands, phones, emails, website, address } =
    contractor;

  return (
    <li className="rounded-2xl border border-border-soft bg-white p-5">
      <h3 className="font-semibold text-ink">{name}</h3>
      {person && <p className="mt-0.5 text-sm text-ink-soft">{person}</p>}

      {brands && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {brands.map((brand) => (
            <li
              key={brand}
              className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-800"
            >
              {brand}
            </li>
          ))}
        </ul>
      )}
      {t.has(key) && (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(key)}</p>
      )}

      <ul className="mt-4 space-y-1.5 border-t border-border-soft pt-4 text-sm">
        {phones?.map((phone) => (
          <li key={phone}>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className={contactLink}>
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {phone}
            </a>
          </li>
        ))}
        {emails?.map((email) => (
          <li key={email}>
            <a href={`mailto:${email}`} className={contactLink}>
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {email}
            </a>
          </li>
        ))}
        {website && (
          <li>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {new URL(website).hostname.replace(/^www\./, "")}
            </a>
          </li>
        )}
        {address && (
          <li className="flex items-start gap-2 text-ink-soft">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
            {address}
          </li>
        )}
      </ul>
    </li>
  );
}
