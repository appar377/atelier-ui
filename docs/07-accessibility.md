# 07. Accessibility

## 基本方針

アクセシビリティは後付けしない。component APIに組み込む。

## 共通ルール

- button用途はbutton要素を使う
- link用途はa要素を使う
- form componentはlabelと関連付ける
- disabled状態を見た目だけで表現しない
- focus ringを消さない
- keyboard操作をサポートする
- colorだけで状態を伝えない

## Focus Ring

```css
.au-focus-ring:focus-visible {
  outline: 2px solid var(--au-color-focus);
  outline-offset: 2px;
}
```

すべてのinteractive componentにfocus-visibleを用意する。

## Button

### icon-only button

aria-label必須。

```tsx
<IconButton aria-label="設定を開く" icon={<SettingsIcon />} />
```

## Input

label / description / errorを関連付ける。

```tsx
<Input
  label="メールアドレス"
  description="ログインに使用します"
  errorMessage="形式が不正です"
  invalid
/>
```

## Dialog

- `role="dialog"`
- `aria-modal="true"`
- titleとdescriptionを関連付ける
- open時にfocus移動
- close時に元のtriggerへfocus復帰
- Escapeでclose

複雑なfocus trapは自前実装しすぎず、必要ならRadix UIなどのprimitive利用を検討する。

## Color contrast

原則:

- 通常テキスト: 4.5:1以上
- 大きいテキスト: 3:1以上
- 非active装飾要素は例外可

## Motion

ユーザーがreduced motionを指定している場合はanimationを抑制する。

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

## チェックリスト

新規component追加時に確認する。

```txt
[ ] Keyboard操作できる
[ ] focus visibleがある
[ ] aria-labelが必要な場合に必須化されている
[ ] disabledが正しく表現される
[ ] error状態がscreen readerに伝わる
[ ] colorのみで意味を伝えていない
[ ] dark themeで読める
```
