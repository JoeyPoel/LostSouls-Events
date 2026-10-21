---
trigger: always_on
---

# Lost Souls — Clean Techno Experience & Design Rules

## 1. Aesthetic DNA: Clean Underground Techno (No Matrix)

The Lost Souls digital identity reflects the refined, atmospheric visual culture of high-end European underground techno (Berghain, Awakenings, Printworks).

- **The Absolute Void**: Total, pitch-black darkness (`#000000`). Structural surfaces evoke dark glass with subtle blur, not flat grey boxes.
- **Volumetric Blue Luminescence**: Harmonized directly with the Halftone Bloom WebGL2 canvas (Laser Cyan `#008cffff`, Electric Blue `#0077FF`, Cobalt `#0044ffcb`, Deep Navy `#08142c`, and Ice Strobe `#E0F7FF`).
- **Very Clean, No Harsh Lines**:
  - No 100vw full-width horizontal dividing lines slicing across sections (`border-y` or `border-b` across the viewport).
  - No spreadsheet grid lines (`divide-y divide-white`).
  - No harsh borders slicing inside cards between photos and text.
  - Soft, fading hairlines (`rgba(255, 255, 255, 0.08)`) with raw, sharp architectural monolithic glass slabs (`rounded-none`).
- **Never Look Like The Matrix**:
  - No ASCII or square terminal bullets (`■`). Use round dots (`rounded-full`).
  - No brackets enclosing badges (never write `[ 92% SOLD OUT ]`; use clean `rounded-full` pill badges).
  - No corner spikes or terminal brackets (`┌`, `┘`).
  - No command-line double-slash syntax (`//`). Use clean bullet dots (`•`).
  - No military radar crosshair targeting reticles. Use clean modern arrows (`→`).
  - No raw monospace for long-form text, descriptions, or rules. Use `Inter` modern sans-serif.

---

## 2. Color Palette & Lighting Hierarchy

All styling is strictly governed by `src/config/theme.ts`:

- `void.pure`: `#000000`
- `void.abyss`: `#020611`
- `void.surface`: `#050e20`
- `blue.deepNavy`: `#08142c`
- `blue.cobalt`: `#0044ffcb`
- `blue.electric`: `#0077FF`
- `blue.laserCyan`: `#008cffff`
- `blue.iceStrobe`: `#E0F7FF`
- `monochrome.pureWhite`: `#ffffff`
- `monochrome.silver`: `#cbd5e1`
- `monochrome.muted`: `#64748b`
- `monochrome.hairline`: `rgba(255, 255, 255, 0.08)`

---

## 3. Typography Rules

1. **Brand Name**:
   - Always spell with the Scandinavian slashed Ø: **`LØST SØULS`**.
   - Use `font-editorial` (`Playfair Display`, `Georgia`), bold, tracking `0.14em` to `0.2em`.
   - Apply `.laser-glow-text` for glowing title treatments.
   - At the bottom of the footer, the brand text is **`LØST SØULS`** in editorial serif.

2. **Headings**:
   - Use `font-editorial` uppercase with high contrast.

3. **Body Text, Rules & Descriptions**:
   - Use clean, modern sans-serif (`font-sans` / `Inter`). Never use raw monospace for readable paragraphs.

4. **Telemetry & Counters**:
   - Reserve `font-mono` exclusively for numbers, dates, times, and coordinates (`14.11.2026`, `23:00—07:00`).

---

## 4. Component Patterns

- **Buttons (`GlowButton`)**: Always `rounded-full` pills. Primary buttons use the electric-to-cyan gradient with black typography (`from-ls-blue-electric via-ls-blue-laserCyan to-ls-blue-electric text-ls-void-pure font-bold shadow-[0_0_20px_rgba(0,140,255,0.45)] hover:shadow-[0_0_35px_rgba(0,140,255,0.75)]`).
- **Cards & Sections**: Raw, sharp monolithic glass panels (`rounded-none`, `bg-ls-void-abyss/60 border border-ls-mono-hairline/60 backdrop-blur-sm shadow-laser-subtle`).
- **Inner Units & Inputs**: Raw, sharp units (`rounded-none` with soft translucent border `border-white/[0.05]`).
- **Badges (`WireBadge`)**: Pill tags with `rounded-full px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em]`.
- **Lists / Rosters**: Floating raw hover cards (`rounded-none`) with `space-y-2.5` spacing. Never `divide-y`.