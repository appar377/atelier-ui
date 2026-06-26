import * as React from 'react'

export type {
  AtelierDensity,
  AtelierFontPreset,
  AtelierCalloutVariant,
  AtelierIntent,
  AtelierKnowledgeAccent,
  AtelierRadius,
  AtelierSize,
  AtelierTheme,
} from '@appar/atelier-tokens'

/**
 * Shared visual variants used by action-like components.
 */
export type AtelierVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'plain'

/**
 * Shared control sizes. These map to CSS custom property based heights.
 */
export type AtelierControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Token-backed spacing scale. Arbitrary pixel values are intentionally not part of the public API.
 */
export type AtelierSpace = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

/**
 * Cross-axis alignment values for layout primitives.
 */
export type AtelierAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

/**
 * Main-axis distribution values for layout primitives.
 */
export type AtelierJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

/**
 * Reusable surface treatments. Components should use semantic surface names instead of raw colors.
 */
export type AtelierSurface = 'none' | 'base' | 'surface' | 'raised' | 'soft'

/**
 * Orientation for components that can render horizontally or vertically.
 */
export type AtelierOrientation = 'horizontal' | 'vertical'

/**
 * Placement values for floating UI.
 */
export type AtelierPlacement = 'top' | 'right' | 'bottom' | 'left'

/**
 * Border treatment shared by layout and surface primitives.
 */
export type AtelierBorder = boolean | 'none' | 'subtle'

/**
 * Shadow treatment shared by layout and surface primitives.
 */
export type AtelierShadow = 'none' | 'xs' | 'sm' | 'md'

/**
 * Common polymorphic `as` prop used by lightweight layout primitives.
 */
export type AsProp<E extends React.ElementType> = {
  as?: E
}

/**
 * Props for a polymorphic React component while omitting keys owned by the component itself.
 */
export type PolymorphicProps<E extends React.ElementType, P = object> = P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as'>

/**
 * Joins class names while dropping empty values.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Converts a boolean into the `data-*="true"` convention used by Atelier CSS.
 */
export function dataBoolean(value: boolean | undefined): 'true' | undefined {
  return value ? 'true' : undefined
}

/**
 * Joins description ids for `aria-describedby`.
 */
export function describedBy(...ids: Array<string | undefined>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined
}

/**
 * Converts a space token into a safe CSS class suffix.
 */
export function spaceClass(value: AtelierSpace | undefined): string | undefined {
  return value === undefined ? undefined : String(value).replace('.', '-')
}

/**
 * Creates a token-backed spacing utility class.
 */
export function spaceTokenClass(prefix: string, value: AtelierSpace | undefined): string | undefined {
  const suffix = spaceClass(value)
  return suffix ? `${prefix}-${suffix}` : undefined
}

/**
 * Controlled/uncontrolled state helper for components that expose value/defaultValue callbacks.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): [T, (nextValue: T) => void] {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? (value as T) : internalValue

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange],
  )

  return [currentValue, setValue]
}
