import type { Metadata } from "next";
import { HubSoonPage, hubPageMetadata } from "@/components/HubArticlePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/clearance-out">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "ClearanceOut", { soon: true });
}

export default async function ClearanceOutPage({
  params,
}: PageProps<"/[locale]/clearance-out">) {
  const { locale } = await params;
  return <HubSoonPage locale={locale} namespace="ClearanceOut" />;
}
