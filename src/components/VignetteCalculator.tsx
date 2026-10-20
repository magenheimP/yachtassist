"use client";

import { useId, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  CalculatorCard,
  PriceBox,
  SegmentedControl,
  SelectField,
  control,
  fieldLabel,
} from "@/components/CalculatorParts";
import { TicketIcon } from "@/components/icons";
import {
  VIGNETTE_ADMIN_FEE,
  VIGNETTE_BOAT_TYPES,
  VIGNETTE_PERIODS,
  VIGNETTE_USES,
  calculateVignette,
  lengthFitsType,
  type VignetteBoatType,
  type VignettePeriod,
  type VignetteUse,
} from "@/lib/vignette";

export function VignetteCalculator() {
  const t = useTranslations("Vignette.form");
  const format = useFormatter();
  const id = useId();
  const [use, setUse] = useState<VignetteUse>("private");
  const [boatType, setBoatType] = useState<VignetteBoatType | "">("");
  const [length, setLength] = useState("");
  const [period, setPeriod] = useState<VignettePeriod | "">("");

  const lengthValue = Number(length);
  const lengthValid = length !== "" && lengthValue > 0;
  // A length that doesn't fit the chosen type blocks the calculation.
  const lengthMismatch =
    lengthValid && boatType !== "" && !lengthFitsType(boatType, lengthValue);
  const result =
    lengthValid && boatType && period
      ? calculateVignette({ use, boatType, length: lengthValue, period })
      : null;

  const euros = (value: number) =>
    format.number(value, { style: "currency", currency: "EUR" });

  return (
    <CalculatorCard title={t("heading")} icon={TicketIcon}>
      <form
        className="mt-7 flex-1 space-y-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <SegmentedControl
          name={`${id}-use`}
          legend={t("useLabel")}
          value={use}
          onChange={setUse}
          options={VIGNETTE_USES.map((option) => ({
            value: option,
            label: t(`uses.${option}`),
          }))}
        />

        <SelectField
          id={`${id}-type`}
          label={t("typeLabel")}
          placeholder={t("typePlaceholder")}
          value={boatType}
          onChange={setBoatType}
          options={VIGNETTE_BOAT_TYPES.map((option) => ({
            value: option,
            label: t(`typeOptions.${option}`),
            // Grey out types the entered length can't be.
            disabled: lengthValid && !lengthFitsType(option, lengthValue),
          }))}
        />

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor={`${id}-length`} className={fieldLabel}>
              {t("lengthLabel")}
            </label>
            <div className="relative mt-2.5">
              <input
                id={`${id}-length`}
                type="number"
                inputMode="decimal"
                min="0.1"
                step="0.1"
                placeholder={t("lengthPlaceholder")}
                value={length}
                onChange={(event) => setLength(event.target.value)}
                aria-describedby={`${id}-length-hint`}
                aria-invalid={lengthMismatch || undefined}
                className={`${control} pr-12 ${
                  lengthMismatch
                    ? "border-red-400! bg-red-50/60! focus:ring-red-500/10!"
                    : ""
                }`}
              />
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-ink-soft">
                {t("lengthUnit")}
              </span>
            </div>
            <p
              id={`${id}-length-hint`}
              className={`mt-2 text-xs leading-relaxed ${lengthMismatch ? "font-medium text-red-600" : "text-ink-soft"}`}
            >
              {lengthMismatch
                ? t("lengthError", { range: t(`ranges.${boatType}`) })
                : boatType
                  ? t("lengthRangeHint", { range: t(`ranges.${boatType}`) })
                  : t("lengthHint")}
            </p>
          </div>

          <SelectField
            id={`${id}-period`}
            label={t("periodLabel")}
            placeholder={t("periodPlaceholder")}
            value={period}
            onChange={setPeriod}
            options={VIGNETTE_PERIODS.map((option) => ({
              value: option,
              label: t(`periods.${option}`),
            }))}
          />
        </div>
      </form>

      <PriceBox
        label={t("resultKicker")}
        amount={result ? euros(result.total) : null}
        message={lengthMismatch ? t("resultInvalid") : t("resultEmpty")}
        note={t("adminFeeNote", { fee: euros(VIGNETTE_ADMIN_FEE) })}
      />
    </CalculatorCard>
  );
}
