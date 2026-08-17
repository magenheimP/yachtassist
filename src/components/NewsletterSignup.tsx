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

  if (status === "success") {
    return (
      <div className="rounded-lg border border-black/10 p-5 dark:border-white/10">
        <p className="font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-black/10 p-5 dark:border-white/10">
      <h2 className="font-semibold">{t("heading")}</h2>
      <p className="mt-1 text-sm text-black/70 dark:text-white/70">
        {t("description")}
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-2">
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
          className="min-w-0 flex-1 rounded-md border border-black/20 px-3 py-2 text-sm dark:border-white/20 dark:bg-transparent"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {t("submit")}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {t("error")}
        </p>
      )}
    </div>
  );
}
