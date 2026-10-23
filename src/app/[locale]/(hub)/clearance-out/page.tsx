import type { Metadata } from "next";
import { HubArticlePage, hubPageMetadata } from "@/components/HubArticlePage";

// Reads the admin-editable article on every request, so saves show at once.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/clearance-out">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "ClearanceOut");
}

export default async function ClearanceOutPage({
  params,
}: PageProps<"/[locale]/clearance-out">) {
  const { locale } = await params;
  return (
    <HubArticlePage
      locale={locale}
      slug="clearance-out"
      namespace="ClearanceOut"
    />
  );
}
