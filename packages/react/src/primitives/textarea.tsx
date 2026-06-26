import * as React from 'react'
import type { AtelierRadius, AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Props for Textarea.
 */
export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  label?: string
  description?: string
  errorMessage?: string
  invalid?: boolean
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
  minRows?: number
  maxRows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

/**
 * Native textarea with label, description, validation messaging, and resize control.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    description,
    errorMessage,
    invalid = false,
    size = 'md',
    radius,
    fullWidth = true,
    minRows = 3,
    maxRows,
    resize = 'vertical',
    className,
    id,
    disabled,
    style,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const textareaId = id ?? generatedId
  const descriptionId = description ? `${textareaId}-description` : undefined
  const errorId = errorMessage ? `${textareaId}-error` : undefined

  return (
    <div className={cx('au-field', fullWidth && 'au-field--full-width')}>
      {label ? (
        <label className="au-label" htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={textareaId}
        className={cx('au-textarea', `au-textarea--${size}`, radius && `au-radius-${radius}`, className)}
        disabled={disabled}
        rows={minRows}
        style={{
          ...style,
          resize,
          maxHeight: maxRows ? `${maxRows * 1.5 + 1.5}em` : style?.maxHeight,
        }}
        data-invalid={dataBoolean(invalid)}
        data-disabled={dataBoolean(disabled)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        {...props}
      />
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
    </div>
  )
})
