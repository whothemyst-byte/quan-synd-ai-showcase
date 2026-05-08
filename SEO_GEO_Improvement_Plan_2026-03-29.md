# QuanSynd SEO and GEO Improvement Plan

Date: 2026-03-29

Goal:
- Fix the indexability gaps
- Strengthen GEO readiness
- Improve topical authority and internal linking
- Keep the site maintainable as new pages are added

## Phase 0 - Immediate Fixes

### 1. Add the missing product routes to sitemap and prerender

Tasks:
- Add `/products/vibe-ade`
- Add `/products/vibe-ade/pricing`
- Regenerate `public/sitemap.xml`
- Rebuild prerendered HTML

Why this matters:
- These pages are public, have SEO metadata, and should be indexable.
- They are currently omitted from the route list that powers sitemap and prerender output.

Success criteria:
- Both product URLs appear in `public/sitemap.xml`
- Both URLs are present in prerender output
- Source for both pages contains title, description, canonical, and OG tags

### 2. Add explicit `noindex` to non-marketing routes

Targets:
- `/auth`
- `/dashboard`
- `/checkout`
- `/payment-success`

Tasks:
- Add `Seo` with `noIndex` to those pages, or apply equivalent noindex headers.

Why this matters:
- These routes should not compete in search results.
- It is better to state that intention explicitly than to rely on obscurity.

Success criteria:
- Page source includes `noindex, nofollow`
- These routes stay out of the sitemap

### 3. Define a hard 404 policy

Tasks:
- Decide whether unknown routes should return a real 404 status.
- Adjust Vercel routing or edge behavior to match that policy.

Why this matters:
- A catch-all SPA rewrite can create soft 404s.

Success criteria:
- Non-existent URLs return 404, not a soft 200

## Phase 1 - Metadata and Structured Data

### 1. Expand site-wide organization schema

Tasks:
- Add `sameAs`
- Add `contactPoint`
- Add a richer logo and entity details where available

Why this matters:
- GEO and AI search systems rely heavily on entity clarity.

### 2. Add page-specific schema

Targets:
- Home: `WebSite` plus optional `SearchAction`
- Services: `Service`
- Vibe ADE: `SoftwareApplication` or `Product`
- Pricing: `Offer` or `AggregateOffer` if appropriate
- Contact: `ContactPoint`
- Blog index: `CollectionPage` or `ItemList`
- Blog posts: richer `BlogPosting`
- Deep pages: `BreadcrumbList`

Why this matters:
- Structured data improves machine understanding and rich result eligibility.

Success criteria:
- Rich Results Test passes on key pages
- Schema validates cleanly in Search Console

### 3. Improve blog schema inputs

Tasks:
- Store ISO dates in the blog data
- Use the actual post image in `BlogPosting`
- Add `dateModified` if content changes

Why this matters:
- Better canonical signals and stronger excerpt/image matching for AI retrieval.

## Phase 2 - Content Architecture

### 1. Build topic clusters

Core clusters:
- AI consulting
- UI/UX design
- Agentic AI
- Vibe ADE product marketing
- Quan Bench benchmark content

Tasks:
- Add related links blocks
- Link blog posts to services and product pages
- Link service pages back to supporting articles

Why this matters:
- Internal linking is still one of the strongest authority signals you control.

Success criteria:
- Every major page links to at least 2 related pages
- Blog posts connect back to commercial pages

### 2. Add FAQ sections where the intent supports it

Targets:
- Services page
- Vibe ADE pricing page
- Contact page

Tasks:
- Add compact FAQ sections with real questions and answers
- Only use `FAQPage` schema when the content is actually question-answer formatted

Why this matters:
- Helps both SEO and GEO because it captures direct answer intent.

## Phase 3 - GEO / AI Search Readiness

### 1. Add an AI-facing summary page or file

Options:
- `llms.txt`
- `ai.txt`
- A concise `/about` or `/services` summary section optimized for retrieval

Tasks:
- Provide a short, canonical summary of who the company is, what it sells, and the primary URLs

Why this matters:
- It can improve how LLMs and answer engines extract the site identity and offerings.

### 2. Strengthen entity consistency

Tasks:
- Use the same company name everywhere
- Use the same product name everywhere
- Keep Scube relationship phrased consistently

Why this matters:
- GEO systems do better with clean, repeated entity signals.

### 3. Add citation-friendly facts

Tasks:
- Put short factual statements near the top of key pages
- Keep service descriptions concrete and scannable
- Avoid overly vague marketing language in the first screen

Why this matters:
- LLMs prefer concise, attributable facts.

## Phase 4 - Measurement and Maintenance

### 1. Search Console and Bing setup

Tasks:
- Verify the property
- Submit the sitemap
- Watch indexing, coverage, and rich result status

### 2. Performance validation

Tasks:
- Run Lighthouse on:
  - `/`
  - `/services`
  - `/blog`
  - `/blog/rise-of-agentic-ai`
  - `/products/vibe-ade`
  - `/products/vibe-ade/pricing`

Why this matters:
- SEO improvements should not create hidden performance regressions.

### 3. Route list governance

Tasks:
- Treat `scripts/seo-routes.mjs` as a release-critical file
- Update it whenever a public indexable route is added

Why this matters:
- It is currently the source of truth for sitemap and prerender.

## Suggested Execution Order

1. Add missing product routes to sitemap and prerender.
2. Add explicit noindex to auth and transactional routes.
3. Fix the 404 behavior policy.
4. Expand schema for products, services, and breadcrumbs.
5. Add internal links and FAQ content.
6. Add GEO-specific summary assets and entity polish.
7. Validate with Search Console and Lighthouse.

## Definition of Done

The site is in a good state when:
- All public marketing pages are in the sitemap
- All public marketing pages are prerendered
- Non-marketing routes are explicitly noindexed
- Schema covers organization, services, products, blog posts, and breadcrumbs
- Internal links connect the site into topical clusters
- Search Console shows clean coverage
- The site has a concise AI-readable summary for GEO
