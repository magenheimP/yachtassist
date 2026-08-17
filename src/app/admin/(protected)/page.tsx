import Link from "next/link";
import { getLatestFuelPrice } from "@/lib/fuelPrice";
import { ARTICLE_SLUGS } from "@/lib/articles";
import { FuelPriceForm } from "./FuelPriceForm";

const ARTICLE_LABELS: Record<string, string> = {
  guide: "Bring Your Yacht to Montenegro",
  procedures: "Procedures",
  laws: "Laws & Regulations",
};

export default async function AdminDashboardPage() {
  const fuelPrice = await getLatestFuelPrice();

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="text-lg font-semibold">Fuel price</h2>
        {fuelPrice ? (
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Current: {Number(fuelPrice.retailPrice).toFixed(3)} retail /{" "}
            {Number(fuelPrice.dutyFreePrice).toFixed(3)} duty-free — updated{" "}
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(fuelPrice.createdAt)}
          </p>
        ) : (
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            No price entered yet.
          </p>
        )}
        <FuelPriceForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold">Articles</h2>
        <ul className="mt-3 flex flex-col divide-y divide-black/10 rounded-md border border-black/10 dark:divide-white/10 dark:border-white/10">
          {ARTICLE_SLUGS.map((slug) => (
            <li key={slug} className="flex items-center justify-between p-4">
              <span className="text-sm">{ARTICLE_LABELS[slug]}</span>
              <Link
                href={`/admin/articles/${slug}`}
                className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
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
