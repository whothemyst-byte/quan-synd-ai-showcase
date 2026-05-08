# QuanSynd SEO and GEO Audit Report

Date: 2026-03-29

Scope reviewed: `Quansynd-Web/` (Vite + React + React Router + SSR/prerender)

GEO in this report means generative engine optimization, meaning AI search and LLM retrieval readiness.

## Executive Summary

**SEO implementation score: 7.6 / 10**

**GEO readiness score: 6.8 / 10**

The site is already stronger than a typical SPA:
- Per-route SEO metadata is implemented through `src/seo/Seo.tsx`
- SSR/prerender is in place
- Robots and sitemap exist
- Structured data exists for the organization, website, and blog posts

The biggest remaining gaps are:
- Public product pages are not included in the sitemap/prerender route list
- Unknown routes can likely resolve as soft 404s because of the catch-all rewrite
- Auth and checkout style routes do not have explicit `noindex`
- Schema is too minimal for strong GEO/AI-search visibility
- Sitemap and prerender routing are still manually maintained

## What Is Working Well

- `public/robots.txt` allows crawlers and points to the sitemap.
- `src/seo/Seo.tsx` standardizes title, description, canonical, OG, Twitter, and robots metadata.
- `src/App.tsx` injects site-wide `Organization` and `WebSite` JSON-LD.
- `src/pages/BlogPost.tsx` adds `BlogPosting` JSON-LD.
- The site uses SSR/prerender through `src/entry-server.tsx` and `scripts/prerender.mjs`.
- The main marketing pages have unique metadata and strong hero copy.

## Subagent Track 1 - Technical SEO and Indexing

### Findings

#### High - Public product pages are omitted from sitemap and prerender routes

Evidence:
- `scripts/seo-routes.mjs`
- `scripts/generate-sitemap.mjs`
- `scripts/prerender.mjs`
- `src/pages/VibeADE.tsx`
- `src/pages/VibePricing.tsx`

What I found:
- `Vibe ADE` and `Vibe Pricing` both have `Seo` metadata and are public pages.
- They are routed in `src/App.tsx`.
- They are not present in `scripts/seo-routes.mjs`, so they are not added to `public/sitemap.xml`.
- The same route list is used by `scripts/prerender.mjs`, so they are also skipped by static prerender generation.

Impact:
- These pages are less discoverable to crawlers.
- They do not benefit from prerendered HTML at build time.
- Search engines and AI crawlers have fewer guaranteed entry points to these product pages.

Recommendation:
- Add `/products/vibe-ade` and `/products/vibe-ade/pricing` to `scripts/seo-routes.mjs`.
- Regenerate the sitemap and prerender output.

#### High - Catch-all route can create soft 404 behavior

Evidence:
- `vercel.json`

What I found:
- The Vercel config rewrites all unmatched paths to `/index.html`.
- That is common for SPA routing, but it can cause unknown URLs to return HTTP 200 with a client-side 404 view.

Impact:
- Search engines can interpret unknown pages as soft 404s.
- Crawl budget can be wasted on junk URLs.

Recommendation:
- Keep client routing for known app paths.
- Ensure true unknown paths return a real 404 status at the edge where possible.

#### Medium - Auth and transaction routes have no explicit noindex

Evidence:
- `src/pages/Auth.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Checkout.tsx`
- `src/pages/PaymentSuccess.tsx`

What I found:
- These pages do not use `Seo`.
- They are also not in the sitemap, which is good.
- They are still technically crawlable if discovered.

Impact:
- Login, dashboard, checkout, and success pages should not be indexable.

Recommendation:
- Add `Seo` with `noIndex` to those routes, or set equivalent noindex headers.

#### Medium - Sitemap is route-list driven and lacks lastmod

Evidence:
- `scripts/generate-sitemap.mjs`
- `scripts/seo-routes.mjs`
- `public/sitemap.xml`

What I found:
- The sitemap is generated from a manually maintained route array.
- It does not emit `lastmod`.

Impact:
- Route drift is easy to introduce.
- Crawlers get less freshness information than they could.

Recommendation:
- Keep a single route source of truth.
- Add `lastmod` for routes that change.

## Subagent Track 2 - On-Page SEO and Content Structure

### Findings

#### Strong - Primary public pages have unique metadata

Evidence:
- `src/pages/Index.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/Contact.tsx`
- `src/pages/quan-bench.tsx`
- `src/pages/VibeADE.tsx`
- `src/pages/VibePricing.tsx`
- `src/pages/NotFound.tsx`

What I found:
- The major public pages have unique title, description, canonical, and social metadata.
- Blog post pages have article-specific metadata and content depth.

Impact:
- Good baseline for indexable marketing pages.

