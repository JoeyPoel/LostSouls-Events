import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ls-void-pure': 'var(--ls-color-void-pure)',
        'ls-void-abyss': 'var(--ls-color-void-abyss)',
        'ls-void-surface': 'var(--ls-color-void-surface)',
        'ls-void-elevated': 'var(--ls-color-void-elevated)',
        'ls-void-glass': 'var(--ls-color-void-glass)',

        'ls-blue-deepNavy': 'var(--ls-color-blue-deepNavy)',
        'ls-blue-cobalt': 'var(--ls-color-blue-cobalt)',
        'ls-blue-electric': 'var(--ls-color-blue-electric)',
        'ls-blue-laserCyan': 'var(--ls-color-blue-laserCyan)',
        'ls-blue-iceStrobe': 'var(--ls-color-blue-iceStrobe)',

        'ls-mono-pureWhite': 'var(--ls-color-mono-pureWhite)',
        'ls-mono-silver': 'var(--ls-color-mono-silver)',
        'ls-mono-muted': 'var(--ls-color-mono-muted)',
        'ls-mono-dark': 'var(--ls-color-mono-dark)',
        'ls-mono-hairline': 'var(--ls-color-mono-hairline)',

        'ls-state-soldOut': 'var(--ls-color-state-soldOut)',
        'ls-state-warning': 'var(--ls-color-state-warning)',
        'ls-state-live': 'var(--ls-color-state-live)',
      },
      boxShadow: {
        'laser-subtle': 'var(--ls-glow-laser-subtle)',
        'laser-intense': 'var(--ls-glow-laser-intense)',
        'white-strobe': 'var(--ls-glow-white-strobe)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Cabinet Grotesk"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
