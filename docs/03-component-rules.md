# 03. Component Rules

## Component設計原則

```txt
Small API
Predictable Props
CSS-variable based styling
Native behavior first
```

コンポーネントは高機能にしすぎない。複雑な業務ロジック、データ取得、DB操作、認証状態はアプリ側に置く。

## 共通Props

多くのコンポーネントに共通して使うprops。

```ts
type AtelierSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AtelierRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
type AtelierIntent = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type AtelierDensity = 'compact' | 'comfortable' | 'spacious'
```

## variant / intent / size の使い分け

### variant

見た目の構造を表す。

```ts
type Variant = 'solid' | 'soft' | 'outline' | 'ghost' | 'plain'
```

### intent

意味や目的を表す。

```ts
type Intent = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
```

### size

物理サイズを表す。

```ts
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

良い例:

```tsx
<Button variant="solid" intent="danger" size="md">削除</Button>
```

悪い例:

```tsx
<Button type="redBigDeleteButton">削除</Button>
```

## className生成規則

React componentは以下のclassを出力する。

```txt
au-{component}
au-{component}--{variant}
au-{component}--{intent}
au-{component}--{size}
```

例:

```html
<button class="au-btn au-btn--solid au-btn--primary au-btn--md">
```

## data属性規則

状態はdata属性で表す。

```html
<button
  class="au-btn"
  data-loading="true"
  data-disabled="false"
  data-state="open"
>
```

| data属性 | 用途 |
|---|---|
| `data-state` | open / closed / active / inactive / checked |
| `data-loading` | loading state |
| `data-disabled` | disabled state |
| `data-invalid` | validation error |
| `data-selected` | selected state |

## Component categories

### Primitive components

最初に実装する。

- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Slider
- Badge
- Chip
- Avatar
- Spinner
- Progress
- Skeleton

### Layout components

- Box
- Stack
- Inline
- Grid
- Divider
- Container
- Section

### Surface components

- Card
- Panel
- Modal / Dialog
- Drawer
- Popover
- Tooltip

### Navigation components

- Tabs
- SegmentedControl
- Breadcrumbs
- Pagination
- Navbar
- Sidebar
- BottomNavigation

### Data components

- Table
- DataTable
- List
- ListItem
- StatCard
- Timeline
- EmptyState

### Feedback components

- Alert
- Toast
- ConfirmDialog
- LoadingState
- ErrorState

### App-specific reusable components

汎用UIに近いが、自作サービス群で使うもの。

- MarkdownView
- WikiLink
- BacklinkList
- KnowledgeCard
- TimelineEvent
- CoffeeBlendCard
- CoffeeRatioSlider
- BeanTag
- GamePanel
- GameButton
- InventorySlot
- QuestCard

## Props命名規則

### Boolean

boolean propsは肯定形にする。

良い:

```tsx
<Button disabled loading fullWidth />
```

悪い:

```tsx
<Button notActive noLoading />
```

### Icon

icon propsは `leftIcon` / `rightIcon` ではなく、文方向に依存しない `startIcon` / `endIcon` を使う。

```tsx
<Button startIcon={<SaveIcon />} endIcon={<ChevronRightIcon />} />
```

### Controlled / Uncontrolled

フォーム系はReact標準に寄せる。

```tsx
<Select value={value} onValueChange={setValue} />
<Select defaultValue="warm" />
```

### Form error

```tsx
<Input
  label="メールアドレス"
  invalid
  errorMessage="メールアドレスの形式が不正です"
/>
```

## Compound Components

複雑なコンポーネントはCompound Componentsを許可する。

```tsx
<Card>
  <Card.Header>
    <Card.Title>タイトル</Card.Title>
  </Card.Header>
  <Card.Body>本文</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

ただし最初は過剰に分割しない。

## Accessibility rules

- Buttonはbutton要素を使う
- Linkはa要素を使う
- Dialogはroleとfocus trapを考慮する
- Form componentはlabel関連付けを必須にする
- icon-only buttonはaria-label必須

## Component追加テンプレート

新規componentを追加するときは以下を作る。

```txt
packages/react/src/{category}/
└── index.tsx
```

`category` は `layout`, `primitives`, `surface`, `navigation`, `data`, `feedback`, `app` のいずれかに置く。共通型、polymorphic helper、controlled/uncontrolled helper は `packages/react/src/core` に置く。

CSS:

```txt
packages/css/src/layout/layout.css
packages/css/src/components/components.css
```

Docs:

```txt
apps/docs/src/App.tsx
docs/09-component-api-catalog.md
```

CSS は `packages/css/scripts/build-css.mjs` で固定順に結合する。新規 component は source, CSS, docs gallery, API catalog, 必要なテストを同時に更新する。
