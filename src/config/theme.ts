/**
 * Lost Souls Centralized Design Tokens & Theme Configuration
 * SINGLE SOURCE OF TRUTH: All colors, glows, borders, and visual metrics originate here.
 * Harmonized with the Halftone Bloom spectrum: Laser Cyan highlights, Cerulean flow, and Cobalt depth.
 */

export const THEME = {
  colors: {
    void: {
      pure: '#000000',
      abyss: '#020611',
      surface: '#050e20',
      elevated: '#081630',
      glass: 'rgba(2, 6, 17, 0.9)',
    },
    blue: {
      deepNavy: '#08142c',
      cobalt: '#0044ffcb',       // Floodlight core & button core
      electric: '#0077FF',     // Active wireframes, badges, line accents
      laserCyan: '#008cffff',    // Laser core, hover glows, highlight text
      iceStrobe: '#E0F7FF',    // High-intensity strobe reflection
    },
    monochrome: {
      pureWhite: '#ffffff',
      silver: '#cbd5e1',
      muted: '#64748b',
      dark: '#1e293b',
      hairline: 'rgba(255, 255, 255, 0.08)',
    },
    state: {
      soldOut: '#334155',
      warning: '#f59e0b',
      live: '#008cffff',
    },
  },
  glows: {
    laserSubtle: '0 0 16px rgba(0, 140, 255, 0.4)',
    laserIntense: '0 0 25px rgba(0, 140, 255, 0.8), 0 0 60px rgba(0, 68, 255, 0.45)',
    whiteStrobe: '0 0 18px rgba(224, 247, 255, 0.9)',
  },
  borders: {
    subtle: '1px solid rgba(0, 140, 255, 0.25)',
    cyanLaser: '1px solid rgba(0, 140, 255, 0.6)',
    active: '1px solid #008cffff',
  },
} as const;

export type Theme = typeof THEME;

/**
 * Returns CSS variable map for injection into :root styles.
 */
export const CSS_VARIABLES = {
  '--ls-color-void-pure': THEME.colors.void.pure,
  '--ls-color-void-abyss': THEME.colors.void.abyss,
  '--ls-color-void-surface': THEME.colors.void.surface,
  '--ls-color-void-elevated': THEME.colors.void.elevated,
  '--ls-color-void-glass': THEME.colors.void.glass,

  '--ls-color-blue-deepNavy': THEME.colors.blue.deepNavy,
  '--ls-color-blue-cobalt': THEME.colors.blue.cobalt,
  '--ls-color-blue-electric': THEME.colors.blue.electric,
  '--ls-color-blue-laserCyan': THEME.colors.blue.laserCyan,
  '--ls-color-blue-iceStrobe': THEME.colors.blue.iceStrobe,

  '--ls-color-mono-pureWhite': THEME.colors.monochrome.pureWhite,
  '--ls-color-mono-silver': THEME.colors.monochrome.silver,
  '--ls-color-mono-muted': THEME.colors.monochrome.muted,
  '--ls-color-mono-dark': THEME.colors.monochrome.dark,
  '--ls-color-mono-hairline': THEME.colors.monochrome.hairline,

  '--ls-color-state-soldOut': THEME.colors.state.soldOut,
  '--ls-color-state-warning': THEME.colors.state.warning,
  '--ls-color-state-live': THEME.colors.state.live,

  '--ls-glow-laser-subtle': THEME.glows.laserSubtle,
  '--ls-glow-laser-intense': THEME.glows.laserIntense,
  '--ls-glow-white-strobe': THEME.glows.whiteStrobe,

  '--ls-border-subtle': THEME.borders.subtle,
  '--ls-border-cyan-laser': THEME.borders.cyanLaser,
  '--ls-border-active': THEME.borders.active,
} as const;
