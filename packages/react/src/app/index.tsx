import * as React from 'react'
import type { AtelierIntent } from '../core/types'
import { cx } from '../core/types'
import { Badge } from '../primitives/badge'
import { Button, type ButtonProps } from '../primitives/button'
import { Card } from '../surface/card'
import { Timeline, type TimelineItem } from '../data'

/**
 * Props for MarkdownView.
 */
export type MarkdownViewProps = React.HTMLAttributes<HTMLElement>

/**
 * Prose wrapper for rendered markdown. Parsing stays in the app layer.
 */
export const MarkdownView = React.forwardRef<HTMLElement, MarkdownViewProps>(function MarkdownView(
  { className, ...props },
  ref,
) {
  return <article ref={ref} className={cx('au-markdown', className)} {...props} />
})

/**
 * Props for WikiLink.
 */
export type WikiLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Link status in a knowledge graph. */
  status?: 'resolved' | 'missing' | 'external'
}

/**
 * Link styling for wiki and knowledge graph references.
 */
export const WikiLink = React.forwardRef<HTMLAnchorElement, WikiLinkProps>(function WikiLink(
  { status = 'resolved', className, ...props },
  ref,
) {
  return <a ref={ref} className={cx('au-wiki-link', `au-wiki-link--${status}`, className)} {...props} />
})

/**
 * Backlink item definition.
 */
export type BacklinkItem = {
  /** Stable item id. */
  id: string
  /** Link label. */
  title: React.ReactNode
  /** Optional link destination. */
  href?: string
  /** Optional excerpt. */
  excerpt?: React.ReactNode
}

/**
 * Props for BacklinkList.
 */
export type BacklinkListProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Backlink items. */
  items: BacklinkItem[]
}

/**
 * Display list for backlinks in a knowledge app.
 */
export const BacklinkList = React.forwardRef<HTMLDivElement, BacklinkListProps>(function BacklinkList(
  { items, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-backlink-list', className)} {...props}>
      {items.map((item) => (
        <div key={item.id} className="au-backlink-list__item">
          {item.href ? (
            <a className="au-backlink-list__title" href={item.href}>
              {item.title}
            </a>
          ) : (
            <div className="au-backlink-list__title">{item.title}</div>
          )}
          {item.excerpt ? <div className="au-backlink-list__excerpt">{item.excerpt}</div> : null}
        </div>
      ))}
    </div>
  )
})

/**
 * Props for KnowledgeCard.
 */
export type KnowledgeCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Card title. */
  title: React.ReactNode
  /** Optional summary. */
  excerpt?: React.ReactNode
  /** Tags to display. */
  tags?: string[]
  /** Backlink count display. */
  backlinksCount?: number
  /** Updated timestamp label. */
  updatedAt?: React.ReactNode
  /** Optional card destination. */
  href?: string
  /** Knowledge card type. */
  variant?: 'note' | 'article' | 'concept' | 'daily'
}

/**
 * Card for notes, concepts, and articles in a knowledge app.
 */
