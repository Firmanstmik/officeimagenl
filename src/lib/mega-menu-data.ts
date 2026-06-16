import { SHOP_PATH } from "@/lib/oi-data";

export type MegaMenuItem = {
  label: string;
  img: string;
  tag?: string;
};

export type MegaMenuSection = {
  id: string;
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  featuredImg: string;
  items: MegaMenuItem[];
  extras?: { label: string }[];
};

/** Official Office Image mega menu — images & labels from officeimage.nl homepage navigation. */
export const MEGA_MENUS: MegaMenuSection[] = [
  {
    id: "directie",
    label: "Directie meubelen",
    href: SHOP_PATH,
    eyebrow: "Productcategorieën",
    title: "Onze Directiemeubelen",
    description:
      "Exclusieve directiemeubelen voor representatieve ruimtes. Groot op voorraad, persoonlijk advies in onze showroom Rotterdam.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2024/10/ARMA-1.jpg",
    items: [
      { label: "A-Simena Hoekbureau", img: "https://officeimage.nl/wp-content/uploads/2024/10/546-product_yHFOVOII-600x399.jpg" },
      { label: "Arma Directie meubelen", img: "https://officeimage.nl/wp-content/uploads/2024/10/ARMA-500x500-1.jpg", tag: "Signature" },
      { label: "Capuan Directiemeubelen", img: "https://officeimage.nl/wp-content/uploads/2024/10/capua5-250x250-1.jpg" },
      { label: "Mercure Directieset", img: "https://officeimage.nl/wp-content/uploads/2024/10/mercure-wit-250x250-1.jpg" },
      { label: "Santana Directiemeubelen", img: "https://officeimage.nl/wp-content/uploads/2024/10/santana-250x250-1.jpeg" },
      { label: "Spectra Directiemeubelen", img: "https://officeimage.nl/wp-content/uploads/2024/10/Spectra-zwart-havanna-250x250-1.jpg" },
    ],
  },
  {
    id: "werkplekken",
    label: "Werkplekken",
    href: SHOP_PATH,
    eyebrow: "Werkplekinrichting",
    title: "Modulaire Werkplekken",
    description:
      "Ergonomische werkplekken van Foxline, T-Line, Slinger en elektrisch verstelbaar. Snel configureerbaar, direct uit voorraad.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2024/10/fox-320x160-tafel-1-1.jpg",
    items: [
      { label: "Werkplekken Elektrisch", img: "https://officeimage.nl/wp-content/uploads/2024/10/verstelbaar-100x100-1.jpg" },
      { label: "Werkplekken Nieuw Line", img: "https://officeimage.nl/wp-content/uploads/2024/10/120x60-500x500-300x300-1.png" },
      { label: "Werkplekken Foxline", img: "https://officeimage.nl/wp-content/uploads/2024/10/fox-bureau-500x500-300x300-1.jpg", tag: "Foxline" },
      { label: "Werkplekken Slinger", img: "https://officeimage.nl/wp-content/uploads/2024/10/T-poot-slinger-1-250x250-1.jpg" },
      { label: "Werkplekken T-Line", img: "https://officeimage.nl/wp-content/uploads/2024/10/bt181-250x250-1.jpg" },
    ],
  },
  {
    id: "archiefkasten",
    label: "Archiefkasten",
    href: SHOP_PATH,
    eyebrow: "Opslag & archief",
    title: "Kantoorkasten & Archief",
    description:
      "Roldeurkasten, brandwerende kasten en veilige opslag. Groot aantal op voorraad, de juiste prijs.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2024/10/roldeurkast-ch-1.jpg",
    items: [
      { label: "Draaideurkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/ddk180.jpg" },
      { label: "Roldeurkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/roldeurkast3-1-600x600.png" },
      { label: "Brandwerende archiefkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/brandweerende-kast-1.jpg" },
      { label: "Demontabele Kasten (zelf bouwen)", img: "https://officeimage.nl/wp-content/uploads/2024/10/roldeurkast-ch.jpg" },
      { label: "Folderkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/folderkast-nieuwe-300x300-1.png" },
      { label: "Schuifdeurkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/schuifdeur-72x160-300x300-1.jpg" },
      { label: "Veiligheidskasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/dmchdr195_20121114112311.jpg" },
      { label: "Vitrinekasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/GPC-1000-O-ZWART-300x300-1.jpg" },
    ],
  },
  {
    id: "ladenkasten",
    label: "Ladenkasten",
    href: SHOP_PATH,
    eyebrow: "Organisatie",
    title: "Ladenkasten & Rolblokken",
    description:
      "Ladenkasten, hangmapkasten en rolblokken voor een strak en overzichtelijk archief. Diverse formaten op voorraad.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2024/12/tekeningladekast-A3-8L-300x300-1.jpg",
    items: [
      { label: "Bureauhoogte Blokken", img: "https://officeimage.nl/wp-content/uploads/2024/10/bureauhoogte-4l-zwart-beuken-80-kapali-300x300-1.jpg" },
      { label: "Hangmapkasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/dubbel-3.jpg" },
      { label: "Ladenkast A4", img: "https://officeimage.nl/wp-content/uploads/2024/10/a4-30-laden-grijs.jpg" },
      { label: "Rolblokken", img: "https://officeimage.nl/wp-content/uploads/2024/10/eco-rolblok-3.jpg" },
      { label: "Tekening ladekasten", img: "https://officeimage.nl/wp-content/uploads/2024/10/Tekening_ladenkast.jpg" },
    ],
  },
  {
    id: "tafels",
    label: "Tafels",
    href: SHOP_PATH,
    eyebrow: "Vergaderen",
    title: "Kantoor- & Vergadertafels",
    description:
      "Bartafels, kantoortafels, klaptafels en vergadertafels voor professionele ontmoetingsruimtes.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2025/03/HR_20230806_16-scaled.jpg",
    items: [
      { label: "Bartafel", img: "https://officeimage.nl/wp-content/uploads/2024/10/1615_1_large-1.jpg" },
      { label: "Kantoortafels", img: "https://officeimage.nl/wp-content/uploads/2024/10/tafel1-160x80-300x300-1.jpg" },
      { label: "Klaptafels", img: "https://officeimage.nl/wp-content/uploads/2024/10/2875_2_large.jpg" },
      { label: "Vergadertafels", img: "https://officeimage.nl/wp-content/uploads/2024/10/ovaal-1-600x510.jpg" },
    ],
  },
  {
    id: "meer",
    label: "Meer categorieën",
    href: SHOP_PATH,
    eyebrow: "Catalogus",
    title: "Meer Kantoormeubelen",
    description:
      "Bureaustoelen, lockers, kapstokken en werkplaatsinrichting. Ontdek het volledige assortiment van Office Image.",
    featuredImg: "https://officeimage.nl/wp-content/uploads/2024/12/fede7c3c-3427-4597-80b1-9a169a5fd6a4.jpg",
    items: [
      { label: "Bureaustoelen & stoelen", img: "https://officeimage.nl/wp-content/uploads/2024/10/Bureaustoel-Technox-1.png" },
      { label: "Lockers", img: "https://officeimage.nl/wp-content/uploads/2024/10/okk-40_20120827164028.jpg" },
      { label: "Kapstokken", img: "https://officeimage.nl/wp-content/uploads/2024/10/127-556x600.jpg" },
    ],
    extras: [
      { label: "Bureaustoelen" },
      { label: "Directiestoelen" },
      { label: "Kantinestoelen" },
      { label: "Vergaderstoelen" },
      { label: "Werkstoelen & Krukken" },
      { label: "Garderobekasten" },
      { label: "Werkplaatsinrichting" },
    ],
  },
];

export const MEGA_MENU_BY_ID = Object.fromEntries(MEGA_MENUS.map(m => [m.id, m])) as Record<string, MegaMenuSection>;
