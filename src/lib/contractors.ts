// The Contractors page: local contractors grouped by category. Built from the
// Porto Montenegro contractor list (October 2026), with its catch-all "Small
// work" section split into real trades and duplicate entries merged into one
// contractor listed under several categories.
//
// To add a contractor: add an entry below and list every category it belongs
// to. Names, people, brands, phones, emails and addresses are proper nouns and
// stay here; a description of what they do (if any) goes under
// Contractors.items.<key> in the messages. Write phones as "+382 69 123 456".
//
// To add a category: add its key to CONTRACTOR_CATEGORIES (in page order) and
// a title and description under Contractors.categories.<key>.
export const CONTRACTOR_CATEGORIES = [
  "engines",
  "electrical",
  "airConditioning",
  "sailsRigging",
  "paintFiberglass",
  "welding",
  "interiors",
  "cranes",
  "surveyors",
  "safety",
  "chandlery",
  "provisioning",
  "gasWaste",
  "cleaning",
  "guardinage",
  "medical",
  "vet",
  "florists",
] as const;

export type ContractorCategory = (typeof CONTRACTOR_CATEGORIES)[number];

export type Contractor = {
  key: string;
  name: string;
  categories: ContractorCategory[];
  person?: string;
  brands?: string[];
  phones?: string[];
  emails?: string[];
  website?: string;
  address?: string;
};

