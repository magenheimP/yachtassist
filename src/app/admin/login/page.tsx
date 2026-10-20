"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "../actions";

const initialState: ActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <div className="rounded-2xl border border-border-soft bg-white p-8">
        <h1 className="text-xl font-semibold text-ink">
          Yacht Assist <span className="text-cyan-600">Admin</span>
        </h1>
        <form action={formAction} className="mt-6 flex flex-col gap-3">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="rounded-md border border-border-soft px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
          {state.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
