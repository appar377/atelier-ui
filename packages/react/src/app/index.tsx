import * as React from 'react'
import type { AtelierIntent } from '../core/types'
import { cx, dataBoolean } from '../core/types'
import { Badge } from '../primitives/badge'
import { Button, type ButtonProps } from '../primitives/button'
import { Card } from '../surface/card'
import { Timeline, type TimelineItem } from '../data'

/**
 * Accent presets for Knowledge Library components.
 */
export type KnowledgeAccent = 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'slate'

/**
 * Shared article metadata item.
 */
export type ArticleMetaItem = {
  /** Optional accessible label for the value. */
  label?: React.ReactNode
  /** Displayed metadata value. */
  value: React.ReactNode
}

/**
 * Article or related article link definition.
 */
export type RelatedArticleItem = {
  /** Stable item id. */
  id: string
  /** Article title. */
  title: React.ReactNode
  /** Article destination. */
  href: string
  /** Optional short summary. */
  excerpt?: React.ReactNode
  /** Optional category label. */
  category?: React.ReactNode
  /** Optional metadata list. */
  meta?: ArticleMetaItem[]
}

/**
 * Table of contents item definition.
 */
export type TableOfContentsItem = {
  /** Stable item id. */
  id?: string
  /** Link title. */
  title: React.ReactNode
  /** Anchor destination. */
  href: string
  /** Heading depth used for indentation. */
  depth?: 1 | 2 | 3
}

/**
 * Command palette item definition.
 */
export type CommandPaletteItem = {
  /** Stable item id. */
  id: string
  /** Primary command label. */
  label: React.ReactNode
  /** Optional command description. */
  description?: React.ReactNode
  /** Optional href for link-like commands. */
  href?: string
  /** Optional grouping label. */
  category?: React.ReactNode
  /** Optional keyboard shortcut display. */
  shortcut?: React.ReactNode
  /** Optional leading visual. */
  icon?: React.ReactNode
}

/**
 * Props for ArticleMeta.
 */
export type ArticleMetaProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Metadata items to display in order. */
  items: ArticleMetaItem[]
  /** Size preset. */
  size?: 'sm' | 'md'
}

/**
 * Compact metadata row for article headers, cards, and related lists.
 */
export const ArticleMeta = React.forwardRef<HTMLDivElement, ArticleMetaProps>(function ArticleMeta(
  { items, size = 'sm', className, ...props },
  ref,
) {
  if (items.length === 0) return null

  return (
    <div ref={ref} className={cx('au-article-meta', `au-article-meta--${size}`, className)} {...props}>
      {items.map((item, index) => (
        <span key={index} className="au-article-meta__item">
          {item.label ? <span className="au-sr-only">{item.label}: </span> : null}
          {item.value}
        </span>
      ))}
    </div>
  )
})

/**
 * Props for TagPill.
 */
export type TagPillProps = React.AnchorHTMLAttributes<HTMLElement> & {
  /** Visual accent. */
  accent?: KnowledgeAccent
  /** Render as non-link text when href is not provided. */
  as?: 'a' | 'span'
}

/**
 * Quiet tag treatment for knowledge and technical article surfaces.
 */
export const TagPill = React.forwardRef<HTMLElement, TagPillProps>(function TagPill(
  { accent = 'slate', as, href, className, ...props },
  ref,
) {
  const Component = href || as === 'a' ? 'a' : 'span'

  return (
    <Component
      ref={ref as never}
      href={Component === 'a' ? href : undefined}
      className={cx('au-tag-pill', `au-accent-${accent}`, className)}
      {...props}
    />
  )
})

/**
 * Props for CategoryPill.
 */
export type CategoryPillProps = React.AnchorHTMLAttributes<HTMLElement> & {
  /** Visual accent. */
  accent?: KnowledgeAccent
  /** Render as non-link text when href is not provided. */
  as?: 'a' | 'span'
}

/**
 * Category label with a subtle accent, suitable for article lists and headers.
 */
