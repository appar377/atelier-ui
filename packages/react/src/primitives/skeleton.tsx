import * as React from 'react'
import type { AtelierRadius } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Skeleton.
 */
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'text' | 'rect' | 'circle'
  radius?: AtelierRadius
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
}

/**
 * Placeholder block used while content is loading.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'text', radius, width, height, className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('au-skeleton', `au-skeleton--${variant}`, radius && `au-radius-${radius}`, className)}
      style={{ ...style, width, height }}
      aria-hidden="true"
      {...props}
    />
  )
})
