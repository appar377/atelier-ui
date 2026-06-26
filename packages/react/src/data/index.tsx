import * as React from 'react'
import type { AtelierIntent } from '../core/types'
import { cx } from '../core/types'

/**
 * Props for semantic table wrapper.
 */
export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** Size preset for table rows. */
  size?: 'sm' | 'md'
  /** Whether alternating rows are visually striped. */
  striped?: boolean
}

/**
 * Semantic table with Atelier class hooks.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { size = 'md', striped = false, className, ...props },
  ref,
) {
  return <table ref={ref} className={cx('au-table', `au-table--${size}`, striped && 'au-table--striped', className)} {...props} />
})

/**
 * Column definition for DataTable.
 */
export type DataTableColumn<T> = {
  /** Stable column key. */
  key: string
  /** Header content. */
  header: React.ReactNode
  /** Cell renderer for a row. */
  cell: (row: T) => React.ReactNode
  /** Text alignment for header and cells. */
  align?: 'left' | 'center' | 'right'
}

/**
 * Props for DataTable.
 */
export type DataTableProps<T> = {
  /** Column definitions. */
  columns: Array<DataTableColumn<T>>
  /** Rows to render. */
  rows: T[]
  /** Optional row key resolver. */
  getRowKey?: (row: T, index: number) => React.Key
  /** Size preset for table rows. */
  size?: 'sm' | 'md'
  /** Whether alternating rows are visually striped. */
  striped?: boolean
  /** Message shown when rows are empty. */
  emptyMessage?: React.ReactNode
}

/**
 * Lightweight data table. Sorting, filtering, pagination, and fetching stay in the app layer.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  size = 'md',
  striped = false,
  emptyMessage = 'No data',
}: DataTableProps<T>) {
  return (
    <div className="au-data-table">
      <Table size={size} striped={striped}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={cx(column.align && `au-text-${column.align}`)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} className={cx(column.align && `au-text-${column.align}`)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="au-data-table__empty">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

/**
 * Props for List.
 */
export type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  /** Visual treatment for list rows. */
  variant?: 'plain' | 'divided' | 'surface'
}

/**
 * Semantic unordered list with Atelier spacing.
 */
export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
  { variant = 'plain', className, ...props },
  ref,
) {
  return <ul ref={ref} className={cx('au-list', `au-list--${variant}`, className)} {...props} />
})

/**
 * Props for ListItem.
 */
export type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  /** Optional leading visual. */
  start?: React.ReactNode
  /** Optional trailing visual. */
  end?: React.ReactNode
}

/**
 * Structured list item with optional leading and trailing regions.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { start, end, children, className, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx('au-list-item', className)} {...props}>
      {start ? <span className="au-list-item__start">{start}</span> : null}
      <span className="au-list-item__body">{children}</span>
      {end ? <span className="au-list-item__end">{end}</span> : null}
    </li>
  )
})

/**
 * Props for StatCard.
 */
export type StatCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Stat label. */
  label: React.ReactNode
  /** Main stat value. */
  value: React.ReactNode
  /** Optional helper text. */
  description?: React.ReactNode
  /** Optional semantic intent for the accent. */
  intent?: AtelierIntent
}

/**
 * Compact metric surface for dashboards.
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, description, intent = 'neutral', className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-stat-card', `au-stat-card--${intent}`, className)} {...props}>
      <div className="au-stat-card__label">{label}</div>
      <div className="au-stat-card__value">{value}</div>
      {description ? <div className="au-stat-card__description">{description}</div> : null}
    </div>
  )
})

/**
 * Timeline item definition.
 */
export type TimelineItem = {
  /** Stable item id. */
  id: string
  /** Item title. */
  title: React.ReactNode
  /** Optional descriptive copy. */
  description?: React.ReactNode
  /** Optional date or timestamp label. */
  date?: React.ReactNode
  /** Semantic marker color. */
  intent?: AtelierIntent
  /** Optional item destination. */
  href?: string
}

/**
 * Props for Timeline.
 */
export type TimelineProps = React.HTMLAttributes<HTMLOListElement> & {
  /** Items to display. */
  items: TimelineItem[]
  /** Visual treatment. */
  variant?: 'line' | 'card' | 'compact'
}

/**
 * Timeline display for ordered events.
 */
export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { items, variant = 'line', className, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cx('au-timeline', `au-timeline--${variant}`, className)} {...props}>
      {items.map((item) => {
        const content = (
          <>
            <div className="au-timeline__title">{item.title}</div>
            {item.description ? <div className="au-timeline__description">{item.description}</div> : null}
            {item.date ? <div className="au-timeline__date">{item.date}</div> : null}
          </>
        )
        return (
          <li key={item.id} className={cx('au-timeline__item', `au-timeline__item--${item.intent ?? 'neutral'}`)}>
            <span className="au-timeline__marker" aria-hidden="true" />
            <div className="au-timeline__body">
              {item.href ? (
                <a className="au-timeline__link" href={item.href}>
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
})

/**
 * Props for EmptyState.
 */
export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Optional visual. */
  icon?: React.ReactNode
  /** Empty state title. */
  title: React.ReactNode
  /** Supporting copy. */
  description?: React.ReactNode
  /** Optional action area. */
  action?: React.ReactNode
}

/**
 * Empty state surface for lists, tables, and dashboards.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-empty-state', className)} {...props}>
      {icon ? <div className="au-empty-state__icon">{icon}</div> : null}
      <div className="au-empty-state__title">{title}</div>
      {description ? <div className="au-empty-state__description">{description}</div> : null}
      {action ? <div className="au-empty-state__action">{action}</div> : null}
    </div>
  )
})
