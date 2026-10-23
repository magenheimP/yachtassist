import type { Metadata } from "next";
import { ComingSoonPage, comingSoonMetadata } from "@/components/ComingSoonPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community">): Promise<Metadata> {
  const { locale } = await params;
  return comingSoonMetadata(locale, "Community");
}

export default async function CommunityPage({
  params,
}: PageProps<"/[locale]/community">) {
  const { locale } = await params;
  return <ComingSoonPage locale={locale} namespace="Community" />;
}
