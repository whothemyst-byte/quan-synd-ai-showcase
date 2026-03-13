# Quansynd New Theme

## Quan Bench Design Foundation

### Color Palette (Light)

Core tokens:
- `--ink: #0e0e0b`
- `--paper: #f5f0e8`
- `--amber: #c8882a`
- `--amber-dim: #7a4f10`
- `--cream: #ede7d9`
- `--muted: #8a8070`
- `--rule: rgba(14,14,11,0.1)`
- `--card-bg: #faf7f2`

Tier accents:
- Tier I (Frontier): `#c8882a`
- Tier II (Capable): `#5a7a3a`
- Tier III (Efficient): `#3a6a8a`

### Typography

Font families:
- `Instrument Serif` (400, italic support): hero headlines, section display, high-impact numeric emphasis
- `Geist` (300/400/500/600): body copy, descriptive text, primary UI readability layer
- `Geist Mono` (300/400/500): labels, metadata, chips, controls, data surfaces

Google Fonts URL:
`https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@300;400;500&family=Geist:wght@300;400;500;600&display=swap`

### Design Theory

- Editorial-data hybrid: serif provides authority and brand character, mono gives analytical precision, sans maintains readability.
- Warm neutrality: off-white foundation avoids sterile UI while preserving contrast for data-heavy views.
- Signal hierarchy: amber acts as a deliberate callout color instead of broad saturation.
- Compositional discipline: thin dividers, compact spacing, restrained motion, and strong grid rhythm improve scanability.
- Trust-forward interaction: states are explicit, reversible, and minimal; visuals support evaluation clarity over decoration.

## Dark Theme Plan (Same System)

### Color Tokens (Dark)

Proposed dark equivalents:
- `--ink: #f3eee5` (primary text in dark mode)
- `--paper: #12110f` (main background)
- `--cream: #1a1815` (secondary background strips)
- `--card-bg: #161411` (cards, inputs, elevated surfaces)
- `--muted: #b1a692` (secondary text)
- `--rule: rgba(243,238,229,0.14)` (borders/dividers)
- `--amber: #d79a3d` (accent, lifted for dark contrast)
- `--amber-dim: #b8802b` (secondary accent)

Dark tier accents:
- Tier I (Frontier): `#d79a3d`
- Tier II (Capable): `#7fa55a`
- Tier III (Efficient): `#5d8fb3`

### Implementation Plan

1. Make all visual components token-driven (`background`, `foreground`, `border`, `muted`, `accent`) with no hardcoded per-page palette values.
2. Add dark overrides at root (`.dark`) only; keep component class names and logic unchanged.
3. Re-tune chart labels, borders, and metadata contrast in dark mode to ensure legibility on low-luminance surfaces.
4. Keep typography roles identical between themes; only adjust color and elevation.
5. Validate WCAG contrast on body text, controls, badges, and table metadata.
6. Keep behavior parity: no route/data/content changes and no structural page rewrites.
