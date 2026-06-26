# 05. Theming

## Theme API

React:

```tsx
<AtelierProvider
  theme="cafe"
  density="comfortable"
  radius="lg"
  fontPreset="serif"
>
  <App />
</AtelierProvider>
```

HTML / Rails:

```html
<html
  data-au-theme="cafe"
  data-au-density="comfortable"
  data-au-radius="lg"
  data-au-font="serif"
>
```

## Theme Props

```ts
type AtelierTheme =
  | 'neutral'
  | 'warm'
  | 'cafe'
  | 'forest'
  | 'ocean'
  | 'mono'
  | 'play'
  | 'dark'

type AtelierDensity = 'compact' | 'comfortable' | 'spacious'
type AtelierRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
type AtelierFontPreset = 'sans' | 'serif' | 'mono' | 'rounded'
```

## CSS theme example

```css
:root,
[data-au-theme="neutral"] {
  --au-color-bg: #ffffff;
  --au-color-surface: #f8fafc;
  --au-color-surface-raised: #ffffff;
  --au-color-border: #e5e7eb;
  --au-color-text: #111827;
  --au-color-muted: #6b7280;
  --au-color-primary: #3b82f6;
}

[data-au-theme="cafe"] {
  --au-color-bg: #fbf7f0;
  --au-color-surface: #fffaf2;
  --au-color-surface-raised: #ffffff;
  --au-color-border: #e8dccb;
  --au-color-text: #2f2118;
  --au-color-muted: #7a6250;
  --au-color-primary: #8b5e34;
}
```

## Component variant x theme

componentはテーマを直接知らない。

良い:

```css
.au-btn--primary {
  background: var(--au-color-primary);
}
```

悪い:

```css
[data-au-theme="cafe"] .au-btn {
  background: brown;
}
```

テーマはtokenの値だけを変える。component側はsemantic tokenを参照する。

## Density switching

```css
[data-au-density="compact"] {
  --au-control-height-md: 32px;
  --au-control-padding-x-md: 10px;
}

[data-au-density="comfortable"] {
  --au-control-height-md: 38px;
  --au-control-padding-x-md: 14px;
}

[data-au-density="spacious"] {
  --au-control-height-md: 44px;
  --au-control-padding-x-md: 18px;
}
```

## Radius switching

```css
[data-au-radius="sm"] {
  --au-radius-control: var(--au-radius-sm);
  --au-radius-card: var(--au-radius-md);
}

[data-au-radius="lg"] {
  --au-radius-control: var(--au-radius-lg);
  --au-radius-card: var(--au-radius-xl);
}
```

## Font switching

```css
[data-au-font="sans"] {
  --au-font-body: var(--au-font-sans);
}

[data-au-font="serif"] {
  --au-font-body: var(--au-font-serif);
}
```

## Theme preset recommendations

### Wiki

```tsx
<AtelierProvider theme="warm" fontPreset="serif" density="comfortable" />
```

### Coffee Blender

```tsx
<AtelierProvider theme="cafe" fontPreset="serif" density="spacious" radius="lg" />
```

### Game

```tsx
<AtelierProvider theme="play" fontPreset="rounded" density="comfortable" radius="xl" />
```

### Admin

```tsx
<AtelierProvider theme="neutral" fontPreset="sans" density="compact" radius="sm" />
```
