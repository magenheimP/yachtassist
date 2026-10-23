import type { Metadata } from "next";
import { HubSoonPage, hubPageMetadata } from "@/components/HubArticlePage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/delivery-of-goods">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Delivery", { soon: true });
}

export default async function DeliveryOfGoodsPage({
  params,
}: PageProps<"/[locale]/delivery-of-goods">) {
  const { locale } = await params;
  return <HubSoonPage locale={locale} namespace="Delivery" />;
}
