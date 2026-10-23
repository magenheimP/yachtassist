import {
  AnchorIcon,
  CalculatorIcon,
  ClipboardIcon,
  DepartIcon,
  PackageIcon,
  ScaleIcon,
} from "@/components/icons";

// The sections of the Montenegro Guide panel, in tab order. This one list
// drives the panel tabs, the header dropdown, the home page button, the footer
// and the sitemap; the first entry is where "Montenegro Guide" lands.
//
// To add a section:
//   1. Add an entry here.
//   2. Create src/app/[locale]/(hub)/<path>/page.tsx (for an admin-editable
//      article, render <HubArticlePage> and add the slug to ARTICLE_SLUGS;
//      for a placeholder, render <HubSoonPage>).
//   3. In messages, add Hub.<key>Tab, Hub.<key>TabDescription, and a
//      <namespace> block with "title" and "intro".
//
// `soon` marks a placeholder: it gets a "Soon" pill in the header menu, stays
// out of the footer and sitemap, and its page (HubSoonPage) is noindex until
// the real thing ships.
type HubSection = {
  href: `/${string}`;
  key: string;
  namespace: string;
  icon: (props: { className?: string }) => React.ReactNode;
  soon?: boolean;
};

export const HUB_SECTIONS: HubSection[] = [
  {
    href: "/entering-montenegro",
    key: "entering",
    namespace: "Entering",
    icon: AnchorIcon,
  },
  {
    href: "/clearance-in",
    key: "clearanceIn",
    namespace: "ClearanceIn",
    icon: ClipboardIcon,
  },
  {
    href: "/vignette",
    key: "vignette",
    namespace: "Vignette",
    icon: CalculatorIcon,
  },
  {
    href: "/delivery-of-goods",
    key: "delivery",
    namespace: "Delivery",
    icon: PackageIcon,
    soon: true,
  },
  {
    href: "/clearance-out",
    key: "clearanceOut",
    namespace: "ClearanceOut",
    icon: DepartIcon,
    soon: true,
  },
  { href: "/laws", key: "laws", namespace: "Laws", icon: ScaleIcon },
];

export const HUB_HOME = HUB_SECTIONS[0].href;
