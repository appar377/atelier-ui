# 04. Token Rules

## Token分類

Design Tokensは以下に分ける。

```txt
primitive tokens
semantic tokens
component tokens
```

## Primitive tokens

生の値。

```ts
color.gray.100
space.4
radius.md
fontSize.sm
```

## Semantic tokens

用途に紐づく値。

```ts
color.background
color.surface
color.text
color.muted
color.border
color.primary
color.danger
```

## Component tokens

特定コンポーネントの値。

```ts
button.height.md
button.paddingX.md
card.padding.md
input.height.md
```

## 命名規則

```txt
--au-{category}-{name}-{scale}
```

例:

```css
--au-color-bg
--au-color-surface
--au-color-text
--au-space-4
--au-radius-md
--au-font-size-sm
```

## CSS Variables

すべてのテーマ切り替えはCSS Variablesで行う。

```css
:root {
  --au-color-bg: #ffffff;
  --au-color-surface: #f8fafc;
  --au-color-text: #111827;
}

[data-au-theme="cafe"] {
  --au-color-bg: #fbf7f0;
  --au-color-surface: #fffaf2;
  --au-color-text: #2f2118;
}
```

## Token source of truth

TypeScript objectをsource of truthにする。

```txt
packages/tokens/src/tokens.ts
```

そこから必要に応じてCSSを生成する。

初期は手書きでもよいが、将来はbuild scriptでCSS custom propertiesを生成する。

## Color token layers

### Base palette

```ts
blue, green, orange, red, gray, brown, forest, ocean
```

### Semantic mapping

```ts
primary -> blue or theme accent
success -> green
warning -> orange
danger -> red
info -> blue
```

## Spacing token

```ts
space: {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
}
```

## Typography token

```ts
fontSize: {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
}
```

## Radius token

```ts
radius: {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}
```

## Shadow token

```ts
shadow: {
  none: 'none',
  xs: '0 1px 2px rgb(15 23 42 / 0.06)',
  sm: '0 2px 8px rgb(15 23 42 / 0.08)',
  md: '0 8px 24px rgb(15 23 42 / 0.10)',
  lg: '0 16px 48px rgb(15 23 42 / 0.14)',
}
```

## Token変更ルール

- primitive tokenの削除は破壊的変更
- semantic tokenの意味変更は破壊的変更
- component tokenの追加はminor
- 値の微調整はpatchでよいが、見た目が大きく変わる場合はminor扱い
