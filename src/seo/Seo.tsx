import { Helmet } from "react-helmet-async";
import { absoluteUrl } from "@/seo/site";
import type { JsonLd } from "@/seo/schema";

type OpenGraphType = "website" | "article";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath: `/${string}` | "/";
  ogType?: OpenGraphType;
  imagePath?: `/${string}`;
  noIndex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
};

export function Seo({
  title,
  description,
  canonicalPath,
  ogType = "website",
  imagePath = "/og-default.jpg",
  noIndex = false,
  jsonLd,
}: SeoProps) {
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(imagePath);
  const robots = noIndex ? "noindex, nofollow" : "index, follow";
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="QuanSynd" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="robots" content={robots} />

      {jsonLdArray.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

