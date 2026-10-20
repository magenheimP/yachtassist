import "dotenv/config";
import { prisma } from "../src/lib/prisma";

// Starter content for the three DB-backed articles. Procedures and Laws draw
// on real Montenegro maritime regulation (VTS channels, speed limits, the
// vignette system) sourced from a Porto Montenegro clearance briefing —
// rewritten in our own words and deliberately scoped to the general
// Montenegro-wide rules, not that marina's own arrival/concierge process,
// so this reads as independent site content rather than a re-badged copy of
// one marina's material. The partner should still review via /admin,
// especially anywhere rates/fees are mentioned, since those change.
const articles = [
  {
    slug: "guide",
    locale: "en",
    title: "Bring Your Yacht to Montenegro",
    body: `## Before you arrive

- Check your vessel and crew documents are in order: boat registry, captain's license, a letter of authorisation from the owning/management company, insurance certificate, and passports/IDs for everyone aboard.
- On entering Montenegrin waters you must proceed directly to a port of entry — not to another anchorage first.
- Monitor Montenegro VTS (Vessel Traffic Service) on VHF channels 11 and 16. Vessels over 300GT or 50m must call VTS on arrival.
- Arrange third-party liability insurance covering the Mediterranean/Adriatic — check with your insurer or agent if your existing policy doesn't already cover Montenegro.

## Clearance & customs

- At your port of entry, the captain completes entry with Customs, Immigration, and the Harbour Master. Harbour Master offices generally work 0800-1900; arriving outside these hours may mean waiting at the port until the following morning to complete the process.
- To process the vignette you'll need your boat registry, captain's license, letter of authorisation, insurance evidence, crew/guest list, and tender details (with tender insurance) — officers may ask to see the originals.
- Declare any goods subject to duty, and mention if you intend to take on duty-free fuel.

## Vignette & tourist tax

- The vignette is your permit to cruise Montenegrin waters, valid from one day up to a year. It's paid directly to the Harbour Master's office by card, and the fee depends on your vessel's length, type, and how long you want it valid for.
- Tourist tax is payable after the vignette, scaled to yacht size and length of stay, and covers everyone aboard for its validity.

## Speed limits

- In the bay: 14 knots for vessels up to 24m, 10 knots for vessels over 24m.
- In the Kumbor and Verige channels: 10 knots for vessels up to 24m, 6 knots for vessels over 24m.
- Higher speeds need VTS authorisation — for example, for weather conditions or navigational safety.

## Duty-free fuel

- Duty-free diesel is available to foreign-flagged yachts departing Montenegrin waters, dispensed at authorised marinas/fuel docks — not at ordinary roadside stations.
- Check the [fuel price page](/fuel-price) for this week's retail vs. duty-free rates.

## Receiving packages & spares

- Yacht equipment and spare parts can come in as goods in transit without VAT, via a forwarding agent. Personal deliveries follow the normal import process instead. See [Procedures](/procedures) for the full breakdown.

## While you're here

- See [Procedures](/procedures) for a step-by-step breakdown of clearance and customs.
- See [Laws & Regulations](/laws) for the rules that apply during your stay.`,
  },
  {
    slug: "procedures",
    locale: "en",
    title: "Clearance Procedures",
    body: `## Clearance

1. Head directly to your declared port of entry — do not stop at other anchorages first.
2. Monitor Montenegro VTS on VHF channels 11 and 16 on arrival. Vessels over 300GT or 50m must call VTS directly.
3. The captain completes entry with Customs, Immigration, and the Harbour Master's office. Harbour Master offices generally work 0800-1900; arrivals outside these hours may need to wait at the port of entry until the office opens the next morning.
4. Present the documentation needed to purchase the vignette (see below) and pay the applicable fee.

## Vignette documentation

- Boat registry
- Captain's license, including the page showing expiry date and any limitations
- Letter of authorisation for the captain, signed and stamped by the owning or management company
- Evidence of third-party liability insurance, including the page showing premiums, expiry date, and area of coverage (Mediterranean/Adriatic should be covered — if not, ask about arranging local insurance)
- Crew/guest list, in Excel or Word format
- List of tenders (description, model, manufacturer, length, serial number) with evidence of tender insurance

Harbour Master officers may ask to see the original documents, so keep them aboard, not just copies.

## Tourist tax

Tourist tax is payable after the vignette is purchased. It's based on the size of the yacht and the length of stay, and covers all crew aboard for the duration the vignette is valid.

## Receiving packages, spares & personal deliveries

Deliveries into Montenegro fall into two categories with very different processes.

**Yacht equipment and spare parts** are treated as goods in transit to a foreign-flagged yacht and are not liable for import duty/VAT — this only applies to parts and equipment for the boat itself, not personal items. A forwarding agent is required to complete the delivery; couriers typically only deliver as far as the central customs office in Podgorica, with the forwarding agent handling the final leg to the yacht. The invoice needs to state the sender and receiver names and an itemised description and value of the goods, and customs can ask to inspect the contents on request. Consolidating multiple items into a single delivery is usually cheaper, since forwarding agents typically charge a flat fee per delivery regardless of value.

**Personal deliveries** follow the standard Montenegrin import process, through regular courier or postal services, addressed to an individual rather than the yacht.

A few things worth knowing either way:

- Some tax-free items — fuel, food, wine and spirits, tenders, toys, and jet skis — can often only be brought aboard immediately before departure.
- Certain goods are restricted or prohibited from being sent into Montenegro, typically anything hazardous, poisonous, or medication/drugs. Check with your agent if you're unsure before shipping.

## Departure

If leaving Montenegrin waters, you may need to clear out at your port of departure — ask your agent or the harbour master whether this applies to your itinerary.

Many marinas offer an agent service that handles clearance on your behalf for a fee — this is common practice and can save time, especially on arrival day.`,
  },
  {
    slug: "laws",
    locale: "en",
    title: "Laws & Regulations",
    body: `## Vessel traffic & speed limits

- Montenegro VTS (Vessel Traffic Service) should be monitored on VHF channels 11 and 16 while in Montenegrin waters. Vessels over 300GT or 50m must call VTS on arrival.
- Speed limit in the bay: 14 knots for vessels up to 24m, 10 knots for vessels over 24m.
- Speed limit in the Kumbor and Verige channels: 10 knots for vessels up to 24m, 6 knots for vessels over 24m.
- Higher speeds are only permitted with VTS authorisation, for reasons such as weather conditions or navigational safety.
- On entering Montenegrin waters, vessels must proceed directly to a port of entry, not to another anchorage first.

## Vignette (navigation permit)

The vignette is the permit required to cruise Montenegrin waters. The fee depends on the length and type of the boat and the period it covers — vignettes can be purchased for anything from one day to one year, paid directly to the Harbour Master's office by card. See [Procedures](/procedures) for the documents you'll need.

## Tourist tax

Tourist tax is charged in addition to the vignette, scaled to yacht size and length of stay, and covers everyone aboard for the vignette's validity period.

## Insurance

Third-party liability insurance is required, and should show coverage of the Mediterranean/Adriatic area. If your existing policy doesn't cover Montenegro, ask about arranging local insurance before you arrive.

## Duty-free / VAT on fuel

Foreign-flagged yachts departing Montenegrin waters can take on duty-free diesel at authorised fuelling points. This differs from retail (road) diesel, which includes VAT and excise duty. See the [fuel price page](/fuel-price) for the current split.

## Bringing goods into Montenegro

Yacht spare parts and equipment can generally be brought in as goods in transit without VAT, while personal deliveries follow the normal import process. See [Procedures](/procedures) for how this works in practice, and check with your agent if you're unsure whether an item is restricted.

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
