import * as React from 'react'
import type { AtelierIntent } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Badge.
 */
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'solid' | 'soft' | 'outline' | 'dot'
  intent?: AtelierIntent
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Compact status label with semantic intent styling.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'soft', intent = 'neutral', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('au-badge', `au-badge--${variant}`, `au-badge--${intent}`, `au-badge--${size}`, className)}
      {...props}
    >
      {variant === 'dot' ? <span className="au-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  )
})
