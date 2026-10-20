"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("request_failed");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight text-white">
        {t("heading")}
      </h2>
      <p className="mt-2 text-white/70">{t("description")}</p>

      {status === "success" ? (
        <p className="mt-6 font-medium text-cyan-300">{t("success")}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {t("emailLabel")}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:bg-white/15"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-cyan-400 disabled:opacity-60"
          >
            {status === "submitting" ? "..." : t("submit")}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-300">{t("error")}</p>
      )}
    </div>
  );
}
