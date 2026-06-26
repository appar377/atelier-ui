import * as React from 'react'
import type { AtelierRadius } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Card.
 */
export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'surface' | 'elevated' | 'outline' | 'soft'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: AtelierRadius
  interactive?: boolean
}

/**
 * Bordered content surface for repeated items and small grouped content.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'surface', padding = 'md', radius, interactive = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'au-card',
        `au-card--${variant}`,
        padding !== 'none' && `au-p-${padding}`,
        radius && `au-radius-${radius}`,
        interactive && 'au-card--interactive',
        className,
      )}
      data-interactive={interactive ? 'true' : undefined}
      {...props}
    />
  )
})
