import * as React from 'react'
import type { AtelierSize } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for Avatar.
 */
export type AvatarProps = React.HTMLAttributes<HTMLSpanElement> & {
  src?: string
  alt?: string
  name?: string
  fallback?: React.ReactNode
  size?: AtelierSize
}

/**
 * Builds fallback initials from a display name.
 */
function getInitials(name: string | undefined): string {
  if (!name) return ''
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

/**
 * Circular user or entity avatar with image and initials fallback.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, fallback, size = 'md', className, ...props },
  ref,
) {
  const fallbackContent = fallback ?? getInitials(name)

  return (
    <span
      ref={ref}
      className={cx('au-avatar', `au-avatar--${size}`, className)}
      aria-label={!src && name ? name : undefined}
      role={!src && name ? 'img' : undefined}
      {...props}
    >
      {src ? <img className="au-avatar__image" src={src} alt={alt ?? name ?? ''} /> : fallbackContent}
    </span>
  )
})
