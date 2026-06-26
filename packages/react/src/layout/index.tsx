import * as React from 'react'
import type {
  AtelierAlign,
  AtelierBorder,
  AtelierJustify,
  AtelierRadius,
  AtelierShadow,
  AtelierSpace,
  AtelierSurface,
  PolymorphicProps,
} from '../core/types'
import { cx, spaceTokenClass } from '../core/types'

type BoxOwnProps = {
  /** Token-backed padding applied on all sides. */
  padding?: AtelierSpace
  /** Token-backed horizontal padding. */
  paddingX?: AtelierSpace
  /** Token-backed vertical padding. */
  paddingY?: AtelierSpace
  /** Semantic surface treatment. */
  surface?: AtelierSurface
  /** Radius token override. */
  radius?: AtelierRadius
  /** Border treatment. */
  border?: AtelierBorder
  /** Shadow token. */
  shadow?: AtelierShadow
}

/**
 * Props for Box, the polymorphic primitive for token-backed spacing and surfaces.
 */
export type BoxProps<E extends React.ElementType = 'div'> = PolymorphicProps<E, BoxOwnProps>

/**
 * Polymorphic layout primitive for composing surfaces, spacing, borders, and semantic elements.
 */
export function Box<E extends React.ElementType = 'div'>({
  as,
  padding,
  paddingX,
  paddingY,
  surface = 'none',
  radius,
  border = false,
  shadow,
  className,
  ...props
}: BoxProps<E>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={cx(
        'au-box',
        surface !== 'none' && `au-surface-${surface}`,
        border === true && 'au-border',
        border === 'subtle' && 'au-border-subtle',
        shadow && shadow !== 'none' && `au-shadow-${shadow}`,
        radius && `au-radius-${radius}`,
        spaceTokenClass('au-p', padding),
        spaceTokenClass('au-px', paddingX),
        spaceTokenClass('au-py', paddingY),
        className,
      )}
      {...props}
    />
  )
}

/**
 * Props for vertical stack layout.
 */
export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Gap token between children. */
  gap?: AtelierSpace
  /** Cross-axis alignment. */
  align?: AtelierAlign
}

/**
 * Vertical layout primitive with token-backed gaps.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 4, align = 'stretch', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('au-stack', `au-align-${align}`, spaceTokenClass('au-gap', gap), className)}
      {...props}
    />
  )
})

/**
 * Props for horizontal inline layout.
 */
export type InlineProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Gap token between children. */
  gap?: AtelierSpace
  /** Cross-axis alignment. */
  align?: AtelierAlign
  /** Main-axis distribution. */
  justify?: AtelierJustify
  /** Whether children can wrap to new lines. */
  wrap?: boolean
}

/**
 * Horizontal layout primitive with wrapping and alignment controls.
 */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { gap = 2, align = 'center', justify = 'start', wrap = true, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'au-inline',
        `au-align-${align}`,
        `au-justify-${justify}`,
        wrap && 'au-inline--wrap',
        spaceTokenClass('au-gap', gap),
        className,
      )}
      {...props}
    />
  )
})

/**
 * Props for grid layout.
 */
export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Gap token between grid items. */
  gap?: AtelierSpace
  /** Responsive column preset. */
  columns?: 1 | 2 | 3 | 4 | 'auto'
  /** Cross-axis alignment. */
  align?: AtelierAlign
}

/**
 * Grid layout primitive with a small set of predictable column presets.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { gap = 4, columns = 'auto', align = 'stretch', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'au-grid',
        `au-grid--${columns}`,
        `au-align-${align}`,
        spaceTokenClass('au-gap', gap),
        className,
      )}
      {...props}
    />
  )
})

/**
 * Props for token-backed empty space.
 */
export type SpacerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Spacing token used as width or height. */
  size?: AtelierSpace
  /** Axis where spacing should apply. */
  axis?: 'x' | 'y'
}

/**
 * Empty layout component for deliberate spacing between composed sections.
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
  { size = 4, axis = 'y', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('au-spacer', `au-spacer--${axis}`, spaceTokenClass('au-space', size), className)}
      aria-hidden="true"
      {...props}
    />
  )
})

/**
 * Props for Divider.
 */
export type DividerProps = React.HTMLAttributes<HTMLHRElement> & {
  /** Divider orientation. */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Visual separator for grouped content.
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', className, ...props },
  ref,
) {
  return (
    <hr
      ref={ref}
      className={cx('au-divider', `au-divider--${orientation}`, className)}
      aria-orientation={orientation}
      {...props}
    />
  )
})

/**
 * Props for page-width container.
 */
export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Maximum width preset. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Horizontal padding token. */
  paddingX?: AtelierSpace
}

/**
 * Page-width layout primitive that constrains readable content without adding decoration.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'lg', paddingX = 6, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('au-container', `au-container--${size}`, spaceTokenClass('au-px', paddingX), className)}
      {...props}
    />
  )
})

/**
 * Props for full-width page section.
 */
export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Vertical padding token. */
  paddingY?: AtelierSpace
  /** Semantic surface treatment. */
  surface?: AtelierSurface
}

/**
 * Full-width page section for composing pages without nesting cards.
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  { paddingY = 8, surface = 'none', className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cx(
        'au-section',
        surface !== 'none' && `au-surface-${surface}`,
        spaceTokenClass('au-py', paddingY),
        className,
      )}
      {...props}
    />
  )
})
