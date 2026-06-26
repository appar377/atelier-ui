# 09. Component API Catalog

v1 は `@appar/atelier-react` の barrel export から利用する。props は token-based API を優先し、任意 px や業務ロジック用 props は追加しない。

## Source Layout

```txt
packages/react/src/core
packages/react/src/layout
packages/react/src/primitives
packages/react/src/surface
packages/react/src/navigation
packages/react/src/data
packages/react/src/feedback
packages/react/src/app
```

## Shared Types

```ts
type AtelierSpace = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
type AtelierAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type AtelierJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type AtelierSurface = 'none' | 'base' | 'raised' | 'sunken' | 'muted'
type AtelierOrientation = 'horizontal' | 'vertical'
type AtelierPlacement = 'top' | 'right' | 'bottom' | 'left'
```

## Provider

```tsx
<AtelierProvider
  theme="neutral"
  density="comfortable"
  radius="md"
  fontPreset="sans"
>
  {children}
</AtelierProvider>
```

## Button

```ts
type ButtonProps = {
  variant?: 'solid' | 'soft' | 'outline' | 'ghost' | 'plain'
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  fullWidth?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
```

使用例:

```tsx
<Button variant="solid" intent="primary">保存する</Button>
<Button variant="outline" intent="neutral">キャンセル</Button>
<Button variant="soft" intent="danger">削除</Button>
```

## IconButton

```ts
type IconButtonProps = {
  variant?: ButtonVariant
  intent?: AtelierIntent
  size?: AtelierSize
  icon: React.ReactNode
  'aria-label': string
}
```

## Input

```ts
type InputProps = {
  label?: string
  description?: string
  errorMessage?: string
  invalid?: boolean
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
}
```

## Textarea

```ts
type TextareaProps = InputProps & {
  minRows?: number
  maxRows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}
```

## Select

```ts
type SelectItem = {
  label: string
  value: string
  disabled?: boolean
}

type SelectProps = {
  label?: string
  description?: string
  errorMessage?: string
  items: SelectItem[]
  value?: string
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  size?: AtelierSize
  radius?: AtelierRadius
  fullWidth?: boolean
  invalid?: boolean
}
```

初期はnative selectで実装する。custom dropdownは後から追加。

## Card

```ts
type CardProps = {
  variant?: 'surface' | 'elevated' | 'outline' | 'soft'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: AtelierRadius
  interactive?: boolean
}
```

## Layout

```ts
type BoxProps = {
  as?: React.ElementType
  padding?: AtelierSpace
  radius?: AtelierRadius
  surface?: AtelierSurface
  border?: boolean | 'subtle' | 'strong'
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

type StackProps = {
  gap?: AtelierSpace
  align?: AtelierAlign
}

type InlineProps = {
  gap?: AtelierSpace
  align?: AtelierAlign
  justify?: AtelierJustify
  wrap?: boolean
}

type GridProps = {
  gap?: AtelierSpace
  columns?: 1 | 2 | 3 | 4 | 'auto'
}

type SpacerProps = {
  size?: AtelierSpace
  axis?: 'horizontal' | 'vertical'
}
```

`Container`, `Section`, `Divider` はページ構造と区切りを作るための component。ページセクションを装飾カード化しない。

## Surface

```ts
type PanelProps = {
  variant?: 'surface' | 'soft' | 'outline' | 'ghost'
  padding?: AtelierSpace
}

type DialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

type DrawerContentProps = {
  side?: 'top' | 'right' | 'bottom' | 'left'
  size?: 'sm' | 'md' | 'lg'
}
```

`Dialog`, `Drawer`, `Popover`, `Tooltip` は Radix primitives に focus management, portal, keyboard behavior を委譲する。Atelier 側は薄い API と className を提供する。

## Navigation

```ts
type TabsProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  variant?: 'line' | 'pill' | 'segment'
  size?: AtelierSize
}

type SegmentedControlProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: Array<{ label: React.ReactNode; value: string; disabled?: boolean }>
}
```

`Breadcrumbs`, `Pagination`, `Navbar`, `Sidebar`, `BottomNavigation` はリンク構造と現在状態の表示だけを担当する。

## Data

```ts
type DataTableColumn<T> = {
  key: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
}

type DataTableProps<T> = {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowKey?: (row: T, index: number) => React.Key
  size?: 'sm' | 'md'
  striped?: boolean
  emptyMessage?: React.ReactNode
}

type TimelineItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  date?: React.ReactNode
  intent?: AtelierIntent
  href?: string
}

type EmptyStateProps = {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}
```

`Table`, `List`, `ListItem`, `StatCard`, `Timeline`, `EmptyState` は表示専用。sort/filter/pagination の業務ロジックはアプリ側に置く。

## Feedback

```ts
type AlertProps = {
  intent?: AtelierIntent
  variant?: 'soft' | 'outline' | 'solid'
  title?: React.ReactNode
}

type ConfirmDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  onConfirm?: () => void
}
```

`Toast`, `LoadingState`, `ErrorState` は UI state の表示のみを担当する。

## Badge

```ts
type BadgeProps = {
  variant?: 'solid' | 'soft' | 'outline' | 'dot'
  intent?: AtelierIntent
  size?: 'sm' | 'md' | 'lg'
}
```

