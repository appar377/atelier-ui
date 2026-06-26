import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { AtelierOrientation, AtelierSize } from '../core/types'
import { cx, dataBoolean, useControllableState } from '../core/types'

/**
 * Root props for Tabs.
 */
export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  /** Visual treatment for the tab list. */
  variant?: 'line' | 'pill' | 'segment'
  /** Size of tab triggers. */
  size?: AtelierSize
}

/**
 * Root component for keyboard-accessible tabs.
 */
export const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(function Tabs(
  { variant = 'line', size = 'md', className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cx('au-tabs', `au-tabs--${variant}`, `au-tabs--${size}`, className)}
      {...props}
    />
  )
})

/**
 * Props for TabsList.
 */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>

/**
 * Container for TabsTrigger children.
 */
export const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(function TabsList(
  { className, ...props },
  ref,
) {
  return <TabsPrimitive.List ref={ref} className={cx('au-tabs__list', className)} {...props} />
})

/**
 * Props for TabsTrigger.
 */
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>

/**
 * Trigger for a tab value.
 */
export const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  function TabsTrigger({ className, ...props }, ref) {
    return <TabsPrimitive.Trigger ref={ref} className={cx('au-tabs__trigger', className)} {...props} />
  },
)

/**
 * Props for TabsContent.
 */
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

/**
 * Content panel for a tab value.
 */
export const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  function TabsContent({ className, ...props }, ref) {
    return <TabsPrimitive.Content ref={ref} className={cx('au-tabs__content', className)} {...props} />
  },
)

/**
 * Item definition for SegmentedControl.
 */
export type SegmentedControlItem = {
  /** Visible label. */
  label: React.ReactNode
  /** Stable item value. */
  value: string
  /** Disabled state for the item. */
  disabled?: boolean
}

/**
 * Props for SegmentedControl.
 */
export type SegmentedControlProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** Items to render. */
  items: SegmentedControlItem[]
  /** Controlled value. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Called when selected value changes. */
  onValueChange?: (value: string) => void
  /** Size preset. */
  size?: Extract<AtelierSize, 'sm' | 'md' | 'lg'>
  /** Accessible label for the group. */
  'aria-label'?: string
}

/**
 * Small mutually-exclusive segmented button group.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { items, value, defaultValue, onValueChange, size = 'md', className, 'aria-label': ariaLabel = 'Options', ...props },
  ref,
) {
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? items[0]?.value ?? '',
    onChange: onValueChange,
  })

  return (
    <div ref={ref} className={cx('au-segmented', `au-segmented--${size}`, className)} role="radiogroup" aria-label={ariaLabel} {...props}>
      {items.map((item) => {
        const selected = item.value === selectedValue
        return (
          <button
            key={item.value}
            className="au-segmented__item"
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={item.disabled}
            data-selected={dataBoolean(selected)}
            onClick={() => setSelectedValue(item.value)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
})

/**
 * Breadcrumb item definition.
 */
export type BreadcrumbItem = {
  /** Visible label. */
  label: React.ReactNode
  /** Optional link destination. */
  href?: string
}

/**
 * Props for Breadcrumbs.
 */
export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  /** Breadcrumb trail items. */
  items: BreadcrumbItem[]
  /** Accessible label for the navigation region. */
  label?: string
}

/**
 * Breadcrumb navigation trail.
 */
export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, label = 'Breadcrumb', className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cx('au-breadcrumbs', className)} aria-label={label} {...props}>
      <ol className="au-breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={index} className="au-breadcrumbs__item">
              {item.href && !isCurrent ? (
                <a className="au-breadcrumbs__link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span className="au-breadcrumbs__current" aria-current={isCurrent ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
})

/**
 * Props for Pagination.
 */
export type PaginationProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & {
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called when a page is requested. */
  onPageChange?: (page: number) => void
  /** Accessible label for the navigation region. */
  label?: string
}

/**
 * Simple pagination control that leaves data fetching to the app.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onPageChange, label = 'Pagination', className, ...props },
  ref,
) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
  return (
    <nav ref={ref} className={cx('au-pagination', className)} aria-label={label} {...props}>
      <button className="au-pagination__item" type="button" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
        Previous
      </button>
      {pages.map((item) => (
        <button
          key={item}
          className="au-pagination__item"
          type="button"
          aria-current={item === page ? 'page' : undefined}
          data-selected={dataBoolean(item === page)}
          onClick={() => onPageChange?.(item)}
        >
          {item}
        </button>
      ))}
      <button
        className="au-pagination__item"
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
      >
        Next
      </button>
    </nav>
  )
})

/**
 * Props for Navbar.
 */
export type NavbarProps = React.HTMLAttributes<HTMLElement>

/**
 * Top navigation shell with predictable spacing.
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(function Navbar({ className, ...props }, ref) {
  return <nav ref={ref} className={cx('au-navbar', className)} {...props} />
})

/**
 * Props for Sidebar.
 */
export type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  /** Visual width preset. */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Sidebar navigation region for app shells.
 */
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { size = 'md', className, ...props },
  ref,
) {
  return <aside ref={ref} className={cx('au-sidebar', `au-sidebar--${size}`, className)} {...props} />
})

/**
 * Props for BottomNavigation.
 */
export type BottomNavigationProps = React.HTMLAttributes<HTMLElement> & {
  /** Orientation of bottom navigation items. */
  orientation?: AtelierOrientation
}

/**
 * Mobile-friendly bottom navigation container.
 */
export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(function BottomNavigation(
  { orientation = 'horizontal', className, ...props },
  ref,
) {
  return <nav ref={ref} className={cx('au-bottom-nav', `au-bottom-nav--${orientation}`, className)} {...props} />
})
