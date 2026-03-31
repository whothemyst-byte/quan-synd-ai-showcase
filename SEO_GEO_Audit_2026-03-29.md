# Quansynd Web SEO + GEO Audit

Date: 2026-03-29

Scope: repo-only review of `Quansynd-Web/` (Vite + React + React Router + SSR/prerender + Vercel)

Interpretation of GEO in this audit: making the site easy for AI systems to understand, cite, extract, and attribute correctly.

## Executive Summary

Overall readiness: **7.9 / 10**

The site has a solid SEO base:
- robots.txt and sitemap exist
- most public pages have per-route metadata
- prerender/SSR is wired in
- JSON-LD is present site-wide and on blog posts
- a global Google tag is now installed in the shared HTML shell

Main gaps that still matter:
1. Several non-marketing routes are missing SEO/noindex handling and can be crawled as thin pages.
2. The Vercel catch-all routing likely produces soft-404 behavior for unknown URLs.
3. Blog and product pages do not yet use their best available social preview images or richer schema.
4. GEO signals are good at the brand level, but weak at the entity, citation, and structured-content level.
5. There is no explicit redirect/canonical host policy in the repo.

## What I Reviewed

- `index.html`
- `package.json`
- `vercel.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/App.tsx`
- `src/entry-server.tsx`
- `src/seo/Seo.tsx`
- `src/seo/schema.ts`
- `src/seo/site.ts`
- `src/pages/*.tsx`

## Findings

### 1) Strong baseline SEO is already in place

What is good:
- `src/seo/Seo.tsx` centralizes title, description, canonical, Open Graph, Twitter card, robots, and JSON-LD.
- `src/App.tsx` injects Organization and WebSite JSON-LD site-wide.
- `src/pages/BlogPost.tsx` injects BlogPosting JSON-LD on article pages.
- `public/robots.txt` allows crawling and points to the sitemap.
- `public/sitemap.xml` lists the core public pages and blog posts.
- `src/entry-server.tsx` and the build pipeline support prerendering.

Impact:
- Search engines can understand the site structure without relying entirely on client-side rendering.
- Social sharing should work out of the box for most routes.

### 2) Thin utility routes are missing noindex handling

Affected routes:
- `src/pages/Auth.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Checkout.tsx`
- `src/pages/PaymentSuccess.tsx`

Issue:
- These routes do not use `Seo`, so they do not set `noindex`.
- They are not in the sitemap, which is good, but they are still technically crawlable if discovered.

Why it matters:
- These are thin or authenticated flows, not indexable landing pages.
- Leaving them indexable can create duplicate or low-value URLs in search.

Priority: **High**

### 3) Unknown routes likely return a soft 404

Evidence:
- `vercel.json` routes everything to `/index.html` after filesystem handling.

Issue:
- Unknown URLs will usually be served as HTTP 200 and then rendered as the client-side NotFound page.

Why it matters:
- Soft 404s weaken technical SEO and waste crawl budget.
- Search engines may treat these as valid pages longer than they should.

Priority: **High**

### 4) Blog and product social previews are not fully optimized

Evidence:
- `src/seo/Seo.tsx` defaults to `/og-default.jpg`.
- `src/pages/BlogPost.tsx` does not pass `imagePath`.
- `src/pages/VibeADE.tsx` and `src/pages/VibePricing.tsx` also do not pass custom social images.

Issue:
- Important pages share the same generic preview image.

Why it matters:
- Social CTR and link sharing suffer.
- GEO systems and social crawlers benefit from page-specific visuals and clearer content signals.

Priority: **Medium**

### 5) Structured data is present but minimal

What exists:
- Organization schema
- WebSite schema
- BlogPosting schema

What is missing:
- `sameAs` links for official social/profile identities
- `contactPoint`
- `BreadcrumbList`
- `SearchAction` on WebSite
- Product or SoftwareApplication schema for Vibe ADE pages
- FAQ schema for pages that visibly contain FAQs

Why it matters:
- GEO systems prefer explicit entity graphs and machine-readable page purpose.
- Rich results opportunities are limited by the current minimal schema.

Priority: **Medium**

### 6) GEO readiness is decent, but not yet strong

What helps today:
- Clear brand naming throughout the site
- Strong service and product positioning
- Blog content focused on AI/design topics
- A consistent metadata abstraction

What is still weak:
- Few explicit entity connections beyond the brand name
- No author bios or source attribution layer
- No quote-ready summaries, key takeaways, or “answer-first” blocks
- Limited content clustering between blog posts and service pages

