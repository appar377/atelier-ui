import * as React from 'react'
import type { AtelierIntent, AtelierRadius, AtelierSize, AtelierVariant } from '../core/types'
import { cx, dataBoolean } from '../core/types'

/**
 * Props for Button.
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: AtelierVariant
  intent?: AtelierIntent
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

/**
 * Native button wrapper that maps Atelier variant, intent, size, and state to CSS classes.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    intent = 'primary',
    size = 'md',
    radius,
    fullWidth = false,
    loading = false,
    disabled,
    startIcon,
    endIcon,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      className={cx(
        'au-btn',
        `au-btn--${variant}`,
        `au-btn--${intent}`,
        `au-btn--${size}`,
        radius && `au-radius-${radius}`,
        fullWidth && 'au-btn--full-width',
        className,
      )}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-loading={dataBoolean(loading)}
      data-disabled={dataBoolean(isDisabled)}
      {...props}
    >
      {loading ? (
        <span className={cx('au-spinner', `au-spinner--${size}`, `au-spinner--${intent}`)} aria-hidden="true" />
      ) : (
        startIcon
      )}
      <span>{children}</span>
      {endIcon}
    </button>
  )
})
