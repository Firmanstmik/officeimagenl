export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://officeimagenl.vercel.app";

export const SITE_NAME = "Office Image";

export const DEFAULT_TITLE =
  "Office Image | Hoogwaardige kantoormeubelen en werkplekinrichting";

export const DEFAULT_DESCRIPTION =
  "Exclusieve directiemeubelen, werkplekken, bureaustoelen en archiefkasten. Grote voorraad, snelle levering en persoonlijk advies in onze showroom in Rotterdam, 6 dagen per week open.";

/** Square share card generated from /images/logo-office-image.png */
export const OG_IMAGE_PATH = "/images/og-whatsapp.png?v=2";
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "1200";
export const OG_IMAGE_TYPE = "image/png";

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL.replace(/\/$/, "")}${path}`;
}

type PageHeadOptions = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function createPageHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogImage = OG_IMAGE_PATH,
}: PageHeadOptions = {}) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImage);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#111827" },

      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:type", content: OG_IMAGE_TYPE },
      { property: "og:image:width", content: OG_IMAGE_WIDTH },
      { property: "og:image:height", content: OG_IMAGE_HEIGHT },
      { property: "og:image:alt", content: `${SITE_NAME}, premium kantoormeubelen en showroom Rotterdam` },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },

      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "canonical", href: url },
    ],
  };
}

export const rootHeadLinks = [
  { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "32x32" },
  { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
] as const;
