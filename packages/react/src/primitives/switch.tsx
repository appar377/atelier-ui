import * as React from 'react'
import type { AtelierSize } from '../core/types'
import { cx, dataBoolean, describedBy } from '../core/types'

/**
 * Props for Switch.
 */
export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'role'> & {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: Extract<AtelierSize, 'sm' | 'md' | 'lg'>
  fullWidth?: boolean
}

/**
 * Native checkbox rendered as a switch while preserving form behavior.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
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
    checked,
    defaultChecked,
    onChange,
    children,
    ...props
  },
  ref,
) {
  const generatedId = React.useId()
  const switchId = id ?? generatedId
  const descriptionId = description ? `${switchId}-description` : undefined
  const errorId = errorMessage ? `${switchId}-error` : undefined
  const labelContent = label ?? children
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked))
  const currentChecked = isControlled ? checked : uncontrolledChecked

  return (
    <label
      className={cx('au-switch', `au-switch--${size}`, fullWidth && 'au-switch--full-width', className)}
      htmlFor={switchId}
      data-state={currentChecked ? 'checked' : 'unchecked'}
      data-disabled={dataBoolean(disabled)}
      data-invalid={dataBoolean(invalid)}
    >
      <input
        ref={ref}
        id={switchId}
        className="au-switch__input"
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy(descriptionId, errorId)}
        onChange={(event) => {
          if (!isControlled) {
            setUncontrolledChecked(event.currentTarget.checked)
          }
          onChange?.(event)
        }}
        {...props}
      />
      <span className="au-switch__control" aria-hidden="true">
        <span className="au-switch__thumb" />
      </span>
      <span className="au-switch__body">
        {labelContent ? <span className="au-switch__label">{labelContent}</span> : null}
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
