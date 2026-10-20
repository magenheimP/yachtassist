import { prisma } from "@/lib/prisma";

export async function getLatestFuelPrice() {
  try {
    return await prisma.fuelPrice.findFirst({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not reachable yet (e.g. local dev before DATABASE_URL is set).
    return null;
  }
}

// Fuel is quoted to three decimals (e.g. €1.479/l), on the page and in the header.
export function fuelPriceFormatter(locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export async function addFuelPrice(data: {
  retailPrice: number;
  dutyFreePrice: number;
}) {
  return prisma.fuelPrice.create({ data });
}
