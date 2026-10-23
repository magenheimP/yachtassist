import type { Metadata } from "next";
import { HubArticlePage, hubPageMetadata } from "@/components/HubArticlePage";

// Reads the admin-editable article on every request, so saves show at once.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/clearance-in">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "ClearanceIn");
}

export default async function ClearanceInPage({
  params,
}: PageProps<"/[locale]/clearance-in">) {
  const { locale } = await params;
  return (
    <HubArticlePage locale={locale} slug="clearance-in" namespace="ClearanceIn" />
  );
}
