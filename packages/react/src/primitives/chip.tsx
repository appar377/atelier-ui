import * as React from 'react'
import type { AtelierIntent } from '../core/types'
import { cx, dataBoolean } from '../core/types'

/**
 * Props for Chip.
 */
export type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'solid' | 'soft' | 'outline'
  intent?: AtelierIntent
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
  onDismiss?: () => void
  dismissLabel?: string
}

/**
 * Compact removable or selectable label.
 */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    variant = 'soft',
    intent = 'neutral',
    size = 'md',
    selected = false,
    onDismiss,
    dismissLabel = 'Remove',
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('au-chip', `au-chip--${variant}`, `au-chip--${intent}`, `au-chip--${size}`, className)}
      data-selected={dataBoolean(selected)}
      {...props}
    >
      <span>{children}</span>
      {onDismiss ? (
        <button className="au-chip__dismiss" type="button" aria-label={dismissLabel} onClick={onDismiss}>
          x
        </button>
      ) : null}
    </span>
  )
})
