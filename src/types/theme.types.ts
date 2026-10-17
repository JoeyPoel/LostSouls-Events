import type { THEME } from '@/config/theme';

export type AppTheme = typeof THEME;
export type ColorVoid = keyof typeof THEME.colors.void;
export type ColorBlue = keyof typeof THEME.colors.blue;
export type ColorMono = keyof typeof THEME.colors.monochrome;
export type ColorState = keyof typeof THEME.colors.state;
export type GlowVariant = keyof typeof THEME.glows;
export type BorderVariant = keyof typeof THEME.borders;
