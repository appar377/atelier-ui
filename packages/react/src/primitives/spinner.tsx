import * as React from 'react'
import type { AtelierIntent, AtelierSize } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Spinner.
 */
export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: AtelierSize
  intent?: AtelierIntent
  label?: string
}

/**
 * Inline loading spinner with status semantics.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', intent = 'primary', label = 'Loading', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('au-spinner', `au-spinner--${size}`, `au-spinner--${intent}`, className)}
      role="status"
      aria-label={label}
      {...props}
    />
  )
})
