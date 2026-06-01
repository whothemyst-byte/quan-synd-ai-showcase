# Vibe ADE Product Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to
> implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/products/vibe-ade` page in the existing live-site visual
language (Instrument Serif / Geist / amber editorial), fix the sticky nav, update
footer socials, and surface the correct workspace modes plus the Vibe pet feature.

**Architecture:** A single inline-styled React page component (`VibeADE.tsx`) backed
by a small `.vibe-*` CSS block in `index.css`. The release-notes modal, Quan Bench
band, and Footer are carried over unchanged.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, lucide-react.

---

### Task 1: Footer socials

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1:** Change the import to drop `Linkedin`/`Github`, add `Instagram`/`Youtube`:
  `import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";`
- [ ] **Step 2:** Replace the social array with Instagram/YouTube/X live links and add
  `target="_blank" rel="noopener noreferrer"` to the `<a>`.
- [ ] **Step 3:** Verify build still typechecks (no `Linkedin`/`Github` references remain).
- [ ] **Step 4:** Commit.

### Task 2: index.css — sticky-nav fix + vibe block

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1:** In `.qs-route-shell`, change `will-change: opacity, transform;` to
  `will-change: opacity;` with a comment explaining the containing-block gotcha.
- [ ] **Step 2:** Append the `.vibe-*` block (hero grid, app mock, stat band, thesis,
  pillars, modes grid) with the `@media (max-width: 900px)` collapse.
- [ ] **Step 3:** Commit.

### Task 3: VibeADE.tsx rebuild

**Files:**
- Rewrite: `src/pages/VibeADE.tsx`

- [ ] **Step 1:** Update imports to `ArrowRight, Download, FileText, Cpu, Terminal,
  RefreshCw, LayoutDashboard, Ghost`.
- [ ] **Step 2:** Define `stats`, `capabilities`, `pillars` (4), `modes`
  (Environment/Swarm/Wall), and the `TermLine` helper.
- [ ] **Step 3:** Build sections in order: Hero (asymmetric + app mock) → Stat band →
  ADE thesis → Feature pillars → Workspace modes → Vibe pet callout → CTA → release
  modal → Quan Bench band → Footer. Keep the release-notes modal logic verbatim.
- [ ] **Step 4:** `npx tsc -p tsconfig.app.json --noEmit` — no new errors beyond the
  4 pre-existing.
- [ ] **Step 5:** `npm run build` — succeeds.
- [ ] **Step 6:** Playwright check at desktop + mobile: sticky nav, modes, Vibe section.
- [ ] **Step 7:** Commit.

### Task 4: Repo hygiene

**Files:**
- Modify: `.gitignore`
- Create: spec + plan docs under `docs/superpowers/`

- [ ] **Step 1:** Add `.superpowers/` and `.playwright-mcp/` to `.gitignore`.
- [ ] **Step 2:** Commit docs + gitignore.