export const CategoryPill = React.forwardRef<HTMLElement, CategoryPillProps>(function CategoryPill(
  { accent = 'emerald', as, href, className, ...props },
  ref,
) {
  const Component = href || as === 'a' ? 'a' : 'span'

  return (
    <Component
      ref={ref as never}
      href={Component === 'a' ? href : undefined}
      className={cx('au-category-pill', `au-accent-${accent}`, className)}
      {...props}
    />
  )
})

/**
 * Props for SearchBox.
 */
export type SearchBoxProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children'> & {
  /** Accessible label for the search input. */
  label?: React.ReactNode
  /** Input name submitted by the form. */
  name?: string
  /** Placeholder text. */
  placeholder?: string
  /** Initial query value. */
  defaultValue?: string
  /** Submit button label. */
  buttonLabel?: React.ReactNode
  /** Size preset. */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Server-friendly search form shell. Search behavior belongs to the app route.
 */
export const SearchBox = React.forwardRef<HTMLFormElement, SearchBoxProps>(function SearchBox(
  {
    label = 'Search',
    name = 'q',
    placeholder = 'Search notes and articles',
    defaultValue,
    buttonLabel = 'Search',
    size = 'md',
    className,
    ...props
  },
  ref,
) {
  return (
    <form ref={ref} className={cx('au-search-box', `au-search-box--${size}`, className)} role="search" {...props}>
      <label className="au-sr-only">{label}</label>
      <span className="au-search-box__icon" aria-hidden="true">
        /
      </span>
      <input
        className="au-search-box__input"
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-label={typeof label === 'string' ? label : 'Search'}
      />
      <button className="au-search-box__button" type="submit">
        {buttonLabel}
      </button>
    </form>
  )
})

/**
 * Props for ThumbnailFrame.
 */
export type ThumbnailFrameProps = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  /** Image source. */
  src?: string
  /** Image alt text. */
  alt?: string
  /** Framed custom visual. */
  children?: React.ReactNode
  /** Optional caption. */
  caption?: React.ReactNode
  /** Aspect ratio preset. */
  aspectRatio?: 'wide' | 'video' | 'square'
}

/**
 * Quiet thumbnail frame for article cards and knowledge entries.
 */
export const ThumbnailFrame = React.forwardRef<HTMLElement, ThumbnailFrameProps>(function ThumbnailFrame(
  { src, alt = '', children, caption, aspectRatio = 'wide', className, ...props },
  ref,
) {
  return (
    <figure ref={ref} className={cx('au-thumbnail-frame', `au-thumbnail-frame--${aspectRatio}`, className)} {...props}>
      <div className="au-thumbnail-frame__media">
        {children ?? (src ? <img src={src} alt={alt} loading="lazy" /> : <span aria-hidden="true" />)}
      </div>
      {caption ? <figcaption className="au-thumbnail-frame__caption">{caption}</figcaption> : null}
    </figure>
  )
})

/**
 * Props for ArticleCard.
 */
export type ArticleCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  /** Article title. */
  title: React.ReactNode
  /** Optional article destination. */
  href?: string
  /** Optional short summary. */
  excerpt?: React.ReactNode
  /** Optional category label. */
  category?: React.ReactNode
  /** Optional category link. */
  categoryHref?: string
  /** Optional metadata list. */
  meta?: ArticleMetaItem[]
  /** Tags to display. */
  tags?: string[]
  /** Optional thumbnail region. */
  thumbnail?: React.ReactNode
  /** Visual accent. */
  accent?: KnowledgeAccent
  /** Card density and emphasis. */
  variant?: 'default' | 'compact' | 'featured'
}

/**
 * Article preview card optimized for technical blog indexes and knowledge libraries.
 */
