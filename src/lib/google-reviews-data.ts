export const GOOGLE_REVIEWS_HUB = {
  url: "https://maps.app.goo.gl/VHjEJsAeUaKseLk2A",
  centerImage: "https://officeimage.nl/wp-content/uploads/2025/03/Luxe-kantoorinrichting.jpg",
  rating: "4,9",
  count: "80+",
  place: "Office Image Kantoormeubelen, Rotterdam",
} as const;

export type GoogleReview = {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
  accent: string;
  tone: "light" | "warm";
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "hd",
    name: "H D",
    role: "Local Guide · Maatwerkproject",
    initials: "HD",
    accent: "vergadertafel op maat voor 30 personen",
    quote:
      "Ontzettend tevreden. Meerdere bureaus én een indrukwekkende vergadertafel geleverd. Kwaliteit en afwerking echt van hoog niveau.",
    tone: "warm",
  },
  {
    id: "parkeren",
    name: "Bovenmeester Parkeren",
    role: "Directiemeubelen · Arma",
    initials: "BP",
    accent: "volgende dag bezorgd en gemonteerd",
    quote:
      "De eigenaar weet wat hij verkopt. Sublime, degelijke directiemeubelen. Volgende dag bezorgd en kosteloos gemonteerd.",
    tone: "light",
  },
  {
    id: "robert",
    name: "Robert V.",
    role: "Particulier · Bureaustoel",
    initials: "RV",
    accent: "expertadvies en snelle levering",
    quote:
      "Expertadvies van Altan in de showroom. Direct gekocht en woensdag al thuisbezorgd — uitstekende service.",
    tone: "light",
  },
  {
    id: "kadir",
    name: "Kadir Ince",
    role: "Ondernemer · Showroombezoek",
    initials: "KI",
    accent: "enorme variatie aan modellen",
    quote:
      "Hele mooie kantoormeubels en een grote variatie. Zeker aanrader om ideeën op te doen — de koffie is ook erg lekker.",
    tone: "warm",
  },
  {
    id: "hakan",
    name: "Hakan Aksoy",
    role: "Zaakvoerder · Complete inrichting",
    initials: "HA",
    accent: "tweede keer volledig kantoor ingericht",
    quote:
      "De 2e keer mijn gehele kantoor laten inrichten door Office Image. Zeer tevreden over resultaat, service en Ferdi.",
    tone: "light",
  },
  {
    id: "selvi",
    name: "Selvi Safety & Consultancy",
    role: "Directie · Kantoorinrichting",
    initials: "SS",
    accent: "klantenservice ongeëvenaard",
    quote:
      "Fantastische ervaring. Kwaliteit en klantenservice ongeëvenaard. Persoonlijk advies dat echt naar uw situatie luistert.",
    tone: "warm",
  },
];

export const GOOGLE_REVIEW_SLOTS = [
  { x: 13, y: 16, rotate: -5, scale: 0.94, z: 30 },
  { x: 87, y: 12, rotate: 4.5, scale: 0.96, z: 40 },
  { x: 8, y: 56, rotate: 3, scale: 0.92, z: 35 },
  { x: 90, y: 50, rotate: -4, scale: 0.95, z: 40 },
  { x: 20, y: 84, rotate: -2.5, scale: 0.9, z: 30 },
  { x: 80, y: 82, rotate: 5, scale: 0.93, z: 35 },
] as const;
