// The Port Agents page: port agents in Montenegro, in the order of the
// partner's list (October 2026). Phones, websites and emails were checked
// against the agents' own websites where the list looked wrong.
//
// To add an agent: add an entry below. Write phones as "+382 69 123 456".
export type PortAgent = {
  key: string;
  name: string;
  phones?: string[];
  emails?: string[];
  website?: string;
};

export const PORT_AGENTS: PortAgent[] = [
  {
    key: "sevenOceans",
    name: "7 Oceans Yachting",
    phones: ["+382 67 372 037"],
    emails: ["erkin.unsal@7oceansyachting.com"],
    website: "https://www.7oceansyachting.com",
  },
  {
    key: "iyc",
    name: "International Yacht Company",
    phones: ["+382 32 540 280"],
    website: "https://www.iyc.com/office/montenegro/",
  },
  {
    key: "acquera",
    name: "Acquera Yachting",
    phones: ["+382 69 100 172"],
    emails: ["montenegro@acquera.com"],
    website: "https://www.acquerayachting.com",
  },
  {
    key: "aPlus",
    name: "A+",
    phones: ["+382 67 098 211"],
    emails: ["operations.montenegro@a-yachting.me"],
    website: "https://www.a-yachting.me",
  },
  {
    // The list (and the agent's website) also give info@yachting-montevita.com,
    // but that domain doesn't exist, so mail to it bounces.
    key: "monteVita",
    name: "Monte Vita Yachting",
    phones: ["+382 67 138 737", "+381 67 281 141"],
    emails: ["monte.vita.groups@gmail.com"],
    website: "https://www.yachtingmontevita.com",
  },
  {
    key: "bokaAdriatic",
    name: "Boka Adriatic",
    phones: ["+382 69 043 126", "+382 69 359 059", "+382 69 359 066"],
    emails: ["info@adriaticagent.com", "adriaticagent@t-com.me"],
    website: "https://www.adriaticagent.com",
  },
  {
    key: "adriaticYachtingAgency",
    name: "Adriatic Yachting Agency",
    phones: ["+382 67 341 351"],
    emails: ["zoranbatuta@gmail.com"],
  },
  {
    key: "yachtAgentMontenegro",
    name: "Yacht Agent Montenegro",
    phones: ["+382 67 132 233"],
    emails: ["montenegro@yachtagent.net"],
    website: "https://www.yachtagent.net",
  },
  {
    key: "allegra",
    name: "Allegra Montenegro",
    phones: ["+382 67 344 350", "+382 67 642 242"],
    emails: ["portagent@allegra-montenegro.com"],
    website: "https://www.allegraportagent.com",
  },
  {
    key: "jadroagentBar",
    name: "Jadroagent Bar",
    phones: ["+382 30 315 996", "+382 30 311 005"],
    emails: ["jadroa@jadroagentbar.com"],
    website: "https://www.jadroagentbar.com",
  },
  {
    key: "montenegroDestinations",
    name: "Montenegro Destinations",
    phones: ["+382 69 559 448", "+382 69 255 627"],
    emails: ["portagent@mdestination.net"],
    website: "https://www.mdestination.net",
  },
  {
    key: "drm",
    name: "DRM",
    phones: ["+382 69 050 315"],
    emails: ["info@drmaritime.com", "office@drmaritime.com"],
    website: "https://www.drmaritime.com",
  },
  {
    key: "bcmGroup",
    name: "BCM Group",
    phones: ["+382 32 304 696", "+382 32 520 534"],
    emails: ["info@bcm.group"],
    website: "https://www.bcm.group",
  },
  {
    key: "mrm",
    name: "MRM",
    phones: ["+382 69 179 893", "+382 32 540 344"],
    emails: ["office@mrm-maritime.com"],
    website: "https://www.mrm-maritime.com",
  },
  {
    key: "marineShoreAssistance",
    name: "Marine Shore Assistance",
    phones: ["+382 67 300 691", "+382 67 300 584"],
    emails: ["milica@msayacht.com", "damir@msayacht.com"],
    website: "https://www.msayacht.com",
  },
  {
    key: "bwa",
    name: "BWA",
    phones: ["+382 69 351 168"],
    emails: ["montenegro@bwayachting.com"],
    website: "https://www.bwayachting.com",
  },
  {
    key: "adriaticYachting",
    name: "Adriatic Yachting",
    phones: ["+382 69 700 647"],
    emails: ["info@adriaticyachting.com"],
    website: "https://www.adriaticyachting.me",
  },
];
