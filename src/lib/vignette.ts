// Vignette fee, from the table in Article 28 of the Law on Yachts ("fee for
// the use of navigation safety objects"). Labels live under Vignette.form.*
// in the messages.
//
//   fee = fixed + perMetre × length      (exact length, no rounding)
//   total = fee + administrative fee
//
// Only private yachts of 24 m or more have a fixed part; every other row is
// a plain rate per metre ("eurometre").

export const VIGNETTE_USES = ["private", "commercial"] as const;
export type VignetteUse = (typeof VIGNETTE_USES)[number];

// Rows of the Article 28 table, in the same order.
export const VIGNETTE_BOAT_TYPES = [
  "boatUpTo7m",
  "sailing",
  "motor",
  "multihull",
  "over24m",
] as const;
export type VignetteBoatType = (typeof VIGNETTE_BOAT_TYPES)[number];

// Columns of the Article 28 table.
export const VIGNETTE_PERIODS = ["24h", "7d", "1m", "3m", "6m", "1y"] as const;
export type VignettePeriod = (typeof VIGNETTE_PERIODS)[number];

// Lengths each type accepts, in metres: `min` inclusive, `max` exclusive.
// Agreed cut-offs: under 7 m, 7 m to under 24 m, 24 m and over. (The law's
// wording, "up to 7 m" / "over 24 m", would put exactly 7 m and 24 m in the
// other band; change it here if the Harbour Master applies it that way.)
const LENGTH_RANGES: Record<VignetteBoatType, { min: number; max: number }> = {
  boatUpTo7m: { min: 0, max: 7 },
  sailing: { min: 7, max: 24 },
  motor: { min: 7, max: 24 },
  multihull: { min: 7, max: 24 },
  over24m: { min: 24, max: Infinity },
};

export function lengthFitsType(type: VignetteBoatType, length: number) {
  const { min, max } = LENGTH_RANGES[type];
  return length > 0 && length >= min && length < max;
}

// Flat administrative fee added to every vignette, in euros.
export const VIGNETTE_ADMIN_FEE = 2;

type VignetteRate = { fixed: number; perMetre: number };

// One table row: per-metre rates (and fixed parts, if any) in period order.
function row(perMetre: number[], fixed: number[] = []) {
  return Object.fromEntries(
    VIGNETTE_PERIODS.map((period, i) => [
      period,
      { fixed: fixed[i] ?? 0, perMetre: perMetre[i] },
    ]),
  ) as Record<VignettePeriod, VignetteRate>;
}

//                                 24h   7d    1m   3m   6m   1y
const RATES: Record<
  VignetteUse,
  Record<VignetteBoatType, Record<VignettePeriod, VignetteRate>>
> = {
  private: {
    boatUpTo7m: row([0.5, 1, 2, 3, 4, 6]),
    sailing: row([1, 2, 6, 12, 15, 18]),
    motor: row([3, 7, 12, 20, 25, 30]),
    multihull: row([3, 7, 12, 20, 25, 30]),
    over24m: row([1, 1.5, 2, 3, 4, 5], [150, 360, 460, 560, 660, 760]),
  },
  commercial: {
    boatUpTo7m: row([5, 15, 25, 35, 45, 60]),
    sailing: row([10, 25, 40, 80, 120, 150]),
    motor: row([15, 30, 50, 100, 150, 200]),
    multihull: row([15, 30, 50, 100, 150, 200]),
    over24m: row([15, 70, 100, 150, 200, 250]),
  },
};

// Returns null when the length doesn't fit the boat type.
export function calculateVignette({
  use,
  boatType,
  length,
  period,
}: {
  use: VignetteUse;
  boatType: VignetteBoatType;
  length: number;
  period: VignettePeriod;
}) {
  if (!lengthFitsType(boatType, length)) return null;
  const { fixed, perMetre } = RATES[use][boatType][period];
  const fee = Math.round((fixed + perMetre * length) * 100) / 100;
  return { fee, total: fee + VIGNETTE_ADMIN_FEE };
}
