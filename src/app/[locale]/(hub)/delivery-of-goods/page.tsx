import type { Metadata } from "next";
import { HubArticlePage, hubPageMetadata } from "@/components/HubArticlePage";

// Reads the admin-editable article on every request, so saves show at once.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/delivery-of-goods">): Promise<Metadata> {
  const { locale } = await params;
  return hubPageMetadata(locale, "Delivery");
}

export default async function DeliveryOfGoodsPage({
  params,
}: PageProps<"/[locale]/delivery-of-goods">) {
  const { locale } = await params;
  return (
    <HubArticlePage
      locale={locale}
      slug="delivery-of-goods"
      namespace="Delivery"
    />
  );
}
