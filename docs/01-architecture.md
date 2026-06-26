# 01. Architecture

## Monorepo構成

```txt
atelier-ui/
├── apps/
│   └── docs/
├── packages/
│   ├── tokens/
│   ├── css/
│   └── react/
├── docs/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## 依存方向

```txt
@appar/atelier-tokens
  ↓
@appar/atelier-css
  ↓
@appar/atelier-react
```

依存方向は必ず一方向にする。

- tokens はどこにも依存しない
- css は tokens を使う
- react は css と tokens を使う
- tokens が react に依存してはいけない
- css が react に依存してはいけない

## Package責務

### @appar/atelier-tokens

TypeScript object と CSS custom properties の元データを持つ。

```ts
export const tokens = {
  color: {},
  space: {},
  radius: {},
  typography: {},
}
```

### @appar/atelier-css

Rails / HTML / React共通で使えるCSSを提供する。

```css
.au-btn {}
.au-btn--solid {}
.au-btn--primary {}
```

### @appar/atelier-react

React向けの薄いラッパーを提供する。

```tsx
<Button variant="solid" intent="primary" size="md" />
```

React componentは可能な限りCSS classとdata属性を出力するだけにする。

## DOM設計

Rails / ReactでDOM構造が大きく変わらないようにする。

React:

```tsx
<Button variant="solid" intent="primary">保存</Button>
```

HTML output:

```html
<button class="au-btn au-btn--solid au-btn--primary au-btn--md">
  保存
</button>
```

Rails:

```erb
<button class="au-btn au-btn--solid au-btn--primary au-btn--md">
  保存
</button>
```

## CSS設計

BEM寄り + utility補助。

```txt
au-{component}
au-{component}--{variant}
au-{component}--{intent}
au-{component}--{size}
```

例:

```txt
au-btn
au-btn--solid
au-btn--primary
au-btn--md
```

状態はclassよりdata属性を優先する。

```html
<button class="au-btn" data-loading="true" data-state="open">
```

## React設計

- TypeScript必須
- forwardRef対応
- className上書き可能
- children対応
- native propsを極力継承
- styleはescape hatchとして残す
- polymorphic `as` は初期は避ける。必要になったら `asChild` を検討する

## Build

推奨:

- package manager: pnpm
- monorepo task runner: Turborepo
- library build: tsup
- css build: PostCSS or Lightning CSS
- docs: Storybook or Ladle
- test: Vitest + Testing Library

## Export方針

### tokens

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./css": "./dist/tokens.css"
  }
}
```

### css

```json
{
  "exports": {
    ".": "./dist/index.css"
  }
}
```

### react

```json
{
  "exports": {
    ".": "./dist/index.js"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

## Versioning

最初は全package同一versionで良い。

```txt
@appar/atelier-tokens@0.1.0
@appar/atelier-css@0.1.0
@appar/atelier-react@0.1.0
```

破壊的変更が増えるまでは厳密な独立versioningは不要。
