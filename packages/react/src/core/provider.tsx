import * as React from 'react'
import type { AtelierDensity, AtelierFontPreset, AtelierRadius, AtelierTheme } from '@appar/atelier-tokens'
import { cx } from './types'

/**
 * Props for the theme wrapper that applies Atelier data attributes to a subtree.
 */
export type AtelierProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Visual theme preset applied through CSS custom properties. */
  theme?: AtelierTheme
  /** Density preset controlling shared control heights. */
  density?: AtelierDensity
  /** Radius preset controlling default control/card rounding. */
  radius?: AtelierRadius
  /** Font family preset applied to the subtree. */
  fontPreset?: AtelierFontPreset
}

/**
 * Applies Atelier theme, density, radius, and font attributes to its children.
 */
export function AtelierProvider({
  theme = 'neutral',
  density = 'comfortable',
  radius = 'md',
  fontPreset = 'sans',
  className,
  children,
  ...props
}: AtelierProviderProps) {
  return (
    <div
      className={cx('au-theme', className)}
      data-au-theme={theme}
      data-au-density={density}
      data-au-radius={radius}
      data-au-font={fontPreset}
      {...props}
    >
      {children}
    </div>
  )
}
