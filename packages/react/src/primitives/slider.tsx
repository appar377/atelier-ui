import * as React from 'react'
import type { AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Props for Slider.
 */
export type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: Extract<AtelierSize, 'sm' | 'md' | 'lg'>
  showValue?: boolean
  formatValue?: (value: string | number | readonly string[]) => React.ReactNode
}

/**
 * Native range input with optional value display.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    label,
    description,
    errorMessage,
    invalid = false,
    size = 'md',
    showValue = false,
    formatValue,
    className,
    id,
    disabled,
    value,
    defaultValue,
    onChange,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const sliderId = id ?? generatedId
  const descriptionId = description ? `${sliderId}-description` : undefined
  const errorId = errorMessage ? `${sliderId}-error` : undefined
  const [currentValue, setCurrentValue] = React.useState<string | number | readonly string[]>(defaultValue ?? value ?? 0)
  const displayedValue = value ?? currentValue

  return (
    <div
      className={cx('au-slider', `au-slider--${size}`, className)}
      data-disabled={dataBoolean(disabled)}
      data-invalid={dataBoolean(invalid)}
    >
      {label || showValue ? (
        <span className="au-slider__header">
          {label ? (
            <label className="au-label" htmlFor={sliderId}>
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="au-slider__value">{formatValue ? formatValue(displayedValue) : displayedValue}</span>
          ) : null}
        </span>
      ) : null}
      <input
        ref={ref}
        id={sliderId}
        className="au-slider__input"
        type="range"
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        onChange={(event) => {
          setCurrentValue(event.currentTarget.value)
          onChange?.(event)
        }}
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
