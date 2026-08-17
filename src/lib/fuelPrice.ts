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

export async function addFuelPrice(data: {
  retailPrice: number;
  dutyFreePrice: number;
}) {
  return prisma.fuelPrice.create({ data });
}