export const KnowledgeCard = React.forwardRef<HTMLDivElement, KnowledgeCardProps>(function KnowledgeCard(
  { title, excerpt, tags = [], backlinksCount, updatedAt, href, variant = 'note', className, ...props },
  ref,
) {
  const titleNode = href ? (
    <a className="au-knowledge-card__title" href={href}>
      {title}
    </a>
  ) : (
    <div className="au-knowledge-card__title">{title}</div>
  )

  return (
    <Card ref={ref} className={cx('au-knowledge-card', `au-knowledge-card--${variant}`, className)} padding="md" {...props}>
      {titleNode}
      {excerpt ? <div className="au-knowledge-card__excerpt">{excerpt}</div> : null}
      {tags.length > 0 ? (
        <div className="au-knowledge-card__tags">
          {tags.map((tag) => (
            <Badge key={tag} size="sm" intent="neutral" variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
      <div className="au-knowledge-card__meta">
        {backlinksCount !== undefined ? <span>{backlinksCount} backlinks</span> : null}
        {updatedAt ? <span>{updatedAt}</span> : null}
      </div>
    </Card>
  )
})

/**
 * Timeline event props for knowledge or activity streams.
 */
export type TimelineEventProps = TimelineItem

/**
 * Single timeline event helper.
 */
export function TimelineEvent(props: TimelineEventProps) {
  return <Timeline items={[props]} variant="compact" />
}

/**
 * Bean ratio definition.
 */
export type CoffeeBeanRatio = {
  /** Bean name. */
  name: React.ReactNode
  /** Ratio percentage or weight unit supplied by the app. */
  ratio: number
}

/**
 * Props for CoffeeBlendCard.
 */
export type CoffeeBlendCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Blend title. */
  title: React.ReactNode
  /** Beans in the blend. */
  beans: CoffeeBeanRatio[]
  /** Roast level. */
  roastLevel?: 'light' | 'medium' | 'dark'
  /** Flavor notes. */
  flavorNotes?: string[]
}

/**
 * Display card for a coffee blend recipe.
 */
export const CoffeeBlendCard = React.forwardRef<HTMLDivElement, CoffeeBlendCardProps>(function CoffeeBlendCard(
  { title, beans, roastLevel = 'medium', flavorNotes = [], className, ...props },
  ref,
) {
  return (
    <Card ref={ref} className={cx('au-coffee-card', `au-coffee-card--${roastLevel}`, className)} padding="md" {...props}>
      <div className="au-coffee-card__title">{title}</div>
      <div className="au-coffee-card__beans">
        {beans.map((bean, index) => (
          <div key={index} className="au-coffee-card__bean">
            <span>{bean.name}</span>
            <strong>{bean.ratio}%</strong>
          </div>
        ))}
      </div>
      {flavorNotes.length > 0 ? (
        <div className="au-coffee-card__notes">
          {flavorNotes.map((note) => (
            <Badge key={note} size="sm" intent="neutral" variant="soft">
              {note}
            </Badge>
          ))}
        </div>
      ) : null}
    </Card>
  )
})

/**
 * Props for CoffeeRatioSlider.
 */
export type CoffeeRatioSliderProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Ratios to display. */
  beans: CoffeeBeanRatio[]
}

/**
 * Read-only ratio visualization for coffee blends. Ratio calculation stays in the app layer.
 */
export const CoffeeRatioSlider = React.forwardRef<HTMLDivElement, CoffeeRatioSliderProps>(function CoffeeRatioSlider(
  { beans, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-coffee-ratio', className)} {...props}>
      {beans.map((bean, index) => (
        <div key={index} className="au-coffee-ratio__row">
          <span>{bean.name}</span>
          <div className="au-coffee-ratio__track">
            <span className="au-coffee-ratio__bar" style={{ width: `${bean.ratio}%` }} />
          </div>
          <strong>{bean.ratio}%</strong>
        </div>
      ))}
    </div>
  )
})

/**
 * Props for BeanTag.
 */
export type BeanTagProps = React.ComponentPropsWithoutRef<typeof Badge> & {
  /** Roast level. */
  roastLevel?: 'light' | 'medium' | 'dark'
}

/**
 * Badge for a coffee bean or roast attribute.
 */
export function BeanTag({ roastLevel = 'medium', className, ...props }: BeanTagProps) {
  return <Badge className={cx('au-bean-tag', `au-bean-tag--${roastLevel}`, className)} {...props} />
}

/**
 * Props for GamePanel.
 */
export type GamePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Optional panel title. */
  title?: React.ReactNode
  /** Game panel treatment. */
  variant?: 'default' | 'quest' | 'inventory' | 'status'
  /** Optional rarity accent. */
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

/**
 * Surface for casual game UI panels.
 */
export const GamePanel = React.forwardRef<HTMLDivElement, GamePanelProps>(function GamePanel(
  { title, variant = 'default', rarity = 'common', children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-game-panel', `au-game-panel--${variant}`, `au-game-panel--${rarity}`, className)} {...props}>
      {title ? <div className="au-game-panel__title">{title}</div> : null}
      <div className="au-game-panel__body">{children}</div>
    </div>
  )
})

/**
 * Props for GameButton.
 */
export type GameButtonProps = ButtonProps & {
  /** Rarity accent. */
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

/**
 * Button treatment for casual game UI.
 */
export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(function GameButton(
  { rarity = 'common', className, ...props },
  ref,
) {
  return <Button ref={ref} className={cx('au-game-button', `au-game-button--${rarity}`, className)} {...props} />
})

/**
 * Props for InventorySlot.
 */
export type InventorySlotProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Item content. */
  item?: React.ReactNode
  /** Selection state. */
  selected?: boolean
  /** Rarity accent. */
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

/**
 * Square inventory slot for game UI.
 */
export const InventorySlot = React.forwardRef<HTMLDivElement, InventorySlotProps>(function InventorySlot(
  { item, selected = false, rarity = 'common', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('au-inventory-slot', `au-inventory-slot--${rarity}`, className)}
      data-selected={selected ? 'true' : undefined}
      {...props}
    >
      {item}
    </div>
  )
})

/**
 * Props for QuestCard.
 */
export type QuestCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Quest title. */
  title: React.ReactNode
  /** Quest status. */
  status?: 'available' | 'active' | 'complete'
  /** Supporting copy. */
  description?: React.ReactNode
  /** Optional reward display. */
  reward?: React.ReactNode
}

/**
 * Quest summary card for game UI.
 */
export const QuestCard = React.forwardRef<HTMLDivElement, QuestCardProps>(function QuestCard(
  { title, status = 'available', description, reward, className, ...props },
  ref,
) {
  const intentByStatus: Record<NonNullable<QuestCardProps['status']>, AtelierIntent> = {
    available: 'info',
    active: 'warning',
    complete: 'success',
  }

  return (
    <Card ref={ref} className={cx('au-quest-card', `au-quest-card--${status}`, className)} padding="md" {...props}>
      <div className="au-quest-card__header">
        <div className="au-quest-card__title">{title}</div>
        <Badge intent={intentByStatus[status]} size="sm">
          {status}
        </Badge>
      </div>
      {description ? <div className="au-quest-card__description">{description}</div> : null}
      {reward ? <div className="au-quest-card__reward">{reward}</div> : null}
    </Card>
  )
})
