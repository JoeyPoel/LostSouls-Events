---
trigger: always_on
---

```markdown
---
name: lost-souls-techno-agent-skill
description: Aesthetic, design system, and UX direction skill for "Lost Souls" underground techno events. Translates the signature dark club atmosphere—deep obsidian black, piercing cobalt and cyan volumetric lasers, stark white typography, and raw warehouse energy—into flexible digital experiences without locking in rigid layouts prematurely.
---

# Lost Souls — Underground Techno Experience & Design Skill

## 1. Aesthetic DNA: The Club Atmosphere

The Lost Souls digital identity draws directly from the visual culture of the underground European dancefloor[cite: 1, 5, 21]. The site acts as an atmospheric digital extension of the physical space rather than a generic ticketing portal.

### Core Visual Dynamics
- **The Absolute Void (80%)**: The canvas remains total, pitch-black darkness (`#000000` to `#020408`)[cite: 19, 21]. Structural surfaces evoke dark industrial concrete, cold steel, and unlit basement tunnels[cite: 16, 21].
- **Volumetric Blue Luminescence (15%)**: Blue functions strictly as light[cite: 21]. It behaves like high-powered stage lasers cutting through dense haze, linear ceiling light rigs, and cold cobalt backlights casting sharp silhouettes across the crowd[cite: 20, 21].
- **Stark White Pulse (5%)**: High-contrast, clinical white (`#FFFFFF`) represents the strobe flash, providing immediate clarity for headliners, dates, and essential entry actions[cite: 1, 19, 21].
- **Authentic Underground Grit**: High-contrast grain, harsh camera flash, motion blur, and cold monochrome black-and-white photography balance out saturated blue laser exposures[cite: 21].

---

## 2. Color Palette & Lighting Hierarchy

Treat the viewport like a light-controlled stage environment:

```css
:root {
  /* Physical Space / Void */
  --ls-void: #000000;              /* Base canvas */
  --ls-abyss: #030712;             /* Deep panel & card depth */
  --ls-fog: rgba(6, 18, 38, 0.6);  /* Semi-transparent blur overlay */

  /* Blue Spectrum (Lighting & Energy) */
  --ls-blue-cobalt: #0044ff;       /* Floodlight & primary button core */
  --ls-blue-electric: #0077ff;     /* Active borders, badges, line accents */
  --ls-blue-cyan: #00e5ff;         /* Laser core, hover glows, highlight text */
  --ls-blue-ice: #e0f7ff;          /* High-intensity strobe reflection */

  /* Monochromes & Text */
  --ls-white-pure: #ffffff;        /* Primary typography & countdown numbers */
  --ls-silver-dim: #94a3b8;        /* Subheaders & secondary body copy */
  --ls-slate-dark: #334155;        /* Muted metadata & sold-out states */

  /* Laser Glow Effects */
  --glow-laser-subtle: 0 0 20px rgba(0, 119, 255, 0.35);
  --glow-laser-sharp: 0 0 25px rgba(0, 229, 255, 0.7), 0 0 60px rgba(0, 68, 255, 0.3);
  --glow-white-strobe: 0 0 15px rgba(255, 255, 255, 0.8);
}

```

---

## 3. Visual Language Derived from Social Feeds

Card interfaces, banners, and media frames draw from established social feed aesthetics:

1. **Laser-Fan & Ceiling Rig Geometry**:
* Use subtle SVG or CSS line-arrays mimicking overhead V-shaped or linear light truss rigs cutting through fog.


* Cards incorporate soft radial blue gradients (`radial-gradient(circle at top, rgba(0,119,255,0.2) 0%, transparent 70%)`).




2. **Technical Telemetry & Status Badges**:
* High-contrast wireframe badges (such as `[ 92% SOLD OUT ]` styled in glowing cyan hairlines).


* Monospaced timestamp stamps: `05-09-2026 // 23:00–06:00`.


* Bulleted industrial info ledgers for house protocols and gate info.




3. **Cyber-Tribal & Liquid Accents**:
* Graphics can feature liquid-chrome, jagged tribal, or metallic typography for special event editions and merch capsules.




4. **Photography Curation**:
* Wide stage laser arrays piercing the dark.


* Backlit crowd silhouettes and raised hands.


* Cold direct-flash portraits of artists in dark attire.





---

## 4. Typographic Spectrum (Modular Directions)

*Rather than locking into a single font, explore three primary archetypes:*

### Archetype A: The Dark Ritual / Editorial Heavy

Inspiration: Inferi ("THROUGH HELL", "MAIN STAGE")

* **Headings**: Dramatic, high-contrast, razor-sharp serif or slab (e.g., Cinzel, Playfair Display SC, Fraunces).
* **Supporting**: Clean monospaced technical labels (JetBrains Mono, Space Mono).
* **Atmosphere**: Imposing, monumental, ritualistic, underground.

### Archetype B: The Cyber-Industrial / Rave Brutalism

Inspiration: Nooduitgang & Dark Session

* **Headings**: Ultra-wide, geometric, heavy cyber-sans or futuristic block type (e.g., Syne, Druk Wide, Monument Extended).
* **Supporting**: Compressed sans-serif for secondary hierarchy.
* **Atmosphere**: High-BPM, mechanical, energized.

