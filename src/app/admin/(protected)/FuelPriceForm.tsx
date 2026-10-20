"use client";

import { useActionState } from "react";
import { saveFuelPriceAction, type ActionState } from "../actions";

const initialState: ActionState = {};

export function FuelPriceForm() {
  const [state, formAction, pending] = useActionState(
    saveFuelPriceAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="retailPrice" className="text-sm font-medium">
            Retail price (EUR/L)
          </label>
          <input
            id="retailPrice"
            name="retailPrice"
            type="number"
            step="0.001"
            min="0"
            required
            className="rounded-md border border-border-soft px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dutyFreePrice" className="text-sm font-medium">
            Duty-free price (EUR/L)
          </label>
          <input
            id="dutyFreePrice"
            name="dutyFreePrice"
            type="number"
            step="0.001"
            min="0"
            required
            className="rounded-md border border-border-soft px-3 py-2 text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save this week's price"}
      </button>
      {state.error && (
        <p className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700">
          Saved. This is now the live price on the site.
        </p>
      )}
    </form>
  );
}
