import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Checklist tab was dropped from the guide; send old links to its
      // first tab. Temporary (307) in case the page comes back.
      {
        source: "/:locale/guide",
        destination: "/:locale/entering-montenegro",
        permanent: false,
      },
      // The old Clearance tab became Clearance IN.
      {
        source: "/:locale/procedures",
        destination: "/:locale/clearance-in",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
