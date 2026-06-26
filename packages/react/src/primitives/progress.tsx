import * as React from 'react'
import { cx, describedBy } from '../core/types'

/**
 * Props for Progress.
 */
export type ProgressProps = Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, 'children'> & {
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  value?: number
  max?: number
}

/**
 * Native progress element with optional label and percentage display.
 */
export const Progress = React.forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { label, description, showValue = false, value, max = 100, className, id, ...props },
  ref,
) {
  const generatedId = React.useId()
  const progressId = id ?? generatedId
  const descriptionId = description ? `${progressId}-description` : undefined
  const percent = typeof value === 'number' && max > 0 ? Math.round((value / max) * 100) : undefined

  return (
    <div className={cx('au-progress', className)}>
      {label || showValue ? (
        <span className="au-progress__header">
          {label ? (
            <label className="au-label" htmlFor={progressId}>
              {label}
            </label>
          ) : (
            <span />
          )}
          {showValue && percent !== undefined ? <span className="au-progress__value">{percent}%</span> : null}
        </span>
      ) : null}
      <progress
        ref={ref}
        id={progressId}
        className="au-progress__bar"
        value={value}
        max={max}
        aria-describedby={describedBy(descriptionId)}
        {...props}
      />
      {description ? (
        <span id={descriptionId} className="au-description">
          {description}
        </span>
      ) : null}
    </div>
  )
})
