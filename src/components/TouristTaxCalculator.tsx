"use client";

import { useId, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  CalculatorCard,
  PriceBox,
  SelectField,
} from "@/components/CalculatorParts";
import { UsersIcon } from "@/components/icons";
import {
  TOURIST_TAX_LENGTHS,
  TOURIST_TAX_PERIODS,
  calculateTouristTax,
  type TouristTaxLength,
  type TouristTaxPeriod,
} from "@/lib/touristTax";

export function TouristTaxCalculator() {
  const t = useTranslations("Vignette.touristTax");
  const format = useFormatter();
  const id = useId();
  const [length, setLength] = useState<TouristTaxLength | "">("");
  const [period, setPeriod] = useState<TouristTaxPeriod | "">("");

  const amount =
    length && period
      ? format.number(calculateTouristTax(length, period), {
          style: "currency",
          currency: "EUR",
        })
      : null;

  return (
    <CalculatorCard title={t("heading")} icon={UsersIcon}>
      <form
        className="mt-7 flex-1 space-y-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <SelectField
          id={`${id}-length`}
          label={t("lengthLabel")}
          placeholder={t("lengthPlaceholder")}
          value={length}
          onChange={setLength}
          options={TOURIST_TAX_LENGTHS.map((option) => ({
            value: option,
            label: t(`lengths.${option}`),
          }))}
        />
        <SelectField
          id={`${id}-period`}
          label={t("periodLabel")}
          placeholder={t("periodPlaceholder")}
          value={period}
          onChange={setPeriod}
          options={TOURIST_TAX_PERIODS.map((option) => ({
            value: option,
            label: t(`periods.${option}`),
          }))}
        />
      </form>

      <PriceBox
        label={t("resultKicker")}
        amount={amount}
        message={t("resultEmpty")}
        note={t("note")}
      />
    </CalculatorCard>
  );
}
