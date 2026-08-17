import { prisma } from "../src/lib/prisma";

// Starter content for the three DB-backed articles. This is a structural
// draft to get the site launch-ready — the partner (site admin) should
// review and refine via /admin, especially anywhere rates/fees/limits are
// mentioned, since those change and we don't want to publish stale numbers.
const articles = [
  {
    slug: "guide",
    locale: "en",
    title: "Bring Your Yacht to Montenegro",
    body: `## Before you arrive

- Check your vessel and crew documents are in order: registration, proof of ownership/charter agreement, insurance certificate, and passports/IDs for everyone aboard.
- Confirm your intended port of entry. Foreign-flagged yachts must clear in at a designated port of entry before visiting other anchorages.
- Arrange third-party liability insurance that meets Montenegrin minimums — check current requirements with your insurer or agent, as minimums are periodically updated.

## Clearance & customs

- On arrival, report to the harbour master's office, customs, and border police at your port of entry. Many marinas can arrange an agent to handle this on your behalf.
- You'll receive a Crew List / clearance document — keep it aboard, you may be asked for it when moving between ports.
- Declare any goods subject to duty, and flag if you intend to take on duty-free fuel.

## Vignette / navigation permit

- Foreign-flagged vessels typically need to pay a navigation fee ("vignette") covering the length of stay. Rates depend on vessel length and duration — confirm the current schedule with the harbour master or your agent, as rates are updated periodically.

## Duty-free fuel

- Duty-free diesel is available to foreign-flagged yachts departing Montenegrin waters, dispensed at authorised marinas/fuel docks — not at ordinary roadside stations.
- Check the [fuel price page](/fuel-price) for this week's retail vs. duty-free rates.

## Insurance & safety

- Carry valid third-party liability insurance for the vessel.
- Familiarise yourself with posted speed limits in Boka Bay and near swimming areas — these are enforced, particularly close to shore and beaches.

## While you're here

- See [Procedures](/procedures) for a step-by-step breakdown of clearance and customs.
- See [Laws & Regulations](/laws) for the rules that apply during your stay.`,
  },
  {
    slug: "procedures",
    locale: "en",
    title: "Procedures",
    body: `## Clearance

1. Head directly to your declared port of entry — do not stop at other anchorages first.
2. Report to the harbour master's office. They'll direct you to customs and border police if not co-located.
3. Present: vessel registration, insurance certificate, crew/passenger passports, and (for charter yachts) the charter agreement.
4. Pay the applicable navigation fee (vignette) for your intended length of stay.

## Customs

- Declare any dutiable goods aboard.
- If you plan to take on duty-free fuel, let customs know at check-in — this is usually noted on your clearance paperwork.

## Immigration / border police

- All crew and passengers should be prepared to present passports.
- Non-EU crew/passengers should check visa requirements for Montenegro before travel.

## Departure

- If leaving Montenegrin waters, you may need to clear out at your port of departure — ask your agent or the harbour master whether this applies to your itinerary.

Many marinas offer an agent service that handles the above on your behalf for a fee — this is common practice and can save time, especially on arrival day.`,
  },
  {
    slug: "laws",
    locale: "en",
    title: "Laws & Regulations",
    body: `## Vignette (navigation permit)

Foreign-flagged yachts pay a navigation fee for the period they intend to stay in Montenegrin waters. The fee scales with vessel length. Rates are set by the harbour master's office and updated periodically — confirm the current schedule before arrival.

## Insurance

Third-party liability insurance is required. Check current minimum coverage requirements with your insurer or local agent, as these can change.

## Duty-free / VAT on fuel

Foreign-flagged yachts departing Montenegrin waters can take on duty-free diesel at authorised fuelling points. This differs from retail (road) diesel, which includes VAT and excise duty. See the [fuel price page](/fuel-price) for the current split.

## Speed limits

Speed limits apply in Boka Bay and near beaches/swimming areas, primarily for safety. Observe posted limits and local signage, and reduce speed near swimmers, moored boats, and the shoreline.

## Anchoring & marine protected areas

Some areas have anchoring restrictions or are marine protected areas. Check local charts and harbour master guidance before anchoring outside a marina.

This page is a general summary, not legal advice. For anything time-sensitive or high-stakes, confirm with the harbour master's office or a local agent.`,
  },
];

async function main() {
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug_locale: { slug: article.slug, locale: article.locale } },
      create: article,
      update: { title: article.title, body: article.body },
    });
    console.log(`Seeded article: ${article.slug}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
