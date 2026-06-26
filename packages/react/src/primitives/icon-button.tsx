import * as React from 'react'
import type { ButtonProps } from './button'
import { Button } from './button'
import { cx } from '../core/types'

/**
 * Props for IconButton.
 */
export type IconButtonProps = Omit<ButtonProps, 'children' | 'endIcon' | 'fullWidth' | 'startIcon'> & {
  icon: React.ReactNode
  'aria-label': string
}

/**
 * Icon-only button that requires an accessible label.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, className, ...props },
  ref,
) {
  return (
    <Button ref={ref} className={cx('au-icon-btn', className)} {...props}>
      {icon}
    </Button>
  )
})
