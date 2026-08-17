import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

const PATHS = [
  "",
  "/guide",
  "/procedures",
  "/laws",
  "/fuel-price",
  "/about",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/fuel-price" ? "weekly" : "monthly",
    })),
  );
}
