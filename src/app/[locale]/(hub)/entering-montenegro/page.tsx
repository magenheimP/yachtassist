import type { Metadata } from "next";
import { HubArticlePage, hubPageMetadata } from "@/components/HubArticlePage";

// Reads the admin-editable article on every request, so saves show at once.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/entering-montenegro">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Entering");
}

export default async function EnteringMontenegroPage({
  params,
}: PageProps<"/[locale]/entering-montenegro">) {
  const { locale } = await params;
  return (
    <HubArticlePage locale={locale} slug="entering-montenegro" namespace="Entering" />
  );
}
