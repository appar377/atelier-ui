# atelier-ui

`atelier-ui` は、複数の個人サービス / アプリで共通利用するための Design System / UI Component Library です。

想定パッケージ:

```txt
repository: atelier-ui
packages:
  @appar/atelier-tokens
  @appar/atelier-css
  @appar/atelier-react
```

## 目的

- My Obsidian Wiki / Knowledge Base / Coffee Blender / Game App / 管理画面などで統一感のあるUIを使う
- AIっぽい過剰なグラデーションや派手な演出ではなく、自然で落ち着いたプロダクトUIにする
- React / Next.js ではコンポーネントとして使う
- Rails / ERB ではCSSクラスベースで使う
- 将来必要になれば Web Components 化できる設計にしておく

## 基本方針

```txt
Design Tokens first
CSS second
React Components third
```

Reactに閉じたUIライブラリにしない。色、余白、radius、typography、shadow、motionなどのDesign Tokensを中心に置き、CSSとReactの両方から参照する。

## 初期構成

```txt
atelier-ui/
├── apps/
│   └── docs/                  # Storybook / Ladle / VitePress 等
│
├── packages/
│   ├── tokens/                # @appar/atelier-tokens
│   ├── css/                   # @appar/atelier-css
│   └── react/                 # @appar/atelier-react
│
├── docs/
│   ├── 00-goal-and-scope.md
│   ├── 01-architecture.md
│   ├── 02-design-rules.md
│   ├── 03-component-rules.md
│   ├── 04-token-rules.md
│   ├── 05-theming.md
│   ├── 06-rails-integration.md
│   ├── 07-accessibility.md
│   ├── 08-release-rules.md
│   └── 09-component-api-catalog.md
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## 使用例: React

```tsx
import { Button, Card, Select } from '@appar/atelier-react'
import '@appar/atelier-css'

export function Example() {
  return (
    <Card variant="surface" padding="lg">
      <Select
        label="テーマ"
        items={[
          { label: 'Warm', value: 'warm' },
          { label: 'Cafe', value: 'cafe' },
          { label: 'Forest', value: 'forest' },
        ]}
      />
      <Button variant="solid" intent="primary" size="md">
        保存する
      </Button>
    </Card>
  )
}
```

## 使用例: Rails / ERB

```erb
<div class="au-card au-card--surface au-p-lg">
  <div class="au-field">
    <label class="au-label" for="theme">テーマ</label>
    <select id="theme" class="au-select au-select--md">
      <option>Warm</option>
      <option>Cafe</option>
      <option>Forest</option>
    </select>
  </div>

  <button class="au-btn au-btn--solid au-btn--primary au-btn--md">
    保存する
  </button>
</div>
```

## 推奨実装順

1. `@appar/atelier-tokens`
2. `@appar/atelier-css`
3. `@appar/atelier-react`
4. docs / Storybook
5. 必要なら Web Components

## 注意

`@appar` npm scope は、実際にnpm organizationとして取得できる場合に使う。取得できない場合は `@appar-ui` などに変更する。

## 開発

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm test
```

`pnpm` が未導入の場合:

```bash
npx pnpm@9.0.0 install
npx pnpm@9.0.0 typecheck
npx pnpm@9.0.0 build
npx pnpm@9.0.0 test
```

docs app:

```bash
pnpm --filter @appar/atelier-docs dev
```

## v1 実装済みコンポーネント

- Core: `AtelierProvider`, shared types, `cx`, `dataBoolean`, `describedBy`, `useControllableState`
- Layout: `Box`, `Stack`, `Inline`, `Grid`, `Spacer`, `Divider`, `Container`, `Section`
- Primitives: `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Badge`, `Chip`, `Avatar`, `Spinner`, `Progress`, `Skeleton`
- Surface: `Card`, `Panel`, `Dialog`, `Drawer`, `Popover`, `Tooltip`
- Navigation: `Tabs`, `SegmentedControl`, `Breadcrumbs`, `Pagination`, `Navbar`, `Sidebar`, `BottomNavigation`
- Data: `Table`, `DataTable`, `List`, `ListItem`, `StatCard`, `Timeline`, `EmptyState`
- Feedback: `Alert`, `Toast`, `ConfirmDialog`, `LoadingState`, `ErrorState`
- App-specific: `MarkdownView`, `WikiLink`, `BacklinkList`, `KnowledgeCard`, `TimelineEvent`, `CoffeeBlendCard`, `CoffeeRatioSlider`, `BeanTag`, `GamePanel`, `GameButton`, `InventorySlot`, `QuestCard`

React package はカテゴリ別に `packages/react/src/core`, `layout`, `primitives`, `surface`, `navigation`, `data`, `feedback`, `app` へ分割している。CSS は `tokens.css`, `base.css`, `utilities.css`, `layout/layout.css`, `components/components.css` を固定順で `packages/css/dist/index.css` に結合する。
