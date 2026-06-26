import * as React from 'react'
import type { AtelierRadius, AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Select option item.
 */
export type SelectItem = {
  label: string
  value: string
  disabled?: boolean
}

/**
 * Props for Select.
 */
export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  label?: string
  description?: string
  errorMessage?: string
  invalid?: boolean
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
  items: SelectItem[]
  placeholder?: string
  onValueChange?: (value: string) => void
}

/**
 * Native select with label, description, validation messaging, and value callback.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    description,
    errorMessage,
    invalid = false,
    size = 'md',
    radius,
    fullWidth = true,
    items,
    placeholder,
    className,
    id,
    disabled,
    onChange,
    onValueChange,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const selectId = id ?? generatedId
  const descriptionId = description ? `${selectId}-description` : undefined
  const errorId = errorMessage ? `${selectId}-error` : undefined

  return (
    <div className={cx('au-field', fullWidth && 'au-field--full-width')}>
      {label ? (
        <label className="au-label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        className={cx('au-select', `au-select--${size}`, radius && `au-radius-${radius}`, className)}
        disabled={disabled}
        data-invalid={dataBoolean(invalid)}
        data-disabled={dataBoolean(disabled)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        onChange={(event) => {
          onChange?.(event)
          onValueChange?.(event.currentTarget.value)
        }}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </select>
      {description ? <span id={descriptionId} className="au-description">{description}</span> : null}
      {errorMessage ? <span id={errorId} className="au-error">{errorMessage}</span> : null}
    </div>
  )
})
