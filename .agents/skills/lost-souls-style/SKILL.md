---
name: lost-souls-style
description: Design system, styling rules, and visual guidelines for the Lost Souls project. Enforces the clean, modern European techno aesthetic—pitch-black void, Halftone Bloom luminescence, editorial typography (LØST SØULS with slashed Ø), rounded pill buttons, and zero harsh lines or Matrix-like terminal artifacts.
---

# Lost Souls — Clean Techno Style & Design System Skill

This skill defines the definitive visual language, component patterns, and styling rules for all current and future development in the Lost Souls codebase.

## 1. Core Aesthetic Principles

- **The Absolute Void**: Deep black `#000000` canvas. Panels use subtle dark glass (`#020611` at 60–80% opacity with backdrop blur).
- **Halftone Bloom Lighting**: Organic cerulean, cobalt, and laser cyan luminescence. Blue behaves as light and energy, not flat color fills.
- **Very Clean, No Harsh Lines**:
  - Never use full-width 100vw horizontal lines (`border-y` or `border-b`) dividing sections.
  - Never use table spreadsheet grids (`divide-y divide-white`).
  - Never place harsh `border-t` dividers slicing across cards between imagery and text.
  - Cards use soft, fading hairlines (`rgba(255, 255, 255, 0.08)`) and rounded silhouettes (`rounded-3xl` for main cards, `rounded-2xl` for sub-units).
- **Never Look Like The Matrix**:
  - No ASCII or square terminal bullets (`■`). Use round dots (`rounded-full bg-ls-blue-laserCyan`).
  - No brackets enclosing badges (`[ 92% SOLD OUT ]` is forbidden; use `92% SOLD OUT` in a clean `rounded-full` pill).
  - No viewport corner spikes or terminal brackets (`┌`, `┘`).
  - No command-line double-slash syntax (`//`). Use clean bullet dots (`•`).
  - No military/sci-fi radar crosshair targeting reticles. Use clean modern arrows (`→`).
  - Never use raw monospace for entire paragraphs, descriptions, or protocols.

---

## 2. Color Palette & Semantic Tokens

All styling MUST use the centralized tokens from `src/config/theme.ts`. Never hardcode raw hex values in `src/components/`.

```ts
THEME.colors = {
  void: {
    pure: '#000000',          // Base viewport background
    abyss: '#020611',         // Card depth & blur panels
    surface: '#050e20',       // Secondary cards & modals
  },
  blue: {
    deepNavy: '#08142c',      // Ambient haze core
    cobalt: '#0044ffcb',      // Floodlight & button core base
    electric: '#0077FF',      // Button gradient start/end, active accents
    laserCyan: '#008cffff',   // Laser core, highlights, hover glows
    iceStrobe: '#E0F7FF',     // High-intensity strobe reflection & laser text
  },
  monochrome: {
    pureWhite: '#ffffff',     // Headings, active states
    silver: '#cbd5e1',        // Subheaders, readable copy
    muted: '#64748b',         // Dim metadata, timestamps
    hairline: 'rgba(255, 255, 255, 0.08)', // Ultra-soft borders
  },
};
```

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

### Buttons (`GlowButton`)
- Always use `rounded-full` pill silhouettes.
- Primary buttons use the electric-to-cyan gradient with black typography:
  `bg-gradient-to-r from-ls-blue-electric via-ls-blue-laserCyan to-ls-blue-electric text-ls-void-pure font-bold shadow-[0_0_20px_rgba(0,140,255,0.45)] hover:shadow-[0_0_35px_rgba(0,140,255,0.75)]`
- Secondary buttons use dark glass pills:
  `bg-ls-void-abyss/80 text-ls-blue-iceStrobe border border-ls-mono-hairline hover:border-ls-blue-laserCyan`

### Cards & Panels
- Outer chassis: `rounded-3xl bg-ls-void-abyss/60 border border-ls-mono-hairline/60 backdrop-blur-sm shadow-laser-subtle`.
- Inner units: `rounded-2xl bg-ls-void-pure/40 border border-white/[0.05]`.
- Content inside cards flows seamlessly without harsh internal divider lines.

### Badges (`WireBadge`)
- Modern pill tags: `inline-flex items-center px-3 py-1 rounded-full border text-[10px] sm:text-[11px] uppercase tracking-[0.2em]`.

### Rosters & Lists
- Format items as individual hoverable rounded cards (`rounded-2xl`) with `space-y-2.5` spacing.
- Avoid `divide-y` and `border-y` table fences.

---

## 5. Verification Protocol

Before finalizing any UI modification:
1. Run `npm test` to verify theme and strings invariants (including the zero hardcoded hex rule in `src/components/`).
2. Run `npx tsc --noEmit` to verify type safety.
3. Use the browser tool to capture screenshots and visually confirm that lines, curves, typography, and colors adhere strictly to this clean style.
