// Tourist tax for yachts, from Article 2 of the Decree on Tourist Tax for
// Nautical Tourism Vessels ("Sl. list CG" 10/2016). A flat amount per yacht,
// set by length and period, covering everyone aboard for the whole period.
// The decree's ship rows (cruise ships etc.) are left out: the site is for
// yachts. Labels live under Vignette.touristTax.* in the messages.

// Length bands, as agreed: 7–10 m, over 10–15 m, over 15–20 m, over 20 m.
// The decree covers yachts of 7 m and over, so there is no smaller band.
export const TOURIST_TAX_LENGTHS = [
  "upTo10",
  "upTo15",
  "upTo20",
  "over20",
] as const;
export type TouristTaxLength = (typeof TOURIST_TAX_LENGTHS)[number];

// Periods in the decree: up to 7, 15, 30 or 90 days, or up to 1 year.
export const TOURIST_TAX_PERIODS = ["7d", "15d", "30d", "90d", "1y"] as const;
export type TouristTaxPeriod = (typeof TOURIST_TAX_PERIODS)[number];

//                                                 7d  15d  30d  90d   1y
const AMOUNTS: Record<TouristTaxLength, number[]> = {
  upTo10: [5, 7, 14, 25, 60],
  upTo15: [10, 15, 25, 40, 80],
  upTo20: [20, 30, 40, 60, 100],
  over20: [40, 55, 70, 85, 120],
};

export function calculateTouristTax(
  length: TouristTaxLength,
  period: TouristTaxPeriod,
) {
  return AMOUNTS[length][TOURIST_TAX_PERIODS.indexOf(period)];
}
