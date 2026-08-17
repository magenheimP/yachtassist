"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  isAdminAuthenticated,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { ARTICLE_SLUGS, type ArticleSlug, upsertArticle } from "@/lib/articles";
import { addFuelPrice } from "@/lib/fuelPrice";

export type ActionState = { error?: string; success?: boolean };

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { error: "Incorrect password." };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function saveFuelPriceAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const retailPrice = Number(formData.get("retailPrice"));
  const dutyFreePrice = Number(formData.get("dutyFreePrice"));

  if (
    !Number.isFinite(retailPrice) ||
    !Number.isFinite(dutyFreePrice) ||
    retailPrice <= 0 ||
    dutyFreePrice <= 0
  ) {
    return { error: "Enter valid prices for both fields." };
  }

  await addFuelPrice({ retailPrice, dutyFreePrice });
  return { success: true };
}

export async function saveArticleAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const slug = String(formData.get("slug") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!ARTICLE_SLUGS.includes(slug as ArticleSlug)) {
    return { error: "Unknown article." };
  }
  if (!title || !body) {
    return { error: "Title and body are required." };
  }

  await upsertArticle(slug as ArticleSlug, "en", { title, body });
  return { success: true };
}