export const CONTRACTORS: Contractor[] = [
  // Engines
  {
    key: "yachtingServisMarkovic",
    name: "Yachting Servis Markovic",
    categories: ["engines"],
    person: "Aleksandar Markovic",
    brands: ["Volvo Penta", "MAN"],
    phones: ["+382 69 478 639"],
    emails: ["aleksandarmarkovic@yahoo.com"],
  },
  {
    key: "engineRepairSolutions",
    name: "Engine Repair Solutions d.o.o.",
    categories: ["engines"],
    person: "Dejan Bilafer",
    brands: ["Volvo Penta", "MTU"],
    phones: ["+382 67 022 881"],
    emails: ["volvo@ers.co.me"],
  },
  {
    key: "prento",
    name: "Prento Yacht Assistant",
    categories: ["engines"],
    person: "Ilko Boskovic",
    brands: ["Caterpillar", "MAN"],
    phones: ["+382 69 655 017"],
    emails: ["prento@t-com.me"],
  },
  {
    key: "navar",
    name: "Navar",
    categories: ["engines"],
    person: "Toni",
    brands: ["Yanmar", "MTU", "Suzuki", "Seakeeper", "Besenzoni"],
    phones: ["+382 67 220 635"],
    emails: ["toni@navaryacht.com"],
  },
  {
    key: "yachtProService",
    name: "Yacht Pro Service",
    categories: ["engines"],
    person: "Zlatko Dubreta",
    brands: ["MTU", "Cummins"],
    phones: ["+382 69 012 504"],
    emails: ["zmaj@t-com.me"],
  },
  {
    key: "technomarine",
    name: "Technomarine",
    categories: ["engines", "cranes"],
    person: "Tomislav Bozinovic",
    brands: [
      "Mercury",
      "MerCruiser",
      "ZF Marine",
      "Perkins",
      "Cummins",
      "Yamaha",
      "Honda",
    ],
    phones: ["+382 68 222 530"],
    emails: ["technomarine@t-com.me"],
  },

  // Electrical & electronics
  {
    key: "ditronic",
    name: "Ditronic d.o.o.",
    categories: ["electrical"],
    person: "Goran Krstovic",
    phones: ["+382 67 558 782"],
    emails: ["ditronic.doo@gmail.com"],
  },
  {
    // boatservice.eu, the website and email domain on the source list, is
    // parked and takes no mail, so only the phones are listed.
    key: "boatservice",
    name: "Boatservice d.o.o.",
    categories: [
      "electrical",
      "sailsRigging",
      "paintFiberglass",
      "welding",
      "interiors",
    ],
    person: "Jegor Volkov",
    brands: ["Mase", "Victron Energy", "Raymarine", "Schenker", "MBC Marine"],
    phones: ["+382 69 261 841", "+382 69 817 024"],
  },
  {
    key: "yachtElectronicalService",
    name: "Yacht Electronical Service",
    categories: ["electrical"],
    person: "Drazen Bosnic",
    brands: ["Raymarine"],
    phones: ["+382 67 281 319"],
    emails: ["office@yes-montenegro.com"],
  },

  // Air conditioning & appliances
  {
    // The source list gives this email once as pavicevicd@ and once as
    // pavicevic@; confirm which is right.
    key: "autoKlimePavicevic",
    name: "Auto Klime Pavicevic",
    categories: ["airConditioning"],
    person: "Dragan Pavicevic",
    phones: ["+382 69 062 659"],
    emails: ["pavicevicd@t-com.me"],
  },
  {
    key: "kiko",
    name: "Kiko",
    categories: ["airConditioning"],
    person: "Krsto Sindik",
    phones: ["+382 69 046 075"],
  },

  // Sails & rigging
  {
    key: "avelYachting",
    name: "Avel Yachting d.o.o.",
    categories: ["sailsRigging", "guardinage"],
    person: "Miho Belan, Miljana Djinovic",
    phones: ["+382 68 373 200", "+382 69 390 402"],
  },
  {
    key: "marinArt",
    name: "Marin ART",
    categories: ["interiors", "sailsRigging"],
    phones: ["+382 67 423 467", "+382 67 600 359"],
    emails: ["info@marinart.me"],
    website: "https://www.marinart.me",
    address: "Tivat Servisna zona BB",
  },
  {
    // yhmontenegro.me (website and both emails) no longer exists.
    key: "yachtHomeMontenegro",
    name: "Yacht & Home Montenegro",
    categories: ["interiors", "sailsRigging"],
    phones: ["+382 63 443 205"],
    address: "Istarska 3",
  },

  // Paint & fiberglass
  {
    key: "micicPaint",
    name: "Micic Paint",
    categories: ["paintFiberglass"],
    person: "Miroslav Micic",
    phones: ["+382 69 132 062"],
    emails: ["micic710@gmail.com"],
  },
  {
    key: "ardura",
    name: "Ardura d.o.o.",
    categories: ["paintFiberglass", "gasWaste"],
    person: "Jovan Mandic",
    phones: ["+382 68 034 991"],
    emails: ["vaporbijela@t-com.me"],
  },

  // Welding & stainless steel
  {
    key: "ivatron",
    name: "Ivatron",
    categories: ["welding"],
    person: "Krsto Ivanovic",
    phones: ["+382 69 298 918"],
  },
  {
    key: "zeljkoRaicevic",
    name: "Zeljko Raicevic",
    categories: ["welding"],
    phones: ["+382 69 634 435", "+382 68 463 288"],
  },

  // Interiors & carpentry
  {
    // Both phone numbers on the source list are missing digits.
    key: "lightHouse",
    name: "Light House",
    categories: ["interiors"],
    emails: ["elink@t-com.me"],
    website: "http://www.lighthousesolutions.me",
    address: "Radanovici BB",
  },
  {
    // The phone number on the source list is missing digits.
    key: "legnoSanto",
    name: "Legno Santo d.o.o.",
    categories: ["interiors"],
    emails: ["office@legnosanto.me"],
    address: "Skaljari BB",
  },
  {
    // The landline on the source list is missing digits.
    key: "luxUpholstery",
    name: "Lux Upholstery (ex Mareta)",
    categories: ["interiors"],
    phones: ["+382 63 214 001"],
    emails: ["marija@yachtmm.com"],
    website: "https://yachtmm.com",
    address: "Poslovni centar Riviera",
  },

  // Cranes
  {
    key: "radulovic",
    name: "Slep Sluzba Radulovic",
    categories: ["cranes"],
    person: "Zdravko Radulovic",
    phones: ["+382 69 700 703"],
  },
  {
    key: "micanovic",
    name: "Micanovic Company d.o.o.",
    categories: ["cranes"],
    person: "Bozidar Micanovic",
    phones: ["+382 69 265 955"],
  },
  {
    key: "pmcInvest",
    name: "PMC Invest",
    categories: ["cranes"],
    phones: ["+382 67 293 293"],
    website: "http://pmc-invest.com",
  },

  // Surveyors
  {
    key: "montenegroMarineSurveys",
    name: "Montenegro Marine Surveys",
    categories: ["surveyors"],
    person: "Predrag Dulic",
    phones: ["+382 69 042 795", "+382 67 042 795"],
    emails: ["info@montenegromarinesurveys.com"],
  },
  {
    key: "aleksandarBozovic",
    name: "Aleksandar Bozovic",
    categories: ["surveyors"],
    phones: ["+382 67 255 600"],
    emails: ["abozovic@t-com.me"],
  },

  // Safety equipment
  {
    key: "perun",
    name: "Perun d.o.o.",
    categories: ["safety"],
    phones: ["+382 69 345 196"],
    emails: ["petredonev-perun@t-com.me"],
  },
  {
    key: "repforn",
    name: "Repforn",
    categories: ["safety"],
    phones: ["+382 68 008 758", "+382 69 858 418"],
    emails: ["info@repforn.com"],
  },
  {
    key: "una",
    name: "Una",
    categories: ["safety", "chandlery"],
    phones: ["+382 32 675 000", "+382 67 641 136"],
    emails: ["info@una.me", "vladimir@una.me"],
  },
  {
    // lazizasmontenegro.me no longer exists.
    key: "lazizas",
    name: "Lazizas",
    categories: ["safety", "chandlery"],
    phones: ["+382 68 063 201"],
  },

  // Chandlery & supplies
  {
    key: "lunamar",
    name: "Lunamar",
    categories: ["chandlery"],
    phones: ["+382 67 643 697", "+382 32 540 386"],
    emails: ["info@lunamar.me"],
  },
  {
    key: "craftMarine",
    name: "Craft Marine",
    categories: ["chandlery"],
    phones: ["+382 69 928 951"],
  },
  {
    key: "dnsNautika",
    name: "DNS Nautika",
    categories: ["chandlery"],
    phones: ["+382 67 991 163"],
    emails: ["info@ancorashop.me"],
  },

  // Provisioning
  {
    // The source list's a-provisioning.me is broken; a-yachting.me (their
    // email domain) is the live A+ Yachting site.
    key: "aPlusProvisioning",
    name: "A+ Provisioning",
    categories: ["provisioning"],
    phones: ["+382 68 059 249", "+382 68 003 931"],
    emails: ["provisioning@a-yachting.me"],
    website: "https://a-yachting.me",
    address: "Palih Boraca 26",
  },
  {
    key: "monteVita",
    name: "Monte Vita Yachting",
    categories: ["provisioning"],
    phones: ["+382 67 249 971", "+382 67 281 141"],
    emails: ["monte.vita.groups@gmail.com"],
    website: "https://yachtingmontevita.com",
    address: "Porto Montenegro",
  },
  {
    // boramarine.com didn't respond when checked (October 2026).
    key: "boraMarine",
    name: "Bora Marine",
    categories: ["provisioning"],
    phones: ["+382 69 432 482", "+382 69 432 484"],
    emails: ["info@boramarine.com"],
    address: "Dumidran BB / Villa Tara 202, Porto Montenegro",
  },
  {
    key: "southStar",
    name: "South Star Provisioning",
    categories: ["provisioning"],
    person: "Boris Perisic",
    phones: ["+382 67 330 382"],
    emails: ["info@southstarprovisions.me"],
  },

  // Gas & waste
  {
    key: "popaj",
    name: "Popaj d.o.o.",
    categories: ["gasWaste"],
    person: "Milorad Popovic",
    phones: ["+382 67 210 624"],
  },

  // Cleaning & laundry
  {
    key: "totalYachtCare",
    name: "Total Yacht Care",
    categories: ["cleaning"],
    phones: ["+382 67 330 382"],
    emails: ["info@southstarprovisions.me"],
  },
  {
    key: "polarClean",
    name: "Polar Clean",
    categories: ["cleaning"],
    phones: ["+382 69 146 146", "+382 69 146 004"],
    emails: ["polardryclean@t-com.me"],
  },
  {
    key: "maxClean",
    name: "Max Clean",
    categories: ["cleaning"],
    phones: ["+382 69 211 522"],
    emails: ["cistiona.podgorica@gmail.com"],
  },
  {
    key: "adriaticaWash",
    name: "Adriatica Wash",
    categories: ["cleaning"],
    phones: ["+382 67 635 207"],
    emails: ["adriaticavs@gmail.com"],
  },

  // Guardinage
  {
    key: "montenegroMarineServices",
    name: "Montenegro Marine Services",
    categories: ["guardinage"],
    person: "Edward Daniel",
    phones: ["+382 69 845 613"],
    emails: ["edward@montenegromarineservices.com"],
  },

  // Medical & dental
  {
    // mansamedica.me no longer exists.
    key: "mansaMedica",
    name: "Mansa Medica",
    categories: ["medical"],
    phones: ["+382 32 674 397", "+382 68 086 152"],
    emails: ["mansamedica@t-com.me"],
    address: "II Dalmatinske 4",
  },
  {
    key: "vitaFeminae",
    name: "Vita Feminae",
    categories: ["medical"],
    phones: ["+382 32 330 909", "+382 69 238 298"],
    website: "https://ginekologijakotor.com",
    address: "Dobrota BB",
  },
  {
    key: "mojLab",
    name: "Moj Lab",
    categories: ["medical"],
    phones: ["+382 67 900 219"],
    website: "https://mojlab.me",
    address: "Trg od kulture",
  },
  {
    key: "milmedika",
    name: "Milmedika",
    categories: ["medical"],
    phones: ["+382 67 335 236"],
    website: "https://milmedika.com",
    address: "21. Novembar",
  },
  {
    key: "drSevaljevic",
    name: "Dr Sevaljevic",
    categories: ["medical"],
    phones: ["+382 32 671 977"],
    emails: ["kontakt@drsevaljevic.me"],
    website: "https://drsevaljevic.me",
    address: "Njegoseva 1A",
  },
  {
    key: "dentalSmile",
    name: "Dental Smile",
    categories: ["medical"],
    phones: ["+382 69 521 875", "+382 68 466 142", "+382 69 670 892"],
    emails: ["office@dentalsmiletivat.com"],
    website: "https://dentalsmiletivat.com",
    address: "Stari Put BB",
  },

  // Vet
  {
    key: "vetPort",
    name: "Vet Port",
    categories: ["vet"],
    phones: ["+382 69 250 781", "+382 68 250 781"],
    emails: ["reljace@yahoo.com"],
    website: "https://vetport.me",
    address: "Skaljari BB",
  },

  // Florists
  {
    key: "cvjecaraDjurdja",
    name: "Cvjecara Djurdja",
    categories: ["florists"],
    phones: ["+382 69 589 339"],
    address: "Djacka 14",
  },
  {
    key: "cvjecaraGardenija",
    name: "Cvjecara Gardenija",
    categories: ["florists"],
    phones: ["+382 69 548 080"],
    address: "Trg Magnolija BB",
  },
  {
    key: "cvjecaraNina",
    name: "Cvjecara Nina",
    categories: ["florists"],
    phones: ["+382 67 845 245"],
    address: "Donja Lastva BB",
  },
  {
    key: "habitat",
    name: "Habitat",
    categories: ["florists"],
    phones: ["+382 67 841 188"],
  },
];

export function contractorsIn(category: ContractorCategory) {
  return CONTRACTORS.filter((contractor) =>
    contractor.categories.includes(category),
  );
}
