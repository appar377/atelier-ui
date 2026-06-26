import * as React from 'react'
import type { AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Props for Radio.
 */
export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: Extract<AtelierSize, 'sm' | 'md' | 'lg'>
  fullWidth?: boolean
}

/**
 * Native radio input with shared field text, error, and description structure.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    errorMessage,
    invalid = false,
    size = 'md',
    fullWidth = false,
    className,
    id,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const radioId = id ?? generatedId
  const descriptionId = description ? `${radioId}-description` : undefined
  const errorId = errorMessage ? `${radioId}-error` : undefined
  const labelContent = label ?? children

  return (
    <label
      className={cx('au-choice', `au-choice--${size}`, fullWidth && 'au-choice--full-width', className)}
      htmlFor={radioId}
      data-disabled={dataBoolean(disabled)}
      data-invalid={dataBoolean(invalid)}
    >
      <input
        ref={ref}
        id={radioId}
        className="au-choice__input"
        type="radio"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        {...props}
      />
      <span className="au-choice__body">
        {labelContent ? <span className="au-choice__label">{labelContent}</span> : null}
        {description ? (
          <span id={descriptionId} className="au-description">
            {description}
          </span>
        ) : null}
        {errorMessage ? (
          <span id={errorId} className="au-error">
            {errorMessage}
          </span>
        ) : null}
      </span>
    </label>
  )
})