## Checkbox

```ts
type CheckboxProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
```

native checkbox inputとして実装する。

## Radio

```ts
type RadioProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
```

native radio inputとして実装する。

## Switch

```ts
type SwitchProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
```

内部は `type="checkbox"` + `role="switch"` にする。

## Slider

```ts
type SliderProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  formatValue?: (value: string | number | readonly string[]) => React.ReactNode
}
```

native range inputとして実装する。

## Chip

```ts
type ChipProps = {
  variant?: 'solid' | 'soft' | 'outline'
  intent?: AtelierIntent
  size?: 'sm' | 'md' | 'lg'
  selected?: boolean
  onDismiss?: () => void
  dismissLabel?: string
}
```

## Avatar

```ts
type AvatarProps = {
  src?: string
  alt?: string
  name?: string
  fallback?: React.ReactNode
  size?: AtelierSize
}
```

## Spinner

```ts
type SpinnerProps = {
  size?: AtelierSize
  intent?: AtelierIntent
  label?: string
}
```

## Progress

```ts
type ProgressProps = {
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  value?: number
  max?: number
}
```

## Skeleton

```ts
type SkeletonProps = {
  variant?: 'text' | 'rect' | 'circle'
  radius?: AtelierRadius
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
}
```

## App-specific

Wiki / Knowledge app用。

```ts
type MarkdownViewProps = React.HTMLAttributes<HTMLElement>

type WikiLinkProps = {
  status?: 'resolved' | 'missing' | 'external'
}

type BacklinkItem = {
  id: string
  title: React.ReactNode
  href?: string
  excerpt?: React.ReactNode
}

type BacklinkListProps = {
  items: BacklinkItem[]
  emptyMessage?: React.ReactNode
}

type KnowledgeCardProps = {
  title: React.ReactNode
  excerpt?: React.ReactNode
  tags?: string[]
  backlinksCount?: number
  updatedAt?: React.ReactNode
  href?: string
  variant?: 'note' | 'article' | 'concept' | 'daily'
  category?: React.ReactNode
  categoryHref?: string
  accent?: KnowledgeAccent
}
```

## Knowledge Library v2

技術ブログ兼ナレッジベース向けの静かな記事 UI。Next.js App Router で使いやすいよう、検索、フィルタ、コピー、キーボード操作などのロジックはアプリ側に置く。

```ts
type KnowledgeAccent = 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'slate'

type ArticleMetaItem = {
  label?: React.ReactNode
  value: React.ReactNode
}

type ArticleCardProps = {
  title: React.ReactNode
  href?: string
  excerpt?: React.ReactNode
  category?: React.ReactNode
  categoryHref?: string
  meta?: ArticleMetaItem[]
  tags?: string[]
  thumbnail?: React.ReactNode
  accent?: KnowledgeAccent
  variant?: 'default' | 'compact' | 'featured'
}

type ArticleHeaderProps = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  category?: React.ReactNode
  meta?: ArticleMetaItem[]
  tags?: string[]
  actions?: React.ReactNode
  accent?: KnowledgeAccent
}

type SearchBoxProps = {
  label?: React.ReactNode
  name?: string
  placeholder?: string
  defaultValue?: string
  buttonLabel?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

type TableOfContentsItem = {
  title: React.ReactNode
  href: string
  depth?: 1 | 2 | 3
}

type CalloutProps = {
  variant?: 'note' | 'tip' | 'warning' | 'important' | 'info'
  title?: React.ReactNode
  icon?: React.ReactNode
}

type CommandPaletteProps = {
  open?: boolean
  title?: React.ReactNode
  description?: React.ReactNode
  query?: string
  placeholder?: string
  items: CommandPaletteItem[]
  emptyMessage?: React.ReactNode
  footer?: React.ReactNode
}
```

関連 component: `ArticleMeta`, `TagPill`, `CategoryPill`, `TableOfContents`, `SeriesNav`, `RelatedArticleList`, `CodeBlockShell`, `ThumbnailFrame`, `CommandPalette`。

Coffee Blender用。

```ts
type CoffeeBeanRatio = {
  name: React.ReactNode
  ratio: number
}

type CoffeeBlendCardProps = {
  title: React.ReactNode
  beans: CoffeeBeanRatio[]
  roastLevel?: 'light' | 'medium' | 'dark'
  flavorNotes?: string[]
}

type CoffeeRatioSliderProps = {
  beans: CoffeeBeanRatio[]
}

type BeanTagProps = {
  roastLevel?: 'light' | 'medium' | 'dark'
}
```

Game app用。

```ts
type GamePanelProps = {
  title?: React.ReactNode
  variant?: 'default' | 'quest' | 'inventory' | 'status'
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

type GameButtonProps = ButtonProps & {
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

type InventorySlotProps = {
  item?: React.ReactNode
  selected?: boolean
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

type QuestCardProps = {
  title: React.ReactNode
  status?: 'available' | 'active' | 'complete'
  description?: React.ReactNode
  reward?: React.ReactNode
}
```

App-specific component は表示専用。データ取得、保存、認証、比率計算、ゲーム状態更新はアプリ側に置く。
