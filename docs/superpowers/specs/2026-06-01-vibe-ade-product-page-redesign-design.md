# Vibe ADE Product Page Redesign — Design Spec

**Date:** 2026-06-01
**Surface:** `/products/vibe-ade` (`src/pages/VibeADE.tsx`) + footer socials (`src/components/Footer.tsx`)

## Problem

The existing Vibe ADE product page read as generic and flat — a stacked list of
feature cards with a centred hero and no real product feel. The page did not
communicate that Vibe ADE is a *native Windows agentic development environment*
with a distinct, premium identity.

## Style decision

**Keep the existing live-site visual language.** Do not adopt a new design
system. The page must stay consistent with the rest of quansynd.com:

- **Fonts:** Instrument Serif (headlines, italic emphasis), Geist (body), Geist Mono (labels).
- **Palette (tokens in `src/index.css :root`):** `--ink #0e0e0b`, `--paper #f5f0e8`,
  `--amber #c8882a`, `--amber-dim #7a4f10`, `--cream #ede7d9`, `--muted-ui #8a8070`,
  `--rule rgba(14,14,11,.1)`.
- **Reusable classes:** `amber-btn`, `outline-ink-btn`, `dot-grid-bg`, `hero-section`,
  `ink-section`, `cream-section`, `editorial-card`, `amber-label`, `section-rule`,
  `qb-live-pill`, `release-notes-*`.

`Marketing/design` (quansynd-design-system) is used only as a *voice/palette
reference*, not as the implementation source.

## Page structure (top → bottom)

1. **Hero** — asymmetric two-column (`.vibe-hero-grid`). Left: eyebrow, serif
   headline ("The agentic development environment for *Windows.*"), subcopy, two
   CTAs (Download Free / Release Notes), meta line. Right: a dark **app-window
   mock** (`.vibe-app-mock`) with titlebar tabs (environment / **swarm** / wall),
   an icon rail, a live terminal pane, and a task board.
2. **Stat band** (`.vibe-statband`) — `16 panes · 4 agent roles · 3 workspace modes ·
   100% local execution · Windows-native`.
3. **ADE thesis** (`.vibe-thesis`, ink/cream split) — left dark "Not an IDE. An ADE.";
   right cream "Core capabilities" with ✶ bullets (incl. *Workspace modes —
   Environment, Swarm and Wall*).
4. **Feature pillars** (`.vibe-pillar`, alternating `.reverse`) — four pillars:
   Orchestration (Cpu), Workspaces (LayoutDashboard), Terminal & browser
   (Terminal), Reliability & sync (RefreshCw). Each: numbered label, serif
   heading, body, three ✶ sub-features, and a tinted icon visual.
5. **Workspace modes** (`.vibe-modes-grid`) — three numbered `editorial-card`s:
   **Environment**, **Swarm**, **Wall**.
6. **Vibe pet callout** (cream) — Ghost icon in a circle + "Meet the Vibe":
   the draggable mascot that floats on the workspace, toggleable in Settings.
7. **CTA** (ink) — download + release notes.
8. **Quan Bench band** + release-notes modal + Footer (carried over).

## Feature → pillar mapping

All features previously listed as flat cards are folded into the four pillars or
the capabilities list: agent roles, file ownership, blocker detection
(Orchestration); workspace modes, layout presets, templates (Workspaces); PTY
terminals, browser panes, command safety (Terminal & browser); cloud sync, crash
recovery, auto-updates (Reliability & sync).

## Workspace modes (user-facing names)

**Environment, Swarm, Wall.** (Internal type remains `'space' | 'swarm' | 'canvas'`,
but the product surfaces these three names.)

## Footer socials

Replace LinkedIn/Twitter/GitHub placeholders with live links, opening in a new tab:

- Instagram → `https://www.instagram.com/quansynd/`
- YouTube → `https://www.youtube.com/@Quansynd`
- X → `https://x.com/Quansyndai` (uses the lucide **Twitter** icon — that glyph *is*
  the recognised mark for X).

## Sticky nav fix

The topbar (`.qs-launch-strip`) and `<nav>` are already `position: fixed`. They
stopped sticking because the ancestor `.qs-route-shell` had `will-change: opacity,
transform` — `transform` in `will-change` creates a containing block that breaks
`position: fixed` on descendants. Fix: `will-change: opacity` only.

## CSS added

A `.vibe-*` block appended to `src/index.css` (hero grid, app mock, stat band,
thesis split, pillars, modes grid) with a `@media (max-width: 900px)` collapse to
single column.

## Out of scope

- No pricing page changes.
- No real product screenshots (stylised mock only).
- No typing/marquee animation (explicitly rejected by the user).

## Success criteria

- `npx tsc -p tsconfig.app.json --noEmit` produces no *new* errors beyond the 4
  pre-existing (cloudDashboard.ts, entry-server.tsx, Dashboard.tsx).
- `npm run build` succeeds.
- Topbar + navbar stay fixed on scroll.
- Modes read Environment / Swarm / Wall (no Space/Canvas).
- Vibe pet section renders.
- Footer socials point to the three live URLs and open in a new tab.
- Mobile (≤900px) collapses to a single column.