#### Medium - Internal linking is present but not yet clustered

What I found:
- The home page links to services, blog, product pages, and contact.
- The blog page links to individual posts.
- The product and service areas are not yet organized into tight topic clusters.

Impact:
- Topical authority is weaker than it could be.
- Important commercial pages could benefit from stronger contextual linking.

Recommendation:
- Add related links blocks between services, blog posts, and product pages.
- Add breadcrumbs on deep pages.
- Create explicit topic clusters for AI consulting, design, and Vibe ADE.

## Subagent Track 3 - GEO and Structured Data

### Findings

#### Medium - Schema is present but minimal

Evidence:
- `src/App.tsx`
- `src/seo/schema.ts`
- `src/pages/BlogPost.tsx`

What I found:
- Site-wide schema exists for `Organization` and `WebSite`.
- Blog posts use `BlogPosting`.
- The schema does not yet describe products, services, FAQ blocks, contact points, or breadcrumbs.

Impact:
- The site is visible to search engines, but the entity graph is sparse for AI retrieval systems.

Recommendation:
- Add richer schema types:
  - `Product` or `SoftwareApplication` for Vibe ADE
  - `Service` for service pages
  - `BreadcrumbList` for deep pages
  - `FAQPage` where FAQ content exists
  - `ContactPoint` and `sameAs` for the organization
  - `CollectionPage` or `ItemList` for the blog index

#### Medium - BlogPosting schema uses a default image and human-readable dates

Evidence:
- `src/seo/schema.ts`
- `src/pages/BlogPost.tsx`

What I found:
- Blog schema currently uses the default OG image for every post.
- Dates are derived from human-readable strings.

Impact:
- The markup works, but it is not as robust or specific as it could be.

Recommendation:
- Store ISO dates in the data source.
- Use the actual post image in `BlogPosting`.
- Add `dateModified` if content changes later.

#### Low - GEO-specific presence signals can be stronger

What I found:
- The brand and product names are consistent.
- The pages are semantically readable.
- The site does not yet expose a concise machine-readable summary page for AI crawlers.

Recommendation:
- Add a short `llms.txt` or similar AI-facing summary if you want stronger LLM retrieval support.
- Add concise entity and service facts near the top of key pages.

## Subagent Track 4 - Performance and Discoverability Adjacent Factors

### Findings

#### Low to Medium - Performance is probably acceptable, but not fully validated here

What I found:
- Images on blog cards use lazy loading.
- Fonts are loaded from Google Fonts.
- The app bundle is likely non-trivial, but I did not run a fresh Lighthouse pass in this review.

Impact:
- Performance is not the biggest SEO risk right now.
- It remains a secondary watch item for LCP and CLS.

Recommendation:
- Run Lighthouse on key routes after the sitemap/prerender fixes.
- Keep watching bundle size as the app grows.

## Route Coverage Summary

### Public pages with `Seo`
- `/`
- `/about`
- `/services`
- `/blog`
- `/blog/:slug`
- `/contact`
- `/quan-bench`
- `/products/vibe-ade`
- `/products/vibe-ade/pricing`
- `/404`

### Public or protected pages without explicit `Seo`
- `/auth`
- `/dashboard`
- `/checkout`
- `/payment-success`

### Sitemap/prerender coverage gap
- `/products/vibe-ade`
- `/products/vibe-ade/pricing`

## Prioritized Recommendations

### P0
1. Add the Vibe ADE product routes to `scripts/seo-routes.mjs`.
2. Regenerate sitemap and prerender output.
3. Decide how unknown routes should return a real 404 instead of a soft 404.

### P1
1. Add explicit `noindex` for auth, dashboard, checkout, and payment success pages.
2. Add `lastmod` to the sitemap.
3. Expand schema for products, services, breadcrumbs, FAQ, and contact details.

### P2
1. Build internal link clusters between services, blog, and product pages.
2. Add a machine-readable AI summary page or `llms.txt` if GEO is a priority.
3. Run Lighthouse and Search Console after the structural fixes.

## Files Reviewed

- `index.html`
- `vercel.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/generate-sitemap.mjs`
- `scripts/prerender.mjs`
- `scripts/seo-routes.mjs`
- `src/App.tsx`
- `src/entry-server.tsx`
- `src/seo/Seo.tsx`
- `src/seo/schema.ts`
- `src/pages/Index.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/Contact.tsx`
- `src/pages/quan-bench.tsx`
- `src/pages/VibeADE.tsx`
- `src/pages/VibePricing.tsx`
- `src/pages/Auth.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Checkout.tsx`
- `src/pages/PaymentSuccess.tsx`
- `src/pages/NotFound.tsx`