### Archetype C: The Technical Swiss / Minimalist Warehouse

Inspiration: De Interventie ("THE MOMENT CHANGE BEGINS")

* **Headings**: Neutral, ultra-clean grotesque sans-serif with tight tracking (e.g., Inter, PP Neue Haas Grotesk, Cabinet Grotesk).
* **Supporting**: Monospaced status bars, corner viewport brackets (`┌`, `┘`).
* **Atmosphere**: Clinical, curated, sleek, contemporary European warehouse.

---

## 5. UI Architecture & Functional Modules

### Module 1: The Monolithic Hero

* **Variant A (Atmospheric Video/Laser Canvas)**: Full-bleed viewport dominated by slow-moving volumetric teal/blue lasers cutting through fog, centered with the event headline, date metadata, and a luminous ticket CTA.


* **Variant B (Full-Bleed Giant Headline)**: Monolithic typography stretched across the entire screen width, with imagery or video moving behind the lettering.


* **Variant C (HUD-Bracketed Focal Point)**: Top-bar and bottom-bar telemetry markers with subtle ambient blue glow, accompanied by an audio teaser player trigger (`▶ Feel The Resonance`).



### Module 2: The Split Event & Ticketing Engine

* **Left Column**: Event artwork/poster preview with phase badge (`[UPCOMING EVENT]` or `[FINAL SOUL]`), venue coordinates (`Now & Wow, Rotterdam` / `Arzenál, Budapest`), and artist roster.


* **Right Column**:
* Live doors-opening countdown grid: 4 distinct dark cards (`[DAYS] [HOURS] [MIN] [SEC]`) outlined in faint blue wireframe.


* Multi-tiered ticket matrix showing progressive states: `Community Pass (Sold Out)`, `Early Soul (Sold Out)`, `Phase I (€28.00)`, `Final Soul (€34.00)`.


* Interactive counter (`[- 0 +]`) and radiant checkout button.





### Module 3: The Industrial Lineup Ledger

* Presentation of the artist lineup as a precision ledger:


* Numbered rows (`01`, `02`, `03`...).


* Artist names in heavy high-contrast type.


* Performance format tags aligned right: `(HYBRID LIVE)`, `(SPECIAL CLOSING)`, `(B2B)`, `(BOCHKA / INDUSTRIAL)`.


* Stage indicator badge: `■ MAIN STAGE // RAW TUNNEL`.





### Module 4: "Chapters" / Edition Chronology

* Horizontal timeline or carousel displaying previous and future editions (e.g., `Chapter 01: First Awakening`, `Chapter 02: Electric Abyss`, `Chapter 03: Through The Void`).


* Clean navigation arrows (`← / →`) and event poster thumbnails highlighting with a blue laser aura on hover.



### Module 5: Limited Capsule & Merch Drops

* Showcase exclusive apparel and club wear under headings like `SMALL RUNS.` or `COMMUNITY GEAR.`.


* 3-column vertical tall-cut showcase featuring raw product textures (heavyweight cotton, chrome liquid printing, metal accessories) with item names (`01 T-SHIRT`, `02 HOODIE`, `03 ACCESSORY`).



### Module 6: "Relive The Night" / Raw Gallery

* Asymmetrical 4-column or masonry gallery of portrait-ratio photos (9:16) capturing dancefloor energy: DJs in deep concentration, laser grids overhead, crowd solidarity, and strobed shadows.


* Monospaced timestamp tags under each frame (e.g., `14.11.2026 // NOW&WOW`).



### Module 7: Rave Etiquette & Protocol Accordions

* Industrial collapsible drawer system outlining:
* `Door Policy & Age Restriction (Strictly 18+)`

* `Dress Code & Individual Expression`

* `Restricted Camera Ethos` (Preserving dancefloor immersion)


* `Zero-Tolerance & Harm Reduction` (Awareness team info)





---

## 6. Atmosphere & Motion Guidelines

```css
/* Subtle Film Grain Noise Overlay */
.techno-grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='[http://www.w3.org/2000/svg'%3E%3Cfilter](http://www.w3.org/2000/svg'%3E%3Cfilter) id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Radiant Blue Laser Text & Button Glows */
.laser-glow-text {
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.6), 0 0 35px rgba(0, 85, 255, 0.4);
}

.laser-glow-button {
  background: #0055ff;
  color: #ffffff;
  box-shadow: 0 0 25px rgba(0, 85, 255, 0.45);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.laser-glow-button:hover {
  background: #00d4ff;
  color: #000000;
  box-shadow: 0 0 35px rgba(0, 212, 255, 0.8), 0 0 70px rgba(0, 85, 255, 0.4);
}

```

---

## 7. Agent Operational Protocol

When generating pages, features, or components for Lost Souls:

1. **Maintain Aesthetic Openness**: Present layout archetypes (Editorial Serif vs. Cyber-Industrial vs. Minimalist Swiss) and solicit stylistic preferences before finalizing full layouts.
2. **Preserve Contrast**: Maintain pitch-black depth while allowing cobalt and cyan glows to pierce through cleanly.


3. **Respect Content Order**: Prioritize headliners, event dates, venues, and ticket actions above secondary marketing copy.


4. **Deliver Modular Implementations**: Build independent, reusable components for line-ups, countdowns, ticket matrices, and gallery grids.

```

```