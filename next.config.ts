import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Checklist tab was dropped from the Arrival Guide; send old links
      // to its first tab. Temporary (307) in case the page comes back.
      {
        source: "/:locale/guide",
        destination: "/:locale/procedures",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
