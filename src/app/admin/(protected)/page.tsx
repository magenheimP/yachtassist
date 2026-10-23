import Link from "next/link";
import { getLatestFuelPrice } from "@/lib/fuelPrice";
import { ARTICLE_SLUGS } from "@/lib/articles";
import { FuelPriceForm } from "./FuelPriceForm";

const ARTICLE_LABELS: Record<string, string> = {
  "entering-montenegro": "Entering Montenegro",
  "clearance-in": "Clearance IN",
  "clearance-out": "Clearance OUT",
};

export default async function AdminDashboardPage() {
  const fuelPrice = await getLatestFuelPrice();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border-soft bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">
          Fuel price
        </h2>
        {fuelPrice ? (
          <p className="mt-1 text-sm text-ink-soft">
            Current: {Number(fuelPrice.retailPrice).toFixed(3)} retail /{" "}
            {Number(fuelPrice.dutyFreePrice).toFixed(3)} duty-free — updated{" "}
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(fuelPrice.createdAt)}
          </p>
        ) : (
          <p className="mt-1 text-sm text-ink-soft">
            No price entered yet.
          </p>
        )}
        <FuelPriceForm />
      </section>

      <section className="rounded-2xl border border-border-soft bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">
          Articles
        </h2>
        <ul className="mt-3 flex flex-col divide-y divide-border-soft rounded-md border border-border-soft">
          {ARTICLE_SLUGS.map((slug) => (
            <li key={slug} className="flex items-center justify-between p-4">
              <span className="text-sm">{ARTICLE_LABELS[slug]}</span>
              <Link
                href={`/admin/articles/${slug}`}
                className="text-sm font-medium text-cyan-700 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
