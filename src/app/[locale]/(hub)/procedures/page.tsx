import type { Metadata } from "next";
import { HubArticlePage, hubPageMetadata } from "@/components/HubArticlePage";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/procedures">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Procedures");
}

export default async function ProceduresPage({
  params,
}: PageProps<"/[locale]/procedures">) {
  const { locale } = await params;
  return <HubArticlePage locale={locale} slug="procedures" namespace="Procedures" />;
}
