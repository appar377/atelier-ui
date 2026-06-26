import * as React from 'react'
import type { AtelierRadius, AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Props for Input.
 */
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  description?: string
  errorMessage?: string
  invalid?: boolean
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
}

/**
 * Native text input with label, description, and validation messaging.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    description,
    errorMessage,
    invalid = false,
    size = 'md',
    radius,
    fullWidth = true,
    className,
    id,
    disabled,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = errorMessage ? `${inputId}-error` : undefined

  return (
    <div className={cx('au-field', fullWidth && 'au-field--full-width')}>
      {label ? (
        <label className="au-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        className={cx('au-input', `au-input--${size}`, radius && `au-radius-${radius}`, className)}
        disabled={disabled}
        data-invalid={dataBoolean(invalid)}
        data-disabled={dataBoolean(disabled)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        {...props}
      />
      {description ? <span id={descriptionId} className="au-description">{description}</span> : null}
      {errorMessage ? <span id={errorId} className="au-error">{errorMessage}</span> : null}
    </div>
  )
})
