# SEO Improvement Plan (Quansynd)

Target score: **8.5+/10**  
Scope: `Quansynd-Web/` (Vite + React + React Router)

## Phase 0 — Baseline (Day 0)
- Set up Google Search Console + Bing Webmaster Tools for `https://quansynd.com`
- Confirm canonical host policy (www vs non-www) and HTTPS-only
- Capture baseline:
  - Indexed pages count
  - Coverage issues
  - Core Web Vitals (field data)
  - Lighthouse for key routes: `/`, `/services`, `/blog`, `/blog/rise-of-agentic-ai`, `/contact`

## Phase 1 — Crawl & Metadata (Days 1–2)
- Add `public/sitemap.xml` and keep it updated as routes/posts change
- Update `public/robots.txt` to reference the sitemap
- Ensure per-route metadata:
  - `<title>`
  - `<meta name="description">`
  - `<link rel="canonical">`
  - OpenGraph + Twitter tags
- Add a proper social share image (1200×630) in `public/` and point OG/Twitter tags to it

Success criteria:
- `https://quansynd.com/sitemap.xml` accessible and submitted in Search Console
- Key routes show unique title/description in HTML after hydration

## Phase 2 — Structured Data (Days 2–4)
- Add JSON-LD:
  - `Organization` site-wide
  - `WebSite` site-wide (optional SearchAction)
  - `BlogPosting` on `/blog/:slug`
  - `BreadcrumbList` (optional)

Success criteria:
- Rich Results Test passes for blog posts (where applicable)

## Phase 3 — Rendering Strategy (Days 4–10, highest ROI)
Goal: deliver **indexable HTML per route** (not only after client JS runs).

Options (preferred first):
1. Add **SSG/prerender** for static routes + blog slugs (best for marketing sites).
2. Consider SSR only if routes must be fully dynamic at request-time.

Success criteria:
- Viewing page source for `/blog/:slug` contains the post title/description + canonical + OG tags

## Phase 4 — Performance / Core Web Vitals (Ongoing)
- Route-split heavy pages to reduce initial JS
- Fonts strategy: self-host or optimize loading (`font-display`, preload critical)
- Confirm images are optimized and not harming LCP/CLS

Success criteria:
- CWV “Good” for LCP/CLS/INP on key pages in Search Console

## Phase 5 — Content & Internal Linking (Ongoing)
- Build “topic clusters”:
  - Services ↔ related blog posts
  - Blog posts ↔ related services/CTAs
- Add FAQ blocks on services where relevant (optional FAQ schema if content truly Q/A)
- Maintain an editorial calendar based on Search Console queries + competitor gaps