export const ArticleCard = React.forwardRef<HTMLElement, ArticleCardProps>(function ArticleCard(
  {
    title,
    href,
    excerpt,
    category,
    categoryHref,
    meta = [],
    tags = [],
    thumbnail,
    accent = 'emerald',
    variant = 'default',
    className,
    ...props
  },
  ref,
) {
  const titleNode = href ? (
    <a className="au-article-card__title" href={href}>
      {title}
    </a>
  ) : (
    <div className="au-article-card__title">{title}</div>
  )

  return (
    <article ref={ref} className={cx('au-article-card', `au-article-card--${variant}`, `au-accent-${accent}`, className)} {...props}>
      {thumbnail ? <div className="au-article-card__thumbnail">{thumbnail}</div> : null}
      <div className="au-article-card__body">
        {category ? (
          <CategoryPill href={categoryHref} accent={accent}>
            {category}
          </CategoryPill>
        ) : null}
        {titleNode}
        {excerpt ? <p className="au-article-card__excerpt">{excerpt}</p> : null}
        {meta.length > 0 ? <ArticleMeta items={meta} /> : null}
        {tags.length > 0 ? (
          <div className="au-article-card__tags">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
})

/**
 * Props for ArticleHeader.
 */
export type ArticleHeaderProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  /** Small label above the title. */
  eyebrow?: React.ReactNode
  /** Article title. */
  title: React.ReactNode
  /** Optional deck copy. */
  description?: React.ReactNode
  /** Optional category label. */
  category?: React.ReactNode
  /** Optional metadata list. */
  meta?: ArticleMetaItem[]
  /** Tags to display. */
  tags?: string[]
  /** Optional action area. */
  actions?: React.ReactNode
  /** Visual accent. */
  accent?: KnowledgeAccent
}

/**
 * Reading-first article header for technical posts and notes.
 */
export const ArticleHeader = React.forwardRef<HTMLElement, ArticleHeaderProps>(function ArticleHeader(
  { eyebrow, title, description, category, meta = [], tags = [], actions, accent = 'emerald', className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cx('au-article-header', `au-accent-${accent}`, className)} {...props}>
      <div className="au-article-header__main">
        {eyebrow ? <p className="au-article-header__eyebrow">{eyebrow}</p> : null}
        {category ? <CategoryPill accent={accent}>{category}</CategoryPill> : null}
        <h1 className="au-article-header__title">{title}</h1>
        {description ? <p className="au-article-header__description">{description}</p> : null}
        {meta.length > 0 ? <ArticleMeta items={meta} size="md" /> : null}
        {tags.length > 0 ? (
          <div className="au-article-header__tags">
            {tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        ) : null}
      </div>
      {actions ? <div className="au-article-header__actions">{actions}</div> : null}
    </header>
  )
})

/**
 * Props for TableOfContents.
 */
export type TableOfContentsProps = React.HTMLAttributes<HTMLElement> & {
  /** Navigation items. */
  items: TableOfContentsItem[]
  /** Optional title. */
  title?: React.ReactNode
  /** Currently active href. */
  activeHref?: string
}

/**
 * Sticky-friendly table of contents for article pages.
 */
export const TableOfContents = React.forwardRef<HTMLElement, TableOfContentsProps>(function TableOfContents(
  { items, title = 'On this page', activeHref, className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cx('au-toc', className)} aria-label="Table of contents" {...props}>
      {title ? <div className="au-toc__title">{title}</div> : null}
      <ol className="au-toc__list">
        {items.map((item) => {
          const active = activeHref ? activeHref === item.href : false
          return (
            <li key={item.id ?? item.href} className={cx('au-toc__item', `au-toc__item--depth-${item.depth ?? 1}`)}>
              <a className="au-toc__link" href={item.href} data-active={dataBoolean(active)} aria-current={active ? 'location' : undefined}>
                {item.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
})

/**
 * Props for SeriesNav.
 */
export type SeriesNavProps = React.HTMLAttributes<HTMLElement> & {
  /** Previous article link. */
  previous?: RelatedArticleItem
  /** Next article link. */
  next?: RelatedArticleItem
  /** Optional series label. */
  label?: React.ReactNode
}

/**
 * Previous/next navigation for a technical article series.
 */
export const SeriesNav = React.forwardRef<HTMLElement, SeriesNavProps>(function SeriesNav(
  { previous, next, label = 'Series navigation', className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cx('au-series-nav', className)} aria-label={typeof label === 'string' ? label : 'Series navigation'} {...props}>
      {previous ? (
        <a className="au-series-nav__item au-series-nav__item--previous" href={previous.href}>
          <span className="au-series-nav__label">Previous</span>
          <span className="au-series-nav__title">{previous.title}</span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a className="au-series-nav__item au-series-nav__item--next" href={next.href}>
          <span className="au-series-nav__label">Next</span>
          <span className="au-series-nav__title">{next.title}</span>
        </a>
      ) : null}
    </nav>
  )
})

/**
 * Props for RelatedArticleList.
 */
export type RelatedArticleListProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Related article items. */
  items: RelatedArticleItem[]
  /** Optional title. */
  title?: React.ReactNode
}

/**
 * Related article list for knowledge base and blog detail pages.
 */
export const RelatedArticleList = React.forwardRef<HTMLDivElement, RelatedArticleListProps>(function RelatedArticleList(
  { items, title = 'Related articles', className, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cx('au-related-articles', className)} {...props}>
      {title ? <div className="au-related-articles__title">{title}</div> : null}
      <div className="au-related-articles__list">
        {items.map((item) => (
          <a key={item.id} className="au-related-articles__item" href={item.href}>
            <span className="au-related-articles__item-title">{item.title}</span>
            {item.excerpt ? <span className="au-related-articles__excerpt">{item.excerpt}</span> : null}
            {item.meta && item.meta.length > 0 ? <ArticleMeta items={item.meta} /> : null}
          </a>
        ))}
      </div>
    </section>
  )
})

/**
 * Callout variants for technical prose.
 */
export type CalloutVariant = 'note' | 'tip' | 'warning' | 'important' | 'info'

/**
 * Props for Callout.
 */
export type CalloutProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Callout variant. */
  variant?: CalloutVariant
  /** Optional title. */
  title?: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
}

/**
 * Inline prose callout for notes, tips, warnings, important blocks, and info.
 */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { variant = 'note', title, icon, children, className, ...props },
  ref,
) {
  return (
    <aside ref={ref} className={cx('au-callout', `au-callout--${variant}`, className)} {...props}>
      <div className="au-callout__marker" aria-hidden="true">
        {icon ?? null}
      </div>
      <div className="au-callout__body">
        {title ? <div className="au-callout__title">{title}</div> : null}
        {children ? <div className="au-callout__content">{children}</div> : null}
      </div>
    </aside>
  )
})

/**
 * Props for CodeBlockShell.
 */
export type CodeBlockShellProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Optional filename. */
  filename?: React.ReactNode
  /** Optional language label. */
  language?: React.ReactNode
  /** Optional action area such as a copy button. */
  action?: React.ReactNode
}

