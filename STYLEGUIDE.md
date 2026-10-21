# Lost Souls — Design System & Style Specification

The Lost Souls digital identity embodies the high-end underground European techno experience (inspired by Berghain, Awakenings, and Printworks). It translates total pitch-black void darkness, volumetric cyan/cobalt Halftone Bloom luminescence, and dramatic editorial typography into a clean, modern digital interface.

> [!IMPORTANT]
> **Core Aesthetic Law: Very clean, no harsh lines, never look like The Matrix.**
> Avoid 90s cyberpunk terminals, green hacker text, CRT scanline grids, corner spikes, brackets `[ ]`, ASCII bullet blocks `■`, command-line `//` clutter, or spreadsheet table borders.

---

## 1. Color Palette (Harmonized with Halftone Bloom)

All colors are strictly centralized in `src/config/theme.ts`. Never hardcode raw hex values in `src/components/`.

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `void.pure` | `#000000` | Absolute backdrop canvas |
| `void.abyss` | `#020611` | Deep glass panel & card depth |
| `void.surface` | `#050e20` | Secondary card & modal background |
| `blue.deepNavy` | `#08142c` | Subterranean breathing haze base |
| `blue.cobalt` | `#0044ffcb` | Volumetric laser flood & button gradient core |
| `blue.electric` | `#0077FF` | Active line accents, button gradient start/end |
| `blue.laserCyan` | `#008cffff` | Luminescent highlights, laser core, hover glows |
| `blue.iceStrobe` | `#E0F7FF` | High-intensity strobe reflection & laser text |
| `monochrome.pureWhite` | `#ffffff` | Primary headings, active prices, emphasis |
| `monochrome.silver` | `#cbd5e1` | Secondary descriptions, subheaders |
| `monochrome.muted` | `#64748b` | Subtle metadata, timestamps |
| `monochrome.hairline` | `rgba(255, 255, 255, 0.08)` | Ultra-soft glass borders (never harsh neon lines) |

---

## 2. Typography Hierarchy

1. **Brand & Primary Titles**:
   - **Font**: Dramatic Editorial Serif (`Playfair Display`, `Georgia`, or `.font-editorial`).
   - **Styling**: Bold / Black weights, wide tracking (`tracking-[0.14em]` to `tracking-[0.2em]`), uppercase.
   - **Brand Glyph**: Always use slashed Scandinavian Ø: `LØST SØULS`.
   - **Lighting**: `.laser-glow-text` (`text-ls-blue-iceStrobe` with layered cyan/electric/cobalt text-shadow).

2. **Body Copy, Descriptions & Protocols**:
   - **Font**: Clean grotesque modern sans-serif (`Inter`, `sans-serif`).
   - **Styling**: Light to medium weights (`font-normal`), relaxed line-height, elegant tracking.
   - **Avoid**: Never use raw monospace for entire paragraphs or long-form descriptions.

3. **Telemetry, Timestamps & Coordinates**:
   - **Font**: Monospace (`JetBrains Mono`, `Space Mono`).
   - **Styling**: Reserved strictly for numeric values (`14.11.2026`, `23:00—07:00`, `NETHERLANDS`).
   - **Separators**: Always use elegant bullet dots `•`, never code-terminal slashes `//`.

---

## 3. UI Architecture & Component Guidelines

### Clean Buttons (`GlowButton.tsx`)
- **Silhouette**: Sleek `rounded-full` pill (never 45° polygon cuts or reticle corner spikes).
- **Primary**:
  ```tsx
  bg-gradient-to-r from-ls-blue-electric via-ls-blue-laserCyan to-ls-blue-electric text-ls-void-pure font-bold shadow-[0_0_20px_rgba(0,140,255,0.45)] hover:shadow-[0_0_35px_rgba(0,140,255,0.75)]
  ```
- **Secondary**:
  ```tsx
  bg-ls-void-abyss/80 text-ls-blue-iceStrobe border border-ls-mono-hairline hover:border-ls-blue-laserCyan hover:text-ls-blue-laserCyan hover:shadow-[0_0_20px_rgba(0,140,255,0.3)] backdrop-blur-sm
  ```

### Cards & Panels
- **Container**: Raw, sharp monolithic glass container (`rounded-none`) with `bg-ls-void-abyss/60 border border-ls-mono-hairline/60 backdrop-blur-sm shadow-laser-subtle`.
- **Inner Units**: Raw sharp units (`rounded-none`) with soft translucent border (`border-white/[0.05]`).
- **No Line Slicing**: Avoid placing harsh `border-t` or `border-b` lines between photos and text inside a card; let elements flow seamlessly.

### Lists & Rosters (`LineupLedger.tsx`)
- **No Spreadsheet Grids**: Avoid `divide-y` or `border-y` on tables.
- **Roster Items**: Wrapped in raw monolithic cards (`rounded-none bg-ls-void-abyss/40 border border-white/[0.04] hover:border-ls-blue-laserCyan/40 hover:bg-ls-void-abyss/80 transition-all duration-300`).

### Badges (`WireBadge.tsx`)
- **Format**: Pill-shaped `rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase`.
- **Syntax**: Pure text only (`92% SOLD OUT`), never enclosed in brackets `[ ]`.

### Section Breaks
- **No Full-Width Harsh Borders**: Never slice the screen with `border-y` or `border-b` across 100% viewport width.
- **Separation**: Generous whitespace (`py-20 sm:py-28`), or a gentle fading gradient line (`.soft-divider` with `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`).

### Waitlist Gateway (`WaitlistForm.tsx`)
- Ultra-minimalist borderless input with subtle permanent underline:
  `border-b border-ls-blue-laserCyan/30 hover:border-ls-blue-laserCyan/60 focus-within:border-ls-blue-laserCyan/90`.
- Submit icon: Minimalist clean right arrow `→`, never a radar crosshair targeting reticle.

### Footer
- Clean brand statement: `LØST SØULS` in editorial serif.
- Metadata: `NETHERLANDS • CHAPTER 01`.
- Clean dispatch input: Rounded-full pill input with standard email placeholder (`Enter your email address...`).
