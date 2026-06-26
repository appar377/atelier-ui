# 02. Design Rules

## デザインコンセプト

```txt
Quiet Atelier UI
```

作業場、ノート、コーヒー、知識管理、日常的なツールに馴染むUI。AIプロダクトにありがちな過剰な紫グラデーション、ガラス風、ネオン、発光表現を避ける。

## 方向性

- 自然
- 静か
- 読みやすい
- 過度に未来感を出さない
- 情報密度を調整できる
- 長時間使って疲れない
- アプリごとに雰囲気を変えられる

## Theme Presets

初期テーマは以下を用意する。

| theme | 用途 | 印象 |
|---|---|---|
| `neutral` | 管理画面 / 汎用 | 白・グレー中心、最も無難 |
| `warm` | 日記 / Wiki / 学習 | 温かいベージュ、柔らかい |
| `cafe` | Coffee Blender | ブラウン、クリーム、豆色 |
| `forest` | Knowledge / Health | 深緑、自然、落ち着き |
| `ocean` | Dashboard / Analytics | 青系、清潔、情報整理 |
| `mono` | Developer Tool | モノクロ、硬め、CLI感 |
| `play` | Game / Casual | 彩度高め、楽しいが過剰にしない |
| `dark` | 夜間利用 | 低輝度、コントラスト控えめ |

## 避けるデザイン

- すべてのボタンを紫グラデーションにする
- 光彩、発光、ネオンを多用する
- glassmorphismを全面に使う
- 角丸を大きくしすぎる
- shadowを強くしすぎる
- 絵文字をUI構造に依存させる
- AI感を出すためだけのsparkle iconを多用する

## 色設計

### Neutral first

UIの80%以上はNeutral系で構成する。

```txt
background
surface
border
text
muted
```

Primary colorは行動の誘導に限定する。

### Semantic color

| intent | 用途 |
|---|---|
| `primary` | 主要アクション |
| `neutral` | 通常UI |
| `success` | 成功 / 完了 |
| `warning` | 注意 |
| `danger` | 削除 / 破壊的操作 |
| `info` | 補足情報 |

## Typography

### Font presets

| fontPreset | 用途 |
|---|---|
| `sans` | 汎用UI |
| `serif` | 日記、読み物、Wiki |
| `mono` | Developer tool、コード、ログ |
| `rounded` | Game / Casual / 学習アプリ |

### 推奨font stack

```css
--au-font-sans: Inter, "Noto Sans JP", system-ui, sans-serif;
--au-font-serif: "Noto Serif JP", Georgia, serif;
--au-font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
--au-font-rounded: "M PLUS Rounded 1c", "Noto Sans JP", system-ui, sans-serif;
```

実際にWeb Fontをbundleするかどうかはアプリ側の責務にする。UIライブラリはfont-family名だけ提供する。

## Spacing

8px gridを基本にする。

```txt
0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

## Radius

| token | px | 用途 |
|---|---:|---|
| `none` | 0 | table, hard UI |
| `xs` | 4 | badge, small input |
| `sm` | 6 | compact UI |
| `md` | 8 | default |
| `lg` | 12 | card |
| `xl` | 16 | large card, modal |
| `full` | 9999 | pill, avatar |

## Shadow

shadowは控えめにする。基本はborderで階層を表現する。

| shadow | 用途 |
|---|---|
| `none` | flat UI |
| `xs` | button hover |
| `sm` | card |
| `md` | popover |
| `lg` | modal |

## Motion

- default: 120ms - 180ms
- modal/drawer: 180ms - 240ms
- hover: 80ms - 120ms
- cubic-bezierは自然にする

```css
--au-ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

## Density

アプリごとに情報密度を切り替える。

| density | 用途 |
|---|---|
| `compact` | 管理画面 / table / power user |
| `comfortable` | default |
| `spacious` | landing / diary / casual app |

Providerで切り替える。

```tsx
<AtelierProvider density="compact" />
```

CSSではdata属性で切り替える。

```html
<html data-au-density="compact">
```

## アプリ別Preset

### My Obsidian Wiki

```txt
theme: warm / forest
fontPreset: serif or sans
density: comfortable
radius: md
```

### Coffee Blender

```txt
theme: cafe
fontPreset: serif or sans
density: spacious
radius: lg
```

### Game App

```txt
theme: play
tone: colorful
fontPreset: rounded
density: comfortable
radius: xl
```

### Admin / CRUD

```txt
theme: neutral / ocean
fontPreset: sans
density: compact
radius: sm
```
