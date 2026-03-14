import { absoluteUrl } from "@/seo/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QuanSynd",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/favicon.png"),
  } satisfies JsonLd;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "QuanSynd",
    url: absoluteUrl("/"),
  } satisfies JsonLd;
}

export function blogPostingJsonLd(input: {
  slug: string;
  title: string;
  description: string;
  datePublished?: string;
  authorName?: string;
}) {
  const url = absoluteUrl(`/blog/${input.slug}`);
  const isoDate = input.datePublished ? new Date(input.datePublished).toISOString() : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    datePublished: isoDate,
    author: input.authorName
      ? { "@type": "Organization", name: input.authorName }
      : { "@type": "Organization", name: "QuanSynd" },
    publisher: { "@type": "Organization", name: "QuanSynd", url: absoluteUrl("/") },
    image: [absoluteUrl("/og-default.jpg")],
  } satisfies JsonLd;
}
