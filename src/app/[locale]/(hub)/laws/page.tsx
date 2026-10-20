import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HubPage, hubPageMetadata } from "@/components/HubArticlePage";
import { LawDocuments } from "@/components/LawDocuments";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/laws">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Laws");
}

// Documents only for now. The old "laws" summary article is still in the
// database (and prisma/seed.ts) for when the text gets a new home.
export default async function LawsPage({
  params,
}: PageProps<"/[locale]/laws">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Laws");

  return (
    <HubPage title={t("title")} intro={t("intro")}>
      <LawDocuments />
    </HubPage>
  );
}
