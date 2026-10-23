import type { Metadata } from "next";
import { ComingSoonPage, comingSoonMetadata } from "@/components/ComingSoonPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/port-agents">): Promise<Metadata> {
  const { locale } = await params;
  return comingSoonMetadata(locale, "PortAgents");
}

export default async function PortAgentsPage({
  params,
}: PageProps<"/[locale]/port-agents">) {
  const { locale } = await params;
  return <ComingSoonPage locale={locale} namespace="PortAgents" />;
}