Why it matters:
- AI search and generative answer engines prefer concise, attributable, structured content.
- The site is understandable, but not yet optimized for citation and extraction.

Priority: **Medium**

### 7) Internal linking can be stronger

Current state:
- Homepage links to Services, Blog, Contact, and Quan Bench.
- Blog post pages link back to Blog and to Services.

Gap:
- There is not yet a deliberate topic cluster structure.

Why it matters:
- Topic clusters improve crawl depth, semantic relevance, and topical authority.
- GEO systems use internal context to infer page relationships.

Priority: **Medium**

### 8) Performance is acceptable but not fully optimized for SEO

Observed from repo/build output:
- Main JS bundle is large.
- Fonts are loaded externally.
- Blog images are reasonably sized and some use lazy loading.

Why it matters:
- Performance affects LCP, interaction delay, and crawl efficiency.
- GEO systems do not reward slow, heavy pages.

Priority: **Low to Medium**

## Route Coverage Summary

### Public marketing pages with `Seo`
- `/`
- `/about`
- `/services`
- `/blog`
- `/blog/:slug`
- `/contact`
- `/quan-bench`
- `/products/vibe-ade`
- `/products/vibe-ade/pricing`
- `404` page

### Routes missing `Seo` / noindex handling
- `/auth`
- `/dashboard`
- `/checkout`
- `/payment-success`

## Priority Improvement Plan

### Phase 1: Indexing safety and technical cleanup

Goal: eliminate low-value indexing risk and soft 404s.

Tasks:
- Add `noindex, nofollow` to `Auth`, `Dashboard`, `Checkout`, and `PaymentSuccess`.
- Decide canonical host policy: apex vs www, HTTP -> HTTPS, trailing slash policy.
- Fix Vercel routing so unknown URLs return a true 404 instead of a soft 404.

Success criteria:
- Thin/auth routes do not appear in search index.
- Unknown routes return a real 404.
- Canonical URLs are consistent across the site.

### Phase 2: Social preview and schema expansion

Goal: improve rich results and link preview quality.

Tasks:
- Add per-page `imagePath` on blog posts and product pages.
- Expand Organization schema with `sameAs` and `contactPoint`.
- Add `BreadcrumbList` for blog posts and product pages.
- Add `SearchAction` to WebSite schema if site search exists or is added.
- Add `Product` or `SoftwareApplication` schema for Vibe ADE pages.
- Add `FAQPage` schema where FAQs are visibly present on the page.

Success criteria:
- Social shares use the right preview image for each key page.
- Rich Results Test shows richer entity data.
- Product pages are more machine-readable for AI search.

### Phase 3: GEO content structure

Goal: make the site easier for AI systems to understand and cite.

Tasks:
- Add “tl;dr” summaries near the top of key service and blog pages.
- Add author or team bios for content pages.
- Add explicit “key takeaways” blocks to blog posts.
- Create topic clusters:
  - Services <-> related blog posts
  - Blog posts <-> related services
  - Quan Bench <-> Vibe ADE <-> AI consulting content
- Add source or evidence references where claims are made.

Success criteria:
- Each important page has a clear entity, purpose, and summary.
- AI systems can extract a concise answer from each page.

### Phase 4: Performance tuning

Goal: reduce SEO-adjacent UX costs.

Tasks:
- Split large bundles where practical.
- Consider self-hosted fonts or stronger font-loading optimization.
- Keep image optimization and lazy loading standards consistent.

Success criteria:
- Better LCP and reduced JS weight on key routes.

## File-Level Recommendations

- `index.html`: keep the global Google tag here only; do not duplicate it in page components.
- `src/seo/Seo.tsx`: add optional `imagePath` usage on more routes and keep the shared meta abstraction.
- `src/seo/schema.ts`: expand the entity graph and add breadcrumb/product helpers.
- `src/pages/BlogPost.tsx`: pass a post-specific social image and consider richer article metadata.
- `src/pages/VibeADE.tsx` and `src/pages/VibePricing.tsx`: add product/software schema and page-specific preview images.
- `src/pages/Auth.tsx`, `src/pages/Dashboard.tsx`, `src/pages/Checkout.tsx`, `src/pages/PaymentSuccess.tsx`: add `noindex`.
- `vercel.json`: revisit routing so unknown URLs are true 404s.

## Bottom Line

The site is already past the “basic SEO exists” stage.
The next real gains are:
- protecting thin routes from indexing,
- fixing soft 404 behavior,
- strengthening schema and preview images,
- and turning the content into clearer entities with stronger internal links.