/**
 * Framed code block shell. Highlighting and copy behavior stay in the app layer.
 */
export const CodeBlockShell = React.forwardRef<HTMLDivElement, CodeBlockShellProps>(function CodeBlockShell(
  { filename, language, action, children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-code-shell', className)} {...props}>
      {(filename || language || action) ? (
        <div className="au-code-shell__header">
          <div className="au-code-shell__meta">
            {filename ? <span className="au-code-shell__filename">{filename}</span> : null}
            {language ? <span className="au-code-shell__language">{language}</span> : null}
          </div>
          {action ? <div className="au-code-shell__action">{action}</div> : null}
        </div>
      ) : null}
      <pre className="au-code-shell__pre">
        <code>{children}</code>
      </pre>
    </div>
  )
})

/**
 * Props for CommandPalette.
 */
export type CommandPaletteProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Whether the palette is rendered. */
  open?: boolean
  /** Palette title. */
  title?: React.ReactNode
  /** Supporting text. */
  description?: React.ReactNode
  /** Search query display. */
  query?: string
  /** Search placeholder. */
  placeholder?: string
  /** Commands to render. */
  items: CommandPaletteItem[]
  /** Empty message. */
  emptyMessage?: React.ReactNode
  /** Optional footer. */
  footer?: React.ReactNode
}

