import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";
import { HUB_SECTIONS } from "@/lib/hub";

const PATHS = [
  "",
  ...HUB_SECTIONS.filter((section) => !section.soon).map((s) => s.href),
  "/fuel-price",
  "/contractors",
  "/contact",
];

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
