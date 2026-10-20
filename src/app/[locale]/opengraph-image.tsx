import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Yacht Assist Montenegro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.75, display: "flex" }}>
          {t("siteName")}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.15,
            display: "flex",
            maxWidth: 900,
          }}
        >
          {t("description")}
        </div>
      </div>
    ),
    { ...size },
  );
}