/**
 * Server-renderable command palette shell. Filtering and keyboard behavior belong to the app layer.
 */
export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(function CommandPalette(
  {
    open = true,
    title = 'Command palette',
    description,
    query,
    placeholder = 'Search commands',
    items,
    emptyMessage = 'No commands found',
    footer,
    className,
    ...props
  },
  ref,
) {
  if (!open) return null

  return (
    <div ref={ref} className={cx('au-command-palette', className)} role="region" aria-label={typeof title === 'string' ? title : undefined} {...props}>
      <div className="au-command-palette__header">
        <div>
          <div className="au-command-palette__title">{title}</div>
          {description ? <div className="au-command-palette__description">{description}</div> : null}
        </div>
        <kbd className="au-command-palette__kbd">Esc</kbd>
      </div>
      <div className="au-command-palette__search">
        <span aria-hidden="true">Cmd</span>
        <input aria-label="Command search" placeholder={placeholder} defaultValue={query} />
      </div>
      <div className="au-command-palette__list">
        {items.length > 0 ? (
          items.map((item) => {
            const content = (
              <>
                {item.icon ? <span className="au-command-palette__item-icon">{item.icon}</span> : null}
                <span className="au-command-palette__item-body">
                  <span className="au-command-palette__item-label">{item.label}</span>
                  {item.description ? <span className="au-command-palette__item-description">{item.description}</span> : null}
                </span>
                {item.category ? <span className="au-command-palette__item-category">{item.category}</span> : null}
                {item.shortcut ? <kbd className="au-command-palette__shortcut">{item.shortcut}</kbd> : null}
              </>
            )

            return item.href ? (
              <a key={item.id} className="au-command-palette__item" href={item.href}>
                {content}
              </a>
            ) : (
              <div key={item.id} className="au-command-palette__item">
                {content}
              </div>
            )
          })
        ) : (
          <div className="au-command-palette__empty">{emptyMessage}</div>
        )}
      </div>
      {footer ? <div className="au-command-palette__footer">{footer}</div> : null}
    </div>
  )
})

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
  /** Message shown when no backlinks exist. */
  emptyMessage?: React.ReactNode
}

/**
 * Display list for backlinks in a knowledge app.
 */
export const BacklinkList = React.forwardRef<HTMLDivElement, BacklinkListProps>(function BacklinkList(
  { items, emptyMessage = 'No backlinks', className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('au-backlink-list', className)} {...props}>
      {items.length > 0 ? (
        items.map((item) => (
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
        ))
      ) : (
        <div className="au-backlink-list__empty">{emptyMessage}</div>
      )}
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
  /** Optional category label. */
  category?: React.ReactNode
  /** Optional category link. */
  categoryHref?: string
  /** Visual accent. */
  accent?: KnowledgeAccent
}

/**
 * Card for notes, concepts, and articles in a knowledge app.
 */
export const KnowledgeCard = React.forwardRef<HTMLDivElement, KnowledgeCardProps>(function KnowledgeCard(
  { title, excerpt, tags = [], backlinksCount, updatedAt, href, variant = 'note', category, categoryHref, accent = 'emerald', className, ...props },
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
    <Card
      ref={ref}
      className={cx('au-knowledge-card', `au-knowledge-card--${variant}`, `au-accent-${accent}`, className)}
      padding="md"
      {...props}
    >
      {category ? (
        <CategoryPill href={categoryHref} accent={accent}>
          {category}
        </CategoryPill>
      ) : null}
      {titleNode}
      {excerpt ? <div className="au-knowledge-card__excerpt">{excerpt}</div> : null}
      {tags.length > 0 ? (
        <div className="au-knowledge-card__tags">
          {tags.map((tag) => (
            <TagPill key={tag}>
              {tag}
            </TagPill>
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
